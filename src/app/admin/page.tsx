'use client';

import { useEffect, useState } from 'react';
import {
  Users, MessageSquare, Star, Eye, Euro, TrendingUp,
  AlertCircle, Crown, ArrowUpRight
} from 'lucide-react';

interface AdminStats {
  totalUsers: number;
  totalProfessionals: number;
  pendingApprovals: number;
  totalRequests: number;
  newRequestsThisMonth: number;
  totalReviews: number;
  totalViews: number;
  monthlyRevenue: number;
  proProfessionals: number;
  premiumProfessionals: number;
  monthlyStats: { month: string; users: number; requests: number; views: number }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const statCards = [
    { label: 'Utenti totali', value: stats.totalUsers, icon: Users, color: 'text-blue-400 bg-blue-400/10' },
    { label: 'Professionisti', value: stats.totalProfessionals, icon: Users, color: 'text-green-400 bg-green-400/10' },
    { label: 'In attesa approvazione', value: stats.pendingApprovals, icon: AlertCircle, color: 'text-amber-400 bg-amber-400/10', highlight: stats.pendingApprovals > 0 },
    { label: 'Richieste preventivo', value: stats.totalRequests, icon: MessageSquare, color: 'text-purple-400 bg-purple-400/10' },
    { label: 'Nuove questo mese', value: stats.newRequestsThisMonth, icon: TrendingUp, color: 'text-cyan-400 bg-cyan-400/10' },
    { label: 'Recensioni totali', value: stats.totalReviews, icon: Star, color: 'text-yellow-400 bg-yellow-400/10' },
    { label: 'Visite profili (30gg)', value: stats.totalViews, icon: Eye, color: 'text-indigo-400 bg-indigo-400/10' },
    { label: 'Fatturato mensile', value: `€${stats.monthlyRevenue.toFixed(2)}`, icon: Euro, color: 'text-emerald-400 bg-emerald-400/10' },
  ];

  const maxViews = Math.max(...stats.monthlyStats.map((s) => s.views), 1);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard Amministratore</h1>
        <p className="text-zinc-500 text-sm mt-1">Panoramica completa della piattaforma TrovaPro.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={i}
              className={`bg-zinc-900 rounded-2xl border ${
                stat.highlight ? 'border-amber-500/50' : 'border-zinc-800'
              } p-5 hover:border-zinc-700 transition-colors`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                {stat.highlight && (
                  <span className="text-xs font-medium text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">
                    Azione richiesta
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue breakdown */}
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
          <h2 className="font-semibold text-white mb-4">Abbonamenti attivi</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Piano Pro</p>
                  <p className="text-zinc-500 text-xs">€19,90/mese</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-bold">{stats.proProfessionals}</p>
                <p className="text-zinc-500 text-xs">
                  €{(stats.proProfessionals * 19.90).toFixed(2)}/mese
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-zinc-800/50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Piano Premium</p>
                  <p className="text-zinc-500 text-xs">€39,90/mese</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-bold">{stats.premiumProfessionals}</p>
                <p className="text-zinc-500 text-xs">
                  €{(stats.premiumProfessionals * 39.90).toFixed(2)}/mese
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly chart */}
        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6">
          <h2 className="font-semibold text-white mb-4">Visite profili (ultimi 6 mesi)</h2>
          <div className="flex items-end gap-3 h-40">
            {stats.monthlyStats.map((s, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-zinc-500">{s.views}</span>
                <div
                  className="w-full bg-red-600/80 rounded-t transition-all hover:bg-red-500"
                  style={{ height: `${(s.views / maxViews) * 100}%`, minHeight: '4px' }}
                />
                <span className="text-xs text-zinc-500">{s.month}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.pendingApprovals > 0 && (
          <a
            href="/admin/professionisti?status=pending"
            className="flex items-center justify-between p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl hover:bg-amber-500/20 transition-colors"
          >
            <div>
              <p className="text-amber-400 font-semibold">{stats.pendingApprovals} da approvare</p>
              <p className="text-amber-400/60 text-xs">Professionisti in attesa</p>
            </div>
            <ArrowUpRight className="w-5 h-5 text-amber-400" />
          </a>
        )}
        <a
          href="/admin/richieste"
          className="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors"
        >
          <div>
            <p className="text-white font-semibold">Richieste preventivo</p>
            <p className="text-zinc-500 text-xs">Gestisci tutte le richieste</p>
          </div>
          <ArrowUpRight className="w-5 h-5 text-zinc-500" />
        </a>
        <a
          href="/admin/categorie"
          className="flex items-center justify-between p-4 bg-zinc-900 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors"
        >
          <div>
            <p className="text-white font-semibold">Categorie</p>
            <p className="text-zinc-500 text-xs">Aggiungi nuove categorie</p>
          </div>
          <ArrowUpRight className="w-5 h-5 text-zinc-500" />
        </a>
      </div>
    </div>
  );
}
