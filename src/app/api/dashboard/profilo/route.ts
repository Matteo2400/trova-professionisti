import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const session = await auth();
  if (!session?.user || (session.user as any).role !== 'professional') {
    return NextResponse.json({ error: 'Non autorizzato' }, { status: 401 });
  }

  const professional = await prisma.professional.findFirst({
    where: { userId: session.user.id },
    include: {
      user: true,
      categories: { include: { category: true } },
    },
  });

  if (!professional) {
    return NextResponse.json({ error: 'Profilo non trovato' }, { status: 404 });
  }

  return NextResponse.json({
    id: professional.id,
    firstName: professional.user.firstName,
    lastName: professional.user.lastName,
    email: professional.user.email,
    phone: professional.user.phone,
    vatNumber: professional.vatNumber,
    description: professional.description,
    profileImage: professional.profileImage,
    gallery: JSON.parse(professional.gallery || '[]'),
    city: professional.city,
    province: professional.province,
    coverageAreas: JSON.parse(professional.coverageAreas || '[]'),
    coverageRadius: professional.coverageRadius,
    yearsExperience: professional.yearsExperience,
    priceRange: professional.priceRange,
    available: professional.available,
    plan: professional.plan,
    isVerified: professional.isVerified,
    categories: professional.categories.map((c) => c.category.slug),
  });
}

export async function PUT(request: NextRequest) {
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

  const body = await request.json();

  // Update user fields
  if (body.firstName || body.lastName || body.phone) {
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        ...(body.firstName && { firstName: body.firstName }),
        ...(body.lastName && { lastName: body.lastName }),
        ...(body.phone && { phone: body.phone }),
      },
    });
  }

  // Update professional fields
  const updateData: any = {};
  if (body.description !== undefined) updateData.description = body.description;
  if (body.city !== undefined) updateData.city = body.city;
  if (body.province !== undefined) updateData.province = body.province;
  if (body.coverageAreas !== undefined) updateData.coverageAreas = JSON.stringify(body.coverageAreas);
  if (body.coverageRadius !== undefined) updateData.coverageRadius = body.coverageRadius;
  if (body.yearsExperience !== undefined) updateData.yearsExperience = body.yearsExperience;
  if (body.priceRange !== undefined) updateData.priceRange = body.priceRange;
  if (body.available !== undefined) updateData.available = body.available;
  if (body.profileImage !== undefined) updateData.profileImage = body.profileImage;
  if (body.gallery !== undefined) updateData.gallery = JSON.stringify(body.gallery);

  if (Object.keys(updateData).length > 0) {
    await prisma.professional.update({
      where: { id: professional.id },
      data: updateData,
    });
  }

  return NextResponse.json({ success: true });
}
