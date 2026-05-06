import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const status = searchParams.get('status');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');

  const where: any = {};
  if (status && status !== 'all') {
    where.status = status;
  }

  const [requests, total] = await Promise.all([
    prisma.quoteRequest.findMany({
      where,
      include: {
        professional: {
          include: {
            user: { select: { firstName: true, lastName: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.quoteRequest.count({ where }),
  ]);

  return NextResponse.json({
    requests: requests.map((r) => ({
      ...r,
      professionalName: `${r.professional.user.firstName} ${r.professional.user.lastName}`,
      createdAt: r.createdAt.toISOString(),
      updatedAt: r.updatedAt.toISOString(),
    })),
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}
