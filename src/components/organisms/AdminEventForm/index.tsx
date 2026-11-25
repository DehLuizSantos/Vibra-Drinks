"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Field } from "@/components/atoms/Field";
import { inputClass } from "@/components/organisms/Steeper";
import {
  ImagePreviewModal,
  PictureCard,
  UploadTrigger,
  type UploadItem
} from "@/components/molecules/pictureCardUpload";
import { ACCEPT_IMAGE_ATTR, validateImageFile } from "@/lib/storage/imageRules";
import { MAX_PHOTOS_PER_EVENT } from "@/lib/validation/event";
import { uploadImage } from "@/utils/uploadImage";
import {
  EVENT_TYPES,
  EVENT_TYPE_LABELS,
  type EventInput,
  type EventType,
  type VibraEvent
} from "@/types/event";

type PhotoDraft = UploadItem & { title: string; phrase: string };

type FormState = Omit<EventInput, "photos" | "type" | "image"> & {
  type: EventType | "";
  photos: PhotoDraft[];
};

type AdminEventFormProps = {
  event?: VibraEvent | null;
  onSaved: (event: VibraEvent) => void;
  onCancel: () => void;
};

let keySeq = 0;
const newKey = () => `upload-${Date.now()}-${keySeq++}`;

function toFormState(event?: VibraEvent | null): FormState {
  return {
    name: event?.name ?? "",
    type: event?.type ?? "",
    eventDescription: event?.eventDescription ?? "",
    description: event?.description ?? "",
    photos: (event?.photos ?? []).map(p => ({
      key: p.id,
      url: p.url,
      status: "done",
      progress: 100,
      title: p.title,
      phrase: p.phrase
    }))
  };
}

function toCover(event?: VibraEvent | null): UploadItem | null {
  return event?.image ? { key: "cover-initial", url: event.image, status: "done", progress: 100 } : null;
}

function FieldError({ message }: { message?: string }) {
  return message ? <p className="display-marcellus text-pink-100 text-xs mt-1">{message}</p> : null;
}

