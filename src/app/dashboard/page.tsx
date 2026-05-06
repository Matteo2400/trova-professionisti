'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Eye, Inbox, TrendingUp, Star, ArrowUpRight,
  Clock, CheckCircle, AlertCircle
} from 'lucide-react';

interface DashboardData {
  profileViews: number;
  viewsChange: string;
  requestsReceived: number;
  requestsChange: string;
  responseRate: number;
  avgRating: number;
  plan: string;
}

const statusConfig = {
  nuova: { label: 'Nuova', icon: AlertCircle, class: 'bg-blue-100 text-blue-800' },
  in_lavorazione: { label: 'In lavorazione', icon: Clock, class: 'bg-amber-100 text-amber-800' },
  completata: { label: 'Completata', icon: CheckCircle, class: 'bg-green-100 text-green-800' },
  rifiutata: { label: 'Rifiutata', icon: AlertCircle, class: 'bg-red-100 text-red-800' },
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/dashboard/stats').then((r) => r.json()),
      fetch('/api/dashboard/richieste').then((r) => r.json()),
    ])
      .then(([statsData, requestsData]) => {
        setData(statsData);
        setRequests(Array.isArray(requestsData) ? requestsData.slice(0, 5) : []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const stats = [
    { label: 'Visualizzazioni profilo', value: data.profileViews.toLocaleString(), change: data.viewsChange, icon: Eye, color: 'bg-blue-50 text-blue-600' },
    { label: 'Richieste ricevute', value: String(data.requestsReceived), change: data.requestsChange, icon: Inbox, color: 'bg-green-50 text-green-600' },
    { label: 'Tasso di risposta', value: `${data.responseRate}%`, change: '', icon: TrendingUp, color: 'bg-purple-50 text-purple-600' },
    { label: 'Valutazione media', value: String(data.avgRating), change: '', icon: Star, color: 'bg-amber-50 text-amber-600' },
  ];

  const formatTimeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'Pochi minuti fa';
    if (hours < 24) return `${hours} ore fa`;
    const days = Math.floor(hours / 24);
    return `${days} giorni fa`;
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text">Dashboard</h1>
        <p className="text-text-secondary text-sm mt-1">Ecco un riepilogo della tua attivita.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-5 h-5" />
                </div>
                {stat.change && (
                  <span className="flex items-center gap-0.5 text-xs font-medium text-success">
                    <ArrowUpRight className="w-3 h-3" />
                    {stat.change}
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold text-text">{stat.value}</p>
              <p className="text-xs text-text-secondary mt-1">{stat.label}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Requests */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-50 flex items-center justify-between">
          <h2 className="font-semibold text-text">Ultime richieste</h2>
          <a href="/dashboard/richieste" className="text-sm text-primary hover:underline">
            Vedi tutte
          </a>
        </div>
        {requests.length === 0 ? (
          <div className="px-6 py-12 text-center text-text-secondary">
            Nessuna richiesta ancora. Il tuo profilo iniziera a ricevere richieste dai clienti.
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {requests.map((req: any) => {
              const status = statusConfig[req.status as keyof typeof statusConfig] || statusConfig.nuova;
              const StatusIcon = status.icon;
              return (
                <div key={req.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center font-semibold text-primary text-sm">
                      {req.firstName[0]}{req.lastName[0]}
                    </div>
                    <div>
                      <p className="font-medium text-text text-sm">{req.firstName} {req.lastName}</p>
                      <p className="text-xs text-text-secondary line-clamp-1">{req.description?.substring(0, 60)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${status.class}`}>
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </span>
                    <span className="text-xs text-text-secondary hidden sm:block">{formatTimeAgo(req.createdAt)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
