import { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import AnimatedSection from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'Contatti',
  description: 'Contattaci per qualsiasi domanda o suggerimento. Il team di TrovaPro è a tua disposizione.',
};

export default function ContattiPage() {
  const contacts = [
    { icon: Mail, label: 'Email', value: 'info@trovapro.it', href: 'mailto:info@trovapro.it' },
    { icon: Phone, label: 'Telefono', value: '+39 02 1234567', href: 'tel:+390212345670' },
    { icon: MapPin, label: 'Indirizzo', value: 'Via Roma 1, 20121 Milano', href: null },
    { icon: Clock, label: 'Orari', value: 'Lun-Ven 9:00-18:00', href: null },
  ];

  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-dark to-primary section-padding text-center text-white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-5xl font-bold mb-6">Contattaci</h1>
          <p className="text-lg text-blue-100/80">
            Hai domande o suggerimenti? Siamo qui per aiutarti.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-text mb-6">Scrivici un messaggio</h2>
            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Nome</label>
                  <input type="text" className="input-field" placeholder="Il tuo nome" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text mb-1">Email</label>
                  <input type="email" className="input-field" placeholder="La tua email" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">Oggetto</label>
                <input type="text" className="input-field" placeholder="Oggetto del messaggio" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text mb-1">Messaggio</label>
                <textarea className="input-field min-h-[140px] resize-y" placeholder="Scrivi il tuo messaggio..." />
              </div>
              <button type="submit" className="btn-primary w-full sm:w-auto">
                Invia messaggio
              </button>
            </form>
          </div>

          <AnimatedSection delay={0.2}>
            <div>
              <h2 className="text-2xl font-bold text-text mb-6">Informazioni di contatto</h2>
              <div className="space-y-6">
                {contacts.map((c, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <c.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-text-secondary">{c.label}</p>
                      {c.href ? (
                        <a href={c.href} className="text-text font-medium hover:text-primary transition-colors">
                          {c.value}
                        </a>
                      ) : (
                        <p className="text-text font-medium">{c.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-surface rounded-2xl">
                <h3 className="font-bold text-text mb-2">Sei un professionista?</h3>
                <p className="text-text-secondary text-sm">
                  Per assistenza sul tuo account o i piani premium, scrivi a{' '}
                  <a href="mailto:pro@trovapro.it" className="text-primary hover:underline">
                    pro@trovapro.it
                  </a>
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
