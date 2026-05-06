import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get('category');
  const city = searchParams.get('city');
  const minRating = searchParams.get('minRating');
  const sortBy = searchParams.get('sortBy') || 'relevance';
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '20');

  const where: any = {
    isApproved: true,
    isSuspended: false,
  };

  if (category) {
    where.categories = {
      some: {
        category: { slug: category },
      },
    };
  }

  if (city) {
    where.OR = [
      { city: { contains: city } },
      { coverageAreas: { contains: city } },
    ];
  }

  if (minRating) {
    const rating = parseFloat(minRating);
    if (!isNaN(rating)) {
      where.rating = { gte: rating };
    }
  }

  const orderBy: any[] = [];

  // Premium/Pro first
  orderBy.push({ plan: 'desc' });

  if (sortBy === 'rating') {
    orderBy.push({ rating: 'desc' });
  } else if (sortBy === 'relevance') {
    orderBy.push({ reviewCount: 'desc' });
  }

  const [results, total] = await Promise.all([
    prisma.professional.findMany({
      where,
      include: {
        user: {
          select: { firstName: true, lastName: true, phone: true, email: true },
        },
        categories: {
          include: { category: true },
        },
      },
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.professional.count({ where }),
  ]);

  // Transform to match frontend expected format
  const transformed = results.map((p) => ({
    id: p.id,
    slug: p.slug,
    firstName: p.user.firstName,
    lastName: p.user.lastName,
    email: p.user.email,
    phone: p.user.phone || '',
    vatNumber: p.vatNumber,
    category: p.categories[0]?.category.slug || '',
    categories: p.categories.map((c) => c.category.slug),
    description: p.description,
    profileImage: p.profileImage || '/images/professionals/placeholder.jpg',
    gallery: JSON.parse(p.gallery || '[]'),
    coverageAreas: JSON.parse(p.coverageAreas || '[]'),
    coverageRadius: p.coverageRadius,
    latitude: p.latitude || 0,
    longitude: p.longitude || 0,
    city: p.city,
    province: p.province,
    yearsExperience: p.yearsExperience,
    rating: p.rating,
    reviewCount: p.reviewCount,
    isVerified: p.isVerified,
    plan: p.plan,
    createdAt: p.createdAt.toISOString(),
    available: p.available,
    priceRange: p.priceRange,
  }));

  return NextResponse.json({
    results: transformed,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}
