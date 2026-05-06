import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // ==================== CATEGORIES ====================
  const categoriesData = [
    { slug: 'elettricista', name: 'Elettricista', namePlural: 'Elettricisti', icon: 'Zap', color: '#F59E0B', description: 'Impianti elettrici, riparazioni, messa a norma e certificazioni', sortOrder: 1 },
    { slug: 'idraulico', name: 'Idraulico', namePlural: 'Idraulici', icon: 'Droplets', color: '#3B82F6', description: 'Riparazioni tubature, installazioni sanitari, caldaie e riscaldamento', sortOrder: 2 },
    { slug: 'imbianchino', name: 'Imbianchino', namePlural: 'Imbianchini', icon: 'Paintbrush', color: '#10B981', description: 'Tinteggiatura interni ed esterni, decorazioni e resine', sortOrder: 3 },
    { slug: 'muratore', name: 'Muratore', namePlural: 'Muratori', icon: 'Hammer', color: '#8B5CF6', description: 'Ristrutturazioni, cartongesso, muratura e lavori edili', sortOrder: 4 },
    { slug: 'fabbro', name: 'Fabbro', namePlural: 'Fabbri', icon: 'Key', color: '#EF4444', description: 'Serrature, porte blindate, inferriate e cancelli', sortOrder: 5 },
    { slug: 'giardiniere', name: 'Giardiniere', namePlural: 'Giardinieri', icon: 'TreePine', color: '#22C55E', description: 'Manutenzione giardini, potatura, impianti irrigazione', sortOrder: 6 },
  ];

  const categories: Record<string, any> = {};
  for (const cat of categoriesData) {
    categories[cat.slug] = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }

  // ==================== ADMIN USER ====================
  const adminPassword = await hash('admin123!', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@trovapro.it' },
    update: {},
    create: {
      email: 'admin@trovapro.it',
      passwordHash: adminPassword,
      firstName: 'Admin',
      lastName: 'TrovaPro',
      role: 'admin',
      emailVerified: true,
    },
  });

  // ==================== PROFESSIONALS ====================
  const proPassword = await hash('professionista123!', 12);

  const professionalsData = [
    {
      email: 'mario.rossi@email.it',
      firstName: 'Mario', lastName: 'Rossi', phone: '+39 333 1234567',
      slug: 'mario-rossi-elettricista-roma',
      vatNumber: 'IT12345678901',
      category: 'elettricista',
      description: 'Elettricista con oltre 15 anni di esperienza. Specializzato in impianti civili e industriali, messa a norma, certificazioni e domotica. Lavoro con passione e precisione per garantire la sicurezza della tua casa.',
      city: 'Roma', province: 'RM',
      latitude: 41.9028, longitude: 12.4964,
      coverageAreas: ['Roma', 'Fiumicino', 'Ostia', 'Ciampino'],
      yearsExperience: 15, plan: 'premium', isVerified: true,
      priceRange: '€40-80/ora',
    },
    {
      email: 'luigi.bianchi@email.it',
      firstName: 'Luigi', lastName: 'Bianchi', phone: '+39 334 2345678',
      slug: 'luigi-bianchi-idraulico-milano',
      vatNumber: 'IT23456789012',
      category: 'idraulico',
      description: 'Idraulico professionista specializzato in riparazioni urgenti, installazione sanitari, caldaie e sistemi di riscaldamento. Interventi rapidi e prezzi trasparenti.',
      city: 'Milano', province: 'MI',
      latitude: 45.4642, longitude: 9.1900,
      coverageAreas: ['Milano', 'Monza', 'Sesto San Giovanni', 'Cinisello Balsamo'],
      yearsExperience: 10, plan: 'pro', isVerified: true,
      priceRange: '€35-70/ora',
    },
    {
      email: 'giuseppe.verdi@email.it',
      firstName: 'Giuseppe', lastName: 'Verdi', phone: '+39 335 3456789',
      slug: 'giuseppe-verdi-imbianchino-torino',
      vatNumber: 'IT34567890123',
      category: 'imbianchino',
      description: 'Imbianchino esperto con una passione per i dettagli. Tinteggiatura interni ed esterni, decorazioni, stucchi veneziani e resine. Preventivi gratuiti e senza impegno.',
      city: 'Torino', province: 'TO',
      latitude: 45.0703, longitude: 7.6869,
      coverageAreas: ['Torino', 'Moncalieri', 'Collegno', 'Rivoli'],
      yearsExperience: 20, plan: 'premium', isVerified: true,
      priceRange: '€30-60/ora',
    },
    {
      email: 'antonio.esposito@email.it',
      firstName: 'Antonio', lastName: 'Esposito', phone: '+39 336 4567890',
      slug: 'antonio-esposito-elettricista-napoli',
      vatNumber: 'IT45678901234',
      category: 'elettricista',
      description: 'Elettricista qualificato a Napoli. Specializzato in impianti fotovoltaici, domotica e ristrutturazioni elettriche complete. Certificato e assicurato.',
      city: 'Napoli', province: 'NA',
      latitude: 40.8518, longitude: 14.2681,
      coverageAreas: ['Napoli', 'Pozzuoli', 'Casoria', 'Portici'],
      yearsExperience: 8, plan: 'base', isVerified: true,
      priceRange: '€30-55/ora',
    },
    {
      email: 'marco.ferrari@email.it',
      firstName: 'Marco', lastName: 'Ferrari', phone: '+39 337 5678901',
      slug: 'marco-ferrari-idraulico-roma',
      vatNumber: 'IT56789012345',
      category: 'idraulico',
      description: 'Pronto intervento idraulico a Roma e provincia. Disponibile 7 giorni su 7, anche per emergenze notturne. Perdite, intasamenti, installazioni.',
      city: 'Roma', province: 'RM',
      latitude: 41.8919, longitude: 12.5113,
      coverageAreas: ['Roma', 'EUR', 'Trastevere', 'Prati'],
      yearsExperience: 12, plan: 'pro', isVerified: true,
      priceRange: '€40-75/ora',
    },
    {
      email: 'paolo.colombo@email.it',
      firstName: 'Paolo', lastName: 'Colombo', phone: '+39 338 6789012',
      slug: 'paolo-colombo-imbianchino-milano',
      vatNumber: 'IT67890123456',
      category: 'imbianchino',
      description: 'Imbianchino a Milano con esperienza ventennale. Mi occupo di tinteggiatura, rasatura, velature, resine e finiture decorative di alta qualità. Lavoro pulito e puntuale.',
      city: 'Milano', province: 'MI',
      latitude: 45.4773, longitude: 9.1815,
      coverageAreas: ['Milano', 'Rho', 'Pero', 'Corsico'],
      yearsExperience: 22, plan: 'premium', isVerified: true,
      priceRange: '€35-65/ora',
    },
    {
      email: 'carlo.muratore@email.it',
      firstName: 'Carlo', lastName: 'Ricci', phone: '+39 339 7890123',
      slug: 'carlo-ricci-muratore-roma',
      vatNumber: 'IT78901234567',
      category: 'muratore',
      description: 'Muratore esperto in ristrutturazioni complete, cartongesso, piastrellatura e lavori edili di ogni genere. Preventivi dettagliati e tempistiche rispettate.',
      city: 'Roma', province: 'RM',
      latitude: 41.9100, longitude: 12.4800,
      coverageAreas: ['Roma', 'Guidonia', 'Tivoli', 'Monterotondo'],
      yearsExperience: 18, plan: 'pro', isVerified: true,
      priceRange: '€35-70/ora',
    },
    {
      email: 'andrea.fabbro@email.it',
      firstName: 'Andrea', lastName: 'Martini', phone: '+39 340 8901234',
      slug: 'andrea-martini-fabbro-firenze',
      vatNumber: 'IT89012345678',
      category: 'fabbro',
      description: 'Fabbro specializzato in apertura porte, sostituzione serrature, porte blindate e inferriate. Pronto intervento 24h su 24.',
      city: 'Firenze', province: 'FI',
      latitude: 43.7696, longitude: 11.2558,
      coverageAreas: ['Firenze', 'Prato', 'Pistoia', 'Scandicci'],
      yearsExperience: 12, plan: 'base', isVerified: false,
      priceRange: '€50-100/intervento',
    },
  ];

  const professionals: any[] = [];

  for (const data of professionalsData) {
    const user = await prisma.user.upsert({
      where: { email: data.email },
      update: {},
      create: {
        email: data.email,
        passwordHash: proPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        role: 'professional',
        emailVerified: true,
      },
    });

    const professional = await prisma.professional.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        slug: data.slug,
        vatNumber: data.vatNumber,
        description: data.description,
        city: data.city,
        province: data.province,
        latitude: data.latitude,
        longitude: data.longitude,
        coverageAreas: JSON.stringify(data.coverageAreas),
        coverageRadius: 25,
        yearsExperience: data.yearsExperience,
        plan: data.plan,
        isVerified: data.isVerified,
        isApproved: true,
        priceRange: data.priceRange,
      },
    });

    // Link to category
    const cat = categories[data.category];
    if (cat) {
      await prisma.professionalCategory.upsert({
        where: {
          professionalId_categoryId: {
            professionalId: professional.id,
            categoryId: cat.id,
          },
        },
        update: {},
        create: {
          professionalId: professional.id,
          categoryId: cat.id,
        },
      });
    }

    professionals.push({ ...professional, user, category: data.category });
  }

  // ==================== REVIEWS ====================
  const reviewsData = [
    { proIndex: 0, authorName: 'Anna M.', rating: 5, comment: 'Mario è stato fantastico! Ha risolto un problema elettrico complesso in meno di 2 ore. Puntuale, professionale e prezzi onesti. Consigliatissimo!', verified: true },
    { proIndex: 0, authorName: 'Giovanni P.', rating: 5, comment: 'Ottimo lavoro per la messa a norma del mio impianto. Ha spiegato tutto con pazienza e ha lavorato in modo pulito e ordinato.', verified: true },
    { proIndex: 0, authorName: 'Laura S.', rating: 4, comment: "Bravo e competente. Ha installato un nuovo quadro elettrico perfettamente. Unica nota: un leggero ritardo all'arrivo, ma recuperato con il lavoro.", verified: true },
    { proIndex: 1, authorName: 'Roberto C.', rating: 5, comment: 'Intervento rapidissimo per una perdita urgente. Luigi è arrivato in 30 minuti e ha risolto tutto. Prezzo giusto e trasparente.', verified: true },
    { proIndex: 1, authorName: 'Silvia N.', rating: 4, comment: 'Bravo idraulico, ha sostituito la caldaia in mezza giornata. Pulito e ordinato. Lo richiamerò sicuramente.', verified: true },
    { proIndex: 2, authorName: 'Francesca T.', rating: 5, comment: "Giuseppe ha tinteggiato tutto l'appartamento in modo impeccabile. Colori perfetti, nessuna sbavatura. La casa sembra nuova!", verified: true },
    { proIndex: 2, authorName: 'Michele D.', rating: 5, comment: 'Professionalità al top. Ha fatto uno stucco veneziano splendido nel soggiorno. Tutti gli amici mi fanno i complimenti.', verified: true },
    { proIndex: 3, authorName: 'Salvatore R.', rating: 4, comment: 'Antonio ha installato un impianto fotovoltaico perfetto. Competente e disponibile nel spiegare tutto il funzionamento.', verified: true },
    { proIndex: 4, authorName: 'Chiara V.', rating: 5, comment: 'Pronto intervento eccezionale! Chiamato di sera per una perdita e Marco è arrivato in meno di 40 minuti.', verified: true },
    { proIndex: 5, authorName: 'Barbara L.', rating: 5, comment: 'Paolo ha fatto un lavoro meraviglioso. La velatura nel soggiorno è di una qualità eccezionale. Super consigliato!', verified: true },
    { proIndex: 5, authorName: 'Stefano G.', rating: 4, comment: 'Ottimo imbianchino, puntuale e preciso. Ha tinteggiato 3 stanze in 2 giorni. Rapporto qualità prezzo eccellente.', verified: true },
    { proIndex: 6, authorName: 'Luca M.', rating: 5, comment: 'Carlo ha ristrutturato il mio bagno perfettamente. Piastrelle posate a regola d\'arte. Tempistiche rispettate.', verified: true },
  ];

  for (const rev of reviewsData) {
    await prisma.review.create({
      data: {
        professionalId: professionals[rev.proIndex].id,
        authorName: rev.authorName,
        rating: rev.rating,
        comment: rev.comment,
        verified: rev.verified,
        isApproved: true,
      },
    });
  }

  // Update review counts and ratings
  for (const pro of professionals) {
    const reviews = await prisma.review.findMany({
      where: { professionalId: pro.id, isApproved: true },
    });
    const count = reviews.length;
    const avg = count > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / count : 0;
    await prisma.professional.update({
      where: { id: pro.id },
      data: { reviewCount: count, rating: Math.round(avg * 10) / 10 },
    });
  }

  // ==================== SAMPLE QUOTE REQUESTS ====================
  const quoteRequestsData = [
    { proIndex: 0, firstName: 'Anna', lastName: 'Moretti', email: 'anna.moretti@email.it', phone: '+39 345 111222', address: 'Via Roma 42', city: 'Roma', description: 'Riparazione impianto elettrico in cucina, le prese non funzionano più.', urgency: 'alta', status: 'nuova' },
    { proIndex: 0, firstName: 'Roberto', lastName: 'Carli', email: 'roberto.carli@email.it', phone: '+39 345 222333', address: 'Via Appia 15', city: 'Roma', description: 'Installazione nuove prese nel soggiorno e in camera da letto.', urgency: 'media', status: 'in_lavorazione' },
    { proIndex: 0, firstName: 'Francesca', lastName: 'Baldi', email: 'francesca.baldi@email.it', phone: '+39 345 333444', address: 'Viale Europa 88', city: 'Roma', description: 'Messa a norma completa dell\'impianto elettrico di un appartamento di 80mq.', urgency: 'bassa', status: 'completata' },
    { proIndex: 1, firstName: 'Marco', lastName: 'Conti', email: 'marco.conti@email.it', phone: '+39 345 444555', address: 'Corso Magenta 20', city: 'Milano', description: 'Perdita dal rubinetto della cucina e tubatura del bagno intasata.', urgency: 'alta', status: 'nuova' },
    { proIndex: 2, firstName: 'Laura', lastName: 'Neri', email: 'laura.neri@email.it', phone: '+39 345 555666', address: 'Via Po 5', city: 'Torino', description: 'Tinteggiatura completa appartamento 100mq, 4 stanze + corridoio.', urgency: 'media', status: 'nuova' },
  ];

  for (const req of quoteRequestsData) {
    await prisma.quoteRequest.create({
      data: {
        professionalId: professionals[req.proIndex].id,
        firstName: req.firstName,
        lastName: req.lastName,
        email: req.email,
        phone: req.phone,
        address: req.address,
        city: req.city,
        category: professionalsData[req.proIndex].category,
        description: req.description,
        urgency: req.urgency,
        status: req.status,
      },
    });
  }

  // ==================== SAMPLE PROFILE VIEWS ====================
  for (const pro of professionals) {
    const viewCount = Math.floor(Math.random() * 200) + 50;
    const views = [];
    for (let i = 0; i < viewCount; i++) {
      const daysAgo = Math.floor(Math.random() * 180);
      views.push({
        professionalId: pro.id,
        viewedAt: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000),
        source: ['search', 'direct', 'category'][Math.floor(Math.random() * 3)],
      });
    }
    await prisma.profileView.createMany({ data: views });
  }

  // ==================== CLIENT USERS ====================
  const clientPassword = await hash('cliente123!', 12);
  await prisma.user.upsert({
    where: { email: 'cliente@email.it' },
    update: {},
    create: {
      email: 'cliente@email.it',
      passwordHash: clientPassword,
      firstName: 'Maria',
      lastName: 'Grazia',
      phone: '+39 340 1234567',
      role: 'client',
      emailVerified: true,
    },
  });

  console.log('Seed completed successfully!');
  console.log('');
  console.log('Login credentials:');
  console.log('  Admin:          admin@trovapro.it / admin123!');
  console.log('  Professional:   mario.rossi@email.it / professionista123!');
  console.log('  Client:         cliente@email.it / cliente123!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
