import { Prisma } from '@prisma/client';
import { prisma } from './prisma';
import type { Professional, Review } from '@/types';

type RawProfessional = Prisma.ProfessionalGetPayload<{
  include: {
    user: { select: { firstName: true; lastName: true; phone: true; email: true } };
    categories: { include: { category: true } };
  };
}>;

function transformProfessional(p: RawProfessional): Professional {
  return {
    id: p.id,
    slug: p.slug,
    firstName: p.user.firstName,
    lastName: p.user.lastName,
    email: p.user.email,
    phone: p.user.phone || '',
    vatNumber: p.vatNumber,
    category: (p.categories[0]?.category.slug || 'elettricista') as Professional['category'],
    categories: p.categories.map((c) => c.category.slug) as Professional['categories'],
    description: p.description,
    profileImage: p.profileImage || '/images/professionals/placeholder.jpg',
    gallery: safeJsonArray(p.gallery),
    coverageAreas: safeJsonArray(p.coverageAreas),
    coverageRadius: p.coverageRadius,
    latitude: p.latitude || 0,
    longitude: p.longitude || 0,
    city: p.city,
    province: p.province,
    yearsExperience: p.yearsExperience,
    rating: p.rating,
    reviewCount: p.reviewCount,
    isVerified: p.isVerified,
    plan: p.plan as Professional['plan'],
    createdAt: p.createdAt.toISOString(),
    available: p.available,
    priceRange: p.priceRange ?? undefined,
  };
}

function safeJsonArray(value: string | null | undefined): string[] {
  if (!value) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === 'string') : [];
  } catch {
    return [];
  }
}

export interface PublicSearchFilters {
  category?: string;
  province?: string;
  city?: string;
  minRating?: number;
  sortBy?: 'relevance' | 'rating';
  page?: number;
  pageSize?: number;
}

export async function getPublicProfessionals(filters: PublicSearchFilters = {}) {
  const {
    category,
    province,
    city,
    minRating,
    sortBy = 'relevance',
    page = 1,
    pageSize = 24,
  } = filters;

  const where: Prisma.ProfessionalWhereInput = {
    isApproved: true,
    isSuspended: false,
  };

  if (category) {
    where.categories = { some: { category: { slug: category } } };
  }
  const orFilters: Prisma.ProfessionalWhereInput[] = [];
  if (province) {
    orFilters.push({ province }, { coverageAreas: { contains: province } });
  }
  if (city) {
    orFilters.push(
      { city: { contains: city } },
      { coverageAreas: { contains: city } },
    );
  }
  if (orFilters.length) {
    where.OR = orFilters;
  }
  if (minRating && minRating > 0) {
    where.rating = { gte: minRating };
  }

  const orderBy: Prisma.ProfessionalOrderByWithRelationInput[] = [
    { plan: 'desc' },
    sortBy === 'rating' ? { rating: 'desc' } : { reviewCount: 'desc' },
    { createdAt: 'desc' },
  ];

  const [rows, total] = await Promise.all([
    prisma.professional.findMany({
      where,
      include: {
        user: { select: { firstName: true, lastName: true, phone: true, email: true } },
        categories: { include: { category: true } },
      },
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.professional.count({ where }),
  ]);

  return {
    results: rows.map(transformProfessional),
    total,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(total / pageSize)),
  };
}

export async function getPublicProfessionalBySlug(slug: string, opts: { trackView?: boolean; viewSource?: string } = {}) {
  const professional = await prisma.professional.findUnique({
    where: { slug },
    include: {
      user: { select: { firstName: true, lastName: true, phone: true, email: true } },
      categories: { include: { category: true } },
      reviews: {
        where: { isApproved: true },
        orderBy: { createdAt: 'desc' },
        take: 50,
      },
    },
  });

  if (!professional || !professional.isApproved || professional.isSuspended) {
    return null;
  }

  if (opts.trackView) {
    void prisma.profileView
      .create({
        data: {
          professionalId: professional.id,
          source: opts.viewSource || 'direct',
        },
      })
      .catch(() => {
        // best-effort tracking; ignore failures
      });
  }

  const transformed = transformProfessional(professional);
  const reviews: Review[] = professional.reviews.map((r) => ({
    id: r.id,
    professionalId: r.professionalId,
    authorName: r.authorName,
    rating: r.rating,
    comment: r.comment,
    date: r.createdAt.toISOString().split('T')[0],
    verified: r.verified,
  }));

  return { professional: transformed, reviews };
}

export async function getFeaturedProfessionals(limit = 3) {
  const rows = await prisma.professional.findMany({
    where: {
      isApproved: true,
      isSuspended: false,
      plan: { in: ['premium', 'pro'] },
    },
    include: {
      user: { select: { firstName: true, lastName: true, phone: true, email: true } },
      categories: { include: { category: true } },
    },
    orderBy: [
      { plan: 'desc' },
      { rating: 'desc' },
      { reviewCount: 'desc' },
    ],
    take: limit,
  });
  return rows.map(transformProfessional);
}

export async function getAvailableProfessionalsCount() {
  return prisma.professional.count({
    where: { isApproved: true, isSuspended: false, available: true },
  });
}

export async function getPublicCategories() {
  const rows = await prisma.category.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: 'asc' },
    include: {
      _count: {
        select: {
          professionals: {
            where: {
              professional: { isApproved: true, isSuspended: false },
            },
          },
        },
      },
      professionals: {
        where: { professional: { isApproved: true, isSuspended: false } },
        select: { professional: { select: { rating: true } } },
      },
    },
  });

  return rows.map((c) => {
    const ratings = c.professionals.map((pc) => pc.professional.rating).filter((r) => r > 0);
    const avgRating = ratings.length ? ratings.reduce((s, r) => s + r, 0) / ratings.length : 0;
    return {
      id: c.id,
      slug: c.slug,
      name: c.name,
      namePlural: c.namePlural,
      icon: c.icon,
      color: c.color,
      description: c.description,
      professionalsCount: c._count.professionals,
      avgRating: Math.round(avgRating * 10) / 10,
    };
  });
}

export type PublicCategory = Awaited<ReturnType<typeof getPublicCategories>>[number];
