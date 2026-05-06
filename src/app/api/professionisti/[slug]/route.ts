import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const professional = await prisma.professional.findUnique({
    where: { slug },
    include: {
      user: {
        select: { firstName: true, lastName: true, phone: true, email: true },
      },
      categories: {
        include: { category: true },
      },
      reviews: {
        where: { isApproved: true },
        orderBy: { createdAt: 'desc' },
        take: 20,
      },
    },
  });

  if (!professional) {
    return NextResponse.json({ error: 'Professionista non trovato' }, { status: 404 });
  }

  // Track profile view
  await prisma.profileView.create({
    data: {
      professionalId: professional.id,
      source: 'direct',
    },
  });

  const transformed = {
    id: professional.id,
    slug: professional.slug,
    firstName: professional.user.firstName,
    lastName: professional.user.lastName,
    email: professional.user.email,
    phone: professional.user.phone || '',
    vatNumber: professional.vatNumber,
    category: professional.categories[0]?.category.slug || '',
    categories: professional.categories.map((c) => c.category.slug),
    description: professional.description,
    profileImage: professional.profileImage || '/images/professionals/placeholder.jpg',
    gallery: JSON.parse(professional.gallery || '[]'),
    coverageAreas: JSON.parse(professional.coverageAreas || '[]'),
    coverageRadius: professional.coverageRadius,
    latitude: professional.latitude || 0,
    longitude: professional.longitude || 0,
    city: professional.city,
    province: professional.province,
    yearsExperience: professional.yearsExperience,
    rating: professional.rating,
    reviewCount: professional.reviewCount,
    isVerified: professional.isVerified,
    plan: professional.plan,
    createdAt: professional.createdAt.toISOString(),
    available: professional.available,
    priceRange: professional.priceRange,
    reviews: professional.reviews.map((r) => ({
      id: r.id,
      professionalId: r.professionalId,
      authorName: r.authorName,
      rating: r.rating,
      comment: r.comment,
      date: r.createdAt.toISOString().split('T')[0],
      verified: r.verified,
      response: r.response,
      respondedAt: r.respondedAt?.toISOString(),
    })),
  };

  return NextResponse.json(transformed);
}
