'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

/* ============================================================
   TYPES
   ============================================================ */
type Lang = 'sq' | 'en'

type Bi = { sq: string; en: string }

type Era = {
  id: string
  index: string
  name: Bi
  period: string
  tagline: Bi
  image: string
  intro: Bi
  figures: { name: string; role: Bi; detail: Bi }[]
  events: { year: string; title: Bi; desc: Bi }[]
  accent: 'crimson' | 'gold'
}

/* ============================================================
   UI STRINGS (bilingual)
   ============================================================ */
const UI = {
  siteName: { sq: 'KRONIKA E SHQIPTARËVE', en: 'CHRONICLE OF THE ALBANIANS' },
  overline: {
    sq: 'Një Kronikë e Historisë Shqiptare',
    en: 'A Chronicle of Albanian History',
  },
  subtitle: {
    sq: 'Nga pellazgët mitikë dhe mbretëritë fisnore të Ilirisë, përmes qëndresës së Skënderbeut, Rilindjes Kombëtare dhe lindjes së Kosovës moderne — pesë mijëvjeçarë të një populli të papërkulur.',
    en: 'From the mythic Pelasgians and the tribal kingdoms of Illyria, through Skanderbeg\u2019s defiance, the National Awakening, and the birth of modern Kosovo — five millennia of an unconquered people.',
  },
  beginJourney: { sq: 'FILLO UDHËTIMIN', en: 'BEGIN THE JOURNEY' },
  scroll: { sq: 'Lëviz', en: 'Scroll' },
  stripQuote: {
    sq: 'Gjuha e shqipes është një nga mrekullitë e botës — një dëshmi e një populli që nuk u shua kurrë.',
    en: 'The Albanian language is one of the wonders of the world — a testament to a people that was never extinguished.',
  },
  stripAttr: {
    sq: '— Një kronikë e treguar në pesë epoka —',
    en: '— A chronicle told in five ages —',
  },
  figuresTitle: { sq: 'Figurat & Simbolet', en: 'Figures & Symbols' },
  timelineTitle: { sq: 'Linja e Kohës', en: 'Timeline' },
  episode: { sq: 'EPISODI', en: 'EPISODE' },
  footerQuote: {
    sq: 'Feja e shqiptarit është shqiptaria.',
    en: 'The religion of Albanians is Albanianism.',
  },
  footerQuoteAttr: { sq: '— Pashko Vasa, 1881', en: '— Pashko Vasa, 1881' },
  footerExplore: { sq: 'Eksploro Epokat', en: 'Explore the Eras' },
  footerNote: {
    sq: 'Një kronikë edukative e historisë shqiptare · Ndërtuar me nderim për të kaluarën.',
    en: 'An educational chronicle of Albanian history · Built with reverence for the past.',
  },
  footerNote2: {
    sq: 'Për studim dhe vlerësim kulturor · Imazhet janë ilustruese.',
    en: 'For study and cultural appreciation · Images are illustrative.',
  },
  menuAria: { sq: 'Hap menunë', en: 'Toggle menu' },
  topAria: { sq: 'Kthehu lart', en: 'Scroll to top' },
}

/* ============================================================
   DATA: The five eras of Albanian history (bilingual)
   ============================================================ */
const NAV_ITEMS = [
  { id: 'pelasgians', label: { sq: 'Pellazgët', en: 'Pelasgians' } },
  { id: 'illyrians', label: { sq: 'Ilirët & Dardanët', en: 'Illyrians & Dardanians' } },
  { id: 'arberia', label: { sq: 'Arbëria', en: 'Arbëria' } },
  { id: 'rilindja', label: { sq: 'Rilindja', en: 'The Awakening' } },
  { id: 'kosova', label: { sq: 'Kosova', en: 'Kosova' } },
]

