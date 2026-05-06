'use client';

import { useEffect, useState } from 'react';
import { Star, CheckCircle, XCircle, Trash2, Shield } from 'lucide-react';

interface ReviewItem {
  id: string;
  authorName: string;
  rating: number;
  comment: string;
  verified: boolean;
  isApproved: boolean;
  response: string | null;
  professionalName: string;
  createdAt: string;
}

export default function AdminRecensioni() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  const fetchReviews = () => {
    setLoading(true);
    fetch('/api/admin/recensioni')
      .then((r) => r.json())
      .then((data) => {
        setReviews(data.reviews || []);
        setTotal(data.total || 0);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchReviews(); }, []);

  const handleAction = async (reviewId: string, action: string) => {
    if (action === 'delete' && !confirm('Sei sicuro di voler eliminare questa recensione?')) return;

    await fetch('/api/admin/recensioni', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reviewId, action }),
    });
    fetchReviews();
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Recensioni</h1>
        <p className="text-zinc-500 text-sm mt-1">{total} recensioni totali</p>
      </div>

      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="divide-y divide-zinc-800/50">
            {reviews.map((review) => (
              <div key={review.id} className="px-6 py-5 hover:bg-zinc-800/30 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-white font-medium text-sm">{review.authorName}</span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-zinc-700'
                            }`}
                          />
                        ))}
                      </div>
                      {review.verified && (
                        <span className="text-xs text-green-400 flex items-center gap-1">
                          <Shield className="w-3 h-3" /> Verificata
                        </span>
                      )}
                      {!review.isApproved && (
                        <span className="px-2 py-0.5 text-xs bg-red-500/10 text-red-400 rounded-full">
                          Non approvata
                        </span>
                      )}
                    </div>

                    <p className="text-zinc-300 text-sm leading-relaxed mb-2">{review.comment}</p>

                    {review.response && (
                      <div className="ml-4 pl-4 border-l-2 border-zinc-800 mt-2">
                        <p className="text-zinc-500 text-xs mb-1">Risposta del professionista:</p>
                        <p className="text-zinc-400 text-sm">{review.response}</p>
                      </div>
                    )}

                    <div className="flex items-center gap-3 mt-3 text-xs text-zinc-600">
                      <span>Per: {review.professionalName}</span>
                      <span>{new Date(review.createdAt).toLocaleDateString('it-IT')}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {!review.isApproved ? (
                      <button
                        onClick={() => handleAction(review.id, 'approve')}
                        className="p-2 rounded-lg hover:bg-green-500/10 text-green-400 transition-colors"
                        title="Approva"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleAction(review.id, 'reject')}
                        className="p-2 rounded-lg hover:bg-amber-500/10 text-amber-400 transition-colors"
                        title="Nascondi"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    )}
                    {!review.verified && (
                      <button
                        onClick={() => handleAction(review.id, 'verify')}
                        className="p-2 rounded-lg hover:bg-blue-500/10 text-blue-400 transition-colors"
                        title="Verifica"
                      >
                        <Shield className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleAction(review.id, 'delete')}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors"
                      title="Elimina"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
