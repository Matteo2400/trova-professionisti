'use client';

import { useEffect, useState } from 'react';
import { Star, MessageSquare, Send } from 'lucide-react';

export default function RecensioniPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const fetchReviews = () => {
    setLoading(true);
    fetch('/api/dashboard/recensioni')
      .then((r) => r.json())
      .then((data) => setReviews(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchReviews(); }, []);

  const submitReply = async (reviewId: string) => {
    if (!replyText.trim()) return;

    await fetch('/api/dashboard/recensioni', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reviewId, response: replyText }),
    });

    setReplyingTo(null);
    setReplyText('');
    fetchReviews();
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text">Recensioni</h1>
        <p className="text-text-secondary text-sm mt-1">Le recensioni dei tuoi clienti</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-text-secondary">
            <MessageSquare className="w-12 h-12 mb-3 opacity-30" />
            <p>Nessuna recensione ancora</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {reviews.map((review) => (
              <div key={review.id} className="px-6 py-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                        {review.authorName.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <span className="font-medium text-text text-sm">{review.authorName}</span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      {review.verified && (
                        <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Verificata</span>
                      )}
                    </div>

                    <p className="text-text text-sm leading-relaxed">{review.comment}</p>

                    {review.response && (
                      <div className="ml-4 pl-4 border-l-2 border-primary/20 mt-3">
                        <p className="text-text-secondary text-xs mb-1">La tua risposta:</p>
                        <p className="text-text text-sm">{review.response}</p>
                      </div>
                    )}

                    {!review.response && replyingTo !== review.id && (
                      <button
                        onClick={() => setReplyingTo(review.id)}
                        className="mt-3 text-sm text-primary hover:underline flex items-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Rispondi
                      </button>
                    )}

                    {replyingTo === review.id && (
                      <div className="mt-3 flex gap-2">
                        <input
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Scrivi la tua risposta..."
                          className="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-primary"
                          onKeyDown={(e) => e.key === 'Enter' && submitReply(review.id)}
                        />
                        <button
                          onClick={() => submitReply(review.id)}
                          className="px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-light transition-colors"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => { setReplyingTo(null); setReplyText(''); }}
                          className="px-3 py-2 text-text-secondary text-sm hover:bg-gray-100 rounded-xl"
                        >
                          Annulla
                        </button>
                      </div>
                    )}
                  </div>

                  <span className="text-xs text-text-secondary flex-shrink-0">
                    {new Date(review.createdAt).toLocaleDateString('it-IT')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
