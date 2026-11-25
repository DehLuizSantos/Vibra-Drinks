"use client";

import { useEffect, useRef, useState } from "react";
import { ACCEPT_IMAGE_ATTR } from "@/lib/storage/imageRules";

export type UploadStatus = "uploading" | "done" | "error";

/** Estado de uma imagem no upload em cards (capa ou foto do carrossel). */
export type UploadItem = {
  key: string;
  url: string; // URL pública (preenchida quando o envio termina)
  preview?: string; // object URL local, exibida enquanto envia
  status: UploadStatus;
  progress: number;
  name?: string;
  error?: string;
};

/* ---------- Ícones (SVG inline) ---------- */

const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true
};

const EyeIcon = () => (
  <svg {...iconProps}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const TrashIcon = () => (
  <svg {...iconProps}>
    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6" />
  </svg>
);
const LeftIcon = () => (
  <svg {...iconProps}>
    <path d="m15 18-6-6 6-6" />
  </svg>
);
const RightIcon = () => (
  <svg {...iconProps}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);
const RetryIcon = () => (
  <svg {...iconProps}>
    <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8M21 3v5h-5M21 12a9 9 0 0 1-15.5 6.2L3 16M3 21v-5h5" />
  </svg>
);
const SwapIcon = () => (
  <svg {...iconProps}>
    <path d="M12 16V4M7 9l5-5 5 5M4 20h16" />
  </svg>
);
const ImageIcon = ({ size = 28 }: { size?: number }) => (
  <svg {...iconProps} width={size} height={size}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="9" cy="10" r="2" />
    <path d="m21 16-5-5-9 9" />
  </svg>
);
const PlusIcon = () => (
  <svg {...iconProps} width={22} height={22}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

/* ---------- Card de imagem ---------- */

type CardAction = { label: string; icon: React.ReactNode; onClick: () => void; hidden?: boolean };

type PictureCardProps = {
  item: UploadItem;
  className?: string;
  badge?: string;
  onPreview?: () => void;
  onRemove?: () => void;
  onRetry?: () => void;
  onReplace?: () => void;
  onMoveLeft?: () => void;
  onMoveRight?: () => void;
};

function ActionButton({ label, icon, onClick }: Omit<CardAction, "hidden">) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className="cursor-pointer p-1.5 rounded-md text-white-500 hover:text-gold hover:bg-white-500/10 transition-colors"
    >
      {icon}
    </button>
  );
}

