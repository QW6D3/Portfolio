"use client";

import { useState, type FormEvent } from "react";
import BlurFade from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const BLUR_FADE_DELAY = 0.04;

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "", // honeypot
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | null; msg: string }>({
    type: null,
    msg: "",
  });
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // utile en dev si Ethereal

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    // petit check réseau pour un message plus clair
    if (typeof navigator !== "undefined" && !navigator.onLine) {
      setStatus({ type: "error", msg: "Tu es hors ligne. Reconnecte-toi puis réessaie." });
      return;
    }

    setLoading(true);
    setStatus({ type: null, msg: "" });
    setPreviewUrl(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) throw new Error(data?.error || "Échec de l’envoi.");

      setStatus({ type: "success", msg: "Message envoyé ✅ Je te réponds vite." });
      setPreviewUrl(data.previewUrl ?? null); // affiché seulement si fourni par l’API (Ethereal en dev)
      setForm({ name: "", email: "", subject: "", message: "", website: "" });
    } catch (err: any) {
      const msg =
        typeof err?.message === "string" && err.message.toLowerCase().includes("fetch")
          ? "Erreur réseau : vérifie ta connexion."
          : err?.message || "Une erreur est survenue.";
      setStatus({ type: "error", msg });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col min-h-[100dvh] space-y-6">
      <section id="contact-hero" className="w-full py-8">
        <div className="mx-auto w-full max-w-2xl space-y-6">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
              Contact
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 2}>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Travaillons ensemble</h1>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <p className="text-muted-foreground md:text-xl/relaxed">
              Une opportunité à Rennes ou à Nancy, une mission ou une question ? Écris-moi via ce formulaire.
            </p>
          </BlurFade>
        </div>
      </section>

      <section id="contact-form" className="w-full">
        <div className="mx-auto w-full max-w-2xl">
          <form onSubmit={onSubmit} className="grid gap-4">
            {/* Honeypot (anti-bot) */}
            <input
              type="text"
              name="website"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Nom
                </label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ton nom"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm
                             ring-offset-background placeholder:text-muted-foreground
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                             disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={loading}
                />
              </div>

              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="ton.email@exemple.com"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm
                             ring-offset-background placeholder:text-muted-foreground
                             focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                             disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Sujet
              </label>
              <input
                id="subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="Objet du message"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm
                           ring-offset-background placeholder:text-muted-foreground
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                           disabled:cursor-not-allowed disabled:opacity-50"
                disabled={loading}
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={6}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Dis-moi tout…"
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm
                           ring-offset-background placeholder:text-muted-foreground
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
                           disabled:cursor-not-allowed disabled:opacity-50"
                disabled={loading}
              />
            </div>

            <div className="flex items-center gap-3">
              <Button type="submit" disabled={loading}>
                {loading ? "Envoi..." : "Envoyer"}
              </Button>

              {status.type && (
                <Badge variant={status.type === "success" ? "default" : "destructive"}>
                  {status.msg}
                </Badge>
              )}
            </div>

            {/* Lien d'aperçu en dev si l’API renvoie previewUrl (Ethereal) */}
            {previewUrl && (
              <a
                href={previewUrl}
                target="_blank"
                rel="noreferrer"
                className="text-sm underline mt-1"
              >
                Voir l’aperçu de l’email (dev)
              </a>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
