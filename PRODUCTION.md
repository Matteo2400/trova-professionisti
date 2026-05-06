# Production Setup Checklist

## 1. Database — Postgres (Neon, Supabase, Railway, ecc.)

Lo schema attuale è compatibile sia con SQLite (dev) che con Postgres (prod) perché usa solo tipi primitivi e stringhe JSON serializzate. Per passare a Postgres:

1. Crea un DB su [Neon](https://neon.tech) (free tier sufficiente per partire)
2. Copia la connection string in `DATABASE_URL` (formato: `postgresql://user:pass@host/db?sslmode=require`)
3. Modifica `prisma/schema.prisma`:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
4. Esegui:
   ```bash
   npx prisma migrate dev --name init_postgres
   npm run db:seed
   ```

## 2. Stripe

1. Crea un account su [stripe.com](https://stripe.com)
2. Vai a **Products** → crea due prodotti:
   - **Pro** — €19,90 / mese ricorrente
   - **Premium** — €39,90 / mese ricorrente
3. Copia i price IDs in `.env`:
   - `STRIPE_PRICE_ID_PRO`
   - `STRIPE_PRICE_ID_PREMIUM`
4. Copia la secret key in `STRIPE_SECRET_KEY`
5. Crea webhook endpoint: **Developers → Webhooks → Add endpoint**
   - URL: `https://www.trovapro.it/api/stripe/webhook`
   - Eventi:
     - `checkout.session.completed`
     - `customer.subscription.created`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_failed`
   - Copia il signing secret in `STRIPE_WEBHOOK_SECRET`
6. Configura il **Customer Portal**: Stripe Dashboard → Settings → Customer portal → Activate, abilita upgrade/downgrade tra Pro e Premium.

## 3. Email — Resend

1. Crea account su [resend.com](https://resend.com)
2. Aggiungi e verifica il tuo dominio (DNS DKIM/SPF)
3. Copia la API key in `RESEND_API_KEY`
4. Imposta `EMAIL_FROM="TrovaPro <noreply@trovapro.it>"`

## 4. Storage — Vercel Blob

Quando deployi su Vercel:
1. **Storage** tab → Create → Blob
2. Aggiungi al progetto, Vercel inserisce automaticamente `BLOB_READ_WRITE_TOKEN` nelle env vars

## 5. Cron jobs

Crea `vercel.json` (già configurato) per chiamare `/api/cron/sync-plans` ogni notte. Imposta `CRON_SECRET` con un valore casuale (es. `openssl rand -hex 32`).

## 6. Secrets in Vercel

Vai su **Settings → Environment Variables** e aggiungi tutte le chiavi del file `.env.example` con i valori reali. Marca come "Production" (e "Preview" se serve).

## 7. NEXTAUTH_URL

In produzione: `NEXTAUTH_URL=https://www.trovapro.it`. Genera un nuovo `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```