/** Orientações de resolução exibidas ao lado dos campos de imagem. */
function ImageGuidelines({ title, items }: { title: string; items: { label: string; value: string }[] }) {
  return (
    <aside className="rounded-xl border border-gold/30 bg-black-300/60 p-4 md:max-w-md">
      <p className="display-marcellus mb-3 text-xs uppercase tracking-[0.2em] text-gold">{title}</p>
      <dl className="flex flex-col gap-2">
        {items.map(item => (
          <div key={item.label} className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
            <dt className="display-marcellus shrink-0 text-xs text-white-300/60 sm:w-28">{item.label}</dt>
            <dd className="display-marcellus text-sm text-white-300">{item.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}

const COVER_GUIDELINES = [
  { label: "Recomendado", value: "2400 × 1350 px (horizontal 16:9)" },
  { label: "Mínimo", value: "1920 × 1080 px" },
  { label: "Enquadramento", value: "Assunto principal no centro — no celular as laterais são cortadas." },
  { label: "Formato", value: "JPG (qualidade 80–85%) ou WEBP · 300 KB a 3 MB · máx. 10 MB" }
];

const PHOTO_GUIDELINES = [
  { label: "Recomendado", value: "1600 × 2000 px (vertical 4:5)" },
  { label: "Também ok", value: "2000 × 2000 px (quadrada)" },
  { label: "Mínimo", value: "1080 × 1350 px — abaixo de ~1000 px de largura a foto fica pixelada" },
  { label: "Dica", value: "Envie a foto original (celular/câmera). Evite imagens salvas do Google, Instagram ou WhatsApp." },
  { label: "Formato", value: "JPG (qualidade 80–85%) ou WEBP · 300 KB a 3 MB · máx. 10 MB" }
];

export default function AdminEventForm({ event, onSaved, onCancel }: AdminEventFormProps) {
  const [form, setForm] = useState<FormState>(() => toFormState(event));
  const [cover, setCover] = useState<UploadItem | null>(() => toCover(event));
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const isEditing = Boolean(event);

  const filesRef = useRef(new Map<string, File>()); // arquivos originais, para "tentar novamente"
  const objectUrlsRef = useRef<string[]>([]);
  const coverReplaceRef = useRef<HTMLInputElement>(null);

  // Libera as prévias locais ao sair do formulário
  useEffect(() => {
    const urls = objectUrlsRef.current;
    return () => urls.forEach(url => URL.revokeObjectURL(url));
  }, []);

  const makePreview = (file: File) => {
    const url = URL.createObjectURL(file);
    objectUrlsRef.current.push(url);
    return url;
  };

  /** Valida e envia um arquivo, reportando progresso/resultado via `apply`. */
  const runUpload = useCallback((file: File, apply: (patch: Partial<UploadItem>) => void) => {
    const invalid = validateImageFile(file);
    if (invalid) {
      apply({ status: "error", error: invalid, progress: 0 });
      return;
    }
    apply({ status: "uploading", progress: 0, error: undefined });
    uploadImage(file, progress => apply({ progress }))
      .then(url => apply({ status: "done", url, progress: 100 }))
      .catch((err: Error) => apply({ status: "error", error: err.message }));
  }, []);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm(prev => ({ ...prev, [key]: value }));

  /* ---------- Capa ---------- */

  const handleCoverFile = (file: File) => {
    const key = newKey();
    filesRef.current.set(key, file);
    setCover({ key, url: "", preview: makePreview(file), status: "uploading", progress: 0, name: file.name });
    // Só aplica no item atual (ignora resultados de uma troca anterior ainda em andamento)
    runUpload(file, patch => setCover(prev => (prev?.key === key ? { ...prev, ...patch } : prev)));
  };

  const retryCover = () => {
    const file = cover && filesRef.current.get(cover.key);
    if (!file || !cover) return;
    const key = cover.key;
    runUpload(file, patch => setCover(prev => (prev?.key === key ? { ...prev, ...patch } : prev)));
  };

  /* ---------- Fotos do carrossel ---------- */

  const patchPhoto = (key: string, patch: Partial<PhotoDraft>) =>
    setForm(prev => ({
      ...prev,
      photos: prev.photos.map(p => (p.key === key ? { ...p, ...patch } : p))
    }));

  const addPhotoFiles = (files: File[]) => {
    const remaining = MAX_PHOTOS_PER_EVENT - form.photos.length;
    if (files.length > remaining) {
      setFormError(`Limite de ${MAX_PHOTOS_PER_EVENT} fotos por evento — ${files.length - remaining} arquivo(s) ignorado(s).`);
    }
    const accepted = files.slice(0, Math.max(remaining, 0));
    const drafts: PhotoDraft[] = accepted.map(file => {
      const key = newKey();
      filesRef.current.set(key, file);
      return {
        key,
        url: "",
        preview: makePreview(file),
        status: "uploading",
        progress: 0,
        name: file.name,
        title: "",
        phrase: ""
      };
    });
    setForm(prev => ({ ...prev, photos: [...prev.photos, ...drafts] }));
    drafts.forEach((draft, i) => runUpload(accepted[i], patch => patchPhoto(draft.key, patch)));
  };

  const retryPhoto = (key: string) => {
    const file = filesRef.current.get(key);
    if (file) runUpload(file, patch => patchPhoto(key, patch));
  };

  const removePhoto = (key: string) => {
    filesRef.current.delete(key);
    setForm(prev => ({ ...prev, photos: prev.photos.filter(p => p.key !== key) }));
  };

  const movePhoto = (index: number, direction: -1 | 1) =>
    setForm(prev => {
      const target = index + direction;
      if (target < 0 || target >= prev.photos.length) return prev;
      const photos = [...prev.photos];
      [photos[index], photos[target]] = [photos[target], photos[index]];
      return { ...prev, photos };
    });

  /* ---------- Envio do formulário ---------- */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setFormError(null);

    const all = [cover, ...form.photos].filter(Boolean) as UploadItem[];
    if (all.some(item => item.status === "uploading")) {
      setFormError("Aguarde o envio das imagens terminar.");
      return;
    }
    if (all.some(item => item.status === "error")) {
      setFormError("Há imagens com erro. Tente reenviar ou remova-as antes de salvar.");
      return;
    }

    const payload = {
      ...form,
      image: cover?.url ?? "",
      photos: form.photos.map(({ title, phrase, url }) => ({ title, phrase, url }))
    };

    setSaving(true);
    try {
      const res = await fetch(isEditing ? `/api/admin/events/${event!.id}` : "/api/admin/events", {
        method: isEditing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrors(data.errors ?? {});
        setFormError(
          res.status === 401 ? "Sua sessão expirou. Entre novamente." : data.error ?? "Erro ao salvar."
        );
        return;
      }
      onSaved(data.event);
    } catch {
      setFormError("Falha de conexão. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  const photoCount = form.photos.length;

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      <h2 className="display-font text-gold text-xl md:text-2xl">
        {isEditing ? "Editar evento" : "Adicionar evento"}
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Field label="Nome do cliente">
            <input
              className={inputClass}
              value={form.name}
              onChange={e => update("name", e.target.value)}
              placeholder="Ex.: Juliana Martins"
              maxLength={120}
            />
          </Field>
          <FieldError message={errors.name} />
        </div>

        <div>
          <Field label="Tipo de evento">
            <select
              className={inputClass}
              value={form.type}
              onChange={e => update("type", e.target.value as EventType)}
            >
              <option value="" disabled>
                Selecione...
              </option>
              {EVENT_TYPES.map(type => (
                <option key={type} value={type}>
                  {EVENT_TYPE_LABELS[type]}
                </option>
              ))}
            </select>
          </Field>
          <FieldError message={errors.type} />
        </div>

        <div className="md:col-span-2">
          <Field label="Descrição do evento">
            <input
              className={inputClass}
              value={form.eventDescription}
              onChange={e => update("eventDescription", e.target.value)}
              placeholder="Ex.: Casamento Elegante"
              maxLength={120}
            />
          </Field>
          <FieldError message={errors.eventDescription} />
        </div>
      </div>

      {/* Capa */}
      <div>
        <Field label="Imagem de capa (fundo do depoimento)">
          <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-start">
            {cover ? (
              <PictureCard
                item={cover}
                className="w-56 h-40 md:w-64 md:h-48"
                badge="Capa"
                onPreview={() => setPreviewSrc(cover.preview ?? cover.url)}
                onReplace={() => coverReplaceRef.current?.click()}
                onRemove={() => setCover(null)}
                onRetry={filesRef.current.has(cover.key) ? retryCover : undefined}
              />
            ) : (
              <UploadTrigger
                onFiles={([file]) => handleCoverFile(file)}
                label="Enviar capa"
                hint="Clique ou arraste · 2400 × 1350 px"
                className="w-56 h-40 md:w-64 md:h-48"
              />
            )}
            <input
              ref={coverReplaceRef}
              type="file"
              accept={ACCEPT_IMAGE_ATTR}
              className="hidden"
              onChange={e => {
                const file = e.target.files?.[0];
                e.target.value = "";
                if (file) handleCoverFile(file);
              }}
            />
            <ImageGuidelines title="Tamanho ideal da capa" items={COVER_GUIDELINES} />
          </div>
        </Field>
        <FieldError message={errors.image} />
      </div>

      <div>
        <Field label="Depoimento do cliente">
          <textarea
            className={`${inputClass} min-h-32 resize-y`}
            value={form.description}
            onChange={e => update("description", e.target.value)}
            placeholder="O que o cliente disse sobre a experiência"
            maxLength={1000}
          />
        </Field>
        <FieldError message={errors.description} />
      </div>

      {/* Carrossel de fotos */}
      <fieldset className="flex flex-col gap-5">
        <div className="border-gradient-bottom pb-3">
          <legend className="display-marcellus text-white-500 text-lg">
            Carrossel de fotos{" "}
            <span className="text-white-300/60 text-sm">
              ({photoCount}/{MAX_PHOTOS_PER_EVENT})
            </span>
          </legend>
          <p className="display-marcellus text-white-300/70 text-sm mt-1">
            As fotos aparecem na página do evento (botão &ldquo;Ver fotos&rdquo; no slider da página inicial).
            Selecione várias de uma vez ou arraste para o quadro.
          </p>
        </div>
        <ImageGuidelines title="Tamanho ideal das fotos" items={PHOTO_GUIDELINES} />
        <FieldError message={errors.photos} />

        <div className="flex flex-wrap gap-3">
          {form.photos.map((photo, index) => (
            <PictureCard
              key={photo.key}
              item={photo}
              badge={String(index + 1)}
              onPreview={() => setPreviewSrc(photo.preview ?? photo.url)}
              onRemove={() => removePhoto(photo.key)}
              onRetry={filesRef.current.has(photo.key) ? () => retryPhoto(photo.key) : undefined}
              onMoveLeft={index > 0 ? () => movePhoto(index, -1) : undefined}
              onMoveRight={index < photoCount - 1 ? () => movePhoto(index, 1) : undefined}
            />
          ))}
          {photoCount < MAX_PHOTOS_PER_EVENT && (
            <UploadTrigger onFiles={addPhotoFiles} multiple label="Enviar" hint="1600 × 2000 px" />
          )}
        </div>

        {/* Título e frase de cada foto */}
        {photoCount > 0 && (
          <div className="flex flex-col gap-3">
            <p className="display-marcellus text-white-300 text-xs uppercase tracking-widest">Legendas</p>
            {form.photos.map((photo, index) => (
              <div
                key={photo.key}
                className="flex flex-col gap-3 rounded-xl border border-white-300/15 bg-black-300/60 p-3 md:flex-row md:items-start"
              >
                <div className="flex items-center gap-3 md:w-32 md:shrink-0">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-gold/30 bg-black-500">
                    {(photo.preview ?? photo.url) && (
                      // eslint-disable-next-line @next/next/no-img-element -- miniatura
                      <img src={photo.preview ?? photo.url} alt="" className="h-full w-full object-cover" />
                    )}
                  </div>
                  <span className="display-font text-gold text-sm">Foto {index + 1}</span>
                </div>
                <div className="grid flex-1 gap-3 md:grid-cols-2">
                  <div>
                    <input
                      className={inputClass}
                      value={photo.title}
                      onChange={e => patchPhoto(photo.key, { title: e.target.value })}
                      placeholder="Título *"
                      aria-label={`Título da foto ${index + 1}`}
                      maxLength={80}
                    />
                    <FieldError message={errors[`photos.${index}.title`]} />
                  </div>
                  <div>
                    <input
                      className={inputClass}
                      value={photo.phrase}
                      onChange={e => patchPhoto(photo.key, { phrase: e.target.value })}
                      placeholder="Frase (opcional)"
                      aria-label={`Frase da foto ${index + 1}`}
                      maxLength={200}
                    />
                    <FieldError message={errors[`photos.${index}.phrase`] ?? errors[`photos.${index}.url`]} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </fieldset>

      {formError && (
        <p role="alert" className="display-marcellus text-pink-100 text-sm">
          {formError}
        </p>
      )}

      <div className="flex flex-col-reverse gap-3 md:flex-row md:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="cursor-pointer display-marcellus text-white-300 border border-white-300/40 rounded-2xl px-6 py-3 hover:border-gold hover:text-gold transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={saving}
          className="cursor-pointer border-2 border-white bg-gold px-8 py-3 text-white rounded-2xl display-font drop-shadow-[0_5px_5px_rgba(255,176,1,0.4)] disabled:opacity-60 disabled:cursor-wait"
        >
          {saving ? "SALVANDO..." : isEditing ? "SALVAR ALTERAÇÕES" : "CADASTRAR EVENTO"}
        </button>
      </div>

      <ImagePreviewModal src={previewSrc} onClose={() => setPreviewSrc(null)} />
    </form>
  );
}
