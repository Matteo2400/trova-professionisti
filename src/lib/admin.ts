import { auth } from './auth';

/**
 * @deprecated Use requireAdmin / requireRole from '@/lib/auth-guards' instead.
 * Kept for backwards compatibility with existing admin API routes.
 */
export async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== 'admin') {
    return null;
  }
  return session;
}
