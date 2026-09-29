import { useEffect, useState } from "react"

import { Kicker, Reveal, IMG, usePrefersReducedMotion } from "../lib/ui"

import { CTA } from "./Home"

/* ---------- CONTENT ---------- */

// Update these before publishing
const EFFECTIVE_DATE = "1 October 2026"
const CONTACT = {
  company: "Leo Hospitality",
  email: "support@leohospitality.in",
  phone: "+91 80877 59997",
  address: "FN 2402 F 24 Alpine BN 01, Regency Anantham City, Dombivali I. A Kalyan, Thane-421203, India",
}

const INTRO = [
  "Leo Hospitality (“Leo Hospitality”, “we”, “us”, or “our”) respects your privacy and is committed to protecting the personal information you share with us when you use our website, services, properties, restaurants, events, and other hospitality offerings.",
  "This Privacy Policy explains how we collect, use, store, share, and protect your personal information when you visit our website or interact with us.",
]

const SECTIONS = [
  {
    id: "information-we-collect",
    title: "Information we collect",
    lead: "Depending on how you interact with us, we may collect:",
    list: [
      "Name and contact details, including mobile number and email address",
      "Billing and payment-related information",
      "Booking and reservation details",
      "Guest or event-related information",
      "Dietary preferences or special requests you choose to share",
      "Feedback, reviews, enquiries, and other communications",
      "Information you submit through contact, booking, enquiry, or subscription forms",
      "Website usage information, such as IP address, browser type, device information, and pages visited",
      "Information collected through cookies and similar technologies",
    ],
    after: "We collect only the information reasonably necessary to provide and improve our services.",
  },
  {
    id: "how-we-use-information",
    title: "How we use your information",
    lead: "We may use your personal information to:",
    list: [
      "Process and manage bookings and reservations",
      "Provide the hospitality, food, event, or other services you request",
      "Respond to your enquiries and requests",
      "Process payments and transactions",
      "Send booking confirmations, updates, and service-related information",
      "Provide customer support",
      "Improve our website, services, and guest experience",
      "Send promotional communications, offers, or updates, where permitted",
      "Prevent fraud, misuse, or unauthorised activity",
      "Comply with applicable legal and regulatory requirements",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and similar technologies",
    lead: "Our website may use cookies and similar technologies to improve functionality and understand how visitors use it. Cookies help us to:",
    list: [
      "Remember your preferences",
      "Improve website performance",
      "Understand website traffic and usage",
      "Provide a better user experience",
    ],
    after: "You can manage or disable cookies through your browser settings. Some website features may not work properly if cookies are disabled.",
  },
  {
    id: "sharing",
    title: "Sharing of information",
    lead: "We do not sell or rent your personal information. We may share necessary information with:",
    list: [
      "Payment processors and financial institutions",
      "Booking and reservation service providers",
      "Technology, hosting, and website service providers",
      "Event or hospitality partners, where needed to deliver the service you requested",
      "Professional advisers, where reasonably necessary",
      "Government authorities or law-enforcement agencies, where required by law",
    ],
    after: "Third-party service providers process information on our behalf and are expected to handle it in line with applicable requirements.",
  },
  {
    id: "security",
    title: "Data security",
    paras: [
      "We take reasonable administrative, technical, and organisational measures to protect personal information against unauthorised access, alteration, disclosure, misuse, or destruction.",
      "However, no method of transmitting or storing information electronically can be guaranteed to be completely secure.",
    ],
  },
  {
    id: "retention",
    title: "Data retention",
    paras: [
      "We keep personal information only for as long as reasonably necessary for the purposes described in this policy. This includes providing services, maintaining business records, resolving disputes, preventing fraud, and meeting legal or regulatory obligations.",
      "When information is no longer needed, we may securely delete or anonymise it, subject to applicable legal requirements.",
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    lead: "Subject to applicable law, you may have the right to:",
    list: [
      "Request access to certain personal information we hold about you",
      "Request correction of inaccurate or incomplete information",
      "Request deletion of your information, where legally applicable",
      "Withdraw consent, where processing is based on consent",
      "Raise concerns about how your personal information is handled",
      "Opt out of certain promotional communications",
    ],
    after: "To make a request, use the contact details in the “Contact us” section below.",
  },
  {
    id: "marketing",
    title: "Marketing communications",
    paras: [
      "Where permitted by law, we may send you information about offers, promotions, events, new services, or other updates.",
      "You can opt out of promotional communications at any time by following the unsubscribe instructions in the message or by contacting us directly.",
      "We may still send service-related messages, such as booking confirmations or important updates, where needed to deliver the service you requested.",
    ],
  },
  {
    id: "children",
    title: "Children’s privacy",
    paras: [
      "Our services are not intentionally directed towards children. We do not knowingly collect personal information from children where such collection is prohibited by applicable law.",
      "If you believe a child has provided personal information to us inappropriately, please contact us so we can take appropriate steps.",
    ],
  },
  {
    id: "third-party-links",
    title: "Third-party links",
    paras: [
      "Our website may contain links to third-party websites, booking platforms, or social media pages. We are not responsible for the privacy practices or content of those sites, and we encourage you to read their privacy policies before sharing your information.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    paras: [
      "We may update this Privacy Policy from time to time to reflect changes in our services, technology, business practices, or applicable laws.",
      "The updated policy will be published on this page with a revised effective date. By using our website or services, you acknowledge that you have read and understood this Privacy Policy.",
    ],
  },
  {
    id: "contact",
    title: "Contact us",
    paras: [
      "If you have questions about this Privacy Policy, or wish to exercise any of your rights, please contact us:",
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

export function Privacy({ go }) {
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
              Privacy Policy
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
            <nav aria-label="Privacy policy contents">
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

          {/* Policy text */}
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
                className="scroll-mt-28 border-b border-line py-10 last:border-b-0"
              >
                <h2
                  className="text-2xl tracking-tight text-ink sm:text-3xl"
                  style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
                >
                  <span className="mr-3 text-bronze">{i + 1}.</span>
                  {s.title}
                </h2>

                {s.lead && (
                  <p className="mt-5 leading-relaxed text-ink-soft">{s.lead}</p>
                )}

                {s.paras?.map((p) => (
                  <p key={p} className="mt-5 leading-relaxed text-ink-soft">
                    {p}
                  </p>
                ))}

                {s.list && (
                  <ul className="mt-5 grid gap-3">
                    {s.list.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 leading-relaxed text-ink-soft"
                      >
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-bronze" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {s.after && (
                  <p className="mt-5 leading-relaxed text-ink-soft">{s.after}</p>
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
          </article>
        </div>
      </section>

      <CTA go={go} />
    </>
  )
}

export default Privacy