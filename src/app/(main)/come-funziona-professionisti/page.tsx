import { Metadata } from 'next';
import { TrendingUp, Users, Star, Eye, BarChart3, Shield } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Come Funziona per i Professionisti',
  description: 'Scopri come TrovaPro aiuta elettricisti, idraulici e imbianchini a trovare nuovi clienti nella propria zona.',
};

export default function ComeFunzionaProfessionistiPage() {
  const benefits = [
    { icon: Users, title: 'Nuovi clienti ogni giorno', desc: 'Ricevi richieste di preventivo da potenziali clienti nella tua zona, senza dover cercare tu il lavoro.', color: 'bg-blue-100 text-blue-600' },
    { icon: Eye, title: 'Visibilità online', desc: 'Il tuo profilo professionale appare nelle ricerche. Descrivi i tuoi servizi, mostra foto dei tuoi lavori e raccogli recensioni.', color: 'bg-amber-100 text-amber-600' },
    { icon: Star, title: 'Recensioni verificate', desc: "Le recensioni dei tuoi clienti costruiscono la tua reputazione online. Un profilo con ottime recensioni attrae più clienti.", color: 'bg-purple-100 text-purple-600' },
    { icon: BarChart3, title: 'Statistiche dettagliate', desc: 'Monitora le visite al tuo profilo, le richieste ricevute e il tasso di conversione dalla tua dashboard personale.', color: 'bg-green-100 text-green-600' },
    { icon: TrendingUp, title: 'Piani Premium', desc: 'Con i piani Pro e Premium ottieni maggiore visibilità, badge speciali, posizionamento prioritario e supporto dedicato.', color: 'bg-emerald-100 text-emerald-600' },
    { icon: Shield, title: 'Badge verificato', desc: "Verifica il tuo profilo con documenti professionali per ottenere il badge 'Verificato' e aumentare la fiducia dei clienti.", color: 'bg-indigo-100 text-indigo-600' },
  ];

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-primary to-primary-light section-padding text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold mb-6">Sei un Professionista?</h1>
          <p className="text-lg text-blue-100/80 mb-8">
            Unisciti a TrovaPro e inizia a ricevere nuove richieste di lavoro nella tua zona. Registrazione gratuita.
          </p>
          <Link href="/auth/registrazione" className="btn-primary inline-block text-lg px-8 py-4">
            Registrati Gratis
          </Link>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-text mb-10 text-center">I vantaggi di TrovaPro</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((b, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="card p-6 h-full">
                  <div className={`w-12 h-12 rounded-xl ${b.color} flex items-center justify-center mb-4`}>
                    <b.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-text mb-2">{b.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{b.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-surface">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-text mb-4">Pronto a iniziare?</h2>
          <p className="text-text-secondary mb-8">
            La registrazione è gratuita e richiede meno di 5 minuti. Inizia subito a ricevere richieste.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/registrazione" className="btn-primary">
              Registrati Gratis
            </Link>
            <Link href="/piani-premium" className="btn-secondary">
              Scopri i Piani
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
