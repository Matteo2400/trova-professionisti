import Link from 'next/link';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { hashToken } from '@/lib/tokens';

interface PageProps {
  searchParams: Promise<{ token?: string }>;
}

export const dynamic = 'force-dynamic';

export default async function VerifyEmailPage({ searchParams }: PageProps) {
  const { token } = await searchParams;
  let status: 'success' | 'invalid' | 'expired' = 'invalid';

  if (token) {
    const tokenHash = hashToken(token);
    const record = await prisma.emailVerificationToken.findUnique({ where: { tokenHash } });
    if (record) {
      if (record.consumedAt) {
        status = 'success';
      } else if (record.expiresAt < new Date()) {
        status = 'expired';
      } else {
        await prisma.$transaction([
          prisma.user.update({ where: { id: record.userId }, data: { emailVerified: true } }),
          prisma.emailVerificationToken.update({
            where: { id: record.id },
            data: { consumedAt: new Date() },
          }),
        ]);
        status = 'success';
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface p-4">
      <div className="max-w-md text-center bg-white rounded-2xl p-8 border border-zinc-200">
        {status === 'success' ? (
          <>
            <CheckCircle className="w-12 h-12 text-success mx-auto mb-4" />
            <h1 className="text-xl font-bold mb-2">Email verificata!</h1>
            <p className="text-text-secondary text-sm mb-6">
              Grazie per aver confermato il tuo indirizzo email.
            </p>
            <Link href="/auth/login" className="btn-primary inline-block">
              Accedi
            </Link>
          </>
        ) : (
          <>
            <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h1 className="text-xl font-bold mb-2">
              {status === 'expired' ? 'Link scaduto' : 'Link non valido'}
            </h1>
            <p className="text-text-secondary text-sm mb-6">
              Richiedi un nuovo link di verifica dalla pagina del tuo profilo.
            </p>
            <Link href="/auth/login" className="text-primary hover:underline text-sm">
              Torna al login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
