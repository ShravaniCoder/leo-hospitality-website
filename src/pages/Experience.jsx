import { Fragment, useState, useEffect } from "react"
import { Reveal, IMG } from "../lib/ui"
import { PageHero, Section } from "../components/PageHero"
import { CTA } from "./Home"
import { PROJECTS_DATA } from "../lib/data"
import {
  StoryParallaxBackground,
  StoryParallaxWrap,
  ParallaxStorySection,
  ParallaxDivider,
} from "../components/StoryParallaxShowcase"

const slug = (s) => s.replace(/\s+/g, "-").toLowerCase()

/* Card style: no backdrop-filter (blur over a fixed/parallax layer
   forces a repaint every scroll frame). Slightly more opaque instead. */
const CARD_STYLE = {
  background: "rgba(16, 24, 18, 0.72)",
  boxShadow: "0 24px 60px -30px rgba(0,0,0,0.75)",
  border: "1px solid rgba(246,241,231,0.08)",
}

/* Type · Location · Period line (shared by both layouts) */
function ProjectMeta({ p }) {
  return (
    <div
      className="font-mono text-xs uppercase tracking-[0.2em]"
      style={{ textShadow: "0 1px 12px rgba(0,0,0,0.6)" }}
    >
      <span className="text-bronze">
        {p.type} &nbsp;·&nbsp; {p.loc}
      </span>
      {p.period && (
        <>
          <span className="mx-2 text-paper/30">·</span>
          <span className="text-paper/60">{p.period}</span>
        </>
      )}
    </div>
  )
}

/* ─── Vertical curtain-parallax project showcase ─── */
function ProjectsParallax() {
  // Start hidden: the backdrop must only show once the showcase is on screen,
  // otherwise it covers the hero on first load.
  const [inView, setInView] = useState(false)

  /* Preload + decode every image once, so nothing decodes mid-scroll
     when you jump to the top or bottom. */
  useEffect(() => {
    const urls = [IMG.heroInterior, ...PROJECTS_DATA.map((p) => p.img)]
    urls.forEach((src) => {
      if (!src) return
      const img = new Image()
      img.decoding = "async"
      img.src = src
      img.decode?.().catch(() => {})
    })
  }, [])

  return (
    <div className="relative" style={{ clipPath: "inset(0)" }}>
      {/* Fixed lower-layer image. Kept mounted and only faded out, so it is
          never re-created or re-decoded when scrolling to the top/bottom. */}
      <div
        aria-hidden="true"
        style={{
          opacity: inView ? 1 : 0,
          visibility: inView ? "visible" : "hidden",
          pointerEvents: "none",
          transition: "opacity 0.2s linear",
        }}
      >
        <StoryParallaxBackground image={IMG.heroInterior} hidden={false} />
      </div>

      <StoryParallaxWrap onInViewChange={setInView}>
        {PROJECTS_DATA.map((p, i) => {
          const solid = i % 2 === 0
          return (
            <Fragment key={p.name}>
              {solid ? (
                /* SOLID — project image is the full-screen fixed background */
                <ParallaxStorySection
                  variant="solid"
                  image={p.img}
                  id={slug(p.name)}
                >
                  <div className="min-h-screen w-full flex items-end px-6 pb-16 sm:px-8 lg:px-16 lg:pb-24">
                    <div
                      className="max-w-3xl rounded-sm p-7 lg:p-9"
                      style={CARD_STYLE}
                    >
                      <ProjectMeta p={p} />
                      <h2
                        className="mt-4 text-paper leading-tight tracking-[-0.02em]"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 400,
                          fontSize: "clamp(2rem, 5vw, 4rem)",
                          textShadow: "0 2px 30px rgba(0,0,0,0.55)",
                        }}
                      >
                        {p.name}
                      </h2>
                      <p
                        className="mt-4 max-w-xl text-sm leading-relaxed text-paper/85 lg:text-base"
                        style={{ textShadow: "0 1px 16px rgba(0,0,0,0.6)" }}
                      >
                        {p.description}
                      </p>
                    </div>
                  </div>
                </ParallaxStorySection>
              ) : (
                /* TRANSPARENT — lower layer shows through; project shown as an
                   inline framed image beside the copy. */
                <ParallaxStorySection variant="transparent" id={slug(p.name)}>
                  <div className="min-h-screen w-full flex items-center px-6 py-24 sm:px-8 lg:px-16">
                    <div className="mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-2">
                      <div className="rounded-sm p-7 lg:p-9" style={CARD_STYLE}>
                        <ProjectMeta p={p} />
                        <h2
                          className="mt-4 text-paper leading-tight tracking-[-0.02em]"
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 400,
                            fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                            textShadow: "0 2px 30px rgba(0,0,0,0.6)",
                          }}
                        >
                          {p.name}
                        </h2>
                        <p
                          className="mt-4 max-w-lg text-sm leading-relaxed text-paper/85 lg:text-base"
                          style={{ textShadow: "0 1px 16px rgba(0,0,0,0.6)" }}
                        >
                          {p.description}
                        </p>
                      </div>
                      <div className="h-[42vh] overflow-hidden rounded-sm lg:h-[56vh]">
                        {/* No loading="lazy" and no CSS filter: both cause
                            stutter when scrolling back to this image. */}
                        <img
                          src={p.img}
                          alt={p.name}
                          decoding="async"
                          className="h-full w-full object-cover"
                          style={{ transform: "translateZ(0)" }}
                        />
                      </div>
                    </div>
                  </div>
                </ParallaxStorySection>
              )}
              {i < PROJECTS_DATA.length - 1 && <ParallaxDivider />}
            </Fragment>
          )
        })}
      </StoryParallaxWrap>
    </div>
  )
}

/* ─── Page ─── */
export function Experience({ go }) {
  return (
    <>
      <PageHero
        kicker="Experience"
        title={
          <>
            Rooms we&rsquo;ve{" "}
            <span className="italic text-forest">helped run.</span>
          </>
        }
        lead="A selection of past projects our team has operated or supported. Full case descriptions are being prepared and shared on request."
        image={IMG.woodTable}
      />

      {/* Disclaimer note */}
      <Section className="pb-0 pt-16 lg:pt-20">
        <Reveal className="mb-0 max-w-xl text-sm text-ink-soft">
          <p className="rounded-none border border-line bg-paper px-5 py-4">
            Note — project descriptions below represent key operations and
            metrics. Names and locations are verified from historical
            engagements.
          </p>
        </Reveal>
      </Section>

      {/* Vertical curtain-parallax project showcase */}
      <ProjectsParallax />

      <CTA go={go} />
    </>
  )
}

export default Experience