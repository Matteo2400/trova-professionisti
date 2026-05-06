import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== 'professional') {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  const professional = await prisma.professional.findFirst({
    where: { userId: session.user.id },
  });

  if (!professional) {
    return NextResponse.json({ error: 'Profilo non trovato' }, { status: 404 });
  }

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sixtyDaysAgo = new Date(now.getTime() - 60 * 24 * 60 * 60 * 1000);

  // Profile views last 30 days
  const [
    viewsThisMonth,
    viewsLastMonth,
    requestsThisMonth,
    requestsLastMonth,
    totalRequests,
    completedRequests,
  ] = await Promise.all([
    prisma.profileView.count({
      where: { professionalId: professional.id, viewedAt: { gte: thirtyDaysAgo } },
    }),
    prisma.profileView.count({
      where: {
        professionalId: professional.id,
        viewedAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo },
      },
    }),
    prisma.quoteRequest.count({
      where: { professionalId: professional.id, createdAt: { gte: thirtyDaysAgo } },
    }),
    prisma.quoteRequest.count({
      where: {
        professionalId: professional.id,
        createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo },
      },
    }),
    prisma.quoteRequest.count({
      where: { professionalId: professional.id },
    }),
    prisma.quoteRequest.count({
      where: { professionalId: professional.id, status: 'completata' },
    }),
  ]);

  const viewsChange = viewsLastMonth > 0
    ? Math.round(((viewsThisMonth - viewsLastMonth) / viewsLastMonth) * 100)
    : 0;

  const requestsChange = requestsThisMonth - requestsLastMonth;
  const responseRate = totalRequests > 0
    ? Math.round((completedRequests / totalRequests) * 100)
    : 0;

  // Monthly stats for chart (last 6 months)
  const monthlyStats = [];
  for (let i = 5; i >= 0; i--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
    const monthNames = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];

    const [views, requests] = await Promise.all([
      prisma.profileView.count({
        where: {
          professionalId: professional.id,
          viewedAt: { gte: monthStart, lte: monthEnd },
        },
      }),
      prisma.quoteRequest.count({
        where: {
          professionalId: professional.id,
          createdAt: { gte: monthStart, lte: monthEnd },
        },
      }),
    ]);

    monthlyStats.push({
      month: monthNames[monthStart.getMonth()],
      views,
      requests,
    });
  }

  return NextResponse.json({
    profileViews: viewsThisMonth,
    viewsChange: `${viewsChange >= 0 ? '+' : ''}${viewsChange}%`,
    requestsReceived: requestsThisMonth,
    requestsChange: `${requestsChange >= 0 ? '+' : ''}${requestsChange}`,
    responseRate,
    avgRating: professional.rating,
    reviewCount: professional.reviewCount,
    plan: professional.plan,
    monthlyStats,
  });
}
