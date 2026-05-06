import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import DashboardShell from '@/components/dashboard/DashboardShell';

export const dynamic = 'force-dynamic';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user || (session.user.role !== 'professional' && session.user.role !== 'admin')) {
    redirect('/auth/login?callbackUrl=/dashboard');
  }

  return (
    <DashboardShell
      user={{ name: session.user.name || session.user.email, email: session.user.email }}
    >
      {children}
    </DashboardShell>
  );
}