const ERAS: Era[] = [
  {
    id: 'pelasgians',
    index: 'I',
    name: { sq: 'Pellazgët', en: 'The Pelasgians' },
    period: 'rreth 4000 p.e.s. – 1200 p.e.s.',
    tagline: {
      sq: 'Themeli para-helenik — mit, gur dhe rrënjët e një gjuhe.',
      en: 'The pre-Hellenic foundation — myth, stone, and the roots of a language.',
    },
    image: '/images/pelasgians.jpg',
    intro: {
      sq: 'Përpara helenëve, përpara qytet-shteteve, pellazgët ecnin nëpër Ballkan dhe Egje. Këta ndërtues enigmatikë ngritën mure ciklopike dhe lanë gjurmë në mit dhe gur. Për historiografinë shqiptare, teoria pellazge ofron një urë: një lidhje mes gjuhës më të vjetër të gadishullit dhe gjuhës shqipe që mbijeton sot.',
      en: 'Before the Hellenes, before the city-states, the Pelasgians walked the Balkans and the Aegean. These enigmatic builders raised cyclopean walls and left traces in myth and stone. For Albanian historiography, the Pelasgian theory offers a bridge: a link between the oldest language of the peninsula and the Albanian tongue that survives today.',
    },
    figures: [
      {
        name: 'Muret Pelasgjike',
        role: { sq: 'Muret Ciklopike', en: 'Cyclopean Walls' },
        detail: {
          sq: 'Mure masive guri pa llaç — të gjetura në Mikenë, Tirint dhe në të gjithë Ballkanin jugor — që autorët antik ia atribuonin pellazgëve.',
          en: 'Massive unmortared stone walls — found at Mycenae, Tiryns, and across the southern Balkans — attributed by ancient authors to the Pelasgians.',
        },
      },
      {
        name: 'Teoria Pellazge',
        role: { sq: 'Teoria Pellazge', en: 'Pelasgian Theory' },
        detail: {
          sq: 'Hipoteza, e përparuar nga gjuhëtari austriak Johann Georg von Hahn dhe dijetarët shqiptarë, se shqipja rrjedh nga gjuha e lashtë pellazge.',
          en: 'The hypothesis, advanced by Austrian linguist Johann Georg von Hahn and Albanian scholars, that Albanian descends from the ancient Pelasgian language.',
        },
      },
      {
        name: 'Etruria & Egjeu',
        role: { sq: 'Lidhjet Egjeane', en: 'Aegean Connections' },
        detail: {
          sq: 'Herodoti dhe shkrimtarë të tjerë klasikë lidhën pellazgët me Etrurinë e hershme, Limnosin dhe Egjeun — një rrjet i gjerë kulturor para-helenik.',
          en: 'Herodotus and other classical writers linked the Pelasgians to early Etruria, Lemnos, and the Aegean — a wide pre-Hellenic cultural web.',
        },
      },
    ],
    events: [
      { year: 'rreth 4000 p.e.s.', title: { sq: 'Vendbanimet e Hershme', en: 'Early Settlements' }, desc: { sq: 'Kultura megalitike shtrihen nëpër Ballkanin perëndimor dhe basenin e Egjeut.', en: 'Megalithic cultures spread across the western Balkans and Aegean basin.' } },
      { year: 'rreth 1600 p.e.s.', title: { sq: 'Arkitektura Ciklopike', en: 'Cyclopean Architecture' }, desc: { sq: 'Mure monumentale në stil pellazgjik ngrihen në botën mikenaske.', en: 'Pelasgian-style monumental walls rise across the Mycenaean world.' } },
      { year: 'rreth 1200 p.e.s.', title: { sq: 'Rrëzimi i Epokës së Bronzit', en: 'Bronze Age Collapse' }, desc: { sq: 'Tronditja e madhe riformëson Mesdheun lindor; identiteti pellazgjik shkrihet në mit.', en: 'Great upheaval reshapes the eastern Mediterranean; Pelasgian identity fades into myth.' } },
      { year: '1854', title: { sq: 'Teza e Hahn-it', en: 'Hahn\u2019s Thesis' }, desc: { sq: 'Johann Georg von Hahn formalizon teorinë gjuhësore pellazgo-shqiptare.', en: 'Johann Georg von Hahn formalizes the Pelasgian-Albanian linguistic theory.' } },
    ],
    accent: 'gold',
  },
  {
    id: 'illyrians',
    index: 'II',
    name: { sq: 'Ilirët & Dardanët', en: 'The Illyrians & Dardanians' },
    period: 'rreth 1000 p.e.s. – 168',
    tagline: {
      sq: 'Mbretëritë fisnore të Ballkanit perëndimor — nga Bardhyli te Mbretëresha Teuta.',
      en: 'Tribal kingdoms of the western Balkans — from Bardhyli to Queen Teuta.',
    },
    image: '/images/illyrians.jpg',
    intro: {
      sq: 'Ilirët ishin një kushtëzim fisnore që banonte në Ballkanin perëndimor. Ndër më të fuqishmit ishin dardanët, të zemra e të cilëve ndodhej në Kosovën e sotme dhe që sfidonin vazhdimisht Maqedoninë. Mbretëreshat dhe mbretërit ilirë bënë luftëra në tokë dhe në det — derisa Roma, pas tre Luftërave Ilire të vështira, i bashkoi tokat e tyre në perandori.',
      en: 'The Illyrians were a constellation of tribes inhabiting the western Balkans. Among the most powerful were the Dardani, whose heartland lay in modern Kosovo and who repeatedly challenged Macedonia. Illyrian queens and kings waged wars on land and sea — until Rome, after three hard Illyrian Wars, finally absorbed their lands into empire.',
    },
    figures: [
      {
        name: 'Bardhyli',
        role: { sq: 'Mbret i Dardanisë', en: 'King of Dardania' },
        detail: {
          sq: 'Mbreti "Ylli i Bardhë" që drejtoi Dardaninë rreth 385–358 p.e.s. dhe luftoi vazhdimisht kundër Filipit II të Maqedonisë.',
          en: 'The "White-Star" king who ruled Dardania c. 385–358 BCE and fought repeated wars against Philip II of Macedon.',
        },
      },
      {
        name: 'Teuta',
        role: { sq: 'Mbretëreshë Regjente e Ardiaeëve', en: 'Queen Regent of the Ardiaei' },
        detail: {
          sq: 'Mbretëresha Teuta (r. 231–227 p.e.s.) sfidoi Romën në det, duke provokuar Luftën e Parë Ilire. Qëndresa e saj u bë simbol i rezistencës.',
          en: 'Queen Teuta (r. 231–227 BCE) defied Rome at sea, provoking the First Illyrian War. Her defiance became a symbol of resistance.',
        },
      },
      {
        name: 'Genti',
        role: { sq: 'Mbreti i Fundit i Ilirisë', en: 'Last King of Illyria' },
        detail: {
          sq: 'Mbreti Genti (r. 181–168 p.e.s.) u mposht nga Roma në Luftën e Tretë Ilire, duke i dhënë fund mbretërisë ilire të pavarur.',
          en: 'King Gentius (r. 181–168 BCE) was defeated by Rome in the Third Illyrian War, ending the independent Illyrian kingdom.',
        },
      },
      {
        name: 'Dardanët',
        role: { sq: 'Dardania', en: 'The Dardani' },
        detail: {
          sq: 'Një fis i fuqishëm ilir i qendruar në Kosovën dhe Serbinë jugore të sotme, i njohur për kalorësinë dhe pavarësinë e ashpër.',
          en: 'A powerful Illyrian tribe centered in modern Kosovo and southern Serbia, known for their cavalry and fierce independence.',
        },
      },
    ],
    events: [
      { year: 'rreth 1000 p.e.s.', title: { sq: 'Formimi Ilir', en: 'Illyrian Formation' }, desc: { sq: 'Kultura fisnore ilire kristalizohet në Ballkanin perëndimor.', en: 'Illyrian tribal culture crystallizes across the western Balkans.' } },
      { year: '385 p.e.s.', title: { sq: 'Bardhyli kundër Maqedonisë', en: 'Bardhyli vs. Macedonia' }, desc: { sq: 'Forcat dardane mposhtin një ushtri maqedonase, duke vendosur fuqinë rajonale.', en: 'Dardanian forces defeat a Macedonian army, asserting regional power.' } },
      { year: '229 p.e.s.', title: { sq: 'Lufta e Parë Ilire', en: 'First Illyrian War' }, desc: { sq: 'Roma ndërhyn kundër Mbretëreshës Teuta, duke filluar fundin e pavarësisë ilire.', en: 'Rome intervenes against Queen Teuta, beginning the end of Illyrian independence.' } },
      { year: '168 p.e.s.', title: { sq: 'Rrëzimi i Mbretit Genti', en: 'Fall of King Gentius' }, desc: { sq: 'Roma mposht mbretin e fundit ilir; mbretëria bëhet territor romak.', en: 'Rome defeats the last Illyrian king; the kingdom becomes Roman territory.' } },
      { year: '9 e.s.', title: { sq: 'Kryengritja e Madhe Ilire', en: 'Great Illyrian Revolt' }, desc: { sq: 'Një kryengritje masive e fiseve ilire gati theu kontrollin romak — e shtypur pas tre vjetësh.', en: 'A massive uprising of Illyrian tribes nearly breaks Roman control — crushed after three years.' } },
    ],
    accent: 'crimson',
  },
  {
    id: 'arberia',
    index: 'III',
    name: { sq: 'Arbëria', en: 'Arbëria' },
    period: 'rreth 1100 – 1500',
    tagline: {
      sq: 'Mesjeta — Skënderbeu, Lidhja e Lezhës dhe qëndresa kundër perandorisë.',
      en: 'The Middle Ages — Skanderbeg, the League of Lezha, and defiance against empire.',
    },
    image: '/images/arberia.jpg',
    intro: {
      sq: 'Në shekujt e mesjetës tokat shqiptare njiheshin si Arbëria, dhe populli i tyre si arbëreshë. Principata e Arbërit doli në shekullin e 12-të, por ishte shekulli i 15-të që kurorëzoi sagën kombëtare: Gjergj Kastrioti — Skënderbeu — bashkoi zotërit shqiptarë në Lidhjen e Lezhës (1444) dhe mbajti marshin osman në këmbë për një çerek shekulli.',
      en: 'In the medieval centuries the Albanian lands were known as Arbëria, and their people as Arbëreshë. The Principality of Arbër emerged in the 12th century, but it was the 15th century that crowned the national saga: Gjergj Kastrioti — Skanderbeg — united the Albanian lords at the League of Lezha (1444) and held the Ottoman advance at bay for a quarter-century.',
    },
    figures: [
      {
        name: 'Gjergj Kastrioti Skënderbeu',
        role: { sq: 'Zot i Shqipërisë', en: 'Lord of Albania' },
        detail: {
          sq: 'Gjergj Kastrioti (1405–1468), i quajtur Skënderbeu, drejtoi rezistencën shqiptare kundër osmanëve për 25 vjet pa u mposhtur. Një hero i lavdëruar nga Roma në Londër.',
          en: 'Gjergj Kastrioti (1405–1468), called Skanderbeg, led the Albanian resistance against the Ottomans for 25 years without defeat. A hero celebrated from Rome to London.',
        },
      },
      {
        name: 'Lidhja e Lezhës',
        role: { sq: 'Lidhja e Lezhës', en: 'League of Lezha' },
        detail: {
          sq: 'Aleanca e vitit 1444 e zotërive shqiptarë e farkëtuar nga Skënderbeu — një komandë e bashkuar ushtarake dhe politike, e konsideruar shteti i parë shqiptar.',
          en: 'The 1444 alliance of Albanian nobles forged by Skanderbeg — a unified military and political command considered the first Albanian state.',
        },
      },
      {
        name: 'Progoni',
        role: { sq: 'Principata e Arbërit', en: 'Principality of Arbër' },
        detail: {
          sq: 'Familja Progon drejtoi Principatën e Arbërit (1190–1255), shteti i parë shqiptar në regjistrin historik.',
          en: 'The Progon family ruled the Principality of Arbër (1190–1255), the first Albanian state in the historical record.',
        },
      },
      {
        name: 'Marin Barleti',
        role: { sq: 'Kronikan', en: 'Chronicler' },
        detail: {
          sq: 'Prifti i shekullit të 16-të nga Shkodra, vepra e të cilit "Historia e Skënderbeut" përhapi famën e heroit shqiptar në të gjithë Evropën.',
          en: 'The 16th-century priest from Shkodra whose "History of Skanderbeg" spread the Albanian hero\u2019s fame across Europe.',
        },
      },
    ],
    events: [
      { year: '1190', title: { sq: 'Principata e Arbërit', en: 'Principality of Arbër' }, desc: { sq: 'Arkon Progon themelon principatën e parë shqiptare të regjistruar.', en: 'Archon Progon founds the first recorded Albanian principality.' } },
      { year: '1443', title: { sq: 'Kthimi i Skënderbeut', en: 'Skanderbeg Returns' }, desc: { sq: 'Gjergj Kastrioti braktis osmanët në Nish dhe rimerr Krujën.', en: 'Gjergj Kastrioti abandons the Ottomans at Niš and reclaims Kruja.' } },
      { year: '1444', title: { sq: 'Lidhja e Lezhës', en: 'League of Lezha' }, desc: { sq: 'Zotërit shqiptarë bashkohen nën Skënderbeun kundër kërcënimit osman.', en: 'Albanian nobles unite under Skanderbeg against the Ottoman threat.' } },
      { year: '1450', title: { sq: 'Rrethimi i Parë i Krujës', en: 'First Siege of Kruja' }, desc: { sq: 'Skënderbeu zmbraps ushtrinë e Sulltan Muratit II në Kalanë e Krujës.', en: 'Skanderbeg repels Sultan Murad II\u2019s army at Kruja Castle.' } },
      { year: '1468', title: { sq: 'Vdekja e Skënderbeut', en: 'Death of Skanderbeg' }, desc: { sq: 'Dragoi i Shqipërisë vdes në Lezhë; rezistenca gradualisht dobësohet.', en: 'The Dragon of Albania dies at Lezha; resistance gradually falters.' } },
      { year: '1479', title: { sq: 'Rënia e Shkodrës', en: 'Fall of Shkodra' }, desc: { sq: 'Pas rrethimesh të gjata, Shkodra bie — duke i dhënë fund rezistencës shqiptare të organizuar.', en: 'After long sieges, Shkodra falls — ending organized Albanian resistance.' } },
    ],
    accent: 'crimson',
  },
  {
    id: 'rilindja',
    index: 'IV',
    name: { sq: 'Rilindja & Pavarësia', en: 'The Awakening & Independence' },
    period: '1830 – 1912',
    tagline: {
      sq: 'Zgjimi i shekullit të 19-të — letra, lidhje dhe flamuri i vitit 1912.',
      en: 'The 19th-century awakening — letters, leagues, and the flag of 1912.',
    },
    image: '/images/rilindja.jpg',
    intro: {
      sq: 'Pas shekujsh sundimi osman, zgjimi kombëtar shqiptar — Rilindja Kombëtare — lindi në letra dhe në lidhje. Poetët dhe dijetarët rikuperuan gjuhën dhe të kaluarën; Lidhja e Prizrenit (1878) mbrojti tokat nga ndarja. Lufta kulmoi më 28 nëntor 1912, kur Ismail Qemali ngriti flamurin me shqiponjën dykrenare në Vlorë dhe shpalli Shqipërinë të pavarur.',
      en: 'After centuries of Ottoman rule, the Albanian national awakening — Rilindja Kombëtare — was born in letters and in leagues. Poets and scholars recovered the language and the past; the League of Prizren (1878) defended the lands from partition. The struggle culminated on 28 November 1912, when Ismail Qemali raised the flag with the double-headed eagle in Vlorë and declared Albania independent.',
    },
    figures: [
      {
        name: 'Lidhja e Prizrenit',
        role: { sq: 'Lidhja e Prizrenit', en: 'League of Prizren' },
        detail: {
          sq: 'Themeluar më 10 qershor 1878, Lidhja e Prizrenit bashkoi drejtuesit shqiptarë për t\u2019i kundërshtuar Traktatin e San Stefanos dhe për të mbrojtur tokat shqiptare.',
          en: 'Founded 10 June 1878, the League of Prizren united Albanian leaders to oppose the Treaty of San Stefano and defend Albanian-inhabited lands.',
        },
      },
      {
        name: 'Naim Frashëri',
        role: { sq: 'Poet Kombëtar', en: 'National Poet' },
        detail: {
          sq: 'Naim Frashëri (1846–1900), autor i "Bagëti e Bujqësi" dhe epopesë "Istori e Skënderbeut", i dha zgjimit shpirtin lirik.',
          en: 'Naim Frashëri (1846–1900), author of "Bagëti e Bujqësi" and the epic "Istori e Skënderbeut", gave the awakening its lyrical soul.',
        },
      },
      {
        name: 'Ismail Qemali',
        role: { sq: 'Ati i Pavarësisë', en: 'Father of Independence' },
        detail: {
          sq: 'Ismail Qemali (1844–1919) drejtoi delegacionin që shpalli pavarësinë shqiptare në Vlorë më 28 nëntor 1912 dhe ngriti flamurin kombëtar.',
          en: 'Ismail Qemali (1844–1919) led the delegation that declared Albanian independence in Vlorë on 28 November 1912 and raised the national flag.',
        },
      },
      {
        name: 'Abdyl Frashëri',
        role: { sq: 'Burrit shteti i Prizrenit', en: 'Statesman of Prizren' },
        detail: {
          sq: 'Abdyl Frashëri, vëllai i madh i Naim it, ishte një figurë qendrore politike e Lidhjes së Prizrenit dhe pionier i organizimit politik shqiptar.',
          en: 'Abdyl Frashëri, elder brother of Naim, was a central political figure of the League of Prizren and a pioneer of Albanian political organization.',
        },
      },
      {
        name: 'Sami Frashëri',
        role: { sq: 'Intelektual Vizionar', en: 'Visionary Intellectual' },
        detail: {
          sq: 'Sami Frashëri (1850–1904), autor i "Shqipëria — Ç\u2019ka qenë, ç\u2019është e ç\u2019do të bëhetë", imagjinoi një Shqipëri të ardhshme demokratike.',
          en: 'Sami Frashëri (1850–1904), author of "Shqipëria — Ç\u2019ka qenë, ç\u2019është e ç\u2019do të bëhetë", imagined a future democratic Albania.',
        },
      },
    ],
    events: [
      { year: '1830', title: { sq: 'Fillon Zgjimi Shqiptar', en: 'Albanian Awakening Begins' }, desc: { sq: 'Rilindja kulturore dhe gjuhësore zgjohet mes intelektualëve shqiptarë të perandorisë.', en: 'Cultural and linguistic revival stirs among Albanian intellectuals of the empire.' } },
      { year: '1878', title: { sq: 'Lidhja e Prizrenit', en: 'League of Prizren' }, desc: { sq: 'Drejtuesit shqiptarë mblidhen në Prizren për të mbrojtur territorin kombëtar nga ndarja.', en: 'Albanian leaders gather in Prizren to defend national territory from partition.' } },
      { year: '1886', title: { sq: 'Shkolla e Parë Shqipe', en: 'First Albanian School' }, desc: { sq: 'Shkolla e parë laike shqipe hapet në Korçë.', en: 'The first secular Albanian-language school opens in Korçë.' } },
      { year: '1908', title: { sq: 'Kongresi i Manastirit', en: 'Manastir Congress' }, desc: { sq: 'Dijetarët standardizojnë alfabetin shqip në një skript të vetëm latin.', en: 'Scholars standardize the Albanian alphabet in a single Latin script.' } },
      { year: '28 Nën 1912', title: { sq: 'Shpallja e Pavarësisë', en: 'Declaration of Independence' }, desc: { sq: 'Ismail Qemali ngrit flamurin në Vlorë dhe shpall Shqipërinë shtet i pavarur.', en: 'Ismail Qemali raises the flag in Vlorë and declares Albania an independent state.' } },
    ],
    accent: 'gold',
  },
  {
    id: 'kosova',
    index: 'V',
    name: { sq: 'Kosova & Shqipëria Modernë', en: 'Kosova & Modern Albania' },
    period: '1912 – Sot',
    tagline: {
      sq: 'UÇK-ja, ndërhyrja e NATO-s dhe flamuri i ngritur në Prishtinë, 2008.',
      en: 'The UÇK, NATO intervention, and the flag raised in Pristina, 2008.',
    },
    image: '/images/kosova.jpg',
    intro: {
      sq: 'Shekulli i 20-të solli mbretëri, okupim, izolim dhe rënie. Pas rënies së komunizmit në 1991, Shqipëria gjeti demokracinë ndërsa Kosova duroi represionin serb. Në 1998–1999 Ushtria Çlirimtare e Kosovës (UÇK) u ngrit; NATO ndërhyri; dhe më 17 shkurt 2008, Kosova shpalli pavarësinë — kapitulli më i ri në një sagë më e vjetër se tre mijë vjet.',
      en: 'The 20th century brought kingdom, occupation, isolation, and collapse. After the fall of communism in 1991, Albania found democracy while Kosovo endured Serbian repression. In 1998–1999 the Kosovo Liberation Army (UÇK) rose; NATO intervened; and on 17 February 2008, Kosovo declared independence — the newest chapter in a saga older than three thousand years.',
    },
    figures: [
      {
        name: 'UÇK',
        role: { sq: 'Ushtria Çlirimtare e Kosovës', en: 'Kosovo Liberation Army' },
        detail: {
          sq: 'Ushtria Çlirimtare e Kosovës (1996–1999) zhvilloi luftën e armatosur që, me mbështetjen e NATO-s, i dha fund sundimit serb në Kosovë.',
          en: 'The Ushtria Çlirimtare e Kosovës (1996–1999) waged the armed struggle that, with NATO support, ended Serbian rule in Kosovo.',
        },
      },
      {
        name: 'Adem Jashari',
        role: { sq: 'Themeluesi i UÇK-së', en: 'Founder of UÇK' },
        detail: {
          sq: 'Adem Jashari (1955–1998), vrarë me familjen e tij në masakrën e Prekazit, u bë figura legjendare themeluese e UÇK-së.',
          en: 'Adem Jashari (1955–1998), killed with his family in the Prekaz massacre, became the legendary founding figure of the UÇK.',
        },
      },
      {
        name: 'Ibrahim Rugova',
        role: { sq: 'President i Kosovës', en: 'President of Kosovo' },
        detail: {
          sq: 'Ibrahim Rugova (1944–2006), "Gandhi i Ballkanit", drejtoi rezistencën paqësore të Kosovës gjatë viteve 1990.',
          en: 'Ibrahim Rugova (1944–2006), the "Gandhi of the Balkans", led Kosovo\u2019s nonviolent resistance through the 1990s.',
        },
      },
      {
        name: 'Hashim Thaçi',
        role: { sq: 'Lideri i Epokës së Pavarësisë', en: 'Independence Era Leader' },
        detail: {
          sq: 'Një lider politik i UÇK-së dhe më vonë Kryeministër dhe President, Thaçi ishte qendror në rrugën e Kosovës drejt shpalljes së 2008.',
          en: 'A UÇK political leader and later Prime Minister and President, Thaçi was central to Kosovo\u2019s path to the 2008 declaration.',
        },
      },
    ],
    events: [
      { year: '1928', title: { sq: 'Mbretëria Shqiptare', en: 'Albanian Kingdom' }, desc: { sq: 'Ahmet Zogu e kurorëzohet Mbret Zog I i Shqiptarëve.', en: 'Ahmet Zogu crowns himself King Zog I of the Albanians.' } },
      { year: '1944', title: { sq: 'Sundimi Komunist', en: 'Communist Rule' }, desc: { sq: 'Partizanët e Enver Hoxhës marrin pushtetin, duke filluar dekada izolimi.', en: 'Enver Hoxha\u2019s partisans take power, beginning decades of isolation.' } },
      { year: '1991', title: { sq: 'Rënia e Komunizmit', en: 'Fall of Communism' }, desc: { sq: 'Regjimi i Shqipërisë rrëzohet; vendi hapet ndaj botës.', en: 'Albania\u2019s regime collapses; the country opens to the world.' } },
      { year: '1998', title: { sq: 'Fillon Lufta e Kosovës', en: 'Kosovo War Begins' }, desc: { sq: 'UÇK ngritet kundër forcave serbe; konflikti përfshin Kosovën.', en: 'The UÇK rises against Serbian forces; conflict engulfs Kosovo.' } },
      { year: '1999', title: { sq: 'Ndërhyrja e NATO-s', en: 'NATO Intervention' }, desc: { sq: '78 ditë goditje ajrore të NATO-s i japin fund kontrollit serb; fillon administrimi i OKB.', en: '78 days of NATO airstrikes end Serbian control; UN administration begins.' } },
      { year: '17 Shk 2008', title: { sq: 'Pavarësia e Kosovës', en: 'Kosovo Independence' }, desc: { sq: 'Kuvendi i Kosovës shpall pavarësinë — e njohur nga mbi 100 shtete.', en: 'Kosovo\u2019s parliament declares independence — recognized by over 100 states.' } },
      { year: '2009', title: { sq: 'Shqipëria në NATO', en: 'Albania in NATO' }, desc: { sq: 'Republika e Shqipërisë i bashkohet Aleancës së Atlantikut të Veriut.', en: 'The Republic of Albania joins the North Atlantic Alliance.' } },
    ],
    accent: 'crimson',
  },
]

