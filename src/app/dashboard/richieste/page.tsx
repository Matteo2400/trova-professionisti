'use client';

import { useEffect, useState } from 'react';
import {
  Clock, CheckCircle, AlertCircle, XCircle,
  Phone, Mail, MapPin, ChevronRight
} from 'lucide-react';

const statusConfig: Record<string, { label: string; icon: any; class: string }> = {
  nuova: { label: 'Nuova', icon: AlertCircle, class: 'bg-blue-100 text-blue-800' },
  in_lavorazione: { label: 'In lavorazione', icon: Clock, class: 'bg-amber-100 text-amber-800' },
  completata: { label: 'Completata', icon: CheckCircle, class: 'bg-green-100 text-green-800' },
  rifiutata: { label: 'Rifiutata', icon: XCircle, class: 'bg-red-100 text-red-800' },
};

const statusFilters = [
  { value: 'all', label: 'Tutte' },
  { value: 'nuova', label: 'Nuove' },
  { value: 'in_lavorazione', label: 'In corso' },
  { value: 'completata', label: 'Completate' },
];

export default function RichiestePage() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<any>(null);

  const fetchRequests = () => {
    setLoading(true);
    const params = filter !== 'all' ? `?status=${filter}` : '';
    fetch(`/api/dashboard/richieste${params}`)
      .then((r) => r.json())
      .then((data) => setRequests(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchRequests(); }, [filter]);

  const updateStatus = async (requestId: string, status: string) => {
    await fetch('/api/dashboard/richieste', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requestId, status }),
    });
    fetchRequests();
    if (selected?.id === requestId) {
      setSelected({ ...selected, status });
    }
  };

  const urgencyLabel = (u: string) => {
    switch (u) {
      case 'alta': return <span className="px-2 py-0.5 text-xs font-medium bg-red-100 text-red-700 rounded-full">Urgente</span>;
      case 'media': return <span className="px-2 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 rounded-full">Media</span>;
      default: return <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">Bassa</span>;
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text">Richieste</h1>
        <p className="text-text-secondary text-sm mt-1">Gestisci le richieste di preventivo ricevute</p>
      </div>

      <div className="flex gap-2 mb-6">
        {statusFilters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              filter === f.value
                ? 'bg-primary text-white'
                : 'bg-white text-text-secondary border border-gray-200 hover:border-gray-300'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex gap-6">
        {/* List */}
        <div className={`${selected ? 'hidden lg:block lg:w-1/2' : 'w-full'}`}>
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : requests.length === 0 ? (
              <div className="flex items-center justify-center h-64 text-text-secondary text-sm">
                Nessuna richiesta trovata
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {requests.map((req) => {
                  const status = statusConfig[req.status] || statusConfig.nuova;
                  const StatusIcon = status.icon;
                  return (
                    <div
                      key={req.id}
                      onClick={() => setSelected(req)}
                      className={`px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between ${
                        selected?.id === req.id ? 'bg-primary/5' : ''
                      }`}
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-surface flex-shrink-0 flex items-center justify-center font-semibold text-primary text-sm">
                          {req.firstName[0]}{req.lastName[0]}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-text text-sm">{req.firstName} {req.lastName}</p>
                          <p className="text-xs text-text-secondary truncate">{req.description?.substring(0, 50)}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        {urgencyLabel(req.urgency)}
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${status.class}`}>
                          <StatusIcon className="w-3 h-3" />
                          {status.label}
                        </span>
                        <ChevronRight className="w-4 h-4 text-text-secondary" />
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
            <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-text">Dettaglio richiesta</h3>
                <button onClick={() => setSelected(null)} className="text-sm text-text-secondary hover:text-text">
                  Chiudi
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">Cliente</p>
                  <p className="text-text font-semibold text-lg">{selected.firstName} {selected.lastName}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <a href={`tel:${selected.phone}`} className="flex items-center gap-2 text-sm text-primary hover:underline">
                    <Phone className="w-4 h-4" /> {selected.phone}
                  </a>
                  <a href={`mailto:${selected.email}`} className="flex items-center gap-2 text-sm text-primary hover:underline">
                    <Mail className="w-4 h-4" /> {selected.email}
                  </a>
                  <span className="flex items-center gap-2 text-sm text-text-secondary">
                    <MapPin className="w-4 h-4" /> {selected.address}, {selected.city}
                  </span>
                </div>

                <div>
                  <p className="text-text-secondary text-xs uppercase tracking-wider mb-1">Descrizione lavoro</p>
                  <p className="text-text text-sm leading-relaxed">{selected.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-text-secondary text-xs">Urgenza</p>
                    <div className="mt-1">{urgencyLabel(selected.urgency)}</div>
                  </div>
                  <div>
                    <p className="text-text-secondary text-xs">Data</p>
                    <p className="text-text text-sm mt-1">{new Date(selected.createdAt).toLocaleDateString('it-IT')}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-gray-100">
                  {selected.status === 'nuova' && (
                    <>
                      <button
                        onClick={() => updateStatus(selected.id, 'in_lavorazione')}
                        className="flex-1 px-4 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-light transition-colors"
                      >
                        Prendi in carico
                      </button>
                      <button
                        onClick={() => updateStatus(selected.id, 'rifiutata')}
                        className="px-4 py-2.5 bg-red-50 text-red-600 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors"
                      >
                        Rifiuta
                      </button>
                    </>
                  )}
                  {selected.status === 'in_lavorazione' && (
                    <button
                      onClick={() => updateStatus(selected.id, 'completata')}
                      className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors"
                    >
                      Segna come completata
                    </button>
                  )}
                  <a
                    href={`tel:${selected.phone}`}
                    className="px-4 py-2.5 bg-surface text-text rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" /> Chiama
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
