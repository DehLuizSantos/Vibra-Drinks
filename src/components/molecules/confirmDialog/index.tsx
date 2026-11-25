"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  children?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

/** Modal de confirmação (ex.: exclusão). Esc ou clique fora cancelam — exceto durante o carregamento. */
export default function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  loading = false,
  danger = false,
  onConfirm,
  onCancel
}: ConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    cancelRef.current?.focus(); // foco no "Cancelar": evita confirmar sem querer com Enter
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) onCancel();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, loading, onCancel]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black-500/80 p-4 backdrop-blur-sm"
      onClick={() => !loading && onCancel()}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        onClick={e => e.stopPropagation()}
        className="vd-fade-in w-full max-w-md rounded-tl-[32px] rounded-br-[32px] rounded-tr-xl rounded-bl-xl p-6 md:p-8"
        style={{
          border: "2px solid transparent",
          background:
            "linear-gradient(#191919, #191919) padding-box, linear-gradient(135deg, #996A01, #FFB001, #996A01) border-box"
        }}
      >
        <h2 id="confirm-dialog-title" className="display-font text-lg text-gold md:text-xl">
          {title}
        </h2>
        {children && <div className="display-marcellus mt-4 text-sm text-white-300">{children}</div>}

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="cursor-pointer display-marcellus rounded-2xl border border-white-300/40 px-6 py-3 text-white-300 transition-colors hover:border-gold hover:text-gold disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`cursor-pointer display-marcellus rounded-2xl px-6 py-3 transition-colors disabled:cursor-wait disabled:opacity-60 ${
              danger
                ? "bg-red-500 text-white-500 hover:bg-red-400"
                : "bg-gold text-black-500 hover:bg-gold/90"
            }`}
          >
            {loading ? "Aguarde..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
