import { useState } from "react"
import { Button, Arrow, Kicker, Reveal, IMG } from "../lib/ui"
import { PageHero } from "../components/PageHero"
import { CTA } from "./Home"
import { VENTURES_DATA } from "../lib/data"

/* -------------------------------------------------------------------------- */
/*                                DATA & ASSETS                               */
/* -------------------------------------------------------------------------- */

const VENTURE_METRICS = {
  "bodhi-tree": [
    {
      val: "4.8 ★",
      label: "Guest Satisfaction",
      sub: "Based on 1,400+ verified ratings",
    },
    {
      val: "150+",
      label: "Daily Covers",
      sub: "Consistent breakfast to dinner flow",
    },
    {
      val: "100%",
      label: "Signature Recipes",
      sub: "Made from scratch with carefully sourced ingredients",
    },
    {
      val: "All-Day",
      label: "Dining Ambience",
      sub: "Built for community & creative work",
    },
  ],
 "ryvive-roots": [
  {
    val: "Consistency",
    label: "Culinary Standards",
    sub: "Defined recipes, preparation methods, and quality controls across the operation",
  },
  {
    val: "Efficiency",
    label: "Delivery Operations",
    sub: "Integrated workflows from kitchen preparation through packaging and dispatch",
  },
  {
    val: "Scalability",
    label: "Growth Framework",
    sub: "An adaptable operating structure designed for expansion and long-term growth",
  },
  {
    val: "Experience",
    label: "Brand Touchpoints",
    sub: "A considered approach to food, packaging, presentation, and customer experience",
  },
],
}

// Icons: 24x24 viewBox, stroke-based
// <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
//      strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
//   <path d={icon} />
// </svg>
const VENTURE_HIGHLIGHTS = {
  "bodhi-tree": [
    {
      title: "Culinary & Menu Management",
      desc: "Curated menus, ingredient quality, recipe consistency, kitchen coordination, and continuous refinement of the dining offering.",
      // Chef hat
      icon: "M17 21a1 1 0 0 0 1-1v-5.35c0-.46.32-.84.73-1.04a4 4 0 0 0-2.13-7.59 5 5 0 0 0-9.19 0 4 4 0 0 0-2.13 7.59c.41.2.72.58.72 1.04V20a1 1 0 0 0 1 1zM6 17h12",
    },
    {
      title: "Guest Experience & Hospitality",
      desc: "Warm, attentive service supported by defined hospitality standards, seamless guest journeys, and a strong focus on customer satisfaction.",
      // Service bell (concierge)
      icon: "M3 20a1 1 0 0 1-1-1v-1a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1zM20 16a8 8 0 1 0-16 0M12 4v4M10 4h4",
    },
    {
      title: "Ambience & Space Management",
      desc: "Thoughtfully maintained interiors, lighting, seating, cleanliness, and overall atmosphere designed to support a distinctive dining experience.",
      // Pendant lamp (lighting & atmosphere)
      icon: "M12 2v5M6 7h12l4 9H2zM9.17 16a3 3 0 1 0 5.66 0",
    },
  ],
  "ryvive-roots": [
    {
      title: "Order & Delivery Operations",
      desc: "Streamlined order processing, preparation coordination, packaging, and dispatch workflows designed to support a smooth delivery experience.",
      // Delivery truck
      icon: "M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2M9 18h5M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14M9 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM19 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0z",
    },
    {
      title: "Quality & Food Safety",
      desc: "Structured checks across ingredients, preparation, storage, packaging, and handling to uphold high standards of freshness and food quality.",
      // Shield with check
      icon: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1zM9 12l2 2 4-4",
    },
    {
      title: "Packaging & Brand Experience",
      desc: "Purposeful packaging designed to protect food quality while creating a clean, consistent, and recognisable brand experience at delivery.",
      // Package box
      icon: "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73zM12 22V12M3.29 7 12 12l8.71-5M7.5 4.27l9 5.15",
    },
  ],
};

