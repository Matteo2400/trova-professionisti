'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useState } from 'react';
import {
  LayoutDashboard, Users, FolderOpen, MessageSquare, Star,
  Settings, LogOut, Menu, X, Shield, ChevronRight,
} from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/professionisti', label: 'Professionisti', icon: Users },
  { href: '/admin/categorie', label: 'Categorie', icon: FolderOpen },
  { href: '/admin/richieste', label: 'Richieste', icon: MessageSquare },
  { href: '/admin/recensioni', label: 'Recensioni', icon: Star },
];

interface Props {
  user: { name: string; email: string };
  children: React.ReactNode;
}

export default function AdminShell({ user, children }: Props) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const initials = user.name?.split(' ').map((n) => n[0]).join('') || 'A';

  return (
    <div className="min-h-screen bg-zinc-950">
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-zinc-900 border-b border-zinc-800 px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <span className="text-lg font-bold text-white">
            Admin<span className="text-red-500">Panel</span>
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400"
          aria-label={sidebarOpen ? 'Chiudi menu' : 'Apri menu'}
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-zinc-900 border-r border-zinc-800 z-40 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <Link href="/admin" className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-white block leading-tight">
                Admin<span className="text-red-500">Panel</span>
              </span>
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest">TrovaPro</span>
            </div>
          </Link>

          <div className="flex items-center gap-3 mb-8 p-3 bg-zinc-800/50 rounded-xl border border-zinc-800">
            <div className="w-10 h-10 rounded-full bg-red-600/20 flex items-center justify-center text-red-400 font-bold text-sm">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-white text-sm truncate">{user.name}</p>
              <p className="text-xs text-zinc-500 truncate">Amministratore</p>
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
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                      : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4" />}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-6 left-6 right-6 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-zinc-500 hover:bg-zinc-800 hover:text-white transition-all"
          >
            <Settings className="w-5 h-5" />
            Vai al sito
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/auth/login' })}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-zinc-500 hover:bg-red-950 hover:text-red-400 transition-all w-full"
          >
            <LogOut className="w-5 h-5" />
            Esci
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
