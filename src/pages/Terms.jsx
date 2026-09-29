import { useEffect, useState } from "react"

import { Kicker, Reveal, IMG, usePrefersReducedMotion } from "../lib/ui"

import { CTA } from "./Home"

/* ---------- CONTENT ---------- */

// Update these before publishing
const EFFECTIVE_DATE = "1 October 2026"
const JURISDICTION = "[City], [State], India" // e.g. courts of your registered city
const CONTACT = {
  company: "Leo Hospitality",
  email: "support@leohospitality.in",
  phone: "+91 80877 59997",
  address: "FN 2402 F 24 Alpine BN 01, Regency Anantham City, Dombivali I. A Kalyan, Thane-421203, India",
}

const INTRO = [
  "Welcome to Leo Hospitality. These Terms & Conditions (“Terms”) govern your access to and use of our website, services, restaurants, hospitality facilities, events, bookings, and other offerings.",
  "By accessing our website or using our services, you agree to be bound by these Terms.",
]

const SECTIONS = [
  {
    id: "general",
    title: "General terms",
    clauses: [
      "The website and its services are operated by Leo Hospitality (“Leo Hospitality”, “we”, “us”, or “our”).",
      "By accessing or using this website, you confirm that the information you provide is accurate and that you agree to comply with these Terms.",
      "We may modify, update, or amend these Terms at any time. Changes take effect once published on the website.",
    ],
  },
  {
    id: "website-use",
    title: "Website use",
    clauses: [
      "The website provides information about our hospitality services, restaurants, events, facilities, offers, and related services.",
      "You must not use the website for any unlawful, fraudulent, abusive, or unauthorised purpose.",
      "You must not attempt to interfere with the operation, security, or functionality of the website.",
      "We may restrict or terminate access to the website where we identify misuse or unauthorised activity.",
    ],
  },
  {
    id: "bookings",
    title: "Bookings and reservations",
    clauses: [
      "All reservations, bookings, and service requests are subject to availability and confirmation.",
      "You are responsible for providing accurate information when making a booking or reservation.",
      "A booking is confirmed only after Leo Hospitality has confirmed it and, where applicable, the required payment or advance has been received.",
      "We may refuse, modify, or cancel a booking in cases involving incorrect information, suspected fraudulent activity, operational requirements, or circumstances beyond our reasonable control.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    clauses: [
      "All content on the website, including logos, trademarks, photographs, graphics, videos, text, designs, menus, and other materials, is owned by or licensed to Leo Hospitality unless otherwise stated.",
      "You may not copy, reproduce, modify, distribute, publish, or commercially use any content from the website without our prior written permission.",
    ],
  },
  {
    id: "third-party",
    title: "Third-party services and links",
    clauses: [
      "The website may contain links to third-party websites, booking platforms, payment gateways, social media platforms, or other services.",
      "Leo Hospitality does not control, and is not responsible for, the content, availability, security, or privacy practices of third-party websites or services.",
      "We recommend that you review the terms and privacy policies of any third-party service before using it.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of liability",
    clauses: [
      "The website and its content are provided for general information and may be updated or changed without notice. We do not guarantee that the website will always be available, uninterrupted, or error-free.",
      "To the extent permitted by applicable law, Leo Hospitality is not liable for any indirect or consequential loss arising from your use of the website or reliance on its content.",
      "Nothing in these Terms limits any liability that cannot be excluded under applicable law.",
    ],
  },
  {
    id: "force-majeure",
    title: "Force majeure",
    clauses: [
      "Leo Hospitality is not responsible for any delay, interruption, cancellation, or failure to provide services caused by circumstances beyond its reasonable control.",
      "Such circumstances may include natural disasters, fire, government restrictions, strikes, epidemics, power failures, technical failures, civil disturbances, or other unforeseen events.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy",
    clauses: [
      "We handle personal information collected through the website in accordance with our Privacy Policy.",
      "By using the website, you acknowledge that you have reviewed the applicable Privacy Policy.",
    ],
    link: { label: "Read our Privacy Policy", to: "privacy" },
  },
  {
    id: "governing-law",
    title: "Governing law",
    clauses: [
      "These Terms are governed by the laws of India.",
      `Any dispute arising from these Terms or your use of our website or services is subject to the jurisdiction of the courts at ${JURISDICTION}.`,
    ],
  },
  {
    id: "contact",
    title: "Contact us",
    clauses: [
      "If you have questions about these Terms, please contact us:",
    ],
    contact: true,
  },
]

/* ---------- PAGE ---------- */

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length) setActive(visible[0].target.id)
      },
      { rootMargin: "-20% 0px -65% 0px" },
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [ids])

  return active
}

