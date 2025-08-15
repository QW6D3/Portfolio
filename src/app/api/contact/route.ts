// src/app/api/contact/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";

const isDev = process.env.NODE_ENV !== "production";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function readBody(req: NextRequest) {
  const ct = (req.headers.get("content-type") || "").toLowerCase();

  if (ct.includes("application/json")) {
    try { return await req.json(); } catch {}
  }
  if (ct.includes("application/x-www-form-urlencoded")) {
    const text = await req.text();
    return Object.fromEntries(new URLSearchParams(text));
  }
  try {
    const text = await req.text();
    return JSON.parse(text);
  } catch {
    return {};
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await readBody(req);
    const { name, email, subject, message, website } = body || {};

    // Honeypot
    if (typeof website === "string" && website.trim().length > 0) {
      return Response.json({ ok: true });
    }

    // Validations
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return Response.json({ ok: false, error: "Champs requis manquants." }, { status: 400 });
    }
    if (!isValidEmail(email)) {
      return Response.json({ ok: false, error: "Email invalide." }, { status: 400 });
    }

    // Choix du transport
    let transporter;
    if (process.env.USE_ETHEREAL === "true") {
      const test = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: { user: test.user, pass: test.pass },
      });
    } else {
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === "true",
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
    }

    // Vérifie la connexion SMTP en dev
    try {
      await transporter.verify();
    } catch (e: any) {
      if (isDev) {
        return Response.json(
          { ok: false, stage: "verify", error: e?.message, code: e?.code, response: e?.response },
          { status: 500 }
        );
      }
      throw e;
    }

    // Envoi
    try {
      const info = await transporter.sendMail({
        from: `"Portfolio – Charlie" <${process.env.FROM_EMAIL || process.env.SMTP_USER}>`,
        replyTo: `"${name}" <${email}>`,
        to: process.env.TO_EMAIL,
        subject: subject?.trim() || "Nouveau message via le portfolio",
        text: `${message}\n\n—\nDe: ${name} <${email}>`,
        html: `
          <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;">
            <p>${String(message).replace(/\n/g, "<br/>")}</p>
            <hr/>
            <p><strong>De :</strong> ${name} &lt;${email}&gt;</p>
          </div>
        `,
      });

      const previewUrl =
        process.env.USE_ETHEREAL === "true" ? nodemailer.getTestMessageUrl(info) : undefined;

      return Response.json({ ok: true, id: info.messageId, previewUrl });
    } catch (e: any) {
      if (isDev) {
        return Response.json(
          { ok: false, stage: "send", error: e?.message, code: e?.code, response: e?.response },
          { status: 500 }
        );
      }
      throw e;
    }
  } catch (err) {
    console.error("[/api/contact] error:", err);
    return Response.json({ ok: false, error: "Erreur serveur lors de l’envoi." }, { status: 500 });
  }
}
