'use client';

import { useEffect, useState } from 'react';
import { Eye, Inbox, TrendingUp, Star } from 'lucide-react';

export default function StatistichePage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/dashboard/stats')
      .then((r) => r.json())
      .then(setData)
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

  const maxValue = Math.max(...(data.monthlyStats || []).map((s: any) => Math.max(s.views, s.requests * 10)), 1);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text">Statistiche</h1>
        <p className="text-text-secondary text-sm mt-1">Analisi delle performance del tuo profilo</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <Eye className="w-5 h-5 text-blue-600 mb-3" />
          <p className="text-2xl font-bold text-text">{data.profileViews}</p>
          <p className="text-xs text-text-secondary">Visite profilo (30gg)</p>
          <p className="text-xs text-success mt-1">{data.viewsChange}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <Inbox className="w-5 h-5 text-green-600 mb-3" />
          <p className="text-2xl font-bold text-text">{data.requestsReceived}</p>
          <p className="text-xs text-text-secondary">Richieste (30gg)</p>
          <p className="text-xs text-success mt-1">{data.requestsChange}</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <TrendingUp className="w-5 h-5 text-purple-600 mb-3" />
          <p className="text-2xl font-bold text-text">{data.responseRate}%</p>
          <p className="text-xs text-text-secondary">Tasso completamento</p>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <Star className="w-5 h-5 text-amber-500 mb-3" />
          <p className="text-2xl font-bold text-text">{data.avgRating}</p>
          <p className="text-xs text-text-secondary">Rating medio</p>
          <p className="text-xs text-text-secondary mt-1">{data.reviewCount} recensioni</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-semibold text-text mb-6">Andamento ultimi 6 mesi</h2>

        <div className="flex items-center gap-6 mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-sm" />
            <span className="text-xs text-text-secondary">Visite</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-sm" />
            <span className="text-xs text-text-secondary">Richieste</span>
          </div>
        </div>

        <div className="flex items-end gap-4 h-48">
          {(data.monthlyStats || []).map((s: any, i: number) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex gap-1 items-end" style={{ height: '160px' }}>
                <div
                  className="flex-1 bg-primary/80 rounded-t transition-all hover:bg-primary"
                  style={{ height: `${(s.views / maxValue) * 100}%`, minHeight: '4px' }}
                  title={`${s.views} visite`}
                />
                <div
                  className="flex-1 bg-green-500/80 rounded-t transition-all hover:bg-green-500"
                  style={{ height: `${((s.requests * 10) / maxValue) * 100}%`, minHeight: '4px' }}
                  title={`${s.requests} richieste`}
                />
              </div>
              <span className="text-xs text-text-secondary">{s.month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
