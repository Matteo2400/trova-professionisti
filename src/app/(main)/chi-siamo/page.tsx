import { Metadata } from 'next';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { Shield, Users, Heart, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Chi Siamo',
  description: 'Scopri la storia e la missione di TrovaPro, la piattaforma che connette utenti privati con professionisti qualificati.',
};

export default function ChiSiamoPage() {
  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-dark to-primary section-padding text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold mb-6">Chi Siamo</h1>
          <p className="text-lg text-blue-100/80">
            La nostra missione è rendere semplice e sicuro trovare il professionista
            giusto per ogni lavoro nella tua zona.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="prose prose-lg max-w-none">
              <p className="text-text-secondary leading-relaxed text-lg">
                <strong className="text-text">TrovaPro</strong> nasce dall&apos;idea di semplificare
                la ricerca di professionisti qualificati per lavori di manutenzione e ristrutturazione.
                Sappiamo quanto può essere frustrante cercare un elettricista, un idraulico o un
                imbianchino affidabile — e vogliamo cambiare questo.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
            {[
              { icon: Target, title: 'La nostra missione', text: 'Connettere utenti privati con professionisti verificati, rendendo il processo semplice, trasparente e sicuro.' },
              { icon: Users, title: 'Per tutti', text: 'La piattaforma è gratuita per gli utenti e offre ai professionisti strumenti per far crescere la propria attività.' },
              { icon: Shield, title: 'Fiducia e sicurezza', text: 'Ogni professionista viene verificato. Le recensioni autentiche ti aiutano a scegliere con fiducia.' },
              { icon: Heart, title: 'Passione', text: 'Siamo un team appassionato che crede nel valore del lavoro artigianale e nella forza delle connessioni locali.' },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="p-6 rounded-2xl bg-surface border border-gray-100">
                  <item.icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-bold text-text mb-2">{item.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{item.text}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
