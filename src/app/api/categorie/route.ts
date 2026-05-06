import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const categories = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
    include: {
      _count: {
        select: { professionals: true },
      },
    },
  });

  const result = categories.map((c) => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    namePlural: c.namePlural,
    icon: c.icon,
    color: c.color,
    description: c.description,
    professionalsCount: c._count.professionals,
  }));

  return NextResponse.json(result);
}
