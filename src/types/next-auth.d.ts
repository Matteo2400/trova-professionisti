import type { DefaultSession } from 'next-auth';

export type UserRole = 'client' | 'professional' | 'admin';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    name?: string | null;
    image?: string | null;
    role: UserRole;
    professionalId?: string | null;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      image?: string | null;
      role: UserRole;
      professionalId?: string | null;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: UserRole;
    professionalId?: string | null;
  }
}
