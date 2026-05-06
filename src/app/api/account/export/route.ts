import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * GDPR Art. 20 — Data portability.
 * Returns a JSON dump of all personal data linked to the authenticated user.
 */
export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Non autenticato' }, { status: 401 });
  }

  const userId = session.user.id;

  const [user, professional, reviews, quotes, notifications] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true, email: true, firstName: true, lastName: true, phone: true,
        role: true, emailVerified: true, createdAt: true,
      },
    }),
    prisma.professional.findUnique({
      where: { userId },
      include: {
        categories: { include: { category: { select: { slug: true, name: true } } } },
        subscriptions: true,
      },
    }),
    prisma.review.findMany({ where: { authorId: userId } }),
    prisma.quoteRequest.findMany({ where: { clientId: userId } }),
    prisma.notification.findMany({ where: { userId } }),
  ]);

  const payload = {
    exportedAt: new Date().toISOString(),
    user,
    professional,
    reviewsAuthored: reviews,
    quoteRequests: quotes,
    notifications,
  };

  return new NextResponse(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: {
      'content-type': 'application/json',
      'content-disposition': `attachment; filename="trovapro-data-export-${userId}.json"`,
    },
  });
}
