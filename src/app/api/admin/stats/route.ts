import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [
    totalUsers,
    totalProfessionals,
    pendingApprovals,
    totalRequests,
    newRequestsThisMonth,
    totalReviews,
    totalViews,
    proProfessionals,
    premiumProfessionals,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.professional.count(),
    prisma.professional.count({ where: { isApproved: false } }),
    prisma.quoteRequest.count(),
    prisma.quoteRequest.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.review.count(),
    prisma.profileView.count({ where: { viewedAt: { gte: thirtyDaysAgo } } }),
    prisma.professional.count({ where: { plan: 'pro' } }),
    prisma.professional.count({ where: { plan: 'premium' } }),
  ]);

  // Revenue estimate
  const monthlyRevenue = (proProfessionals * 19.90) + (premiumProfessionals * 39.90);

  // Monthly stats
  const monthlyStats = [];
  for (let i = 5; i >= 0; i--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
    const monthNames = ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic'];

    const [users, requests, views] = await Promise.all([
      prisma.user.count({
        where: { createdAt: { gte: monthStart, lte: monthEnd } },
      }),
      prisma.quoteRequest.count({
        where: { createdAt: { gte: monthStart, lte: monthEnd } },
      }),
      prisma.profileView.count({
        where: { viewedAt: { gte: monthStart, lte: monthEnd } },
      }),
    ]);

    monthlyStats.push({
      month: monthNames[monthStart.getMonth()],
      users,
      requests,
      views,
    });
  }

  return NextResponse.json({
    totalUsers,
    totalProfessionals,
    pendingApprovals,
    totalRequests,
    newRequestsThisMonth,
    totalReviews,
    totalViews,
    monthlyRevenue: Math.round(monthlyRevenue * 100) / 100,
    proProfessionals,
    premiumProfessionals,
    monthlyStats,
  });
}
