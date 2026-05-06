import { Metadata } from 'next';
import { Search, MessageSquare, CheckCircle, Star, Phone, Shield } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'Come Funziona',
  description: 'Scopri come trovare professionisti qualificati vicino a te in 3 semplici passaggi con TrovaPro.',
};

export default function ComeFunzionaPage() {
  const steps = [
    { icon: Search, title: 'Cerca', desc: 'Inserisci il servizio di cui hai bisogno (elettricista, idraulico, imbianchino) e la tua città o zona. Il nostro sistema troverà i migliori professionisti vicino a te.', color: 'bg-blue-100 text-blue-600' },
    { icon: Star, title: 'Confronta', desc: 'Confronta i profili dei professionisti: leggi le recensioni, guarda le valutazioni, scopri le loro specializzazioni e zone di copertura. Scegli quello più adatto alle tue esigenze.', color: 'bg-amber-100 text-amber-600' },
    { icon: MessageSquare, title: 'Contatta', desc: 'Puoi contattare il professionista in due modi: chiamarlo direttamente dal suo profilo, oppure compilare il modulo di richiesta preventivo con i dettagli del lavoro.', color: 'bg-purple-100 text-purple-600' },
    { icon: Phone, title: 'Ricevi risposta', desc: 'Se hai compilato il modulo, noi inoltriamo la tua richiesta al professionista con tutti i dettagli. Lui ti contatterà entro 24 ore per fissare un appuntamento.', color: 'bg-green-100 text-green-600' },
    { icon: CheckCircle, title: 'Problema risolto!', desc: 'Il professionista eseguirà il lavoro. Al termine, potrai lasciare una recensione per aiutare altri utenti nella scelta.', color: 'bg-emerald-100 text-emerald-600' },
    { icon: Shield, title: 'Garanzia', desc: 'Tutti i professionisti sulla piattaforma possono essere verificati. Il sistema di recensioni garantisce trasparenza e qualità del servizio.', color: 'bg-indigo-100 text-indigo-600' },
  ];

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-dark to-primary section-padding text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold mb-6">Come Funziona</h1>
          <p className="text-lg text-blue-100/80">
            Trovare un professionista qualificato non è mai stato così semplice.
            Ecco come funziona TrovaPro per gli utenti.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {steps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="flex gap-6 items-start">
                  <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center flex-shrink-0`}>
                    <step.icon className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text mb-2">
                      {i + 1}. {step.title}
                    </h3>
                    <p className="text-text-secondary leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
