'use client';

import { useEffect, useState } from 'react';
import { Clock, CheckCircle, AlertCircle, XCircle, Phone, Mail, MapPin } from 'lucide-react';

interface QuoteReq {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  category: string;
  description: string;
  urgency: string;
  status: string;
  professionalName: string;
  createdAt: string;
}

const statusConfig: Record<string, { label: string; icon: any; class: string }> = {
  nuova: { label: 'Nuova', icon: AlertCircle, class: 'bg-blue-500/10 text-blue-400' },
  in_lavorazione: { label: 'In lavorazione', icon: Clock, class: 'bg-amber-500/10 text-amber-400' },
  completata: { label: 'Completata', icon: CheckCircle, class: 'bg-green-500/10 text-green-400' },
  rifiutata: { label: 'Rifiutata', icon: XCircle, class: 'bg-red-500/10 text-red-400' },
};

const statusFilters = [
  { value: 'all', label: 'Tutte' },
  { value: 'nuova', label: 'Nuove' },
  { value: 'in_lavorazione', label: 'In lavorazione' },
  { value: 'completata', label: 'Completate' },
  { value: 'rifiutata', label: 'Rifiutate' },
];

export default function AdminRichieste() {
  const [requests, setRequests] = useState<QuoteReq[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<QuoteReq | null>(null);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (filter !== 'all') params.set('status', filter);

    fetch(`/api/admin/richieste?${params}`)
      .then((r) => r.json())
      .then((data) => setRequests(data.requests || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [filter]);

  const urgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'alta': return <span className="px-2 py-0.5 text-xs font-medium bg-red-500/10 text-red-400 rounded-full">Urgente</span>;
      case 'media': return <span className="px-2 py-0.5 text-xs font-medium bg-amber-500/10 text-amber-400 rounded-full">Media</span>;
      default: return <span className="px-2 py-0.5 text-xs font-medium bg-zinc-700 text-zinc-400 rounded-full">Bassa</span>;
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Richieste Preventivo</h1>
        <p className="text-zinc-500 text-sm mt-1">Monitora tutte le richieste dei clienti</p>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto">
        {statusFilters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
              filter === f.value
                ? 'bg-red-600 text-white'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        {/* List */}
        <div className={`${selected ? 'hidden lg:block lg:w-1/2' : 'w-full'}`}>
          <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : requests.length === 0 ? (
              <div className="flex items-center justify-center h-64 text-zinc-500">
                Nessuna richiesta trovata
              </div>
            ) : (
              <div className="divide-y divide-zinc-800/50">
                {requests.map((req) => {
                  const status = statusConfig[req.status] || statusConfig.nuova;
                  const StatusIcon = status.icon;
                  return (
                    <div
                      key={req.id}
                      onClick={() => setSelected(req)}
                      className={`px-6 py-4 cursor-pointer hover:bg-zinc-800/30 transition-colors ${
                        selected?.id === req.id ? 'bg-zinc-800/50' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium text-sm">
                          {req.firstName} {req.lastName}
                        </span>
                        <div className="flex items-center gap-2">
                          {urgencyBadge(req.urgency)}
                          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${status.class}`}>
                            <StatusIcon className="w-3 h-3" />
                            {status.label}
                          </span>
                        </div>
                      </div>
                      <p className="text-zinc-500 text-xs line-clamp-1">{req.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-zinc-600 text-xs">Per: {req.professionalName}</span>
                        <span className="text-zinc-600 text-xs">
                          {new Date(req.createdAt).toLocaleDateString('it-IT')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Detail */}
        {selected && (
          <div className="w-full lg:w-1/2">
            <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white">Dettaglio richiesta</h3>
                <button
                  onClick={() => setSelected(null)}
                  className="lg:hidden p-2 rounded-lg hover:bg-zinc-800 text-zinc-400"
                >
                  Chiudi
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Cliente</p>
                  <p className="text-white font-medium">{selected.firstName} {selected.lastName}</p>
                </div>

                <div className="flex gap-4">
                  <a href={`mailto:${selected.email}`} className="flex items-center gap-2 text-sm text-blue-400 hover:underline">
                    <Mail className="w-4 h-4" />
                    {selected.email}
                  </a>
                  <a href={`tel:${selected.phone}`} className="flex items-center gap-2 text-sm text-blue-400 hover:underline">
                    <Phone className="w-4 h-4" />
                    {selected.phone}
                  </a>
                </div>

                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <MapPin className="w-4 h-4" />
                  {selected.address}, {selected.city}
                </div>

                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Descrizione</p>
                  <p className="text-zinc-300 text-sm leading-relaxed">{selected.description}</p>
                </div>

                <div>
                  <p className="text-zinc-500 text-xs uppercase tracking-wider mb-1">Professionista</p>
                  <p className="text-white font-medium">{selected.professionalName}</p>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
                  <div>
                    <p className="text-zinc-500 text-xs">Categoria</p>
                    <p className="text-white text-sm">{selected.category}</p>
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs">Urgenza</p>
                    {urgencyBadge(selected.urgency)}
                  </div>
                  <div>
                    <p className="text-zinc-500 text-xs">Data</p>
                    <p className="text-white text-sm">{new Date(selected.createdAt).toLocaleDateString('it-IT')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
