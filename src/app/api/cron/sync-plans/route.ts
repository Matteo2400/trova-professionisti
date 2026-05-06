import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Periodic job: downgrade professionals whose paid plan expired
 * (safety net in case a Stripe webhook was missed).
 *
 * Trigger via Vercel Cron / external scheduler with header `Authorization: Bearer <CRON_SECRET>`.
 */
export async function GET(req: NextRequest) {
  const expected = process.env.CRON_SECRET;
  const auth = req.headers.get('authorization');
  if (!expected || auth !== `Bearer ${expected}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const now = new Date();

  const expired = await prisma.professional.findMany({
    where: {
      plan: { in: ['pro', 'premium'] },
      planExpiresAt: { lt: now },
    },
    select: { id: true, userId: true },
  });

  for (const pro of expired) {
    await prisma.professional.update({
      where: { id: pro.id },
      data: { plan: 'base', planExpiresAt: null },
    });
    await prisma.notification.create({
      data: {
        userId: pro.userId,
        type: 'subscription',
        title: 'Piano scaduto',
        message: 'Il tuo piano è scaduto. Riattivalo dalla dashboard per ripristinare i benefici.',
      },
    });
  }

  return NextResponse.json({ downgraded: expired.length });
}
