'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Search, CheckCircle, XCircle, Shield, Ban,
  ShieldCheck, ShieldOff, Star, Crown, Eye
} from 'lucide-react';

interface Professional {
  id: string;
  slug: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  vatNumber: string;
  city: string;
  categories: string[];
  plan: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  isApproved: boolean;
  isSuspended: boolean;
  requestsCount: number;
  createdAt: string;
}

const statusFilters = [
  { value: 'all', label: 'Tutti' },
  { value: 'pending', label: 'In attesa' },
  { value: 'approved', label: 'Approvati' },
  { value: 'suspended', label: 'Sospesi' },
];

export default function AdminProfessionisti() {
  const searchParams = useSearchParams();
  const initialStatus = searchParams.get('status') || 'all';

  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(initialStatus);
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0);

  const fetchProfessionals = () => {
    setLoading(true);
    const params = new URLSearchParams();
    params.set('status', filter);
    if (search) params.set('search', search);

    fetch(`/api/admin/professionisti?${params}`)
      .then((r) => r.json())
      .then((data) => {
        setProfessionals(data.professionals || []);
        setTotal(data.total || 0);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProfessionals();
  }, [filter]);

  const handleAction = async (professionalId: string, action: string) => {
    await fetch('/api/admin/professionisti', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ professionalId, action }),
    });
    fetchProfessionals();
  };

  const planBadge = (plan: string) => {
    switch (plan) {
      case 'premium': return <span className="px-2 py-0.5 text-xs font-medium bg-amber-500/10 text-amber-400 rounded-full">Premium</span>;
      case 'pro': return <span className="px-2 py-0.5 text-xs font-medium bg-blue-500/10 text-blue-400 rounded-full">Pro</span>;
      default: return <span className="px-2 py-0.5 text-xs font-medium bg-zinc-700 text-zinc-400 rounded-full">Base</span>;
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Professionisti</h1>
          <p className="text-zinc-500 text-sm mt-1">{total} professionisti registrati</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Cerca per nome, email, citta..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && fetchProfessionals()}
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600"
          />
        </div>
        <div className="flex gap-2">
          {statusFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                filter === f.value
                  ? 'bg-red-600 text-white'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : professionals.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-zinc-500">
            <p>Nessun professionista trovato</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-zinc-800">
                  <th className="text-left px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Professionista</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Categoria</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Citta</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Piano</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Rating</th>
                  <th className="text-left px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Stato</th>
                  <th className="text-right px-6 py-4 text-xs font-medium text-zinc-500 uppercase tracking-wider">Azioni</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {professionals.map((pro) => (
                  <tr key={pro.id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-white font-medium text-sm">{pro.firstName} {pro.lastName}</p>
                        <p className="text-zinc-500 text-xs">{pro.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-400 text-sm">{pro.categories.join(', ')}</td>
                    <td className="px-6 py-4 text-zinc-400 text-sm">{pro.city}</td>
                    <td className="px-6 py-4">{planBadge(pro.plan)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-white">{pro.rating}</span>
                        <span className="text-zinc-600">({pro.reviewCount})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {pro.isSuspended ? (
                        <span className="px-2.5 py-1 text-xs font-medium bg-red-500/10 text-red-400 rounded-full">Sospeso</span>
                      ) : pro.isApproved ? (
                        <span className="px-2.5 py-1 text-xs font-medium bg-green-500/10 text-green-400 rounded-full flex items-center gap-1 w-fit">
                          {pro.isVerified && <ShieldCheck className="w-3 h-3" />}
                          Attivo
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 text-xs font-medium bg-amber-500/10 text-amber-400 rounded-full">In attesa</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {!pro.isApproved && !pro.isSuspended && (
                          <>
                            <button
                              onClick={() => handleAction(pro.id, 'approve')}
                              className="p-2 rounded-lg hover:bg-green-500/10 text-green-400 transition-colors"
                              title="Approva"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleAction(pro.id, 'reject')}
                              className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors"
                              title="Rifiuta"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {pro.isApproved && !pro.isSuspended && (
                          <>
                            <button
                              onClick={() => handleAction(pro.id, pro.isVerified ? 'unverify' : 'verify')}
                              className="p-2 rounded-lg hover:bg-blue-500/10 text-blue-400 transition-colors"
                              title={pro.isVerified ? 'Rimuovi verifica' : 'Verifica'}
                            >
                              {pro.isVerified ? <ShieldOff className="w-4 h-4" /> : <Shield className="w-4 h-4" />}
                            </button>
                            <button
                              onClick={() => handleAction(pro.id, 'suspend')}
                              className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors"
                              title="Sospendi"
                            >
                              <Ban className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        {pro.isSuspended && (
                          <button
                            onClick={() => handleAction(pro.id, 'unsuspend')}
                            className="p-2 rounded-lg hover:bg-green-500/10 text-green-400 transition-colors"
                            title="Riattiva"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        <a
                          href={`/professionista/${pro.slug}`}
                          target="_blank"
                          className="p-2 rounded-lg hover:bg-zinc-700 text-zinc-400 transition-colors"
                          title="Vedi profilo"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
