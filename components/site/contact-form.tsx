"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { pill } from "./ui";

const REASONS = ["Patrocinio", "Quiero jugar", "Amistoso", "Otro"] as const;

/**
 * Formulario sin backend (la web es estática): abre el cliente de correo con
 * el mensaje ya redactado. Si más adelante se quiere envío directo, se puede
 * conectar a Formspree / Resend sin cambiar la UI.
 */
export function ContactForm({ email, defaultReason = "Patrocinio" }: { email: string; defaultReason?: (typeof REASONS)[number] }) {
  const [reason, setReason] = useState<(typeof REASONS)[number]>(defaultReason);
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const company = String(data.get("company") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = `[${reason}] ${company || name}`;
    const body = `${message}\n\n—\n${name}${company ? ` · ${company}` : ""}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  const field = "w-full h-14 px-5 rounded-2xl bg-ink border border-line text-white placeholder:text-white/35 focus:border-vice-pink outline-none";

  return (
    <form onSubmit={onSubmit} className="card p-6 md:p-10 space-y-5">
      <fieldset>
        <legend className="eyebrow mb-3">Motivo</legend>
        <div className="flex flex-wrap gap-2">
          {REASONS.map(r => (
            <button
              key={r}
              type="button"
              aria-pressed={reason === r}
              onClick={() => setReason(r)}
              className={cn(
                "h-10 px-4 rounded-full text-sm font-bold border transition-colors",
                reason === r ? "bg-white text-ink border-white" : "border-white/15 text-white/70 hover:text-white hover:border-white/40"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="block text-sm font-bold mb-2">Tu nombre</span>
          <input name="name" required autoComplete="name" className={field} placeholder="Nombre y apellidos" />
        </label>
        <label className="block">
          <span className="block text-sm font-bold mb-2">
            Empresa <span className="font-normal text-white/45">(opcional)</span>
          </span>
          <input name="company" autoComplete="organization" className={field} placeholder="Nombre de tu marca" />
        </label>
      </div>

      <label className="block">
        <span className="block text-sm font-bold mb-2">Mensaje</span>
        <textarea
          name="message"
          required
          rows={5}
          className={cn(field, "h-auto py-4 resize-y")}
          placeholder={reason === "Patrocinio" ? "Cuéntanos qué te interesa: camiseta, redes, un evento…" : "Escríbenos lo que necesites"}
        />
      </label>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
        <button type="submit" className={pill({ size: "lg" })}>Preparar correo</button>
        <p className="text-sm text-white/50" aria-live="polite">
          {sent ? "Se ha abierto tu aplicación de correo con el mensaje listo." : `Se abrirá tu correo con el mensaje para ${email}.`}
        </p>
      </div>
    </form>
  );
}