const FUTURE_CONCEPTS = [
  {
    num: "01",
    name: "The Conservatory Lounge",
    type: "Botanical Cocktail & Social Lounge",
    tagline: "Evening mixology paired with progressive artisanal small plates.",
    stage: "Site Feasibility",
    stageColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
    location: "Mumbai (BKC / Lower Parel)",
    image: IMG.lamps,
    desc: "An intimate conservatory setting celebrating botanical spirits, rare herbal teas, and twilight dining for urban tastemakers.",
    features: [
      "Curated Zero-Proof & Spirit Menus",
      "Acoustic-Treated Lounge Architecture",
      "Bespoke Evening Hospitality",
    ],
  },
  {
    num: "02",
    name: "Maison Artisane",
    type: "Boulangerie & Specialty Espresso Bar",
    tagline: "Handcrafted French viennoiserie and slow-fermented sourdoughs.",
    stage: "Culinary Lab R&D",
    stageColor: "text-amber-800 bg-amber-50 border-amber-200",
    location: "South Mumbai / Bandra",
    image: IMG.souffle,
    desc: "A neighborhood bakery honoring traditional European lamination techniques, stone-ground flours, and micro-lot single origin coffees.",
    features: [
      "Daily Small-Batch Baking",
      "Open Kitchen Display",
      "High-Volume Grab & Go",
    ],
  },
  {
    num: "03",
    name: "Veda Hearth",
    type: "Wood-Fired Indian Coastal Dining",
    tagline: "Ancient clay-pot cooking meets contemporary seaside hospitality.",
    stage: "Concept Formulation",
    stageColor: "text-forest bg-light-green/40 border-forest/20",
    location: "Goa / Western Coast",
    image: IMG.woodTable,
    desc: "Charcoal and wood-fired culinary heritage reviving forgotten recipes across the Konkan, Malabar, and Coromandel coastlines.",
    features: [
      "Locally Sourced Coastal Catch",
      "Handcrafted Clay Oven Cooking",
      "Bespoke Heritage Beverage Pairing",
    ],
  },
]

/* -------------------------------------------------------------------------- */
/*                            VENTURE SHOWCASE                                */
/* -------------------------------------------------------------------------- */

