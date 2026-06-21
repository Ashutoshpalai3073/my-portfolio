import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronDown, ExternalLink, ArrowUpRight, Menu, X, Zap, TrendingUp, Award, Code2, Users, BarChart2, Layers, Target } from "lucide-react";

// ─── CURSOR PARALLAX HOOK ─────────────────────────────────────────────────────
function useCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [normalized, setNormalized] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      setNormalized({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return { pos, normalized };
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const NAV = [
  { id: "home", label: "Overview" },
  { id: "experience", label: "Experience" },
  { id: "ventures", label: "Ventures" },
  { id: "projects", label: "Projects" },
  { id: "competitions", label: "Awards" },
  { id: "leadership", label: "Leadership" },
  { id: "education", label: "Education" },
  { id: "extra", label: "Beyond Work" },
];

const HERO_STATS = [
  { value: "₹12L+", label: "Revenue Generated" },
  { value: "50+", label: "Startups Supported" },
  { value: "4×", label: "Gold Medalist" },
  { value: "18K+", label: "Competition Reach" },
];

const EXPERIENCES = [
  {
    id: "prepsom",
    company: "PrepSOM Labs",
    role: "Founder's Office Intern",
    period: "Jul – Sep 2025",
    tag: "Product · Growth",
    points: [
      "Worked on AI mock interview & hiring platform engaging 2,000+ students, 650+ colleges, and 200+ hiring partners; generated 30+ partnerships (NPS: +42).",
      "Collaborated with product/tech to build AI mock interview modules for Data Science & Web Dev — scaled sessions from 3 to 66 in 3 months, tracked via ZOHO CRM.",
      "Lifted returning user engagement by 6% (CTR on alumni-suggested interviews) and retention by 8.16%, measured via Mixpanel and weekly NPS.",
      "Increased recruiter-matching efficiency by 25% (8→10 hires/drive) by routing assessed candidates through aptitude, case study & simulation pipelines.",
    ],
  },
  {
    id: "laneway",
    company: "Laneway Official",
    role: "Product Management Intern",
    period: "Jun – Jul 2025",
    tag: "PM · UI/UX",
    points: [
      "Drove UI/UX & wireframe development for 'Trending Now' sections (Clothing, Toys, Dokra, Footwear, Utensils) across the e-commerce marketplace.",
      "Leveraged Ministry of Textiles databases to onboard 120+ artisans across 8 states, reducing vendor onboarding cost by 15% (₹3,000→₹2,550) via ZOHO CRM & HubSpot.",
      "A/B tested CTA funnels using ZOHO PageSense — new-user CTA clicks up 28% (2.1%→2.7%), post-click conversion up 13.1% via GA4.",
      "ICP research across 50+ Tier-2/3 cities — returning-user LTV up 22% (180→220), add-to-cart rates up 18% (11%→13%).",
    ],
  },
  {
    id: "quantum",
    company: "Quantum Quotient Consulting",
    role: "Strategy & Operations Intern",
    period: "Jun – Aug 2025",
    tag: "B2B · Consulting",
    points: [
      "Designed ICPs, customer segmentation & competitive intelligence frameworks for BosonBridge and QuarkQuest targeting $10B+ HR consulting & workforce solution markets.",
      "Built CRM-driven workflows for stakeholder coordination, pipeline tracking & lead lifecycle management — improved conversion efficiency by 7.23% MoM.",
      "Executed 1,000+ structured outreach interactions using negotiation playbooks and corporate pitch decks; secured 86 workforce consulting conversions.",
      "Conducted pricing analysis, persona mapping, and market benchmarking to develop scalable GTM & enterprise acquisition strategies across consulting verticals.",
    ],
  },
];

const VENTURES = [
  {
    name: "GradGo",
    role: "Chief Business Officer",
    period: "July 2025 – Present",
    status: "Active",
    tagline: "AI & SaaS consulting operations at scale.",
    description: "Spearheaded AI, SaaS, digital marketing & GTM consulting operations targeting the $60M+ global consulting market. Brought in ₹12 lakh in deal value by selling services to startups and enterprises. Supported 50+ clients including Meetroz, Divine Campus Infotech, Freshment, and Urban Umamii through strategic partnerships and stakeholder management.",
    impact: [
      { metric: "₹12L+", desc: "Deal value sold" },
      { metric: "50+", desc: "Startups & enterprises" },
      { metric: "5,000+", desc: "Healthcare users (DIGIGO CARE AI)" },
    ],
    bullets: [
      "Partnered with IndiaFilings (₹2Cr marketing budget) leveraging their marketplace module at 70% net revenue share — cut CAC and scaled startup acquisition.",
      "Led 10-member intern & freelance team on 1-week delivery cycles; helped Digigo build DIGIGO CARE AI, now active across 5,000+ healthcare professionals.",
    ],
  },
  {
    name: "Aithro",
    role: "Chief Business Officer",
    period: "October 2025 – Present",
    status: "Active",
    tagline: "Dual-platform lib-tech venture backed by IN44 Capital.",
    description: "Built the business foundation for Aithro's dual-platform lib-tech venture — Studoo (student side) and Padhloo (library owner side) — targeting a ₹31+ Cr market, backed by Rohit Jhunjhunwala (Partner, IN44 Capital). Business model recognised as one of the top globally by Ecell IIT KGP.",
    impact: [
      { metric: "₹31+ Cr", desc: "Target market (TAM)" },
      { metric: "10+", desc: "Libraries onboarded (Patna & Kolkata)" },
      { metric: "Global", desc: "Finalist — Empressario'26" },
    ],
    bullets: [
      "Defined subscriptions, pricing models, customer segmentation & monetisation frameworks; secured 10+ paid library owners as paying customers.",
      "Expanded via Campus Ambassador Program (CAP) — 30+ student registrations per library; led 10-member cross-functional team in financial, growth & expenditure strategy.",
      "Led investor pitching & TAM-SAM-SOM analysis; ran financial forecasting and growth projections for VC conversations.",
    ],
  },
];

const PROJECTS = [
  {
    title: "IncuTrack",
    subtitle: "Startup Operations & Incubation Intelligence Platform",
    period: "April 2026",
    link: "https://incutrack.ashutosh-palai2005.workers.dev/",
    stack: ["React", "TypeScript", "Vite", "Three.js", "Supabase", "Cloudflare Workers"],
    icon: Layers,
    desc: "AI-powered startup operations dashboard serving 30+ users — built for founders, incubators & investors. Engineered immersive UI/UX with Three.js, React Three Fiber & canvas animations. Implemented TanStack Router + React Query with modular architecture, Supabase-backed data pipelines, and Cloudflare edge deployment.",
  },
  {
    title: "Drusti",
    subtitle: "AI-Powered Startup Intelligence & Investor Analysis Platform",
    period: "March 2026",
    link: "https://drusti.vercel.app/",
    stack: ["FastAPI", "React", "CrewAI", "Groq LLM", "Render", "Vercel"],
    icon: Zap,
    desc: "FastAPI + React platform serving 20+ users — transforms startup ideas into investor-ready market, funding & GTM intelligence reports. Multi-agent CrewAI workflows with Groq LLM orchestration, parallel execution, JSON schema enforcement & multi-stage recovery. Automated PPT pitch-deck generation and Render–Vercel deployment pipelines.",
  },
  {
    title: "Equity Research & Valuation",
    subtitle: "Amara Raja Energy & Mobility — BUY-Side Investment Thesis",
    period: "Feb 2026",
    link: null,
    stack: ["SOTP", "DCF", "EV/EBITDA", "Revenue CAGR", "Peer Benchmarking"],
    icon: BarChart2,
    desc: "BUY-side research thesis on ARE&M's strategic expansion from Lead-Acid into the 16 GWh ACC battery market. SOTP + DCF valuation identifying ~44% potential upside from current levels. Evaluated FY25 revenue of ₹12,405 Cr, debt-equity structure, peer benchmarks, and execution milestones for long-term re-rating.",
  },
  {
    title: "Digital Marketing & SEO Strategy",
    subtitle: "GreenGlow Skincare",
    period: "Feb 2026",
    link: null,
    stack: ["GTM Strategy", "SEO", "ICP Design", "Content Funnels", "Analytics"],
    icon: Target,
    desc: "30-day social strategy spanning 6 content domains with engagement flows. Built GTM audience segmentation across Instagram, YouTube, LinkedIn, Pinterest, TikTok & Reddit. Aligned 4 customer personas with conversion-focused funnels; designed SEO content framework with keyword research, analytics dashboards & performance tracking.",
  },
  {
    title: "Delhivery Graph Intelligence",
    subtitle: "Logistics Network Optimization, Bottleneck Analysis & ETA Forecasting",
    period: "June 2026",
    link: "https://delhivery-graph-intelligence.streamlit.app/",
    stack: ["Graph Theory", "node2vec", "XGBoost", "Streamlit", "NetworkX", "Python"],
    icon: TrendingUp,
    desc: "Modelled logistics network as a directed graph (1,657 nodes, 2,783 corridors); betweenness centrality & PageRank revealed 3 hubs drive 39% of delay across 17.5% of legs. Engineered node2vec + gradient-boosted ETA model on 26,369 OD legs, cutting MAE by 11.6% (27.5→24.3 min) and +3.7 pts within-15% accuracy over a leakage-free baseline. Built ML-backed FTL vs. Carting framework quantifying 60–77 min/shipment savings on long-haul corridors with breakeven SLA values, replacing heuristic route selection. Delivered hosted Streamlit dashboard + consulting Strategy Memo with top-5 bottleneck hubs, corridor interventions, and ₹25L annualised revenue-at-risk recovery estimate.",
  },
];

const COMPETITIONS = [
  { medal: "GOLD", event: "GC Case Study 2025", desc: "AI-driven EQ/RQ model for Deloitte using adaptive weighting framework", scale: "20+ halls · 18,000+ students" },
  { medal: "GOLD", event: "GC Product Management 2025", desc: "Unified insurance platform with telemedicine integration", scale: "20+ halls · 18,000+ students" },
  { medal: "GOLD", event: "GC Product Management 2026", desc: "Deutsche Telekom MagentaCard GTM & fintech adoption strategy", scale: "20+ halls · 18,000+ students" },
  { medal: "SILVER", event: "OpenIIT Supply Chain 2025", desc: "Tech-enabled banana supply-chain strategy aiming ₹600+ Cr loss reduction", scale: "15,000+ students" },
  { medal: "FINALIST", event: "Empressario'26 — Global", desc: "Asia's largest business model competition, pitching Aithro (Studoo & Padhloo)", scale: "6,000+ participants" },
  { medal: "TOP 50", event: "Smart India Hackathon 2025", desc: "Selected from 300+ teams at IIT Kharagpur for technical & business problem-solving", scale: "300+ teams" },
  { medal: "3RD", event: "GC Case Study 2026", desc: "Amorist's GTM and profitability strategy for Indian city market entry", scale: "20+ halls · 18,000+ students" },
];

const LEADERSHIP = [
  {
    role: "Core Team Head",
    org: "Megalith, IIT Kharagpur",
    period: "Jul 2025 – Apr 2026",
    points: [
      "Secured 20+ brand partnerships through outreach to 700+ companies — strengthened funding pipelines and digital/on-ground visibility.",
      "Managed 30-member team for seamless end-to-end fest operations, coordinating professors, students & company stakeholders.",
    ],
  },
  {
    role: "General Secretary",
    org: "Civil Engineering Society (CES), IIT KGP",
    period: "Sep 2025 – Apr 2026",
    points: [
      "Directed 10+ academic and professional events engaging 500+ students, fostering industry–student collaboration.",
      "Managed ₹10L budget; conducted Sports Weekend featuring 10 sports with 100+ students and 10+ professors.",
    ],
  },
  {
    role: "Senior Executive / Manager",
    org: "Innovation & Incubation Cell (IIC), IIT KGP",
    period: "Aug 2025 – Apr 2026",
    points: [
      "Drove startup ecosystem initiatives via MNFIC collaboration and investor connects with Grad Capital & Titan Capital.",
      "Led 40-member managerial + 15-member execution team for innovation-driven campus programming.",
    ],
  },
  {
    role: "President / Chapter Coordinator",
    org: "Nation Building Impact Chapter, IIT KGP",
    period: "Oct 2025 – Present",
    points: [
      "Led 27-member team across Marketing, Strategic & College Initiatives verticals.",
      "Executed campus programs addressing student engagement and civic impact at scale.",
    ],
  },
];

const EDUCATION = [
  { year: "2028", degree: "Dual Degree — B.Tech + M.Tech, Civil Engineering", inst: "Indian Institute of Technology Kharagpur", score: "7.7 CGPA" },
  { year: "2023", degree: "Class XII, CHSE", inst: "Adyant Higher Secondary School", score: "85%" },
  { year: "2021", degree: "Class X, CHSE", inst: "Saraswati Shishu Vidya Mandir, Unit-8, Bhubaneswar", score: "93.75%" },
];

const EXTRA = [
  {
    cat: "Social & Cultural",
    items: [
      "Vice Captain — Asia's largest Diwali Illumination, Patel Hall (50+ member team)",
      "Finalist — GC Hindi & English Debate and Elocution (60+ participants)",
      "150+ state-level awards in debate, elocution & essay competitions during school",
      "Gold Medals from CM Naveen Patnaik & Governors Ganeshi Lal and S.C. Jamir",
    ],
  },
  {
    cat: "Technology & Strategy",
    items: [
      "Podium finishes in GC case study, PM & product design (Vice Captain, 20+ member team)",
      "7th state rank — Pathani Samanta Mathematics Scholarship Test",
      "Open IIT photography and cultural competition participant",
    ],
  },
  {
    cat: "Sports",
    items: [
      "Bronze — Open IIT & Shaurya Shot Put; GC Powerlifting & intra-hall cricket (2,000+ athletes)",
      "3rd — Open IIT Rubik's Cube competition (100+ participants)",
      "Represented IIT KGP under National Sports Organisation in Shot Put",
    ],
  },
];

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function SectionLabel({ num, title }) {
  return (
    <div className="sl">
      <span className="sl-num">{num}</span>
      <h2 className="sl-title">{title}</h2>
    </div>
  );
}

function AccordionRow({ exp, isOpen, toggle }) {
  return (
    <div className={`acc-row ${isOpen ? "acc-open" : ""}`}>
      <button className="acc-btn" onClick={toggle}>
        <div className="acc-left">
          <span className="acc-company">{exp.company}</span>
          <span className="acc-role">{exp.role}</span>
        </div>
        <div className="acc-right">
          <span className="acc-period">{exp.period}</span>
          <span className="acc-tag">{exp.tag}</span>
          <ChevronDown size={16} className={`acc-chevron ${isOpen ? "acc-chevron-open" : ""}`} />
        </div>
      </button>
      {isOpen && (
        <div className="acc-body">
          {exp.points.map((p, i) => (
            <div key={i} className="acc-pt">
              <span className="acc-dash">—</span>
              <p>{p}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function VentureCard({ v, cursor }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -6, y: dx * 6 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={cardRef}
      className="vc-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
    >
      <div className="vc-top">
        <div>
          <div className="vc-name">{v.name}</div>
          <div className="vc-role">{v.role} · {v.period}</div>
        </div>
        <span className="vc-status">{v.status}</span>
      </div>
      <p className="vc-tagline">{v.tagline}</p>
      <p className="vc-desc">{v.description}</p>
      <div className="vc-impact">
        {v.impact.map((im) => (
          <div key={im.desc} className="vc-impact-item">
            <div className="vc-metric">{im.metric}</div>
            <div className="vc-mdesc">{im.desc}</div>
          </div>
        ))}
      </div>
      <div className="vc-divider" />
      <ul className="vc-bullets">
        {v.bullets.map((b, i) => (
          <li key={i}><span className="vc-dot" /><span>{b}</span></li>
        ))}
      </ul>
    </div>
  );
}

function ProjectCard({ p }) {
  const Icon = p.icon;
  return (
    <div className="pc-card">
      <div className="pc-header">
        <div className="pc-icon"><Icon size={18} /></div>
        <div className="pc-meta">
          <div className="pc-title">
            {p.title}
            {p.link && (
              <a href={p.link} target="_blank" rel="noopener noreferrer" className="pc-link">
                <ArrowUpRight size={14} />
              </a>
            )}
          </div>
          <div className="pc-sub">{p.subtitle}</div>
        </div>
        <span className="pc-period">{p.period}</span>
      </div>
      <p className="pc-desc">{p.desc}</p>
      <div className="pc-stack">
        {p.stack.map((s) => <span key={s} className="pc-pill">{s}</span>)}
      </div>
    </div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const { pos, normalized } = useCursor();
  const [openExp, setOpenExp] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [cursorHidden, setCursorHidden] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const ids = NAV.map((n) => n.id);
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(ids[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const heroParallax = {
    layer1: { transform: `translate(${normalized.x * -12}px, ${normalized.y * -12}px)` },
    layer2: { transform: `translate(${normalized.x * 8}px, ${normalized.y * 8}px)` },
    layer3: { transform: `translate(${normalized.x * -20}px, ${normalized.y * -16}px)` },
  };

  return (
    <>
      <style>{CSS}</style>
      {/* Custom cursor */}
      <div className="cursor-dot" style={{ left: pos.x, top: pos.y }} />
      <div className="cursor-ring" style={{ left: pos.x, top: pos.y }} />

      <div className="root">
        {/* Parallax background elements */}
        <div className="bg-layer" aria-hidden>
          <div className="bg-orb bg-orb-1" style={heroParallax.layer1} />
          <div className="bg-orb bg-orb-2" style={heroParallax.layer2} />
          <div className="bg-noise" />
        </div>

        {/* NAV */}
        <header className={`nav ${scrolled ? "nav-bg" : ""}`}>
          <div className="nav-inner">
            <button className="nav-logo" onClick={() => scrollTo("home")}>AP</button>
            <nav className="nav-links">
              {NAV.map((n) => (
                <button key={n.id} className={`nl ${active === n.id ? "nl-active" : ""}`} onClick={() => scrollTo(n.id)}>
                  {n.label}
                </button>
              ))}
            </nav>
            <div className="nav-right">
              <button className="nav-ham" onClick={() => setMobileOpen(!mobileOpen)}>
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
          {mobileOpen && (
            <div className="mob-nav">
              {NAV.map((n) => (
                <button key={n.id} className="mob-nl" onClick={() => scrollTo(n.id)}>{n.label}</button>
              ))}
            </div>
          )}
        </header>

        <main>
          {/* ── HERO ── */}
          <section id="home" className="hero">
            <div className="hero-inner">
              <div className="hero-text">
                <div className="hero-eyebrow" style={heroParallax.layer3}>
                  <span className="eyebrow-dot" />
                  IIT Kharagpur · 23CE30009 · Civil Engineering
                </div>
                <h1 className="hero-name" style={heroParallax.layer1}>
                  Ashutosh<br /><em>Palai</em>
                </h1>
                <p className="hero-bio" style={heroParallax.layer2}>
                  Product strategist and venture builder at IIT Kharagpur. Currently CBO at GradGo (₹12L+ deal value, 50+ clients) and Aithro (₹31Cr market, backed by IN44 Capital). 4× Gold Medalist across 18,000+ student competitions. Built AI platforms serving 5,000+ professionals. Led teams of 40+, secured 20+ brand partnerships, and closed enterprise deals across consulting, edtech, and lib-tech verticals.
                </p>
                <div className="hero-tags">
                  <span>Product Strategy</span>
                  <span>Venture Building</span>
                  <span>GTM & Consulting</span>
                  <span>AI & SaaS</span>
                  <span>Equity Research</span>
                  <span>B2B Sales</span>
                </div>
                <div className="hero-contact">
                  ashutoshforcorporate@gmail.com &nbsp;·&nbsp; +91-9348153073
                </div>
                <div className="hero-actions">
                  <a href="https://www.linkedin.com/in/ashutosh-palai-8a47bb285/" target="_blank" rel="noopener noreferrer" className="ha-primary">
                    LinkedIn <ExternalLink size={13} />
                  </a>
                </div>
              </div>
              <div className="hero-stats">
                {HERO_STATS.map((s) => (
                  <div key={s.label} className="hs-item">
                    <div className="hs-value">{s.value}</div>
                    <div className="hs-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── EXPERIENCE ── */}
          <section id="experience" className="section">
            <SectionLabel num="01" title="Professional Experience" />
            <div className="acc-list">
              {EXPERIENCES.map((exp) => (
                <AccordionRow
                  key={exp.id}
                  exp={exp}
                  isOpen={openExp === exp.id}
                  toggle={() => setOpenExp(openExp === exp.id ? null : exp.id)}
                />
              ))}
            </div>
          </section>

          {/* ── VENTURES ── */}
          <section id="ventures" className="section">
            <SectionLabel num="02" title="Entrepreneurial Ventures" />
            <div className="vc-grid">
              {VENTURES.map((v) => (
                <VentureCard key={v.name} v={v} />
              ))}
            </div>
          </section>

          {/* ── PROJECTS ── */}
          <section id="projects" className="section">
            <SectionLabel num="03" title="Strategic Projects & Analytics" />
            <div className="pc-grid">
              {PROJECTS.map((p) => <ProjectCard key={p.title} p={p} />)}
            </div>
          </section>

          {/* ── COMPETITIONS ── */}
          <section id="competitions" className="section">
            <SectionLabel num="04" title="Competitions & Awards" />
            <div className="aw-list">
              {COMPETITIONS.map((c, i) => (
                <div key={i} className="aw-row">
                  <span className={`aw-medal aw-${c.medal.toLowerCase().replace(" ","")}`}>{c.medal}</span>
                  <div className="aw-body">
                    <div className="aw-event">{c.event}</div>
                    <div className="aw-desc">{c.desc}</div>
                  </div>
                  <span className="aw-scale">{c.scale}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── LEADERSHIP ── */}
          <section id="leadership" className="section">
            <SectionLabel num="05" title="Leadership & Responsibility" />
            <div className="lr-grid">
              {LEADERSHIP.map((l, i) => (
                <div key={i} className="lr-card">
                  <div className="lr-head">
                    <div className="lr-role">{l.role}</div>
                    <span className="lr-period">{l.period}</span>
                  </div>
                  <div className="lr-org">{l.org}</div>
                  <ul className="lr-pts">
                    {l.points.map((p, j) => (
                      <li key={j}><span className="lr-dash">—</span><span>{p}</span></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ── EDUCATION ── */}
          <section id="education" className="section">
            <SectionLabel num="06" title="Education" />
            <div className="ed-list">
              {EDUCATION.map((e, i) => (
                <div key={i} className="ed-row">
                  <span className="ed-year">{e.year}</span>
                  <div className="ed-track">
                    <div className="ed-dot" />
                    {i < EDUCATION.length - 1 && <div className="ed-line" />}
                  </div>
                  <div className="ed-body">
                    <div className="ed-degree">{e.degree}</div>
                    <div className="ed-inst">{e.inst}</div>
                    <div className="ed-score">{e.score}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── EXTRA ── */}
          <section id="extra" className="section section-last">
            <SectionLabel num="07" title="Beyond Work" />
            <div className="ex-grid">
              {EXTRA.map((e) => (
                <div key={e.cat} className="ex-card">
                  <div className="ex-cat">{e.cat}</div>
                  <ul className="ex-items">
                    {e.items.map((item, i) => (
                      <li key={i}><span className="ex-dot" /><span>{item}</span></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-l">
              <div className="footer-name">Ashutosh Palai</div>
              <div className="footer-sub">IIT Kharagpur · Class of 2028</div>
            </div>
            <div className="footer-r">
              <a href="mailto:ashutoshforcorporate@gmail.com" className="footer-link">ashutoshforcorporate@gmail.com</a>
              <a href="tel:+919348153073" className="footer-link">+91-9348153073</a>
              <a href="https://www.linkedin.com/in/ashutosh-palai-8a47bb285/" target="_blank" rel="noopener noreferrer" className="footer-link">LinkedIn ↗</a>
            </div>
          </div>
          <div className="footer-line" />
          <div className="footer-copy">© 2026 · Engineered with intent.</div>
        </footer>
      </div>
    </>
  );
}

// ─── CSS ──────────────────────────────────────────────────────────────────────

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Geist+Mono:wght@400;500&family=Geist:wght@300;400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:      #020e1f;
  --bg2:     #071828;
  --bg3:     #0d2440;
  --line:    rgba(56,189,248,0.2);
  --line2:   rgba(56,189,248,0.1);
  --t1:      #ffffff;
  --t2:      #a8c8e0;
  --t3:      #3d6a8a;
  --accent:  #38bdf8;
  --hi:      #f59e0b;
  --r:       8px;
  --font-d:  'DM Serif Display', Georgia, serif;
  --font-s:  'Geist', system-ui, sans-serif;
  --font-m:  'Geist Mono', monospace;
}

html { scroll-behavior: smooth; }
body {
  background: var(--bg);
  background-image:
    radial-gradient(ellipse 90% 60% at 50% -10%, rgba(56,189,248,0.13) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 85% 80%, rgba(139,92,246,0.08) 0%, transparent 55%);
  color: var(--t1); font-family: var(--font-s); cursor: none; overflow-x: hidden;
}

/* CURSOR */
.cursor-dot {
  position: fixed; z-index: 9999; pointer-events: none;
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--accent);
  transform: translate(-50%, -50%);
  transition: width .15s, height .15s;
  box-shadow: 0 0 8px var(--accent);
}
.cursor-ring {
  position: fixed; z-index: 9998; pointer-events: none;
  width: 34px; height: 34px; border-radius: 50%;
  border: 1.5px solid rgba(56,189,248,0.45);
  transform: translate(-50%, -50%);
  transition: left .08s ease, top .08s ease;
}

/* BACKGROUND */
.bg-layer { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
.bg-orb {
  position: absolute; border-radius: 50%; filter: blur(100px);
  will-change: transform; transition: transform .05s linear;
}
.bg-orb-1 {
  width: 1000px; height: 1000px; top: -350px; left: -300px;
  background: radial-gradient(circle, rgba(56,189,248,0.18) 0%, rgba(99,102,241,0.10) 40%, transparent 70%);
}
.bg-orb-2 {
  width: 700px; height: 700px; bottom: -100px; right: -200px;
  background: radial-gradient(circle, rgba(139,92,246,0.14) 0%, rgba(56,189,248,0.06) 50%, transparent 70%);
}
.bg-noise {
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  opacity: 0.5;
}

/* NAV */
.nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  transition: background .3s, border-color .3s;
  border-bottom: 1px solid transparent;
}
.nav-bg {
  background: rgba(2,14,31,0.88);
  backdrop-filter: blur(28px) saturate(1.5);
  border-bottom-color: rgba(56,189,248,0.18);
}
.nav-inner {
  max-width: 1160px; margin: 0 auto; padding: 0 32px;
  height: 62px; display: flex; align-items: center; gap: 32px;
}
.nav-logo {
  background: none; border: none; cursor: none;
  font-family: var(--font-d); font-style: italic; font-size: 22px;
  color: var(--accent); letter-spacing: -0.02em; flex-shrink: 0;
  text-shadow: 0 0 20px rgba(56,189,248,0.4);
}
.nav-links { display: flex; gap: 0; flex: 1; }
.nl {
  background: none; border: none; cursor: none;
  font-family: var(--font-s); font-size: 13px; font-weight: 400;
  color: var(--t3); padding: 8px 14px; border-radius: 6px;
  transition: color .2s; letter-spacing: 0.01em;
}
.nl:hover { color: var(--t2); }
.nl-active { color: var(--accent); }
.nav-right { margin-left: auto; display: flex; align-items: center; gap: 16px; }
.nav-cta {
  font-family: var(--font-s); font-size: 13px; font-weight: 500;
  color: var(--accent); text-decoration: none; transition: all .2s;
  white-space: nowrap; padding: 7px 16px; border-radius: 6px;
  border: 1px solid rgba(56,189,248,0.3);
}
.nav-cta:hover { background: rgba(56,189,248,0.1); color: #fff; border-color: var(--accent); }
.nav-ham { display: none; background: none; border: none; cursor: none; color: var(--t2); }
.mob-nav {
  background: rgba(2,14,31,0.97); border-top: 1px solid rgba(56,189,248,0.15);
  display: flex; flex-direction: column; padding: 12px;
}
.mob-nl {
  background: none; border: none; cursor: none;
  font-family: var(--font-s); font-size: 14px; color: var(--t2);
  text-align: left; padding: 11px 16px; border-radius: 6px;
  transition: color .2s, background .2s;
}
.mob-nl:hover { color: var(--accent); background: rgba(56,189,248,0.08); }

/* HERO */
.hero {
  position: relative; z-index: 1;
  min-height: 100vh; display: flex; flex-direction: column;
  justify-content: center; padding: 100px 32px 60px;
  max-width: 1160px; margin: 0 auto;
}
.hero-inner { display: flex; gap: 80px; align-items: flex-end; flex-wrap: wrap; }
.hero-text { flex: 1; min-width: 320px; }
.hero-eyebrow {
  display: flex; align-items: center; gap: 10px;
  font-family: var(--font-m); font-size: 11px; letter-spacing: 0.12em;
  color: var(--accent); text-transform: uppercase; margin-bottom: 28px;
  will-change: transform; opacity: 0.85;
}
.eyebrow-dot {
  width: 7px; height: 7px; border-radius: 50%; background: var(--accent); flex-shrink: 0;
  box-shadow: 0 0 10px var(--accent), 0 0 20px rgba(56,189,248,0.4);
  animation: pulse-dot 2.5s ease-in-out infinite;
}
@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 8px var(--accent), 0 0 18px rgba(56,189,248,0.35); }
  50% { box-shadow: 0 0 14px var(--accent), 0 0 30px rgba(56,189,248,0.6); }
}
.hero-name {
  font-family: var(--font-d); font-size: clamp(72px, 10vw, 130px);
  font-weight: 400; line-height: 0.9; letter-spacing: -0.03em;
  color: var(--t1); margin-bottom: 32px; will-change: transform;
}
.hero-name em {
  font-style: italic;
  background: linear-gradient(135deg, #38bdf8 0%, #818cf8 60%, #c084fc 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.hero-bio {
  font-size: 16px; color: var(--t2); line-height: 1.8; max-width: 520px;
  margin-bottom: 40px; font-weight: 300; will-change: transform;
}
.hero-tags {
  display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 16px;
}
.hero-tags span {
  font-family: var(--font-m); font-size: 11px; letter-spacing: 0.08em;
  text-transform: uppercase; color: var(--accent);
  border: 1px solid rgba(56,189,248,0.25); background: rgba(56,189,248,0.06);
  padding: 4px 12px; border-radius: 4px; opacity: 0.85;
}
.hero-contact {
  font-family: var(--font-m); font-size: 12px; color: var(--t3);
  letter-spacing: 0.04em; margin-bottom: 32px;
}
.hero-actions { display: flex; gap: 16px; align-items: center; }
.ha-primary {
  font-family: var(--font-s); font-size: 14px; font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #1d6fbf 0%, #38bdf8 100%);
  text-decoration: none; padding: 12px 28px; border-radius: 8px;
  transition: all .25s;
  box-shadow: 0 4px 20px rgba(56,189,248,0.35), 0 0 0 1px rgba(56,189,248,0.2);
}
.ha-primary:hover {
  box-shadow: 0 6px 32px rgba(56,189,248,0.55), 0 0 0 1px rgba(56,189,248,0.4);
  transform: translateY(-2px);
}
.ha-secondary {
  font-family: var(--font-s); font-size: 14px; color: var(--t2);
  text-decoration: none; display: flex; align-items: center; gap: 6px;
  border-bottom: 1px solid var(--t3); padding-bottom: 1px;
  transition: color .2s, border-color .2s;
}
.ha-secondary:hover { color: var(--accent); border-color: var(--accent); }
.hero-stats { display: flex; flex-direction: column; gap: 28px; padding-bottom: 8px; }
.hs-item { text-align: right; }
.hs-value {
  font-family: var(--font-d); font-size: 38px; font-weight: 400;
  background: linear-gradient(135deg, #fff 0%, var(--accent) 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
  line-height: 1; letter-spacing: -0.02em;
}
.hs-label { font-family: var(--font-m); font-size: 11px; color: var(--t3); letter-spacing: 0.08em; margin-top: 5px; }
.hero-scroll-hint {
  position: absolute; bottom: 36px; left: 32px;
  display: flex; align-items: center; gap: 14px;
  font-family: var(--font-m); font-size: 10px; letter-spacing: 0.14em;
  color: var(--t3); text-transform: uppercase;
}
.scroll-line {
  width: 48px; height: 1px;
  background: linear-gradient(90deg, var(--accent), transparent);
  opacity: 0.6;
}

/* SECTIONS */
.section { position: relative; z-index: 1; max-width: 1160px; margin: 0 auto; padding: 100px 32px 0; }
.section-last { padding-bottom: 100px; }

.sl {
  display: flex; align-items: baseline; gap: 18px; margin-bottom: 52px;
  border-bottom: 1px solid var(--line); padding-bottom: 20px;
}
.sl-num {
  font-family: var(--font-m); font-size: 12px; color: var(--accent);
  letter-spacing: 0.12em; opacity: 0.8;
}
.sl-title {
  font-family: var(--font-d); font-size: clamp(28px, 4vw, 40px);
  font-weight: 400; color: var(--t1); letter-spacing: -0.02em; font-style: italic;
}

/* ACCORDION */
.acc-list { display: flex; flex-direction: column; }
.acc-row {
  border-bottom: 1px solid var(--line); transition: background .2s, padding .2s;
  border-radius: 4px;
}
.acc-row:hover { background: rgba(56,189,248,0.04); }
.acc-btn {
  width: 100%; background: none; border: none; cursor: none;
  padding: 22px 8px; display: flex; justify-content: space-between; align-items: center;
  gap: 24px; text-align: left;
}
.acc-left { display: flex; flex-direction: column; gap: 5px; }
.acc-company { font-family: var(--font-s); font-size: 17px; font-weight: 600; color: var(--t1); }
.acc-role { font-family: var(--font-s); font-size: 13px; color: var(--t2); font-weight: 300; }
.acc-right { display: flex; align-items: center; gap: 16px; flex-shrink: 0; }
.acc-period { font-family: var(--font-m); font-size: 12px; color: var(--t3); }
.acc-tag {
  font-family: var(--font-m); font-size: 11px; color: var(--accent);
  border: 1px solid rgba(56,189,248,0.25); background: rgba(56,189,248,0.06);
  padding: 3px 10px; border-radius: 4px; letter-spacing: 0.04em;
}
.acc-chevron { color: var(--t3); transition: transform .25s ease, color .2s; }
.acc-chevron-open { transform: rotate(180deg); color: var(--accent); }
.acc-body {
  padding: 4px 8px 24px; display: flex; flex-direction: column; gap: 14px;
  animation: fadeIn .2s ease;
}
@keyframes fadeIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }
.acc-pt { display: flex; gap: 16px; align-items: flex-start; }
.acc-dash { font-family: var(--font-m); color: var(--accent); font-size: 14px; flex-shrink: 0; margin-top: 1px; opacity: 0.6; }
.acc-pt p { font-size: 14px; color: var(--t2); line-height: 1.75; font-weight: 300; }

/* VENTURES */
.vc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.vc-card {
  background: var(--bg2);
  border: 1px solid rgba(56,189,248,0.18);
  border-radius: 16px; padding: 32px;
  transition: border-color .3s, box-shadow .3s, transform .3s;
  will-change: transform;
  position: relative; overflow: hidden;
}
.vc-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(56,189,248,0.5), transparent);
}
.vc-card:hover {
  border-color: rgba(56,189,248,0.4);
  box-shadow: 0 0 0 1px rgba(56,189,248,0.1), 0 20px 60px rgba(56,189,248,0.1), 0 0 80px rgba(99,102,241,0.05);
}
.vc-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
.vc-name {
  font-family: var(--font-d); font-size: 30px; font-weight: 400; color: var(--t1);
  letter-spacing: -0.02em; font-style: italic; margin-bottom: 5px;
}
.vc-role { font-family: var(--font-m); font-size: 11px; color: var(--t3); letter-spacing: 0.06em; }
.vc-status {
  font-family: var(--font-m); font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase;
  color: #4ade80; border: 1px solid rgba(74,222,128,0.3); background: rgba(74,222,128,0.08);
  padding: 4px 12px; border-radius: 20px; flex-shrink: 0;
  box-shadow: 0 0 12px rgba(74,222,128,0.15);
}
.vc-tagline { font-size: 15px; color: var(--accent); font-weight: 400; margin-bottom: 14px; opacity: 0.9; }
.vc-desc { font-size: 14px; color: var(--t2); line-height: 1.8; font-weight: 300; margin-bottom: 24px; }
.vc-impact { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 24px; }
.vc-impact-item {
  background: rgba(56,189,248,0.06); border: 1px solid rgba(56,189,248,0.18);
  border-radius: 10px; padding: 14px 12px;
  transition: background .2s, border-color .2s;
}
.vc-impact-item:hover { background: rgba(56,189,248,0.1); border-color: rgba(56,189,248,0.3); }
.vc-metric {
  font-family: var(--font-d); font-size: 22px; letter-spacing: -0.02em; margin-bottom: 4px;
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}
.vc-mdesc { font-family: var(--font-m); font-size: 10px; color: var(--t3); letter-spacing: 0.04em; line-height: 1.4; }
.vc-divider { height: 1px; background: rgba(56,189,248,0.15); margin-bottom: 20px; }
.vc-bullets { list-style: none; display: flex; flex-direction: column; gap: 12px; }
.vc-bullets li { display: flex; gap: 14px; align-items: flex-start; }
.vc-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--accent); flex-shrink: 0; margin-top: 7px; opacity: 0.6; }
.vc-bullets span { font-size: 13px; color: var(--t2); line-height: 1.75; font-weight: 300; }

/* PROJECTS */
.pc-grid {
  display: flex; flex-direction: column; gap: 2px;
  background: rgba(56,189,248,0.12); border: 1px solid rgba(56,189,248,0.2);
  border-radius: 16px; overflow: hidden;
}
.pc-card {
  background: var(--bg2); padding: 28px 32px;
  transition: background .25s;
  position: relative;
}
.pc-card::before {
  content: ''; position: absolute;
  left: 0; top: 0; bottom: 0; width: 0;
  background: var(--accent); transition: width .25s;
}
.pc-card:hover { background: var(--bg3); }
.pc-card:hover::before { width: 3px; }
.pc-header { display: flex; align-items: flex-start; gap: 16px; margin-bottom: 14px; }
.pc-icon {
  width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0;
  background: rgba(56,189,248,0.1); border: 1px solid rgba(56,189,248,0.25);
  display: flex; align-items: center; justify-content: center; color: var(--accent);
}
.pc-meta { flex: 1; }
.pc-title {
  font-family: var(--font-s); font-size: 16px; font-weight: 600; color: var(--t1);
  display: flex; align-items: center; gap: 8px; margin-bottom: 4px;
}
.pc-link {
  color: var(--t3); transition: color .2s; display: flex;
}
.pc-link:hover { color: var(--accent); }
.pc-sub { font-size: 13px; color: var(--t2); font-weight: 300; }
.pc-period { font-family: var(--font-m); font-size: 11px; color: var(--t3); flex-shrink: 0; padding-top: 2px; }
.pc-desc { font-size: 14px; color: var(--t2); line-height: 1.8; font-weight: 300; margin-bottom: 16px; }
.pc-stack { display: flex; flex-wrap: wrap; gap: 6px; }
.pc-pill {
  font-family: var(--font-m); font-size: 11px; color: var(--accent);
  border: 1px solid rgba(56,189,248,0.25); background: rgba(56,189,248,0.06);
  padding: 3px 10px; border-radius: 5px; letter-spacing: 0.02em;
  transition: background .2s, border-color .2s;
}
.pc-pill:hover { background: rgba(56,189,248,0.14); border-color: rgba(56,189,248,0.4); }

/* AWARDS */
.aw-list { display: flex; flex-direction: column; }
.aw-row {
  display: flex; align-items: flex-start; gap: 28px; padding: 20px 8px;
  border-bottom: 1px solid rgba(56,189,248,0.12); transition: background .2s;
  border-radius: 6px;
}
.aw-row:first-child { border-top: 1px solid rgba(56,189,248,0.12); }
.aw-row:hover { background: rgba(56,189,248,0.04); }
.aw-medal {
  font-family: var(--font-m); font-size: 11px; font-weight: 600;
  letter-spacing: 0.12em; min-width: 76px; padding-top: 2px; flex-shrink: 0;
}
.aw-gold { color: #f5c347; text-shadow: 0 0 12px rgba(245,195,71,0.5); }
.aw-silver { color: #94a3b8; }
.aw-finalist { color: #c084fc; text-shadow: 0 0 10px rgba(192,132,252,0.4); }
.aw-top50 { color: #4ade80; }
.aw-3rd { color: #fb923c; }
.aw-body { flex: 1; }
.aw-event { font-size: 15px; font-weight: 500; color: var(--t1); margin-bottom: 5px; }
.aw-desc { font-size: 13px; color: var(--t2); font-weight: 300; line-height: 1.55; }
.aw-scale { font-family: var(--font-m); font-size: 11px; color: var(--t3); flex-shrink: 0; text-align: right; white-space: nowrap; padding-top: 2px; }

/* LEADERSHIP */
.lr-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.lr-card {
  background: var(--bg2); border: 1px solid rgba(56,189,248,0.18);
  border-radius: 12px; padding: 26px;
  transition: border-color .25s, box-shadow .25s;
  position: relative; overflow: hidden;
}
.lr-card::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(56,189,248,0.35), transparent);
}
.lr-card:hover {
  border-color: rgba(56,189,248,0.35);
  box-shadow: 0 8px 32px rgba(56,189,248,0.08);
}
.lr-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-bottom: 6px; }
.lr-role { font-size: 15px; font-weight: 600; color: var(--t1); }
.lr-period { font-family: var(--font-m); font-size: 11px; color: var(--t3); flex-shrink: 0; }
.lr-org { font-size: 13px; color: var(--accent); margin-bottom: 16px; font-weight: 400; opacity: 0.85; }
.lr-pts { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.lr-pts li { display: flex; gap: 12px; font-size: 13px; color: var(--t2); line-height: 1.65; font-weight: 300; }
.lr-dash { color: var(--accent); flex-shrink: 0; opacity: 0.5; }

/* EDUCATION */
.ed-list { display: flex; flex-direction: column; }
.ed-row { display: flex; align-items: flex-start; gap: 0; padding: 28px 0; border-bottom: 1px solid rgba(56,189,248,0.12); }
.ed-row:last-child { border-bottom: none; }
.ed-year { font-family: var(--font-m); font-size: 12px; color: var(--accent); width: 52px; flex-shrink: 0; padding-top: 4px; opacity: 0.75; }
.ed-track { display: flex; flex-direction: column; align-items: center; width: 24px; flex-shrink: 0; margin-right: 24px; }
.ed-dot {
  width: 10px; height: 10px; border-radius: 50%;
  background: var(--accent); border: 2px solid var(--bg); flex-shrink: 0;
  box-shadow: 0 0 10px rgba(56,189,248,0.5);
}
.ed-line { flex: 1; width: 1px; background: rgba(56,189,248,0.2); min-height: 40px; margin-top: 4px; }
.ed-body { flex: 1; }
.ed-degree { font-size: 16px; font-weight: 500; color: var(--t1); margin-bottom: 4px; }
.ed-inst { font-size: 14px; color: var(--t2); margin-bottom: 10px; font-weight: 300; }
.ed-score {
  font-family: var(--font-d); font-size: 24px; letter-spacing: -0.02em;
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}

/* EXTRA */
.ex-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.ex-card {
  background: var(--bg2); border: 1px solid rgba(56,189,248,0.18);
  border-radius: 12px; padding: 26px;
  transition: border-color .25s, box-shadow .25s;
}
.ex-card:hover {
  border-color: rgba(56,189,248,0.32);
  box-shadow: 0 8px 28px rgba(56,189,248,0.07);
}
.ex-cat {
  font-family: var(--font-m); font-size: 11px; letter-spacing: 0.12em;
  text-transform: uppercase; color: var(--accent); margin-bottom: 18px;
  padding-bottom: 14px; border-bottom: 1px solid rgba(56,189,248,0.15);
  opacity: 0.85;
}
.ex-items { list-style: none; display: flex; flex-direction: column; gap: 12px; }
.ex-items li { display: flex; gap: 12px; font-size: 13px; color: var(--t2); line-height: 1.65; font-weight: 300; }
.ex-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--accent); flex-shrink: 0; margin-top: 7px; opacity: 0.55; }

/* FOOTER */
.footer {
  position: relative; z-index: 1;
  border-top: 1px solid rgba(56,189,248,0.18); padding: 44px 32px;
  background: rgba(2,14,31,0.6);
}
.footer-inner { max-width: 1160px; margin: 0 auto; display: flex; justify-content: space-between; align-items: flex-start; gap: 40px; flex-wrap: wrap; margin-bottom: 28px; }
.footer-name { font-family: var(--font-d); font-size: 26px; font-style: italic; color: var(--t1); margin-bottom: 6px; }
.footer-sub { font-family: var(--font-m); font-size: 11px; color: var(--t3); letter-spacing: 0.08em; }
.footer-r { display: flex; flex-direction: column; gap: 10px; align-items: flex-end; }
.footer-link { font-size: 13px; color: var(--t2); text-decoration: none; font-weight: 300; transition: color .2s; }
.footer-link:hover { color: var(--accent); }
.footer-line { max-width: 1160px; margin: 0 auto 18px; height: 1px; background: rgba(56,189,248,0.12); }
.footer-copy { max-width: 1160px; margin: 0 auto; font-family: var(--font-m); font-size: 11px; color: var(--t3); letter-spacing: 0.08em; }

/* RESPONSIVE */
@media (max-width: 1024px) {
  .nav-links { display: none; }
  .nav-ham { display: flex; }
  .vc-grid { grid-template-columns: 1fr; }
  .lr-grid { grid-template-columns: 1fr; }
  .ex-grid { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  .hero-inner { gap: 48px; }
  .hero-stats { flex-direction: row; flex-wrap: wrap; gap: 20px; }
  .hs-item { text-align: left; }
  .hero-name { font-size: 64px; }
  .section { padding: 72px 20px 0; }
  .aw-row { flex-wrap: wrap; gap: 12px; }
  .aw-scale { min-width: 100%; }
  .vc-impact { grid-template-columns: repeat(2, 1fr); }
  .footer-r { align-items: flex-start; }
  body { cursor: auto; }
  .cursor-dot, .cursor-ring { display: none; }
}
@media (max-width: 480px) {
  .hero { padding: 88px 20px 48px; }
  .hero-name { font-size: 52px; }
  .pc-header { flex-wrap: wrap; }
  .pc-period { order: -1; }
}

a, button { cursor: none; }
@media (hover: none) { a, button { cursor: pointer; } }

::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 99px; }
::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.3); }
`;