/* ============================================================
   Double-headed eagle SVG motif (stylized Albanian flag)
   ============================================================ */
function DoubleEagle({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M88 30c-3 4-4 9-3 14-5-2-10-1-14 3 4 3 9 4 14 3-2 5-1 10 3 14l8-9c2 6 6 10 12 12-1-6-3-11-7-15 5 1 10-1 13-5-5-3-11-3-16 0 1-6 0-12-4-17l-6 14z" />
      <path d="M112 30c3 4 4 9 3 14 5-2 10-1 14 3-4 3-9 4-14 3 2 5 1 10-3 14l-8-9c-2 6-6 10-12 12 1-6 3-11 7-15-5 1-10-1-13-5 5-3 11-3 16 0-1-6 0-12 4-17l6 14z" />
      <path d="M100 52c-8 8-12 18-12 28 0 6 2 12 6 17-6 2-11 6-14 12-4 8-2 17 4 23-7 3-12 9-14 16-2 8 1 16 7 21-5 4-8 11-7 18 1 8 7 14 15 16 1 7 6 12 13 14 4 1 8 0 12-2 4 2 8 3 12 2 7-2 12-7 13-14 8-2 14-8 15-16 1-7-2-14-7-18 6-5 9-13 7-21-2-7-7-13-14-16 6-6 8-15 4-23-3-6-8-10-14-12 4-5 6-11 6-17 0-10-4-20-12-28l-10 10-10-10z" />
      <path d="M88 75c-14 6-26 16-34 28-3 5-4 11-3 16 6-3 11-7 15-12-1 6-1 12 1 17 4-4 7-9 9-15 2 7 6 13 11 18 1-8 0-15-3-22 5 3 11 4 17 3-4-6-9-11-16-14 4-5 6-12 6-19-2 1-3 1-5 2-2-3-3-7-3-11z" />
      <path d="M112 75c14 6 26 16 34 28 3 5 4 11 3 16-6-3-11-7-15-12 1 6 1 12-1 17-4-4-7-9-9-15-2 7-6 13-11 18-1-8 0-15 3-22-5 3-11 4-17 3 4-6 9-11 16-14-4-5-6-12-6-19 2 1 3 1 5 2 2-3 3-7 3-11z" />
      <path d="M100 150l-6 24h12l-6-24z" />
    </svg>
  )
}