export function PictureCard({
  item,
  className = "w-28 h-28 md:w-32 md:h-32",
  badge,
  onPreview,
  onRemove,
  onRetry,
  onReplace,
  onMoveLeft,
  onMoveRight
}: PictureCardProps) {
  const [broken, setBroken] = useState(false);
  const src = item.preview ?? item.url;

  // Erro: borda vermelha, ícone, nome do arquivo e ações de reenviar/remover
  if (item.status === "error") {
    return (
      <div
        className={`${className} relative shrink-0 rounded-xl border border-red-400 bg-black-300 p-2 flex flex-col items-center justify-center gap-1 text-red-400`}
        title={item.error}
      >
        <ImageIcon />
        <p className="display-marcellus text-xs w-full truncate text-center">{item.name ?? "imagem"}</p>
        <p className="display-marcellus text-[10px] leading-tight text-center line-clamp-2 text-red-300/80">
          {item.error}
        </p>
        <div className="flex gap-1">
          {onRetry && <ActionButton label="Tentar novamente" icon={<RetryIcon />} onClick={onRetry} />}
          {onRemove && <ActionButton label="Remover" icon={<TrashIcon />} onClick={onRemove} />}
        </div>
      </div>
    );
  }

  // Enviando: prévia esmaecida + barra de progresso dourada
  if (item.status === "uploading") {
    return (
      <div
        className={`${className} relative shrink-0 overflow-hidden rounded-xl border border-dashed border-white-300/30 bg-black-300`}
        aria-busy="true"
      >
        {src && (
          // eslint-disable-next-line @next/next/no-img-element -- prévia local (object URL)
          <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        )}
        <div className="relative flex h-full flex-col items-center justify-center gap-3 px-3">
          <span className="display-marcellus text-sm text-white-500">Enviando...</span>
          <div className="h-1 w-full rounded-full bg-white-300/20 overflow-hidden">
            <div
              className="h-full bg-gold transition-[width] duration-200"
              style={{ width: `${Math.max(item.progress, 4)}%` }}
            />
          </div>
          <span className="display-marcellus text-[10px] text-white-300/70">{item.progress}%</span>
        </div>
      </div>
    );
  }

  const actions: CardAction[] = [
    { label: "Mover para a esquerda", icon: <LeftIcon />, onClick: onMoveLeft!, hidden: !onMoveLeft },
    { label: "Visualizar", icon: <EyeIcon />, onClick: onPreview!, hidden: !onPreview || broken },
    { label: "Trocar imagem", icon: <SwapIcon />, onClick: onReplace!, hidden: !onReplace },
    { label: "Remover", icon: <TrashIcon />, onClick: onRemove!, hidden: !onRemove },
    { label: "Mover para a direita", icon: <RightIcon />, onClick: onMoveRight!, hidden: !onMoveRight }
  ];

  // Pronto: imagem + ações no hover (sempre visíveis em telas de toque)
  return (
    <div
      className={`${className} group relative shrink-0 overflow-hidden rounded-xl border border-white-300/20 bg-black-300 p-1.5 transition-colors hover:border-gold`}
    >
      {broken ? (
        <div className="flex h-full flex-col items-center justify-center gap-1 text-white-300/60">
          <ImageIcon />
          <span className="display-marcellus text-[10px]">Imagem indisponível</span>
        </div>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element -- imagem do R2 / URL cadastrada
        <img
          src={src}
          alt={item.name ?? ""}
          onError={() => setBroken(true)}
          className="h-full w-full rounded-lg object-cover"
        />
      )}

      {badge && (
        <span className="absolute left-2 top-2 rounded-full bg-black-500/80 px-2 py-0.5 display-marcellus text-[10px] text-gold">
          {badge}
        </span>
      )}

      <div className="absolute inset-1.5 flex flex-wrap items-center justify-center gap-0.5 rounded-lg bg-black-500/65 opacity-100 transition-opacity [@media(hover:hover)]:opacity-0 group-hover:opacity-100 focus-within:opacity-100">
        {actions
          .filter(a => !a.hidden)
          .map(a => (
            <ActionButton key={a.label} label={a.label} icon={a.icon} onClick={a.onClick} />
          ))}
      </div>
    </div>
  );
}

/* ---------- Botão de envio (clique ou arrastar e soltar) ---------- */

type UploadTriggerProps = {
  onFiles: (files: File[]) => void;
  multiple?: boolean;
  label?: string;
  hint?: string;
  className?: string;
};

export function UploadTrigger({
  onFiles,
  multiple = false,
  label = "Enviar",
  hint,
  className = "w-28 h-28 md:w-32 md:h-32"
}: UploadTriggerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const emit = (list: FileList | null) => {
    const files = Array.from(list ?? []);
    if (files.length) onFiles(multiple ? files : files.slice(0, 1));
  };

  return (
    <>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={e => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => {
          e.preventDefault();
          setDragging(false);
          emit(e.dataTransfer.files);
        }}
        className={`${className} cursor-pointer shrink-0 rounded-xl border border-dashed flex flex-col items-center justify-center gap-2 px-2 transition-colors ${
          dragging
            ? "border-gold bg-gold/10 text-gold"
            : "border-white-300/30 bg-black-300 text-white-300 hover:border-gold hover:text-gold"
        }`}
      >
        <PlusIcon />
        <span className="display-marcellus text-sm">{label}</span>
        {hint && <span className="display-marcellus text-[10px] text-white-300/60 text-center">{hint}</span>}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT_IMAGE_ATTR}
        multiple={multiple}
        className="hidden"
        onChange={e => {
          emit(e.target.files);
          e.target.value = ""; // permite escolher o mesmo arquivo de novo
        }}
      />
    </>
  );
}

/* ---------- Visualização ampliada ---------- */

export function ImagePreviewModal({ src, alt, onClose }: { src: string | null; alt?: string; onClose: () => void }) {
  useEffect(() => {
    if (!src) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [src, onClose]);

  if (!src) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Visualizar imagem"
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black-500/90 p-4"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="cursor-pointer absolute right-5 top-5 text-3xl leading-none text-white-500 hover:text-gold"
      >
        ×
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element -- visualização ampliada */}
      <img
        src={src}
        alt={alt ?? ""}
        onClick={e => e.stopPropagation()}
        className="max-h-[85vh] max-w-full rounded-xl border border-gold/40 object-contain"
      />
    </div>
  );
}
