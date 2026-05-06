import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Termini di Servizio',
  description: 'Termini e condizioni di utilizzo della piattaforma TrovaPro.',
};

export default function TerminiPage() {
  return (
    <div className="pt-20">
      <section className="bg-gradient-to-br from-dark to-primary py-16 text-center text-white">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">Termini di Servizio</h1>
          <p className="text-blue-100/80">Ultimo aggiornamento: Gennaio 2025</p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-3xl mx-auto prose prose-gray">
          <h2 className="text-xl font-bold text-text mt-8 mb-4">1. Accettazione dei Termini</h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            Utilizzando la piattaforma TrovaPro, accetti integralmente i presenti Termini di Servizio. Se non accetti questi termini, ti preghiamo di non utilizzare il servizio.
          </p>

          <h2 className="text-xl font-bold text-text mt-8 mb-4">2. Descrizione del Servizio</h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            TrovaPro è una piattaforma online che mette in contatto utenti privati con professionisti del settore edile e impiantistico (elettricisti, idraulici, imbianchini). TrovaPro non è parte del contratto tra utente e professionista e non è responsabile della qualità dei lavori eseguiti.
          </p>

          <h2 className="text-xl font-bold text-text mt-8 mb-4">3. Registrazione</h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            Per utilizzare alcune funzionalità della piattaforma è necessario creare un account. L&apos;utente è responsabile della veridicità dei dati inseriti e della custodia delle proprie credenziali di accesso.
          </p>

          <h2 className="text-xl font-bold text-text mt-8 mb-4">4. Obblighi dell&apos;Utente</h2>
          <ul className="list-disc pl-6 text-text-secondary space-y-2 mb-6">
            <li>Utilizzare il servizio in buona fede e per scopi leciti</li>
            <li>Fornire informazioni veritiere nella registrazione e nelle richieste di preventivo</li>
            <li>Non utilizzare il servizio per finalità fraudolente o illecite</li>
            <li>Non pubblicare recensioni false o diffamatorie</li>
          </ul>

          <h2 className="text-xl font-bold text-text mt-8 mb-4">5. Obblighi del Professionista</h2>
          <ul className="list-disc pl-6 text-text-secondary space-y-2 mb-6">
            <li>Possedere le qualifiche e le abilitazioni necessarie per svolgere l&apos;attività dichiarata</li>
            <li>Rispondere alle richieste di preventivo in modo tempestivo e professionale</li>
            <li>Fornire informazioni veritiere sul proprio profilo</li>
            <li>Rispettare le norme vigenti in materia fiscale e assicurativa</li>
          </ul>

          <h2 className="text-xl font-bold text-text mt-8 mb-4">6. Piani e Pagamenti</h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            I piani a pagamento (Pro e Premium) sono sottoscrivibili con pagamento mensile. Il rinnovo è automatico salvo disdetta. Il rimborso è possibile entro 14 giorni dalla sottoscrizione.
          </p>

          <h2 className="text-xl font-bold text-text mt-8 mb-4">7. Limitazione di Responsabilità</h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            TrovaPro agisce come intermediario e non è responsabile per danni derivanti dal rapporto tra utente e professionista. La piattaforma non garantisce la disponibilità, la qualità o i risultati dei servizi offerti dai professionisti.
          </p>

          <h2 className="text-xl font-bold text-text mt-8 mb-4">8. Proprietà Intellettuale</h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            Tutti i contenuti della piattaforma (testi, grafica, loghi, software) sono di proprietà di TrovaPro S.r.l. o dei rispettivi titolari e sono protetti dalle leggi sulla proprietà intellettuale.
          </p>

          <h2 className="text-xl font-bold text-text mt-8 mb-4">9. Modifiche ai Termini</h2>
          <p className="text-text-secondary leading-relaxed mb-6">
            TrovaPro si riserva il diritto di modificare i presenti Termini in qualsiasi momento. Le modifiche saranno comunicate tramite la piattaforma e/o via email.
          </p>

          <h2 className="text-xl font-bold text-text mt-8 mb-4">10. Legge Applicabile</h2>
          <p className="text-text-secondary leading-relaxed">
            I presenti Termini sono regolati dalla legge italiana. Per qualsiasi controversia è competente il Foro di Milano.
          </p>
        </div>
      </section>
    </div>
  );
}