export function Terms({ go }) {
  const reducedMotion = usePrefersReducedMotion()
  const ids = SECTIONS.map((s) => s.id)
  const active = useActiveSection(ids)

  const jump = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth",
      block: "start",
    })
  }

  return (
    <>
      {/* HEADER BAND */}
      <section
        data-tone="dark"
        className="relative overflow-hidden bg-ink pt-40 pb-20 lg:pt-48 lg:pb-24"
      >
        <img
          src={IMG.lamps}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          style={{ filter: "contrast(1.1) saturate(1.1)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/40" />
        <div className="relative z-10 mx-auto max-w-[1440px] px-6 lg:px-12">
          <Reveal>
            <Kicker tone="light">Legal</Kicker>
            <h1
              className="mt-5 max-w-3xl text-5xl leading-[1.08] tracking-[-0.015em] text-paper sm:text-6xl"
              style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
            >
              Terms &amp; Conditions
            </h1>
            <p className="mt-5 text-sm text-paper/70">
              Effective date: {EFFECTIVE_DATE}
            </p>
          </Reveal>
        </div>
      </section>

      {/* BODY */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 lg:grid-cols-[280px_1fr] lg:gap-20 lg:px-12">
          {/* Sticky contents */}
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <nav aria-label="Terms and conditions contents">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-bronze">
                Contents
              </p>
              <ol className="mt-5 hidden border-l border-line lg:block">
                {SECTIONS.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      onClick={(e) => jump(e, s.id)}
                      aria-current={active === s.id ? "true" : undefined}
                      className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm transition-colors focus:outline-none focus-visible:text-forest ${
                        active === s.id
                          ? "border-forest font-semibold text-forest"
                          : "border-transparent text-ink-soft hover:text-forest"
                      }`}
                    >
                      {i + 1}. {s.title}
                    </a>
                  </li>
                ))}
              </ol>

              {/* Mobile: compact jump menu */}
              <select
                aria-label="Jump to section"
                className="mt-4 w-full border border-line bg-cream px-4 py-3 text-sm text-ink lg:hidden"
                value={active}
                onChange={(e) => jump(e, e.target.value)}
              >
                {SECTIONS.map((s, i) => (
                  <option key={s.id} value={s.id}>
                    {i + 1}. {s.title}
                  </option>
                ))}
              </select>
            </nav>
          </aside>

          {/* Terms text */}
          <article className="max-w-3xl">
            <div className="space-y-4 border-b border-line pb-10">
              {INTRO.map((p) => (
                <p key={p} className="text-lg leading-relaxed text-[#201d18]">
                  {p}
                </p>
              ))}
            </div>

            {SECTIONS.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                className="scroll-mt-28 border-b border-line py-10"
              >
                <h2
                  className="text-2xl tracking-tight text-ink sm:text-3xl"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                >
                  <span className="mr-3 text-bronze">{i + 1}.</span>
                  {s.title}
                </h2>

                <ol className="mt-6 grid gap-4">
                  {s.clauses.map((c, j) => (
                    <li
                      key={c}
                      className="grid grid-cols-[3rem_1fr] leading-relaxed text-ink-soft"
                    >
                      <span className="font-semibold text-bronze">
                        {i + 1}.{j + 1}
                      </span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ol>

                {s.link && (
                  <button
                    onClick={() => go(s.link.to)}
                    className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest hover:text-forest-deep focus:underline focus:outline-none"
                  >
                    {s.link.label}
                    <span className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </button>
                )}

                {s.contact && (
                  <div className="mt-6 border border-line bg-cream p-6 sm:p-8">
                    <p
                      className="text-xl text-ink"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {CONTACT.company}
                    </p>
                    <dl className="mt-4 grid gap-3 text-sm text-ink-soft sm:grid-cols-[100px_1fr]">
                      <dt className="font-semibold text-ink">Email</dt>
                      <dd>
                        <a
                          href={`mailto:${CONTACT.email}`}
                          className="text-forest underline-offset-4 hover:underline"
                        >
                          {CONTACT.email}
                        </a>
                      </dd>
                      <dt className="font-semibold text-ink">Phone</dt>
                      <dd>{CONTACT.phone}</dd>
                      <dt className="font-semibold text-ink">Address</dt>
                      <dd>{CONTACT.address}</dd>
                    </dl>
                  </div>
                )}
              </section>
            ))}

            <p className="pt-10 leading-relaxed text-[#201d18]">
              By accessing our website or using our services, you acknowledge
              that you have read, understood, and agreed to these Terms &amp;
              Conditions.
            </p>
          </article>
        </div>
      </section>

      <CTA go={go} />
    </>
  )
}

export default Terms