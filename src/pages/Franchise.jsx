import { useState } from "react"
import {
  Button,
  Arrow,
  Kicker,
  Reveal,
  IMG,
  Field,
  Input,
  Select,
  Textarea,
} from "../lib/ui"
import { PageHero, Section } from "../components/PageHero"
import { SuccessModal } from "../components/SuccessModal"

/* =========================================================
   FORMSPREE
   Replace YOUR_FORM_ID with your actual Formspree form ID
   Example:
   https://formspree.io/f/abcdwxyz
========================================================= */

const FORMSPREE_ENDPOINT =
  "https://formspree.io/f/mppwoeov"

/* =========================================================
   PARTNERSHIP CATEGORIES
========================================================= */

const CATEGORIES = [
  {
    t: "Franchise",
    d: "Bring Ryvive Roots or a future concept to your city with a turnkey playbook and our operational backing.",
  },
  {
    t: "Management Partnership",
    d: "You own the space and the brand — we run the operation on a management or revenue-share model.",
  },
  {
    t: "Society & Clubhouse Cafeterias",
    d: "Managed café and cafeteria services for residential societies and clubhouses.",
  },
  {
    t: "Joint Ventures & Investment",
    d: "Co-invest and co-build new hospitality concepts from the ground up.",
  },
]

/* =========================================================
   FRANCHISE PAGE
========================================================= */

