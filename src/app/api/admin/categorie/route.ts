import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: 'asc' },
    include: {
      _count: { select: { professionals: true } },
    },
  });

  return NextResponse.json(categories.map((c) => ({
    ...c,
    professionalsCount: c._count.professionals,
  })));
}

export async function POST(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  const body = await request.json();
  const { name, namePlural, slug, icon, color, description } = body;

  if (!name || !namePlural || !slug || !icon || !color || !description) {
    return NextResponse.json({ error: 'Tutti i campi sono obbligatori' }, { status: 400 });
  }

  const existing = await prisma.category.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json({ error: 'Slug già esistente' }, { status: 409 });
  }

  const maxOrder = await prisma.category.findFirst({ orderBy: { sortOrder: 'desc' } });

  const category = await prisma.category.create({
    data: {
      name,
      namePlural,
      slug,
      icon,
      color,
      description,
      sortOrder: (maxOrder?.sortOrder || 0) + 1,
    },
  });

  return NextResponse.json(category, { status: 201 });
}

export async function PATCH(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  const body = await request.json();
  const { id, ...data } = body;

  if (!id) {
    return NextResponse.json({ error: 'ID richiesto' }, { status: 400 });
  }

  const category = await prisma.category.update({
    where: { id },
    data,
  });

  return NextResponse.json(category);
}

export async function DELETE(request: NextRequest) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  const { searchParams } = request.nextUrl;
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'ID richiesto' }, { status: 400 });
  }

  // Check if category has professionals
  const count = await prisma.professionalCategory.count({
    where: { categoryId: id },
  });

  if (count > 0) {
    return NextResponse.json(
      { error: `Impossibile eliminare: ${count} professionisti usano questa categoria` },
      { status: 409 }
    );
  }

  await prisma.category.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