/* ============================================================
   Language toggle button
   ============================================================ */
function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="flex items-center border border-white/25 rounded-sm overflow-hidden text-xs font-[family-name:var(--font-cinzel)] font-semibold tracking-wider">
      <button
        onClick={() => setLang('sq')}
        className={`px-2.5 py-1.5 transition-colors ${
          lang === 'sq' ? 'bg-[#E41E20] text-white' : 'text-white/70 hover:bg-white/10'
        }`}
        aria-pressed={lang === 'sq'}
      >
        SQ
      </button>
      <button
        onClick={() => setLang('en')}
        className={`px-2.5 py-1.5 transition-colors ${
          lang === 'en' ? 'bg-[#E41E20] text-white' : 'text-white/70 hover:bg-white/10'
        }`}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>
    </div>
  )
}

/* ============================================================
   MAIN PAGE
   ============================================================ */
export default function Home() {
  const [lang, setLang] = useState<Lang>('sq')
  const [activeSection, setActiveSection] = useState<string>('hero')
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const t = (key: Bi) => key[lang]

  /* --- Smooth scroll to a section --- */
  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setMobileOpen(false)
  }, [])

  /* --- Track scroll position for nav style + scroll-spy --- */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = ['hero', ...NAV_ITEMS.map((n) => n.id)]
      const offset = window.innerHeight * 0.35
      let current = 'hero'
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const top = el.getBoundingClientRect().top
          if (top - offset <= 0) current = id
        }
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* --- IntersectionObserver for reveal animations --- */
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    )
    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* ===================== NAV ===================== */}
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/90 backdrop-blur-md shadow-lg shadow-black/30 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-3 group"
            aria-label={t(UI.topAria)}
          >
            <DoubleEagle className="w-7 h-7 text-[#E41E20] group-hover:text-[#ff3b3d] transition-colors flex-shrink-0" />
            <span className="font-[family-name:var(--font-cinzel)] text-white text-xs sm:text-base lg:text-lg font-semibold tracking-wider hidden sm:block">
              {t(UI.siteName)}
            </span>
          </button>

          {/* Desktop nav + lang toggle */}
          <div className="hidden lg:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link text-sm font-medium tracking-wide transition-colors whitespace-nowrap ${
                  activeSection === item.id
                    ? 'text-white is-active'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {t(item.label)}
              </button>
            ))}
            <LangToggle lang={lang} setLang={setLang} />
          </div>

          {/* Mobile: lang toggle + hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <LangToggle lang={lang} setLang={setLang} />
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="text-white p-2 -mr-2"
              aria-label={t(UI.menuAria)}
              aria-expanded={mobileOpen}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <path d="M3 6h18M3 12h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-black/95 backdrop-blur-md border-t border-white/10">
            <div className="px-4 py-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`text-left px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                    activeSection === item.id
                      ? 'bg-[#E41E20] text-white'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  {t(item.label)}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* ===================== HERO ===================== */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink"
      >
        <div className="absolute inset-0">
          <img
            src="/images/hero.jpg"
            alt={lang === 'sq' ? 'Malet e Ballkanit në mëngjes' : 'Balkan mountains at dawn'}
            className="w-full h-full object-cover animate-slow-zoom opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
        </div>

        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E41E20] to-transparent" />

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-20 pb-16">
          <div className="flex justify-center mb-8 reveal is-visible">
            <DoubleEagle className="w-28 h-28 sm:w-36 sm:h-36 text-[#E41E20] eagle-pulse" />
          </div>

          <p className="font-[family-name:var(--font-cinzel)] text-[#c9a227] tracking-[0.3em] text-xs sm:text-sm uppercase mb-6">
            {t(UI.overline)}
          </p>

          <h1 className="font-[family-name:var(--font-cinzel)] text-white text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            {lang === 'sq' ? (
              <>
                KRONIKA E
                <br />
                <span className="text-[#E41E20]">SHQIPTARËVE</span>
              </>
            ) : (
              <>
                CHRONICLE OF THE
                <br />
                <span className="text-[#E41E20]">ALBANIANS</span>
              </>
            )}
          </h1>

          <div className="divider-gold w-48 mx-auto mb-6" />

          <p className="text-white/80 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed mb-10 font-light">
            {t(UI.subtitle)}
          </p>

          <button
            onClick={() => scrollTo('pelasgians')}
            className="inline-flex items-center gap-2 bg-[#E41E20] hover:bg-[#ff3b3d] text-white font-[family-name:var(--font-cinzel)] font-semibold tracking-wider px-8 py-4 rounded-sm transition-all duration-300 shadow-lg shadow-[#E41E20]/30 hover:shadow-[#E41E20]/50 hover:scale-105"
          >
            {t(UI.beginJourney)}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </button>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/50 text-xs tracking-widest uppercase">{t(UI.scroll)}</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* ===================== INTRO STRIP ===================== */}
      <section className="bg-crimson-banner py-12 sm:py-16 texture-grain relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <p className="font-[family-name:var(--font-cinzel)] text-white text-xl sm:text-2xl lg:text-3xl font-medium leading-relaxed italic">
            &ldquo;{t(UI.stripQuote)}&rdquo;
          </p>
          <p className="text-white/70 mt-4 text-sm tracking-wider">{t(UI.stripAttr)}</p>
        </div>
      </section>

      {/* ===================== ERA SECTIONS ===================== */}
      <main className="flex-1 texture-parchment">
        {ERAS.map((era, i) => (
          <EraSection key={era.id} era={era} index={i} lang={lang} t={t} />
        ))}
      </main>

      {/* ===================== FOOTER ===================== */}
      <footer className="bg-ink text-white relative overflow-hidden">
        <div className="divider-gold w-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center text-center md:text-left">
            <div className="flex flex-col items-center md:items-start gap-3">
              <DoubleEagle className="w-12 h-12 text-[#E41E20]" />
              <h3 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold tracking-wider">
                {t(UI.siteName)}
              </h3>
            </div>

            <div className="text-center">
              <p className="text-white/70 italic text-sm leading-relaxed">
                &ldquo;{t(UI.footerQuote)}&rdquo;
              </p>
              <p className="text-[#c9a227] text-xs mt-2 tracking-wider">{t(UI.footerQuoteAttr)}</p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2">
              <p className="text-white/50 text-xs uppercase tracking-widest mb-1">{t(UI.footerExplore)}</p>
              <div className="flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-1">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="text-white/60 hover:text-[#E41E20] text-xs transition-colors"
                  >
                    {t(item.label)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="divider-gold w-full mt-10 mb-6 opacity-50" />

          <div className="text-center text-white/40 text-xs tracking-wider">
            <p>{t(UI.footerNote)}</p>
            <p className="mt-2">{t(UI.footerNote2)}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

/* ============================================================
   ERA SECTION component
   ============================================================ */
function EraSection({
  era,
  index,
  lang,
  t,
}: {
  era: Era
  index: number
  lang: Lang
  t: (key: Bi) => string
}) {
  const isEven = index % 2 === 0
  const accentColor = era.accent === 'crimson' ? '#E41E20' : '#c9a227'

  return (
    <section
      id={era.id}
      className={`relative overflow-hidden ${isEven ? 'texture-parchment' : 'bg-[#f3efe6]'}`}
    >
      <span
        className="absolute top-8 right-4 sm:right-12 font-[family-name:var(--font-cinzel)] font-bold text-[120px] sm:text-[200px] leading-none select-none pointer-events-none"
        style={{ color: accentColor, opacity: 0.06 }}
      >
        {era.index}
      </span>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 relative z-10">
        {/* Section header */}
        <div className="mb-14 reveal">
          <div className="flex items-center gap-3 mb-3">
            <span
              className="font-[family-name:var(--font-cinzel)] text-sm font-bold tracking-[0.2em]"
              style={{ color: accentColor }}
            >
              {lang === 'sq' ? 'EPISODI' : 'EPISODE'} {era.index}
            </span>
            <span className="h-px flex-1 max-w-[80px]" style={{ background: accentColor }} />
            <span className="text-xs text-black/50 tracking-wider uppercase">{era.period}</span>
          </div>

          <h2 className="font-[family-name:var(--font-cinzel)] text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight mb-2">
            {t(era.name)}
          </h2>
          <p className="text-black/70 text-lg sm:text-xl max-w-3xl leading-relaxed font-light">
            {t(era.tagline)}
          </p>
        </div>

        {/* Image + intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-16">
          <div className="reveal reveal-delay-1 order-1">
            <div className="relative group">
              <div
                className="absolute -inset-2 border-2 pointer-events-none"
                style={{ borderColor: accentColor }}
              />
              <div className="relative overflow-hidden">
                <img
                  src={era.image}
                  alt={t(era.name)}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
          </div>

          <div className="reveal reveal-delay-2 order-2">
            <p className="text-black/80 text-base sm:text-lg leading-relaxed">{t(era.intro)}</p>
          </div>
        </div>

        {/* Figures */}
        <div className="mb-16">
          <h3 className="font-[family-name:var(--font-cinzel)] text-2xl sm:text-3xl font-semibold text-black mb-8 flex items-center gap-4 reveal">
            <span className="inline-block w-2 h-8" style={{ background: accentColor }} />
            {lang === 'sq' ? 'Figurat & Simbolet' : 'Figures & Symbols'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {era.figures.map((fig, fi) => (
              <div
                key={fig.name}
                className={`reveal reveal-delay-${(fi % 3) + 1} bg-white/70 backdrop-blur-sm border border-black/10 rounded-sm p-6 hover:shadow-xl transition-all duration-300 group`}
                style={{ ['--tw-shadow-color' as string]: accentColor }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = accentColor)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(0,0,0,0.1)')}
              >
                <div className="flex items-start gap-4 mb-3">
                  <div
                    className="w-10 h-10 flex-shrink-0 flex items-center justify-center font-[family-name:var(--font-cinzel)] font-bold text-white text-sm rounded-sm"
                    style={{ background: accentColor }}
                  >
                    {fi + 1}
                  </div>
                  <div>
                    <h4 className="font-[family-name:var(--font-cinzel)] font-semibold text-black text-lg leading-tight group-hover:translate-x-1 transition-transform">
                      {fig.name}
                    </h4>
                    <p
                      className="text-xs uppercase tracking-wider mt-1 font-medium"
                      style={{ color: accentColor }}
                    >
                      {t(fig.role)}
                    </p>
                  </div>
                </div>
                <p className="text-black/70 text-sm leading-relaxed">{t(fig.detail)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline events */}
        <div>
          <h3 className="font-[family-name:var(--font-cinzel)] text-2xl sm:text-3xl font-semibold text-black mb-8 flex items-center gap-4 reveal">
            <span className="inline-block w-2 h-8" style={{ background: accentColor }} />
            {lang === 'sq' ? 'Linja e Kohës' : 'Timeline'}
          </h3>

          <div className="relative pl-8 sm:pl-12">
            <div
              className="absolute left-3 sm:left-5 top-2 bottom-2 w-0.5"
              style={{ background: `linear-gradient(to bottom, ${accentColor}, transparent)` }}
            />

            <div className="space-y-6 max-h-[28rem] overflow-y-auto scroll-styled pr-3">
              {era.events.map((evt, ei) => (
                <div key={ei} className={`reveal reveal-delay-${(ei % 3) + 1} relative`}>
                  <div
                    className="absolute -left-[1.45rem] sm:-left-[2.05rem] top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white"
                    style={{ background: accentColor }}
                  />
                  <div className="bg-white/60 backdrop-blur-sm border border-black/10 rounded-sm p-4 hover:shadow-md hover:bg-white transition-all">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-1">
                      <span
                        className="font-[family-name:var(--font-cinzel)] font-bold text-sm tracking-wider"
                        style={{ color: accentColor }}
                      >
                        {evt.year}
                      </span>
                      <h4 className="font-semibold text-black text-base">{t(evt.title)}</h4>
                    </div>
                    <p className="text-black/70 text-sm leading-relaxed">{t(evt.desc)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