export function Franchise({ go }) {
  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState(false)
  const [honeypot, setHoneypot] = useState("")
  const [submitError, setSubmitError] = useState("")

  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    type: "",
    message: "",
  })

  const [errors, setErrors] = useState({})

  /* =========================================================
     RESET FORM
  ========================================================= */

  const resetForm = () => {
    setSent(false)
    setSubmitError("")
    setErrors({})

    setForm({
      name: "",
      company: "",
      phone: "",
      email: "",
      type: "",
      message: "",
    })
  }

  /* =========================================================
     HANDLE CHANGE
  ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }

    setSubmitError("")
  }

  /* =========================================================
     VALIDATE FIELD
  ========================================================= */

  const validateField = (name, value) => {
    let err = ""

    if (!value.trim()) {
      err = "This field is required."
    } else if (
      name === "email" &&
      !/\S+@\S+\.\S+/.test(value)
    ) {
      err = "Please enter a valid email address."
    } else if (
      name === "phone" &&
      !/^\+?[0-9\s-]{10,14}$/.test(
        value.replace(/\s+/g, "")
      )
    ) {
      err = "Please enter a valid phone number."
    }

    setErrors((prev) => {
      if (err) {
        return {
          ...prev,
          [name]: err,
        }
      }

      const next = { ...prev }
      delete next[name]
      return next
    })
  }

  /* =========================================================
     HANDLE BLUR
  ========================================================= */

  const handleBlur = (e) => {
    const { name, value, required } = e.target

    if (
      required ||
      name === "email" ||
      name === "phone"
    ) {
      validateField(name, value)
    }
  }

  /* =========================================================
     HANDLE SUBMIT
  ========================================================= */

  const handleSubmit = async (e) => {
    e.preventDefault()

    setSubmitError("")

    /* -----------------------------------------
       HONEYPOT SPAM PROTECTION
    ----------------------------------------- */

    if (honeypot !== "") {
      console.warn("Spam submission blocked.")
      return
    }

    /* -----------------------------------------
       VALIDATION
    ----------------------------------------- */

    const newErrors = {}

    const requiredFields = [
      "name",
      "phone",
      "email",
      "type",
      "message",
    ]

    requiredFields.forEach((field) => {
      if (!form[field].trim()) {
        newErrors[field] =
          "This field is required."
      }
    })

    /* Email validation */

    if (
      form.email &&
      !/\S+@\S+\.\S+/.test(form.email)
    ) {
      newErrors.email =
        "Please enter a valid email address."
    }

    /* Phone validation */

    if (
      form.phone &&
      !/^\+?[0-9\s-]{10,14}$/.test(
        form.phone.replace(/\s+/g, "")
      )
    ) {
      newErrors.phone =
        "Please enter a valid phone number."
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    /* -----------------------------------------
       START SUBMISSION
    ----------------------------------------- */

    setSubmitting(true)

    try {
      /* -----------------------------------------
         FORMSPREE REQUEST
      ----------------------------------------- */

      const response = await fetch(
        FORMSPREE_ENDPOINT,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify({
            name: form.name,
            company: form.company,
            phone: form.phone,
            email: form.email,
            partnership_type: form.type,
            message: form.message,

            /* Formspree */

            _replyto: form.email,

            _subject:
              `Franchise / Partnership Enquiry — ${form.type}`,
          }),
        }
      )

      /* -----------------------------------------
         CHECK RESPONSE
      ----------------------------------------- */

      if (!response.ok) {
        throw new Error(
          "Formspree submission failed."
        )
      }

      /* -----------------------------------------
         SUCCESS
      ----------------------------------------- */

      setSubmitting(false)
      setSent(true)
    } catch (error) {
      console.error(
        "Franchise form error:",
        error
      )

      setSubmitting(false)

      setSubmitError(
        "Something went wrong while sending your enquiry. Please try again or contact us directly."
      )
    }
  }

  return (
    <>
      {/* =====================================================
          HERO
      ===================================================== */}

      <PageHero
        kicker="Franchise / Business Opportunities"
        title={
          <>
            Let&rsquo;s build{" "}
            <span className="italic text-forest">
              something together.
            </span>
          </>
        }
        lead="Whether you have a space, a brand or capital, there's a partnership model that fits. Here's where we usually start."
        image={IMG.bodhiTree}
        imageAlt="Hospitality venue representing franchise and business opportunities"
      />

      {/* =====================================================
          PARTNERSHIP CATEGORIES
      ===================================================== */}

      <Section className="py-16 lg:py-24">

        <div className="grid gap-6 md:grid-cols-2">

          {CATEGORIES.map((c, i) => (
            <Reveal
              key={c.t}
              delay={i * 70}
              className="group rounded-none border border-line bg-paper p-8 transition-colors hover:border-forest/50"
            >

              <span className="font-display text-3xl text-bronze">
                0{i + 1}
              </span>

              <h3
                className="mt-4 text-2xl tracking-[-0.01em] text-ink"
                style={{
                  fontFamily:
                    "var(--font-display)",
                }}
              >
                {c.t}
              </h3>

              <p className="mt-3 leading-relaxed text-ink-soft">
                {c.d}
              </p>

            </Reveal>
          ))}

        </div>

      </Section>

      {/* =====================================================
          FRANCHISE ENQUIRY SECTION
      ===================================================== */}

      <section
        data-tone="dark"
        className="bg-forest-deep py-20 text-paper lg:py-28"
      >

        <div className="mx-auto grid max-w-[1440px] gap-12 px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:px-12">

          {/* =================================================
              LEFT CONTENT
          ================================================= */}

          <Reveal>

            <Kicker tone="light">
              Franchise &amp; Partnerships
            </Kicker>

            <h2
              className="mt-5 text-4xl leading-tight tracking-[-0.02em] sm:text-5xl"
              style={{
                fontFamily:
                  "var(--font-display)",
                fontWeight: 400,
              }}
            >
              Tell us what you have in mind.
            </h2>

            <p className="mt-6 max-w-md leading-relaxed text-paper/70">
              Share a few details and our partnerships
              team will get back to you with the next
              steps. Whether you have a space, a brand,
              investment capital or a new hospitality idea,
              we'd love to hear from you.
            </p>

            <p className="mt-6 text-sm text-paper/60">
              Prefer email? Reach us at{" "}
              <a
                href="mailto:partner@leohospitality.in"
                className="text-bronze underline-offset-4 transition-all hover:underline"
              >
                partner@leohospitality.in
              </a>
              .
            </p>

          </Reveal>

          {/* =================================================
              RIGHT FORM
          ================================================= */}

          <Reveal delay={100}>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="grid gap-5 rounded-none bg-paper p-8 text-ink lg:p-10"
            >

              {/* =============================================
                  HONEYPOT
              ============================================= */}

              <div
                className="pointer-events-none sr-only"
                aria-hidden="true"
              >
                <input
                  type="text"
                  name="website_url"
                  value={honeypot}
                  onChange={(e) =>
                    setHoneypot(e.target.value)
                  }
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* =============================================
                  BASIC DETAILS
              ============================================= */}

              <fieldset
                className="grid gap-5 sm:grid-cols-2"
                disabled={submitting}
              >

                {/* Name */}

                <Field
                  label="Name"
                  required
                >
                  <Input
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Your full name"
                  />

                  {errors.name && (
                    <p className="field-error mt-1 text-xs font-medium text-red-600">
                      {errors.name}
                    </p>
                  )}
                </Field>

                {/* Company */}

                <Field label="Company / Organization">

                  <Input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="e.g. Firm name (Optional)"
                  />

                </Field>

                {/* Phone */}

                <Field
                  label="Phone"
                  required
                >
                  <Input
                    name="phone"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Contact number"
                  />

                  {errors.phone && (
                    <p className="field-error mt-1 text-xs font-medium text-red-600">
                      {errors.phone}
                    </p>
                  )}
                </Field>

                {/* Email */}

                <Field
                  label="Email"
                  required
                >
                  <Input
                    name="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="you@company.com"
                  />

                  {errors.email && (
                    <p className="field-error mt-1 text-xs font-medium text-red-600">
                      {errors.email}
                    </p>
                  )}
                </Field>

              </fieldset>

              {/* =============================================
                  PARTNERSHIP TYPE
              ============================================= */}

              <Field
                label="Partnership Type"
                required
              >

                <Select
                  name="type"
                  required
                  value={form.type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={submitting}
                >

                  <option
                    value=""
                    disabled
                  >
                    Select a partnership type
                  </option>

                  {CATEGORIES.map((c) => (
                    <option
                      key={c.t}
                      value={c.t}
                    >
                      {c.t}
                    </option>
                  ))}

                  <option value="Other">
                    Other
                  </option>

                </Select>

                {errors.type && (
                  <p className="field-error mt-1 text-xs font-medium text-red-600">
                    {errors.type}
                  </p>
                )}

              </Field>

              {/* =============================================
                  MESSAGE
              ============================================= */}

              <Field
                label="Message"
                required
              >

                <Textarea
                  name="message"
                  required
                  value={form.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Tell us about your space, brand, investment or idea…"
                  disabled={submitting}
                />

                {errors.message && (
                  <p className="field-error mt-1 text-xs font-medium text-red-600">
                    {errors.message}
                  </p>
                )}

              </Field>

              {/* =============================================
                  ERROR MESSAGE
              ============================================= */}

              {submitError && (
                <div className="border border-red-200 bg-red-50 px-4 py-3 text-sm leading-relaxed text-red-700">
                  {submitError}
                </div>
              )}

              {/* =============================================
                  SUBMIT
              ============================================= */}

              <div>

                <Button
                  type="submit"
                  disabled={submitting}
                  className="mt-2 w-full sm:w-auto"
                >

                  {submitting ? (
                    <span className="flex items-center gap-2">

                      <svg
                        className="h-4 w-4 animate-spin text-paper"
                        fill="none"
                        viewBox="0 0 24 24"
                      >

                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />

                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />

                      </svg>

                      Sending Enquiry...

                    </span>
                  ) : (
                    <>
                      Submit Enquiry
                      <Arrow />
                    </>
                  )}

                </Button>

              </div>

            </form>

            {/* =================================================
                SUCCESS MODAL
            ================================================= */}

            {sent && (
              <SuccessModal
                kicker="Enquiry Registered"
                title={`Thank you${
                  form.name
                    ? `, ${form.name}`
                    : ""
                }!`}
                message={
                  <>
                    Your franchise enquiry has been
                    received. Our business development
                    team will review your{" "}
                    {form.type ? (
                      <>
                        interest in{" "}
                        <span className="font-medium text-forest">
                          &ldquo;{form.type}&rdquo;
                        </span>{" "}
                        and get back to you within
                        2&ndash;3 business days.
                      </>
                    ) : (
                      "partnership details and get back to you within 2–3 business days."
                    )}
                  </>
                }
                summary={[
                  ...(form.type
                    ? [
                        {
                          label: "Partnership",
                          value: form.type,
                        },
                      ]
                    : []),

                  ...(form.phone
                    ? [
                        {
                          label: "Direct Phone",
                          value: form.phone,
                        },
                      ]
                    : []),

                  {
                    label: "Routing",
                    value:
                      "Business Development",
                    accent: true,
                  },
                ]}
                primaryLabel="Back to Home"
                onPrimary={() => go("home")}
                secondaryLabel="Send Another Enquiry"
                onSecondary={resetForm}
                onClose={resetForm}
              />
            )}

          </Reveal>

        </div>

      </section>
    </>
  )
}

export default Franchise