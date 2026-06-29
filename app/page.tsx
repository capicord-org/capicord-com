import Navbar from "./components/Navbar";
import ContactForm from "./components/ContactForm";

const NAV_LINKS = [
  { label: "How it Works", href: "#how-it-works" },
  { label: "For Borrowers", href: "#borrowers" },
  { label: "For Agents", href: "#agents" },
  { label: "For Partners", href: "#partners" },
  { label: "Contact", href: "#contact" },
];


export default function Home() {
  return (
    <>
      {/* Skip to main content — keyboard/screen-reader accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-teal focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:font-semibold focus:text-[15px] focus:no-underline"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content">
        {/* ── HERO ── */}
        <section aria-labelledby="hero-heading" className="bg-white px-5 pt-14 pb-16 md:pt-24 md:pb-20 text-center">
          <div className="max-w-2xl mx-auto">
            <h1
              id="hero-heading"
              className="text-[clamp(36px,7vw,64px)] font-bold text-navy leading-[1.1] tracking-[-1.5px] mb-5"
            >
              Credit, Connected.
            </h1>
            <p className="text-[clamp(16px,2.5vw,20px)] text-muted max-w-xl mx-auto leading-[1.7] mb-10">
              Access credit from trusted, RBI-regulated NBFC partners — with minimal paperwork,
              transparent terms, and real-time status tracking. Built for borrowers, agents, and
              lenders across India.
            </p>

            {/* Borrower → Capicord → NBFC flow — vertical on mobile, horizontal on desktop */}
            <div
              className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-10"
              aria-label="How Capicord connects borrowers to NBFCs"
            >
              {(["Borrower", "Capicord", "NBFC"] as const).map((node, i, arr) => (
                <div key={node} className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                  <div
                    className={`px-5 py-2.5 rounded-lg text-[15px] font-semibold border w-36 sm:w-auto text-center ${
                      node === "Capicord"
                        ? "bg-navy text-white border-navy"
                        : "bg-site-bg text-navy border-slate-200"
                    }`}
                  >
                    {node}
                  </div>
                  {i < arr.length - 1 && (
                    <>
                      {/* Down arrow on mobile */}
                      <svg className="sm:hidden" width="14" height="20" viewBox="0 0 14 20" fill="none" aria-hidden="true">
                        <path d="M7 0v16M1 10l6 8 6-8" stroke="#1A9378" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {/* Right arrow on desktop */}
                      <svg className="hidden sm:block" width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
                        <path d="M0 7h16M10 1l7 6-7 6" stroke="#1A9378" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#contact"
                className="bg-teal hover:bg-teal-dark text-white font-semibold text-[16px] px-8 py-3.5 rounded-lg transition-colors no-underline text-center"
              >
                Apply for a Loan
              </a>
              <a
                href="#contact"
                className="border-2 border-navy text-navy hover:bg-navy hover:text-white font-semibold text-[16px] px-8 py-3.5 rounded-lg transition-colors no-underline text-center"
              >
                Become an Agent
              </a>
            </div>
          </div>
        </section>

        {/* ── TRUST BAR ── */}
        <aside
          aria-label="Trust signals"
          className="bg-site-bg border-y border-slate-200 px-5 py-4"
        >
          <p className="text-[13px] text-muted font-medium tracking-wide text-center">
            RBI Digital Lending Guidelines Compliant&nbsp;&nbsp;·&nbsp;&nbsp;
            Transparent Pricing&nbsp;&nbsp;·&nbsp;&nbsp;256-bit Data
            Encryption&nbsp;&nbsp;·&nbsp;&nbsp;Partnered with Licensed NBFCs
          </p>
        </aside>

        {/* ── HOW IT WORKS ── */}
        <section id="how-it-works" aria-labelledby="how-it-works-heading" className="bg-white px-5 py-14 md:py-20">
          <div className="max-w-[1100px] mx-auto">
            <h2
              id="how-it-works-heading"
              className="text-center text-[clamp(26px,4vw,36px)] font-bold text-navy tracking-[-0.5px] mb-14"
            >
              How Capicord Works
            </h2>
            <ol
              className="grid grid-cols-1 md:grid-cols-3 gap-10 list-none m-0 p-0"
              aria-label="Three steps to get a loan through Capicord"
            >
              {[
                {
                  n: 1,
                  title: "Register in Minutes",
                  body: "Create your profile with basic KYC documents — PAN card and address proof. Our digital onboarding takes under 5 minutes, with help from a Capicord agent if needed.",
                },
                {
                  n: 2,
                  title: "Get Matched & Verified",
                  body: "We assess your application against our credit framework and route it to the most suitable NBFC lending partner — based on your profile, loan type, and tenure.",
                },
                {
                  n: 3,
                  title: "Receive Funds Directly",
                  body: "Your NBFC partner reviews, approves, and disburses directly to your bank account. Track every stage in real time through your Capicord dashboard.",
                },
              ].map((step) => (
                <li key={step.n} className="flex flex-col gap-5">
                  <div
                    className="w-12 h-12 rounded-full bg-teal text-white flex items-center justify-center font-bold text-xl shrink-0"
                    aria-hidden="true"
                  >
                    {step.n}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-navy mb-2.5">{step.title}</h3>
                    <p className="text-muted leading-[1.7] text-[15px]">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── FOR WHOM ── */}
        <section id="borrowers" aria-labelledby="for-whom-heading" className="bg-site-bg px-5 py-14 md:py-20">
          <div className="max-w-[1100px] mx-auto">
            <h2
              id="for-whom-heading"
              className="text-center text-[clamp(26px,4vw,36px)] font-bold text-navy tracking-[-0.5px] mb-14"
            >
              Built for Everyone in the Credit Journey
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
              {[
                {
                  id: "borrowers-card",
                  title: "For Borrowers",
                  body: "Personal loans, business loans, or your first credit experience — Capicord connects you to India's top NBFC lenders with transparent rates, zero hidden fees, and a fully digital process. Know exactly what you owe, upfront.",
                  cta: "Apply for a Loan →",
                },
                {
                  id: "agents",
                  title: "For Agents & DSAs",
                  body: "Build your lending portfolio with a platform designed for field agents. Submit applications, track borrower KYC, monitor commission payouts, and get real-time application status — all from a single dashboard.",
                  cta: "Become an Agent →",
                },
                {
                  id: "partners",
                  title: "For NBFC Partners",
                  body: "Receive a curated, creditworthy borrower pipeline with verified KYC, structured documentation, and digital audit trails — reducing your cost-per-acquisition and onboarding time significantly.",
                  cta: "Partner With Us →",
                },
              ].map((card) => (
                <article
                  key={card.id}
                  id={card.id}
                  className="bg-white rounded-xl border border-slate-200 p-6 md:p-9 flex flex-col gap-4"
                >
                  <h3 className="text-xl font-bold text-navy">{card.title}</h3>
                  <p className="text-muted leading-[1.7] text-[15px] flex-1">{card.body}</p>
                  <a
                    href="#contact"
                    className="text-teal hover:text-teal-dark font-semibold text-[15px] no-underline transition-colors"
                  >
                    {card.cta}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── KEY PRINCIPLES ── */}
        <section aria-labelledby="principles-heading" className="bg-white px-5 py-14 md:py-20">
          <div className="max-w-[1100px] mx-auto">
            <h2
              id="principles-heading"
              className="text-center text-[clamp(26px,4vw,36px)] font-bold text-navy tracking-[-0.5px] mb-14"
            >
              What We Stand For
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 list-none m-0 p-0">
              {[
                {
                  title: "Transparency First",
                  body: "Interest rates, processing fees, and repayment schedules are disclosed upfront — before you sign. No surprises, no hidden charges.",
                },
                {
                  title: "Top-Quality Credit Assessment",
                  body: "We follow a robust credit framework to match borrowers to the right lenders — reducing risk for NBFC partners and improving approval rates for borrowers.",
                },
                {
                  title: "Mobile-First, India-First",
                  body: "Complete your entire application from a smartphone. Built for real India — minimal paperwork, vernacular support, and agent-assisted onboarding for first-time borrowers.",
                },
                {
                  title: "Regulatory Compliance",
                  body: "Capicord operates strictly under RBI Digital Lending Guidelines. All data is encrypted, processed securely, and handled per applicable data protection requirements.",
                },
              ].map((p) => (
                <li key={p.title} className="bg-site-bg rounded-xl border border-slate-200 p-6 md:p-8">
                  <h3 className="text-[17px] font-bold text-navy mb-3">{p.title}</h3>
                  <p className="text-muted leading-[1.7] text-[15px]">{p.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" aria-labelledby="contact-heading" className="bg-site-bg px-5 py-14 md:py-20">
          <div className="max-w-[1100px] mx-auto">
            <h2
              id="contact-heading"
              className="text-center text-[clamp(26px,4vw,36px)] font-bold text-navy tracking-[-0.5px] mb-3"
            >
              Get in Touch
            </h2>
            <p className="text-center text-muted text-[15px] mb-12">
              We typically respond within 1 business day.
            </p>

            {/* Contact info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14 max-w-2xl mx-auto">
              <div className="bg-white border border-slate-200 rounded-xl px-6 py-6 text-center">
                <p className="text-[13px] font-semibold text-muted uppercase tracking-widest mb-2">
                  Borrowers, Agents &amp; Partners
                </p>
                <p className="text-[15px] text-navy font-medium">Fill in the form below — we read every message.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl px-6 py-6 text-center">
                <p className="text-[13px] font-semibold text-muted uppercase tracking-widest mb-2">
                  Response Time
                </p>
                <p className="text-[15px] text-navy font-medium">Within 1 business day</p>
              </div>
            </div>

            {/* Contact form — Client Component */}
            <div className="max-w-[560px] mx-auto bg-white rounded-xl border border-slate-200 p-6 md:p-10">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-navy text-white px-5 pt-12 pb-8">
        <div className="max-w-[1100px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">
            <div>
              <p className="font-bold text-[22px] mb-2">Capicord</p>
              <p className="text-[14px] text-slate-400">Credit, Connected.</p>
            </div>

            <nav aria-label="Footer navigation">
              <p className="text-[12px] font-semibold uppercase tracking-widest text-slate-400 mb-4">
                Quick Links
              </p>
              <ul className="flex flex-col gap-2.5 list-none m-0 p-0">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-slate-300 hover:text-white text-[14px] no-underline transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <p className="text-[12px] font-semibold uppercase tracking-widest text-slate-400 mb-4">
                Follow Us
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { label: "Twitter", href: "https://twitter.com/capi_cord" },
                  { label: "Instagram", href: "https://instagram.com/capi.cord" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    rel="noopener noreferrer"
                    target="_blank"
                    aria-label={`Capicord on ${s.label} (opens in new tab)`}
                    className="text-[14px] text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 rounded-md px-3 py-1.5 no-underline transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <hr className="border-none bg-slate-700 h-px mb-6" />

          <p className="text-[13px] text-slate-500 text-center mb-4">
            © 2025 Capicord Fintech Pvt. Ltd. All rights reserved.&nbsp;&nbsp;·&nbsp;&nbsp;RBI
            Digital Lending Guidelines Compliant
          </p>
          <p className="text-[12px] text-slate-600 text-center leading-[1.6] max-w-2xl mx-auto">
            Capicord is a Lending Service Provider (LSP). Capicord does not lend money, approve
            loans, or disburse funds. All lending is done by our partner NBFCs who are registered
            and regulated by the Reserve Bank of India.
          </p>
        </div>
      </footer>
    </>
  );
}
