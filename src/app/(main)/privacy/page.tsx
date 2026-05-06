import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Informativa sulla privacy di TrovaPro. Scopri come raccogliamo e trattiamo i tuoi dati personali.',
};

export default function PrivacyPage() {
  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-dark to-primary py-16 text-center text-white">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-blue-100/80">Ultimo aggiornamento: Gennaio 2025</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto prose prose-gray">
          <h2 className="text-xl font-bold text-text mt-8 mb-4">1. Titolare del Trattamento</h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            Il titolare del trattamento dei dati personali è TrovaPro S.r.l., con sede legale in Via Roma 1, 20121 Milano (MI), P.IVA 00000000000, email: privacy@trovapro.it.
          </p>

          <h2 className="text-xl font-bold text-text mt-8 mb-4">2. Dati Raccolti</h2>
          <p className="text-text-secondary leading-relaxed mb-4">Raccogliamo i seguenti tipi di dati personali:</p>
          <ul className="list-disc pl-6 text-text-secondary space-y-2 mb-6">
            <li>Dati identificativi: nome, cognome, email, numero di telefono</li>
            <li>Dati di navigazione: indirizzo IP, tipo di browser, pagine visitate</li>
            <li>Dati di geolocalizzazione: solo con il tuo esplicito consenso</li>
            <li>Dati professionali (per i professionisti): specializzazioni, zone di copertura, P.IVA</li>
          </ul>

          <h2 className="text-xl font-bold text-text mt-8 mb-4">3. Finalità del Trattamento</h2>
          <p className="text-text-secondary leading-relaxed mb-4">I tuoi dati sono trattati per le seguenti finalità:</p>
          <ul className="list-disc pl-6 text-text-secondary space-y-2 mb-6">
            <li>Erogazione del servizio di ricerca e contatto professionisti</li>
            <li>Gestione del tuo account e profilo</li>
            <li>Invio di comunicazioni relative al servizio</li>
            <li>Miglioramento della piattaforma e analisi statistiche aggregate</li>
            <li>Adempimento di obblighi di legge</li>
          </ul>

          <h2 className="text-xl font-bold text-text mt-8 mb-4">4. Base Giuridica</h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            Il trattamento dei dati è basato sul tuo consenso, sull&apos;esecuzione del contratto di servizio, e su obblighi legali applicabili, ai sensi degli artt. 6 e 7 del GDPR.
          </p>

          <h2 className="text-xl font-bold text-text mt-8 mb-4">5. Conservazione dei Dati</h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            I dati personali sono conservati per il tempo necessario al raggiungimento delle finalità indicate, e comunque non oltre 24 mesi dalla cessazione del rapporto contrattuale, salvo obblighi di legge.
          </p>

          <h2 className="text-xl font-bold text-text mt-8 mb-4">6. Diritti dell&apos;Interessato</h2>
          <p className="text-text-secondary leading-relaxed mb-4">Hai il diritto di:</p>
          <ul className="list-disc pl-6 text-text-secondary space-y-2 mb-6">
            <li>Accedere ai tuoi dati personali</li>
            <li>Rettificare o aggiornare i dati inesatti</li>
            <li>Richiedere la cancellazione dei dati</li>
            <li>Limitare o opporti al trattamento</li>
            <li>Richiedere la portabilità dei dati</li>
            <li>Revocare il consenso in qualsiasi momento</li>
          </ul>
          <p className="text-text-secondary leading-relaxed mb-6">
            Per esercitare i tuoi diritti, scrivi a <a href="mailto:privacy@trovapro.it" className="text-primary hover:underline">privacy@trovapro.it</a>.
          </p>

          <h2 className="text-xl font-bold text-text mt-8 mb-4">7. Cookie</h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            Utilizziamo cookie tecnici necessari al funzionamento del sito e, con il tuo consenso, cookie analitici per migliorare la tua esperienza. Per maggiori informazioni consulta la Cookie Policy.
          </p>

          <h2 className="text-xl font-bold text-text mt-8 mb-4">8. Contatti</h2>
          <p className="text-text-secondary leading-relaxed">
            Per qualsiasi domanda relativa alla privacy, contattaci all&apos;indirizzo <a href="mailto:privacy@trovapro.it" className="text-primary hover:underline">privacy@trovapro.it</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
