'use client'

import { useEffect, useRef, useState, useCallback } from 'react'

/* ============================================================
   DATA: The five eras of Albanian history
   ============================================================ */
type Era = {
  id: string
  index: string
  name: string
  nameEn: string
  period: string
  tagline: string
  image: string
  intro: string
  figures: { name: string; role: string; detail: string }[]
  events: { year: string; title: string; desc: string }[]
  accent: 'crimson' | 'gold'
}

const ERAS: Era[] = [
  {
    id: 'pelasgians',
    index: 'I',
    name: 'Pellazgët',
    nameEn: 'The Pelasgians',
    period: 'c. 4000 BCE – 1200 BCE',
    tagline: 'The pre-Hellenic foundation — myth, stone, and the roots of a language.',
    image: '/images/pelasgians.jpg',
    intro:
      'Before the Hellenes, before the city-states, the Pelasgians walked the Balkans and the Aegean. These enigmatic builders raised cyclopean walls and left traces in myth and stone. For Albanian historiography, the Pelasgian theory offers a bridge: a link between the oldest language of the peninsula and the Albanian tongue that survives today.',
    figures: [
      {
        name: 'Muret Pelasgjike',
        role: 'Cyclopean Walls',
        detail:
          'Massive unmortared stone walls — found at Mycenae, Tiryns, and across the southern Balkans — attributed by ancient authors to the Pelasgians.',
      },
      {
        name: 'Teoria Pellazge',
        role: 'Pelasgian Theory',
        detail:
          'The hypothesis, advanced by Austrian linguist Johann Georg von Hahn and Albanian scholars, that Albanian descends from the ancient Pelasgian language.',
      },
      {
        name: 'Etruria & Egjeu',
        role: 'Aegean Connections',
        detail:
          'Herodotus and other classical writers linked the Pelasgians to early Etruria, Lemnos, and the Aegean — a wide pre-Hellenic cultural web.',
      },
    ],
    events: [
      { year: 'c. 4000 BCE', title: 'Early Settlements', desc: 'Megalithic cultures spread across the western Balkans and Aegean basin.' },
      { year: 'c. 1600 BCE', title: 'Cyclopean Architecture', desc: 'Pelasgian-style monumental walls rise across the Mycenaean world.' },
      { year: 'c. 1200 BCE', title: 'Bronze Age Collapse', desc: 'Great upheaval reshapes the eastern Mediterranean; Pelasgian identity fades into myth.' },
      { year: '1854 CE', title: 'Hahn\'s Thesis', desc: 'Johann Georg von Hahn formalizes the Pelasgian-Albanian linguistic theory.' },
    ],
    accent: 'gold',
  },
  {
    id: 'illyrians',
    index: 'II',
    name: 'Ilirët & Dardanët',
    nameEn: 'The Illyrians & Dardanians',
    period: 'c. 1000 BCE – 168 CE',
    tagline: 'Tribal kingdoms of the western Balkans — from Bardhyli to Queen Teuta.',
    image: '/images/illyrians.jpg',
    intro:
      'The Illyrians were a constellation of tribes inhabiting the western Balkans. Among the most powerful were the Dardani, whose heartland lay in modern Kosovo and who repeatedly challenged Macedonia. Illyrian queens and kings waged wars on land and sea — until Rome, after three hard Illyrian Wars, finally absorbed their lands into empire.',
    figures: [
      {
        name: 'Bardhyli',
        role: 'King of Dardania',
        detail:
          'The "White-Star" king who ruled Dardania c. 385–358 BCE and fought repeated wars against Philip II of Macedon.',
      },
      {
        name: 'Teuta',
        role: 'Queen Regent of the Ardiaei',
        detail:
          'Queen Teuta (r. 231–227 BCE) defied Rome at sea, provoking the First Illyrian War. Her defiance became a symbol of resistance.',
      },
      {
        name: 'Genti',
        role: 'Last King of Illyria',
        detail:
          'King Gentius (r. 181–168 BCE) was defeated by Rome in the Third Illyrian War, ending the independent Illyrian kingdom.',
      },
      {
        name: 'Dardanët',
        role: 'The Dardani',
        detail:
          'A powerful Illyrian tribe centered in modern Kosovo and southern Serbia, known for their cavalry and fierce independence.',
      },
    ],
    events: [
      { year: 'c. 1000 BCE', title: 'Illyrian Formation', desc: 'Illyrian tribal culture crystallizes across the western Balkans.' },
      { year: '385 BCE', title: 'Bardhyli vs. Macedonia', desc: 'Dardanian forces defeat a Macedonian army, asserting regional power.' },
      { year: '229 BCE', title: 'First Illyrian War', desc: 'Rome intervenes against Queen Teuta, beginning the end of Illyrian independence.' },
      { year: '168 BCE', title: 'Fall of King Gentius', desc: 'Rome defeats the last Illyrian king; the kingdom becomes Roman territory.' },
      { year: '9 CE', title: 'Great Illyrian Revolt', desc: 'A massive uprising of Illyrian tribes nearly breaks Roman control — crushed after three years.' },
    ],
    accent: 'crimson',
  },
  {
    id: 'arberia',
    index: 'III',
    name: 'Arbëria',
    nameEn: 'Arbër & Arbanon',
    period: 'c. 1100 CE – 1500 CE',
    tagline: 'The Middle Ages — Skanderbeg, the League of Lezha, and defiance against empire.',
    image: '/images/arberia.jpg',
    intro:
      'In the medieval centuries the Albanian lands were known as Arbëria, and their people as Arbëreshë. The Principality of Arbër emerged in the 12th century, but it was the 15th century that crowned the national saga: Gjergj Kastrioti — Skanderbeg — united the Albanian lords at the League of Lezha (1444) and held the Ottoman advance at bay for a quarter-century.',
    figures: [
      {
        name: 'Gjergj Kastrioti Skënderbeu',
        role: 'Lord of Albania',
        detail:
          'Gjergj Kastrioti (1405–1468), called Skanderbeg, led the Albanian resistance against the Ottomans for 25 years without defeat. A hero celebrated from Rome to London.',
      },
      {
        name: 'Lidhja e Lezhës',
        role: 'League of Lezhha',
        detail:
          'The 1444 alliance of Albanian nobles forged by Skanderbeg — a unified military and political command considered the first Albanian state.',
      },
      {
        name: 'Progoni',
        role: 'Principality of Arbër',
        detail:
          'The Progon family ruled the Principality of Arbër (1190–1255), the first Albanian state in the historical record.',
      },
      {
        name: 'Marin Barleti',
        role: 'Chronicler',
        detail:
          'The 16th-century priest from Shkodra whose "History of Skanderbeg" spread the Albanian hero\'s fame across Europe.',
      },
    ],
    events: [
      { year: '1190', title: 'Principality of Arbër', desc: 'Archon Progon founds the first recorded Albanian principality.' },
      { year: '1443', title: 'Skanderbeg Returns', desc: 'Gjergj Kastrioti abandons the Ottomans at Niš and reclaims Kruja.' },
      { year: '1444', title: 'League of Lezha', desc: 'Albanian nobles unite under Skanderbeg against the Ottoman threat.' },
      { year: '1450', title: 'First Siege of Kruja', desc: 'Skanderbeg repels Sultan Murad II\'s army at Kruja Castle.' },
      { year: '1468', title: 'Death of Skanderbeg', desc: 'The Dragon of Albania dies at Lezha; resistance gradually falters.' },
      { year: '1479', title: 'Fall of Shkodra', desc: 'After long sieges, Shkodra falls — ending organized Albanian resistance.' },
    ],
    accent: 'crimson',
  },
  {
    id: 'rilindja',
    index: 'IV',
    name: 'Rilindja & Pavarësia',
    nameEn: 'National Awakening & Independence',
    period: '1830 CE – 1912 CE',
    tagline: 'The 19th-century awakening — letters, leagues, and the flag of 1912.',
    image: '/images/rilindja.jpg',
    intro:
      'After centuries of Ottoman rule, the Albanian national awakening — Rilindja Kombëtare — was born in letters and in leagues. Poets and scholars recovered the language and the past; the League of Prizren (1878) defended the lands from partition. The struggle culminated on 28 November 1912, when Ismail Qemali raised the flag with the double-headed eagle in Vlorë and declared Albania independent.',
    figures: [
      {
        name: 'Lidhja e Prizrenit',
        role: 'League of Prizren',
        detail:
          'Founded 10 June 1878, the League of Prizren united Albanian leaders to oppose the Treaty of San Stefano and defend Albanian-inhabited lands.',
      },
      {
        name: 'Naim Frashëri',
        role: 'National Poet',
        detail:
          'Naim Frashëri (1846–1900), author of "Bagëti e Bujqësi" and the epic "Istori e Skënderbeut", gave the awakening its lyrical soul.',
      },
      {
        name: 'Ismail Qemali',
        role: 'Father of Independence',
        detail:
          'Ismail Qemali (1844–1919) led the delegation that declared Albanian independence in Vlorë on 28 November 1912 and raised the national flag.',
      },
      {
        name: 'Abdyl Frashëri',
        role: 'Statesman of Prizren',
        detail:
          'Abdyl Frashëri, elder brother of Naim, was a central political figure of the League of Prizren and a pioneer of Albanian political organization.',
      },
      {
        name: 'Sami Frashëri',
        role: 'Visionary Intellectual',
        detail:
          'Sami Frashëri (1850–1904), author of "Shqipëria — Ç\'ka qenë, ç\'është e ç\'do të bëhetë", imagined a future democratic Albania.',
      },
    ],
    events: [
      { year: '1830', title: 'Albanian Awakening Begins', desc: 'Cultural and linguistic revival stirs among Albanian intellectuals of the empire.' },
      { year: '1878', title: 'League of Prizren', desc: 'Albanian leaders gather in Prizren to defend national territory from partition.' },
      { year: '1886', title: 'First Albanian School', desc: 'The first secular Albanian-language school opens in Korçë.' },
      { year: '1908', title: 'Manastir Congress', desc: 'Scholars standardize the Albanian alphabet in a single Latin script.' },
      { year: '28 Nov 1912', title: 'Declaration of Independence', desc: 'Ismail Qemali raises the flag in Vlorë and declares Albania an independent state.' },
    ],
    accent: 'gold',
  },
  {
    id: 'kosova',
    index: 'V',
    name: 'Kosova & Shqipëria Modernë',
    nameEn: 'Kosovo & Modern Albania',
    period: '1912 CE – Present',
    tagline: 'The UÇK, NATO intervention, and the flag raised in Pristina, 2008.',
    image: '/images/kosova.jpg',
    intro:
      'The 20th century brought kingdom, occupation, isolation, and collapse. After the fall of communism in 1991, Albania found democracy while Kosovo endured Serbian repression. In 1998–1999 the Kosovo Liberation Army (UÇK) rose; NATO intervened; and on 17 February 2008, Kosovo declared independence — the newest chapter in a saga older than three thousand years.',
    figures: [
      {
        name: 'UÇK',
        role: 'Kosovo Liberation Army',
        detail:
          'The Ushtria Çlirimtare e Kosovës (1996–1999) waged the armed struggle that, with NATO support, ended Serbian rule in Kosovo.',
      },
      {
        name: 'Adem Jashari',
        role: 'Founder of UÇK',
        detail:
          'Adem Jashari (1955–1998), killed with his family in the Prekaz massacre, became the legendary founding figure of the UÇK.',
      },
      {
        name: 'Ibrahim Rugova',
        role: 'President of Kosovo',
        detail:
          'Ibrahim Rugova (1944–2006), the "Gandhi of the Balkans", led Kosovo\'s nonviolent resistance through the 1990s.',
      },
      {
        name: 'Hashim Thaçi',
        role: 'Independence Era Leader',
        detail:
          'A UÇK political leader and later Prime Minister and President, Thaçi was central to Kosovo\'s path to the 2008 declaration.',
      },
    ],
    events: [
      { year: '1928', title: 'Albanian Kingdom', desc: 'Ahmet Zogu crowns himself King Zog I of the Albanians.' },
      { year: '1944', title: 'Communist Rule', desc: 'Enver Hoxha\'s partisans take power, beginning decades of isolation.' },
      { year: '1991', title: 'Fall of Communism', desc: 'Albania\'s regime collapses; the country opens to the world.' },
      { year: '1998', title: 'Kosovo War Begins', desc: 'The UÇK rises against Serbian forces; conflict engulfs Kosovo.' },
      { year: '1999', title: 'NATO Intervention', desc: '78 days of NATO airstrikes end Serbian control; UN administration begins.' },
      { year: '17 Feb 2008', title: 'Kosovo Independence', desc: 'Kosovo\'s parliament declares independence — recognized by over 100 states.' },
      { year: '2009', title: 'Albania in NATO', desc: 'The Republic of Albania joins the North Atlantic Alliance.' },
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
      {/* Left head */}
      <path d="M88 30c-3 4-4 9-3 14-5-2-10-1-14 3 4 3 9 4 14 3-2 5-1 10 3 14l8-9c2 6 6 10 12 12-1-6-3-11-7-15 5 1 10-1 13-5-5-3-11-3-16 0 1-6 0-12-4-17l-6 14z" />
      {/* Right head */}
      <path d="M112 30c3 4 4 9 3 14 5-2 10-1 14 3-4 3-9 4-14 3 2 5 1 10-3 14l-8-9c-2 6-6 10-12 12 1-6 3-11 7-15-5 1-10-1-13-5 5-3 11-3 16 0-1-6 0-12 4-17l6 14z" />
      {/* Central body */}
      <path d="M100 52c-8 8-12 18-12 28 0 6 2 12 6 17-6 2-11 6-14 12-4 8-2 17 4 23-7 3-12 9-14 16-2 8 1 16 7 21-5 4-8 11-7 18 1 8 7 14 15 16 1 7 6 12 13 14 4 1 8 0 12-2 4 2 8 3 12 2 7-2 12-7 13-14 8-2 14-8 15-16 1-7-2-14-7-18 6-5 9-13 7-21-2-7-7-13-14-16 6-6 8-15 4-23-3-6-8-10-14-12 4-5 6-11 6-17 0-10-4-20-12-28l-10 10-10-10z" />
      {/* Left wing */}
      <path d="M88 75c-14 6-26 16-34 28-3 5-4 11-3 16 6-3 11-7 15-12-1 6-1 12 1 17 4-4 7-9 9-15 2 7 6 13 11 18 1-8 0-15-3-22 5 3 11 4 17 3-4-6-9-11-16-14 4-5 6-12 6-19-2 1-3 1-5 2-2-3-3-7-3-11z" />
      {/* Right wing */}
      <path d="M112 75c14 6 26 16 34 28 3 5 4 11 3 16-6-3-11-7-15-12 1 6 1 12-1 17-4-4-7-9-9-15-2 7-6 13-11 18-1-8 0-15 3-22-5 3-11 4-17 3 4-6 9-11 16-14-4-5-6-12-6-19 2 1 3 1 5 2 2-3 3-7 3-11z" />
      {/* Tail */}
      <path d="M100 150l-6 24h12l-6-24z" />
    </svg>
  )
}

/* ============================================================
   NAV: sticky navigation with scroll-spy + smooth scroll
   ============================================================ */
const NAV_ITEMS = [
  { id: 'pelasgians', label: 'Pellazgët' },
  { id: 'illyrians', label: 'Ilirët & Dardanët' },
  { id: 'arberia', label: 'Arbëria' },
  { id: 'rilindja', label: 'Rilindja' },
  { id: 'kosova', label: 'Kosova' },
]

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>('hero')
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

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

      // Determine active section
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
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-3 group"
            aria-label="Scroll to top"
          >
            <DoubleEagle className="w-7 h-7 text-[#E41E20] group-hover:text-[#ff3b3d] transition-colors" />
            <span className="font-[family-name:var(--font-cinzel)] text-white text-base sm:text-lg font-semibold tracking-wider hidden sm:block">
              KRONIKA E SHQIPTARËVE
            </span>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link text-sm font-medium tracking-wide transition-colors ${
                  activeSection === item.id
                    ? 'text-white is-active'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden text-white p-2 -mr-2"
            aria-label="Toggle menu"
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
                  {item.label}
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
        {/* Background image with slow zoom */}
        <div className="absolute inset-0">
          <img
            src="/images/hero.jpg"
            alt="Misty Balkan mountains at dawn"
            className="w-full h-full object-cover animate-slow-zoom opacity-60"
          />
          {/* Dark gradient overlays for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
        </div>

        {/* Decorative top crimson bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E41E20] to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-20 pb-16">
          {/* Large eagle motif */}
          <div className="flex justify-center mb-8 reveal is-visible">
            <DoubleEagle className="w-28 h-28 sm:w-36 sm:h-36 text-[#E41E20] eagle-pulse" />
          </div>

          {/* Overline */}
          <p className="font-[family-name:var(--font-cinzel)] text-[#c9a227] tracking-[0.3em] text-xs sm:text-sm uppercase mb-6">
            Një Kronikë e Historisë Shqiptare
          </p>

          {/* Main title */}
          <h1 className="font-[family-name:var(--font-cinzel)] text-white text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            KRONIKA E
            <br />
            <span className="text-[#E41E20]">SHQIPTARËVE</span>
          </h1>

          {/* Divider */}
          <div className="divider-gold w-48 mx-auto mb-6" />

          {/* Subtitle */}
          <p className="text-white/80 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed mb-10 font-light">
            From the mythic Pelasgians and the tribal kingdoms of Illyria, through
            Skanderbeg&apos;s defiance, the National Awakening, and the birth of modern
            Kosovo — five millennia of an unconquered people.
          </p>

          {/* CTA */}
          <button
            onClick={() => scrollTo('pelasgians')}
            className="inline-flex items-center gap-2 bg-[#E41E20] hover:bg-[#ff3b3d] text-white font-[family-name:var(--font-cinzel)] font-semibold tracking-wider px-8 py-4 rounded-sm transition-all duration-300 shadow-lg shadow-[#E41E20]/30 hover:shadow-[#E41E20]/50 hover:scale-105"
          >
            BEGIN THE JOURNEY
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 animate-bounce">
          <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* ===================== INTRO STRIP ===================== */}
      <section className="bg-crimson-banner py-12 sm:py-16 texture-grain relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <p className="font-[family-name:var(--font-cinzel)] text-white text-xl sm:text-2xl lg:text-3xl font-medium leading-relaxed italic">
            &ldquo;Gjuha e shqipes është një nga mrekullitë e botës —
            <br className="hidden sm:block" /> një dëshmi e një populli që nuk u shua kurrë.&rdquo;
          </p>
          <p className="text-white/70 mt-4 text-sm tracking-wider">
            — A chronicle told in five ages —
          </p>
        </div>
      </section>

      {/* ===================== ERA SECTIONS ===================== */}
      <main className="flex-1 texture-parchment">
        {ERAS.map((era, i) => (
          <EraSection key={era.id} era={era} index={i} />
        ))}
      </main>

      {/* ===================== FOOTER ===================== */}
      <footer className="bg-ink text-white relative overflow-hidden">
        <div className="divider-gold w-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center text-center md:text-left">
            {/* Eagle + title */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <DoubleEagle className="w-12 h-12 text-[#E41E20]" />
              <h3 className="font-[family-name:var(--font-cinzel)] text-lg font-semibold tracking-wider">
                KRONIKA E SHQIPTARËVE
              </h3>
            </div>

            {/* Quote */}
            <div className="text-center">
              <p className="text-white/70 italic text-sm leading-relaxed">
                &ldquo;Feja e shqiptarit është shqiptaria.&rdquo;
              </p>
              <p className="text-[#c9a227] text-xs mt-2 tracking-wider">
                — Pashko Vasa, 1881
              </p>
            </div>

            {/* Eras quick nav */}
            <div className="flex flex-col items-center md:items-end gap-2">
              <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Explore the Eras</p>
              <div className="flex flex-wrap justify-center md:justify-end gap-x-4 gap-y-1">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="text-white/60 hover:text-[#E41E20] text-xs transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="divider-gold w-full mt-10 mb-6 opacity-50" />

          <div className="text-center text-white/40 text-xs tracking-wider">
            <p>
              An educational chronicle of Albanian history · Built with reverence for the past.
            </p>
            <p className="mt-2">
              For study and cultural appreciation · Imazhet janë ilustruese.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

/* ============================================================
   ERA SECTION component
   ============================================================ */
function EraSection({ era, index }: { era: Era; index: number }) {
  const isEven = index % 2 === 0
  const accentColor = era.accent === 'crimson' ? '#E41E20' : '#c9a227'

  return (
    <section
      id={era.id}
      className={`relative overflow-hidden ${isEven ? 'texture-parchment' : 'bg-[#f3efe6]'}`}
    >
      {/* Era number watermark */}
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
              EPISODE {era.index}
            </span>
            <span className="h-px flex-1 max-w-[80px]" style={{ background: accentColor }} />
            <span className="text-xs text-black/50 tracking-wider uppercase">{era.period}</span>
          </div>

          <h2 className="font-[family-name:var(--font-cinzel)] text-4xl sm:text-5xl lg:text-6xl font-bold text-black leading-tight mb-2">
            {era.name}
          </h2>
          <p className="text-black/60 text-base sm:text-lg italic font-light mb-4">
            {era.nameEn}
          </p>
          <p className="text-black/70 text-lg sm:text-xl max-w-3xl leading-relaxed font-light">
            {era.tagline}
          </p>
        </div>

        {/* Image + intro */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center mb-16">
          {/* Image */}
          <div className="reveal reveal-delay-1 order-1">
            <div className="relative group">
              {/* Frame border */}
              <div
                className="absolute -inset-2 border-2 pointer-events-none"
                style={{ borderColor: accentColor }}
              />
              <div className="relative overflow-hidden">
                <img
                  src={era.image}
                  alt={era.nameEn}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            </div>
          </div>

          {/* Intro text */}
          <div className="reveal reveal-delay-2 order-2">
            <div className="relative">
              <p className="text-black/80 text-base sm:text-lg leading-relaxed">
                {era.intro}
              </p>
            </div>
          </div>
        </div>

        {/* Figures */}
        <div className="mb-16">
          <h3 className="font-[family-name:var(--font-cinzel)] text-2xl sm:text-3xl font-semibold text-black mb-8 flex items-center gap-4 reveal">
            <span
              className="inline-block w-2 h-8"
              style={{ background: accentColor }}
            />
            Figurat & Simbolet
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {era.figures.map((fig, fi) => (
              <div
                key={fig.name}
                className={`reveal reveal-delay-${(fi % 3) + 1} bg-white/70 backdrop-blur-sm border border-black/10 rounded-sm p-6 hover:shadow-xl hover:border-[${accentColor}] transition-all duration-300 group`}
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
                      {fig.role}
                    </p>
                  </div>
                </div>
                <p className="text-black/70 text-sm leading-relaxed">{fig.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline events */}
        <div>
          <h3 className="font-[family-name:var(--font-cinzel)] text-2xl sm:text-3xl font-semibold text-black mb-8 flex items-center gap-4 reveal">
            <span
              className="inline-block w-2 h-8"
              style={{ background: accentColor }}
            />
            Linja e Kohës
          </h3>

          <div className="relative pl-8 sm:pl-12">
            {/* Vertical line */}
            <div
              className="absolute left-3 sm:left-5 top-2 bottom-2 w-0.5"
              style={{ background: `linear-gradient(to bottom, ${accentColor}, transparent)` }}
            />

            <div className="space-y-6 max-h-[28rem] overflow-y-auto scroll-styled pr-3">
              {era.events.map((evt, ei) => (
                <div
                  key={ei}
                  className={`reveal reveal-delay-${(ei % 3) + 1} relative`}
                >
                  {/* Dot */}
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
                      <h4 className="font-semibold text-black text-base">{evt.title}</h4>
                    </div>
                    <p className="text-black/70 text-sm leading-relaxed">{evt.desc}</p>
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