function VentureShowcase({ venture, reverse, go }) {
  const [activeTab, setActiveTab] = useState("pillars")
  const metrics = VENTURE_METRICS[venture.id] || []
  const highlights = VENTURE_HIGHLIGHTS[venture.id] || []

  return (
    <section className="relative overflow-hidden border-b border-line/60 bg-paper py-20 lg:py-28">
      {/* Ambient background decoration */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute h-96 w-96 rounded-full blur-3xl opacity-40 ${
          reverse
            ? "-left-20 top-20 bg-bronze/10"
            : "-right-20 bottom-20 bg-forest/10"
        }`}
      />

      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        <div
          className={`grid items-center gap-12 lg:grid-cols-12 lg:gap-16 ${
            reverse ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          {/* IMAGE SIDE (Col 1-6 or 7-12) */}
          <div className="lg:col-span-6">
            <Reveal>
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Main Visual Frame with Luxury Hover Zoom */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xs border border-line bg-cream shadow-xl group">
                  <img
                    src={venture.images[0]}
                    alt={venture.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-60" />

                  {/* Live Status Glass Pill */}
                  <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/60 bg-white/80 px-3.5 py-1.5 shadow-sm backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-forest font-semibold">
                      {venture.id === "bodhi-tree"
                        ? "Flagship Dine-In Venue"
                        : "Delivery-First Operations"}
                    </span>
                  </div>

                  {/* Title overlay on bottom */}
                  <div className="absolute bottom-4 left-4 right-4 text-paper">
                    <span className="text-xs font-mono uppercase tracking-widest text-bronze font-medium">
                      {venture.tag}
                    </span>
                    <h4
                      className="text-xl sm:text-2xl font-normal drop-shadow-sm text-paper"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {venture.name}
                    </h4>
                  </div>
                </div>

                {/* Floating Secondary Detail Photo (Offset luxury glass frame) */}
                <div className="absolute -bottom-8 -right-4 sm:-right-8 w-44 sm:w-56 aspect-[4/3] overflow-hidden rounded-xs border-2 border-white bg-paper shadow-2xl transition-transform duration-500 hover:-translate-y-1 z-20">
                  <img
                    src={venture.images[1]}
                    alt={`${venture.name} Detail`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-[10px] font-mono uppercase tracking-wider text-paper font-semibold">
                    {venture.id === "bodhi-tree"
                      ? "Spicy cottage cheese tacos"
                      : "Packaging"}
                  </div>
                </div>

                {/* Floating Ambient Motif from venture.floatingAsset */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-8 -left-8 h-24 w-24 text-forest/15 hidden sm:block"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-full w-full"
                  >
                    <path d="M12 2C11.5 2 6 6 6 12C6 15.3 8.7 18 12 18C15.3 18 18 15.3 18 12C18 6 12.5 2 12 2Z" />
                  </svg>
                </div>
              </div>
            </Reveal>
          </div>

          {/* CONTENT SIDE (Col 7-12) */}
          <div className="lg:col-span-6 pt-6 lg:pt-0">
            <Reveal>
              <div className="flex items-center gap-2">
                <span className="h-px w-6 bg-bronze" />
                <Kicker tone="bronze">{venture.tag}</Kicker>
              </div>

              <h2
                className="mt-3 text-3xl sm:text-4xl lg:text-5xl text-ink font-normal leading-[1.12] tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {venture.name}
              </h2>

              <p
                className="mt-3 text-lg text-forest italic font-normal leading-snug"
                style={{ fontFamily: "var(--font-display)" }}
              >
                &ldquo;{venture.tagline}&rdquo;
              </p>

              <p className="mt-5 text-base leading-relaxed text-ink-soft">
                {venture.copy}
              </p>

              {/* Interactive Tabs: Pillars vs Metrics */}
              <div className="mt-8 border-b border-line pb-2 flex gap-6">
                <button
                  type="button"
                  onClick={() => setActiveTab("pillars")}
                  className={`relative pb-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    activeTab === "pillars"
                      ? "text-forest"
                      : "text-ink-soft/70 hover:text-ink"
                  }`}
                >
                  Operational Pillars
                  {activeTab === "pillars" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("metrics")}
                  className={`relative pb-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    activeTab === "metrics"
                      ? "text-forest"
                      : "text-ink-soft/70 hover:text-ink"
                  }`}
                >
                  Key Impact Metrics
                  {activeTab === "metrics" && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-forest" />
                  )}
                </button>
              </div>

              {/* TAB 1: OPERATIONAL PILLARS */}
              {activeTab === "pillars" && (
                <div className="mt-6 space-y-4 animate-fadeIn">
                  {highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3.5 rounded-none border border-line/60 bg-cream/30 p-3.5 transition-all duration-300 hover:border-forest/40 hover:bg-cream/60"
                    >
                      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest">
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={1.7}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d={h.icon}
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-ink">
                          {h.title}
                        </h4>
                        <p className="mt-0.5 text-xs text-ink-soft leading-relaxed">
                          {h.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 2: KEY METRICS GRID */}
              {activeTab === "metrics" && (
                <div className="mt-6 grid grid-cols-2 gap-3 animate-fadeIn">
                  {metrics.map((m, i) => (
                    <div
                      key={i}
                      className="rounded-none border border-line bg-cream/40 p-4 transition-all duration-300 hover:border-forest/50"
                    >
                      <div
                        className="text-2xl font-normal text-forest"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {m.val}
                      </div>
                      <div className="mt-1 text-xs font-semibold text-ink">
                        {m.label}
                      </div>
                      <div className="mt-0.5 text-[11px] text-ink-soft">
                        {m.sub}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                
                <Button variant="secondary" onClick={() => go("contact")}>
                  Executive Inquiry
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*                               MAIN COMPONENT                               */
/* -------------------------------------------------------------------------- */

export function Ventures({ go }) {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredVentures = VENTURES_DATA.filter((v) => {
    if (selectedCategory === "dining") return v.id === "bodhi-tree"
    if (selectedCategory === "delivery") return v.id === "ryvive-roots"
    return true
  })

  return (
    <>
      <PageHero
        kicker="Brand Portfolio & Scale"
        title={
          <>
            Every Project,{" "}
            <span className="italic text-forest"> A Proof of Our Expertise.</span>
          </>
        }
        lead="Every project we take on reflects our core philosophy, practical, hands-on consultancy that delivers measurable results. From premium restaurant launches to society clubhouse operations and cloud kitchen setups, our project portfolio showcases the real-world impact of expert hospitality and F&B guidance."
        image={IMG.diningRoom}
      />

      {/* PORTFOLIO OVERVIEW METRICS STRIP */}
      <section className="border-b border-line bg-[#f8f5ee] py-8">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="flex items-center gap-3.5 border-r border-line/70 pr-4">
              <span className="font-display text-3xl font-normal text-forest">
                02
              </span>
              <div>
                <p className="text-xs font-semibold text-ink uppercase tracking-wider">
                  Active Flagships
                </p>
                <p className="text-[11px] text-ink-soft">
                  Dine-In &amp; Cloud Formats
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 border-r border-line/70 pr-4">
              <span className="font-display text-3xl font-normal text-bronze">
                03
              </span>
              <div>
                <p className="text-xs font-semibold text-ink uppercase tracking-wider">
                  Concepts in Lab
                </p>
                <p className="text-[11px] text-ink-soft">
                  Active Incubation Pipeline
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 border-r border-line/70 pr-4">
              <span className="font-display text-3xl font-normal text-forest">
                100%
              </span>
              <div>
                <p className="text-xs font-semibold text-ink uppercase tracking-wider">
                  SOP Compliance
                </p>
                <p className="text-[11px] text-ink-soft">
                  Standardized Prep &amp; COGS
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5">
              <span className="font-display text-3xl font-normal text-bronze">
                4.8★
              </span>
              <div>
                <p className="text-xs font-semibold text-ink uppercase tracking-wider">
                  Guest Trust
                </p>
                <p className="text-[11px] text-ink-soft">
                  Consistent Experience Delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO FILTER CHIPS */}
      <section className="bg-paper pt-12 pb-4">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 flex flex-wrap items-center justify-between gap-4 border-b border-line/40 pb-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-bronze font-semibold">
              Live Venues
            </span>
            <h3
              className="mt-1 text-2xl sm:text-3xl text-ink font-normal"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Operating Portfolio
            </h3>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2">
            {[
              { id: "all", label: "All Formats" },
              { id: "dining", label: "Dine-in Cafés" },
              { id: "delivery", label: "Cloud Kitchens" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 ${
                  selectedCategory === tab.id
                    ? "bg-forest text-paper shadow-xs"
                    : "border border-line bg-paper text-ink hover:border-forest/50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* VENTURES SHOWCASE LIST */}
      {filteredVentures.map((venture, idx) => (
        <VentureShowcase
          key={venture.id}
          venture={venture}
          reverse={idx % 2 === 1}
          go={go}
        />
      ))}

      {/* FUTURE VENTURES INCUBATION PIPELINE */}
  

      {/* CO-INVESTMENT & EXPANSION CTA */}
      <section className="bg-forest-deep py-20 text-paper lg:py-24">
        <div className="mx-auto max-w-[1240px] px-6 lg:px-12 text-center">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-bronze font-semibold">
              Strategic Collaboration
            </span>
            <h2
              className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-normal text-paper"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Have a prime property or a culinary concept?
            </h2>
            <p className="mt-4 max-w-xl mx-auto text-sm leading-relaxed text-paper/75">
              We partner with real estate developers, investors, and chefs under
              transparent joint venture or management-contract models.
              Let&apos;s evaluate feasibility together.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Button variant="light" onClick={() => go("franchise")}>
                Explore Franchise Models <Arrow />
              </Button>
              <Button onClick={() => go("contact")}>
                Schedule Executive Meeting
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <CTA go={go} />
    </>
  )
}

export default Ventures
