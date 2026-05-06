import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import VisibilitaClient from './VisibilitaClient';

export const dynamic = 'force-dynamic';

interface PageProps {
  searchParams: Promise<{ status?: string }>;
}

export default async function VisibilitaPage({ searchParams }: PageProps) {
  const session = await auth();
  if (!session?.user || session.user.role !== 'professional') {
    redirect('/auth/login');
  }

  const { status } = await searchParams;

  const professional = await prisma.professional.findUnique({
    where: { userId: session.user.id },
    include: {
      subscriptions: {
        orderBy: { createdAt: 'desc' },
        take: 1,
      },
    },
  });

  if (!professional) {
    redirect('/dashboard/profilo');
  }

  const activeSub = professional.subscriptions.find((s) =>
    ['active', 'trialing', 'past_due'].includes(s.status),
  );

  return (
    <VisibilitaClient
      currentPlan={professional.plan}
      planExpiresAt={professional.planExpiresAt?.toISOString() ?? null}
      hasStripeCustomer={Boolean(professional.stripeCustomerId)}
      activeSubscription={
        activeSub
          ? {
              status: activeSub.status,
              plan: activeSub.plan,
              currentPeriodEnd: activeSub.currentPeriodEnd.toISOString(),
              cancelAtPeriodEnd: activeSub.cancelAtPeriodEnd,
            }
          : null
      }
      checkoutStatus={status}
    />
  );
}
