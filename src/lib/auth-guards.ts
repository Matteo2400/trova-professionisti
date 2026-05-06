import { NextResponse } from 'next/server';
import { auth } from './auth';
import type { Session } from 'next-auth';
import type { UserRole } from '@/types/next-auth';

export type AuthorizedSession = Session & {
  user: NonNullable<Session['user']>;
};

export async function requireSession(): Promise<AuthorizedSession | NextResponse> {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Non autenticato' }, { status: 401 });
  }
  return session as AuthorizedSession;
}

export async function requireRole(role: UserRole | UserRole[]) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: 'Non autenticato' }, { status: 401 });
  }
  const allowed = Array.isArray(role) ? role : [role];
  if (!allowed.includes(session.user.role)) {
    return NextResponse.json({ error: 'Permessi insufficienti' }, { status: 403 });
  }
  return session as AuthorizedSession;
}

export async function requireProfessional() {
  return requireRole('professional');
}

export async function requireAdmin() {
  return requireRole('admin');
}

export function isUnauthorized<T>(value: T | NextResponse): value is NextResponse {
  return value instanceof NextResponse;
}
