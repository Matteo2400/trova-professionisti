import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import AdminShell from '@/components/admin/AdminShell';

export const dynamic = 'force-dynamic';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user || session.user.role !== 'admin') {
    redirect('/auth/login?callbackUrl=/admin');
  }

  return (
    <AdminShell
      user={{ name: session.user.name || session.user.email, email: session.user.email }}
    >
      {children}
    </AdminShell>
  );
}
