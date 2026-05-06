'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard, Inbox, BarChart3, User, Crown,
  Zap, LogOut, Menu, X, Bell, Star,
} from 'lucide-react';
import { useEffect, useState } from 'react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/richieste', label: 'Richieste', icon: Inbox },
  { href: '/dashboard/statistiche', label: 'Statistiche', icon: BarChart3 },
  { href: '/dashboard/recensioni', label: 'Recensioni', icon: Star },
  { href: '/dashboard/profilo', label: 'Profilo', icon: User },
  { href: '/dashboard/visibilita', label: 'Visibilita', icon: Crown },
];

interface Props {
  user: { name: string; email: string };
  children: React.ReactNode;
}

export default function DashboardShell({ user, children }: Props) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/dashboard/notifiche')
      .then((r) => (r.ok ? r.json() : { unreadCount: 0 }))
      .then((data) => {
        if (!cancelled) setUnreadCount(data.unreadCount || 0);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  const initials = user.name?.split(' ').map((n) => n[0]).join('') || '?';

  return (
    <div className="min-h-screen bg-surface">
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-text">
            Trova<span className="text-primary">Pro</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <div className="relative">
              <Bell className="w-5 h-5 text-text-secondary" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
            aria-label={sidebarOpen ? 'Chiudi menu' : 'Apri menu'}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-100 z-40 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-text">
              Trova<span className="text-primary">Pro</span>
            </span>
          </Link>

          <div className="flex items-center gap-3 mb-8 p-3 bg-surface rounded-xl">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-text text-sm truncate">{user.name}</p>
              <p className="text-xs text-text-secondary truncate">{user.email}</p>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'text-text-secondary hover:bg-surface hover:text-primary'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={() => signOut({ callbackUrl: '/auth/login' })}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-text-secondary hover:bg-red-50 hover:text-red-600 transition-all w-full"
          >
            <LogOut className="w-5 h-5" />
            Esci
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
