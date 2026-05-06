import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;
const FROM = process.env.EMAIL_FROM || 'TrovaPro <noreply@trovapro.it>';

const resend = apiKey ? new Resend(apiKey) : null;

export function isEmailConfigured(): boolean {
  return Boolean(apiKey);
}

interface EmailPayload {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

export async function sendEmail({ to, subject, html, text, replyTo }: EmailPayload) {
  if (!resend) {
    if (process.env.NODE_ENV !== 'production') {
      console.log('[email:dev] Would send:', { to, subject });
      return { id: 'dev-noop', dev: true };
    }
    throw new Error('Email service not configured (RESEND_API_KEY missing)');
  }

  const { data, error } = await resend.emails.send({
    from: FROM,
    to,
    subject,
    html,
    text,
    replyTo,
  });

  if (error) {
    console.error('Resend error:', error);
    throw new Error(error.message);
  }
  return data;
}

// ────────── Templates ──────────

const baseTemplate = (content: string, ctaUrl?: string, ctaText?: string) => `
<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8fafc;">
  <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
    <div style="background:#fff;border-radius:16px;padding:40px;border:1px solid #e2e8f0;">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:32px;">
        <div style="width:32px;height:32px;background:#2563EB;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;color:#fff;font-weight:bold;">⚡</div>
        <span style="font-size:20px;font-weight:bold;color:#0f172a;">Trova<span style="color:#2563EB;">Pro</span></span>
      </div>
      ${content}
      ${ctaUrl && ctaText ? `
        <div style="margin:32px 0;">
          <a href="${ctaUrl}" style="display:inline-block;background:#2563EB;color:#fff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:600;font-size:14px;">${ctaText}</a>
        </div>
      ` : ''}
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:32px 0;" />
      <p style="color:#64748b;font-size:12px;line-height:1.6;">
        Hai ricevuto questa email perché sei iscritto a TrovaPro. Se non sei stato tu, ignora questo messaggio.
        <br/>© ${new Date().getFullYear()} TrovaPro. Tutti i diritti riservati.
      </p>
    </div>
  </div>
</body>
</html>
`;

export interface QuoteRequestEmailData {
  proName: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  city: string;
  description: string;
  urgency: string;
  dashboardUrl: string;
}

export function quoteRequestEmail(data: QuoteRequestEmailData): { subject: string; html: string } {
  return {
    subject: `Nuova richiesta di preventivo da ${data.clientName}`,
    html: baseTemplate(
      `
      <h1 style="font-size:24px;font-weight:bold;color:#0f172a;margin:0 0 16px;">Hai una nuova richiesta!</h1>
      <p style="color:#475569;line-height:1.6;margin:0 0 24px;">Ciao ${data.proName},<br/>
      ${data.clientName} ti ha richiesto un preventivo. Ecco i dettagli:</p>
      <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
        <tr><td style="padding:8px 0;color:#64748b;font-size:14px;">Cliente:</td><td style="padding:8px 0;color:#0f172a;font-weight:500;">${data.clientName}</td></tr>
        <tr><td style="padding:8px 0;color:#64748b;font-size:14px;">Email:</td><td style="padding:8px 0;color:#0f172a;">${data.clientEmail}</td></tr>
        <tr><td style="padding:8px 0;color:#64748b;font-size:14px;">Telefono:</td><td style="padding:8px 0;color:#0f172a;">${data.clientPhone}</td></tr>
        <tr><td style="padding:8px 0;color:#64748b;font-size:14px;">Città:</td><td style="padding:8px 0;color:#0f172a;">${data.city}</td></tr>
        <tr><td style="padding:8px 0;color:#64748b;font-size:14px;">Urgenza:</td><td style="padding:8px 0;color:#0f172a;text-transform:capitalize;">${data.urgency}</td></tr>
      </table>
      <div style="background:#f8fafc;border-left:3px solid #2563EB;padding:16px;border-radius:8px;margin:16px 0;">
        <p style="color:#475569;line-height:1.6;margin:0;font-size:14px;">${escapeHtml(data.description)}</p>
      </div>
      `,
      data.dashboardUrl,
      'Vai alla Dashboard',
    ),
  };
}

export function passwordResetEmail(data: { name: string; resetUrl: string }): { subject: string; html: string } {
  return {
    subject: 'Reimposta la tua password TrovaPro',
    html: baseTemplate(
      `
      <h1 style="font-size:24px;font-weight:bold;color:#0f172a;margin:0 0 16px;">Reimposta la tua password</h1>
      <p style="color:#475569;line-height:1.6;margin:0 0 16px;">Ciao ${data.name},<br/>
      hai richiesto di reimpostare la password del tuo account TrovaPro. Clicca sul pulsante qui sotto per scegliere una nuova password.</p>
      <p style="color:#64748b;line-height:1.6;font-size:13px;margin:0;">Il link è valido per 1 ora. Se non hai richiesto tu il reset, ignora questa email.</p>
      `,
      data.resetUrl,
      'Reimposta password',
    ),
  };
}

export function emailVerificationEmail(data: { name: string; verifyUrl: string }): { subject: string; html: string } {
  return {
    subject: 'Conferma il tuo indirizzo email',
    html: baseTemplate(
      `
      <h1 style="font-size:24px;font-weight:bold;color:#0f172a;margin:0 0 16px;">Conferma il tuo indirizzo email</h1>
      <p style="color:#475569;line-height:1.6;margin:0 0 16px;">Ciao ${data.name},<br/>
      grazie per esserti registrato a TrovaPro! Conferma il tuo indirizzo email cliccando sul pulsante qui sotto.</p>
      `,
      data.verifyUrl,
      'Conferma email',
    ),
  };
}

export function accountApprovedEmail(data: { name: string; profileUrl: string }): { subject: string; html: string } {
  return {
    subject: 'Il tuo profilo è stato approvato!',
    html: baseTemplate(
      `
      <h1 style="font-size:24px;font-weight:bold;color:#0f172a;margin:0 0 16px;">Benvenuto su TrovaPro 🎉</h1>
      <p style="color:#475569;line-height:1.6;margin:0 0 16px;">Ciao ${data.name},<br/>
      ottime notizie: il tuo profilo è stato approvato dal nostro team. Da ora sei visibile ai clienti che cercano professionisti nella tua zona.</p>
      `,
      data.profileUrl,
      'Vedi il tuo profilo',
    ),
  };
}

export function newReviewEmail(data: { proName: string; rating: number; comment: string; authorName: string; dashboardUrl: string }): { subject: string; html: string } {
  return {
    subject: `Hai ricevuto una nuova recensione (${data.rating}/5)`,
    html: baseTemplate(
      `
      <h1 style="font-size:24px;font-weight:bold;color:#0f172a;margin:0 0 16px;">Nuova recensione!</h1>
      <p style="color:#475569;line-height:1.6;margin:0 0 16px;">Ciao ${data.proName},<br/>
      ${data.authorName} ha lasciato una recensione di ${data.rating} stelle sul tuo profilo:</p>
      <div style="background:#f8fafc;border-left:3px solid #F59E0B;padding:16px;border-radius:8px;margin:16px 0;">
        <p style="color:#475569;line-height:1.6;margin:0;font-style:italic;">"${escapeHtml(data.comment)}"</p>
      </div>
      `,
      data.dashboardUrl,
      'Rispondi alla recensione',
    ),
  };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
