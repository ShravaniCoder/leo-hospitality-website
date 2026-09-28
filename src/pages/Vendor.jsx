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

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mnpnoknj"

/* -------------------------------------------------------------------------- */
/*                                CONSTANTS                                   */
/* -------------------------------------------------------------------------- */

const FIRM_TYPES = [
  "Proprietorship",
  "Partnership",
  "Pvt. Ltd.",
  "Public Ltd.",
  "Others",
]

const VENDOR_CATS = [
  "Food & Dry Grocery Suppliers",
  "Vegetable & Fresh Farm Produce",
  "Dairy & Frozen Products",
  "Beverages & Mixers",
  "Speciality Coffee & Tea Consumables",
  "Meat, Poultry & Seafood",
  "Bakery & Confectionery Ingredients",
  "Packaging, Disposables & Chemicals",
  "Kitchen Equipment & Maintenance",
  "Other F&B Raw Materials",
]

const INDIAN_STATES = [
  "Maharashtra",
  "Delhi (NCT)",
  "Gujarat",
  "Karnataka",
  "Tamil Nadu",
  "Telangana",
  "Goa",
  "Rajasthan",
  "Uttar Pradesh",
  "West Bengal",
  "Punjab",
  "Haryana",
  "Kerala",
  "Madhya Pradesh",
  "Andhra Pradesh",
  "Bihar",
  "Chhattisgarh",
  "Himachal Pradesh",
  "Jharkhand",
  "Odisha",
  "Uttarakhand",
  "Assam",
  "Chandigarh",
  "Other Union Territory",
]

const VENDOR_CATEGORY_CARDS = [
  {
    t: "Food & Dry Grocery",
    d: "Staples, gourmet ingredients, condiments, and packaged culinary goods.",
    icon: "M3 7h18M6 7v13a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7M9 4h6a1 1 0 0 1 1 1v2H8V5a1 1 0 0 1 1-1z",
  },
  {
    t: "Fresh Farm Produce",
    d: "Daily-harvested farm vegetables, microgreens, and seasonal exotic fruits.",
    icon: "M12 2c1 3 4 4 4 8a4 4 0 0 1-8 0c0-4 3-5 4-8zM12 22v-6",
  },
  {
    t: "Beverages & Mixers",
    d: "Artisanal tonics, cold-pressed juices, syrups, and craft soda provisions.",
    icon: "M7 3h10l-1 5v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V8L7 3zM7.5 8h9",
  },
  {
    t: "Speciality Coffee",
    d: "Single-origin beans, estate roasts, and café brewing consumables.",
    icon: "M4 8h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8zm13 1h1.5a2.5 2.5 0 0 1 0 5H17M6 3v2m4-2v2m4-2v2",
  },
  {
    t: "Dairy & Proteins",
    d: "Fresh cheeses, eggs, seafood, poultry, and quality food ingredients.",
    icon: "M12 3v18m-9-9h18",
  },
  {
    t: "Packaging & Supplies",
    d: "Eco-friendly delivery containers, hygiene supplies, and pantry stores.",
    icon: "M3 9l9-5 9 5-9 5-9-5zm0 0v6l9 5 9-5V9",
  },
]

/* -------------------------------------------------------------------------- */
/*                              MAIN COMPONENT                                */
/* -------------------------------------------------------------------------- */

export function Vendor({ go }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [direction, setDirection] = useState("forward")
  const [pageSheen, setPageSheen] = useState(false)
  const [completedStepRipple, setCompletedStepRipple] = useState(null)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [greetingOpen, setGreetingOpen] = useState(false)
  const [submissionId, setSubmissionId] = useState("")
  const [copiedId, setCopiedId] = useState(false)
  const [honeypot, setHoneypot] = useState("")

  const [form, setForm] = useState({
    partyName: "",
    firmType: "Proprietorship",
    category: "",
    contactPerson: "",
    designation: "",
    phone: "",
    alternatePhone: "",
    email: "",
    website: "",

    address1: "",
    address2: "",
    city: "Mumbai",
    state: "Maharashtra",
    pinCode: "",

    productDescription: "",
    supplyCapacity: "",
    deliveryAreas: "",
    yearsInBusiness: "",
    additionalInformation: "",

    finalConsent: false,
  })

  const [errors, setErrors] = useState({})

  /* ------------------------------------------------------------------------ */
  /*                           INPUT HANDLER                                  */
  /* ------------------------------------------------------------------------ */

  const handleInputChange = (e) => {
    const { name, value } = e.target

    let formattedValue = value

    if (name === "phone" || name === "alternatePhone") {
      formattedValue = value
        .replace(/[^\d+\-\s()]/g, "")
        .slice(0, 18)
    }

    if (name === "pinCode") {
      formattedValue = value.replace(/\D/g, "").slice(0, 6)
    }

    if (name === "yearsInBusiness") {
      formattedValue = value.replace(/\D/g, "").slice(0, 2)
    }

    setForm((prev) => ({
      ...prev,
      [name]: formattedValue,
    }))

    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  /* ------------------------------------------------------------------------ */
  /*                              VALIDATION                                  */
  /* ------------------------------------------------------------------------ */

  const validateStep = (stepNumber) => {
    const stepErrors = {}

    /* STEP 1 */
    if (stepNumber === 1) {
      if (!form.partyName.trim()) {
        stepErrors.partyName = "Business / Vendor name is required."
      }

      if (!form.category) {
        stepErrors.category = "Please select a vendor category."
      }

      if (!form.contactPerson.trim()) {
        stepErrors.contactPerson = "Contact person name is required."
      }

      if (!form.designation.trim()) {
        stepErrors.designation = "Designation / role is required."
      }

      if (
        !form.phone.trim() ||
        form.phone.replace(/\D/g, "").length < 10
      ) {
        stepErrors.phone = "Valid 10-digit phone number is required."
      }

      if (
        !form.email.trim() ||
        !/\S+@\S+\.\S+/.test(form.email)
      ) {
        stepErrors.email = "Valid email address is required."
      }

      if (!form.address1.trim()) {
        stepErrors.address1 = "Address is required."
      }

      if (!form.city.trim()) {
        stepErrors.city = "City is required."
      }

      if (
        !form.pinCode.trim() ||
        form.pinCode.length !== 6
      ) {
        stepErrors.pinCode = "Valid 6-digit PIN code is required."
      }
    }

    /* STEP 2 */
    if (stepNumber === 2) {
      if (!form.productDescription.trim()) {
        stepErrors.productDescription =
          "Please tell us about your products or services."
      }

      if (!form.supplyCapacity.trim()) {
        stepErrors.supplyCapacity =
          "Please mention your approximate supply capacity."
      }

      if (!form.deliveryAreas.trim()) {
        stepErrors.deliveryAreas =
          "Please mention your delivery / service areas."
      }
    }

    /* STEP 3 */
    if (stepNumber === 3) {
      if (!form.finalConsent) {
        stepErrors.finalConsent =
          "Please confirm that the information provided is accurate."
      }
    }

    setErrors(stepErrors)

    if (Object.keys(stepErrors).length > 0) {
      const firstField = Object.keys(stepErrors)[0]
      const element = document.getElementsByName(firstField)[0]

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        })

        element.focus()
      }

      return false
    }

    return true
  }

  /* ------------------------------------------------------------------------ */
  /*                           NEXT STEP                                      */
  /* ------------------------------------------------------------------------ */

  const handleNextStep = () => {
    if (!validateStep(currentStep)) return

    setDirection("forward")
    setPageSheen(true)
    setCompletedStepRipple(currentStep)

    setCurrentStep((prev) => Math.min(prev + 1, 3))

    const formCard = document.getElementById("vendor-form-card")

    if (formCard) {
      formCard.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }

    setTimeout(() => {
      setPageSheen(false)
    }, 950)
  }

  /* ------------------------------------------------------------------------ */
  /*                           PREVIOUS STEP                                  */
  /* ------------------------------------------------------------------------ */

  const handlePrevStep = () => {
    setDirection("backward")
    setPageSheen(true)

    setCurrentStep((prev) => Math.max(prev - 1, 1))

    const formCard = document.getElementById("vendor-form-card")

    if (formCard) {
      formCard.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }

    setTimeout(() => {
      setPageSheen(false)
    }, 950)
  }

  /* ------------------------------------------------------------------------ */
  /*                           JUMP TO STEP                                   */
  /* ------------------------------------------------------------------------ */

  const handleJumpToStep = (targetStep) => {
    if (targetStep >= currentStep) return

    setDirection("backward")
    setPageSheen(true)
    setCurrentStep(targetStep)

    const formCard = document.getElementById("vendor-form-card")

    if (formCard) {
      formCard.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }

    setTimeout(() => {
      setPageSheen(false)
    }, 950)
  }

  /* ------------------------------------------------------------------------ */
  /*                              SUBMIT                                      */
  /* ------------------------------------------------------------------------ */

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (honeypot !== "") {
      console.warn("Spam submission intercepted.")
      return
    }

    if (!validateStep(3)) return

    if (
      !FORMSPREE_ENDPOINT ||
      FORMSPREE_ENDPOINT === "YOUR_FORMSPREE_ENDPOINT"
    ) {
      alert(
        "Please add your Formspree endpoint in Vendor.jsx before submitting.",
      )
      return
    }

    setIsSubmitting(true)

    const randomToken = `LHV-VND-${new Date().getFullYear()}-${Math.floor(
      1000 + Math.random() * 9000,
    )}`

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          "Registration ID": randomToken,
          "Form Type": "Vendor Registration",

          "Business / Vendor Name": form.partyName,
          "Business Type": form.firmType,
          "Vendor Category": form.category,

          "Contact Person": form.contactPerson,
          "Designation": form.designation,

          "Phone": form.phone,
          "Alternate Phone": form.alternatePhone,
          "Email": form.email,
          "Website": form.website,

          "Address Line 1": form.address1,
          "Address Line 2": form.address2,
          "City": form.city,
          "State": form.state,
          "PIN Code": form.pinCode,

          "Years in Business": form.yearsInBusiness,
          "Supply Capacity": form.supplyCapacity,
          "Products / Services": form.productDescription,
          "Delivery / Service Areas": form.deliveryAreas,
          "Additional Information": form.additionalInformation,
        }),
      })

      let data = {}

      try {
        data = await response.json()
      } catch {
        data = {}
      }

      if (!response.ok) {
        throw new Error(
          data?.errors?.[0]?.message ||
            "Unable to submit vendor registration.",
        )
      }

      setSubmissionId(randomToken)
      setIsSubmitting(false)
      setIsSubmitted(true)
      setGreetingOpen(true)

      window.scrollTo({
        top: 300,
        behavior: "smooth",
      })
    } catch (error) {
      console.error("Vendor registration submission error:", error)

      setIsSubmitting(false)

      alert(
        error?.message ||
          "Something went wrong while submitting the form. Please try again.",
      )
    }
  }

  /* ------------------------------------------------------------------------ */
  /*                           COPY ID                                        */
  /* ------------------------------------------------------------------------ */

  const handleCopyId = () => {
    if (navigator.clipboard && submissionId) {
      navigator.clipboard.writeText(submissionId)

      setCopiedId(true)

      setTimeout(() => {
        setCopiedId(false)
      }, 2000)
    }
  }

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* SUCCESS MODAL                                                      */}
      {/* ------------------------------------------------------------------ */}

      {greetingOpen && (
        <SuccessModal
          kicker="Vendor Registration Received"
          title={`Thank you${
            form.partyName ? `, ${form.partyName}` : ""
          }!`}
          message={
            <>
              Your vendor registration has been successfully received.
              Our procurement team will review your business profile and
              contact you if there is an opportunity to collaborate.
            </>
          }
          summary={[
            {
              label: "Registration ID",
              value: submissionId,
              accent: true,
            },
            ...(form.category
              ? [
                  {
                    label: "Category",
                    value: form.category,
                  },
                ]
              : []),
            {
              label: "Routing",
              value: "Procurement Desk",
            },
          ]}
          primaryLabel="Return Home"
          onPrimary={() => go("home")}
          secondaryLabel="View Receipt"
          onSecondary={() => setGreetingOpen(false)}
          onClose={() => setGreetingOpen(false)}
        />
      )}

      {/* ------------------------------------------------------------------ */}
      {/* PAGE HERO                                                          */}
      {/* ------------------------------------------------------------------ */}

      <PageHero
        kicker="Supplier & Partner Network"
        title={
          <>
            Vendor{" "}
            <span className="italic text-forest">
              Registration.
            </span>
          </>
        }
        lead="Tell us about your business, products, services, and supply capabilities. Our procurement team will review your profile for potential collaboration."
        image={IMG.chefSink}
      />

      {/* ------------------------------------------------------------------ */}
      {/* CATEGORY SECTION                                                   */}
      {/* ------------------------------------------------------------------ */}

      <Section className="py-14 lg:py-20 border-b border-line/40">
        <Reveal className="max-w-3xl">
          <Kicker>Procurement Disciplines</Kicker>

          <h2
            className="mt-5 text-3xl leading-tight tracking-[-0.02em] text-ink sm:text-4xl"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
            }}
          >
            Supply categories currently{" "}
            <span className="italic text-forest">
              onboarding.
            </span>
          </h2>

          <p className="mt-4 leading-relaxed text-ink-soft">
            We welcome suppliers and service providers who can
            support our hospitality, restaurant, café, events,
            and operational requirements.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {VENDOR_CATEGORY_CARDS.map((c, i) => (
            <Reveal
              key={c.t}
              delay={i * 60}
              className="group flex flex-col justify-between rounded-none border border-line bg-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:border-forest hover:shadow-[0_16px_40px_-24px_rgba(32,29,24,0.35)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-forest transition-all duration-300 group-hover:border-forest group-hover:bg-forest/10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d={c.icon} />
                    </svg>
                  </span>

                  <span className="font-display text-xl text-line transition-colors duration-300 group-hover:text-bronze">
                    0{i + 1}
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-semibold text-ink">
                  {c.t}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {c.d}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-line/70 pt-4 text-xs font-semibold uppercase tracking-wider text-forest opacity-60 transition-opacity duration-300 group-hover:opacity-100">
                <span>Active Demand</span>
                <span>→</span>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* ------------------------------------------------------------------ */}
      {/* VENDOR REGISTRATION PORTAL                                         */}
      {/* ------------------------------------------------------------------ */}

      <section
        className="relative overflow-hidden bg-[#faf8f4] py-16 lg:py-24"
        id="vendor-form-card"
      >
        {/* Background decoration */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 right-1/4 h-96 w-96 rounded-full bg-forest/[0.04] blur-3xl"
        />

        <div className="mx-auto max-w-[1240px] px-6 lg:px-12">

          {/* Header */}
          <div className="mb-10 text-center">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-bronze font-semibold">
              Vendor Registration
            </span>

            <h2
              className="mt-2 text-3xl sm:text-4xl text-ink"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
              }}
            >
              Vendor Empanelment Application
            </h2>

            <p className="mt-3 text-sm text-ink-soft max-w-xl mx-auto">
              Share your business and supply details with our
              procurement team. No sensitive financial or identity
              documents are required at this stage.
            </p>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* STEPPER                                                          */}
          {/* ---------------------------------------------------------------- */}

          {!isSubmitted && (
            <div className="mb-10">
              <div className="relative mx-auto max-w-3xl">

                {/* Background line */}
                <div className="absolute top-5 left-0 right-0 h-0.5 bg-line/60 -z-0" />

                {/* Active line */}
                <div
                  className="absolute top-5 left-0 h-0.5 bg-forest transition-all duration-500 ease-out -z-0"
                  style={{
                    width: `${((currentStep - 1) / 2) * 100}%`,
                  }}
                />

                {/* Steps */}
                <div className="relative z-10 flex justify-between">
                  {[
                    {
                      n: 1,
                      label: "Business Profile",
                    },
                    {
                      n: 2,
                      label: "Supply Details",
                    },
                    {
                      n: 3,
                      label: "Review & Submit",
                    },
                  ].map((s) => {
                    const isDone = currentStep > s.n
                    const isCurrent = currentStep === s.n

                    return (
                      <button
                        key={s.n}
                        type="button"
                        onClick={() =>
                          handleJumpToStep(s.n)
                        }
                        disabled={s.n >= currentStep}
                        className={`group flex flex-col items-center focus:outline-none transition-transform duration-300 ${
                          s.n < currentStep
                            ? "cursor-pointer hover:scale-105"
                            : "cursor-default"
                        }`}
                      >
                        <div
                          className={`relative flex h-10 w-10 items-center justify-center rounded-full text-xs font-semibold transition-all duration-300 shadow-sm ${
                            isDone
                              ? "bg-forest text-paper ring-4 ring-forest/15"
                              : isCurrent
                                ? "bg-paper text-forest ring-4 ring-forest/30 border-2 border-forest"
                                : "bg-paper text-ink-soft border border-line"
                          } ${
                            completedStepRipple === s.n
                              ? "animate-step-ripple"
                              : ""
                          }`}
                        >
                          {isDone ? (
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          ) : (
                            s.n
                          )}
                        </div>

                        <span
                          className={`mt-2 text-[11px] font-medium tracking-wide transition-colors ${
                            isCurrent
                              ? "text-forest font-semibold"
                              : isDone
                                ? "text-ink"
                                : "text-ink-soft/70"
                          }`}
                        >
                          {s.label}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ---------------------------------------------------------------- */}
          {/* MAIN FORM CARD                                                   */}
          {/* ---------------------------------------------------------------- */}

          <div
            className="relative mx-auto max-w-4xl"
            style={{
              perspective: "1400px",
            }}
          >
            {/* Left spine */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-2.5 top-0 bottom-0 w-3 bg-gradient-to-r from-black/25 via-black/10 to-transparent rounded-l-xs z-30 hidden sm:block"
            />

            {/* Folio label */}
            {!isSubmitted && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-3 right-6 z-30 flex items-center gap-2 rounded-b-md bg-[#23452b] px-3.5 py-1 text-[10.5px] font-mono uppercase tracking-widest text-[#f5ebd7] shadow-md border-b border-x border-[#d8c29d]/40"
              >
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#d8c29d] animate-pulse" />

                <span>
                  FOLIO 0{currentStep} / 03
                </span>
              </div>
            )}

            {/* Golden page sheen */}
            {pageSheen && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-40 overflow-hidden rounded-none"
              >
                <div className="h-full w-56 bg-gradient-to-r from-transparent via-amber-300/30 to-transparent animate-golden-sheen" />
              </div>
            )}

            {/* Main page */}
            <div
              key={currentStep}
              className={`rounded-none border border-line bg-paper shadow-[0_25px_60px_-25px_rgba(22,51,31,0.14)] relative overflow-hidden transition-all duration-500 ${
                !isSubmitted
                  ? direction === "forward"
                    ? "animate-book-page-forward"
                    : "animate-book-page-backward"
                  : "animate-fadeIn"
              }`}
            >
              {/* Spine crease */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 bottom-0 w-[6px] border-r border-line/70 bg-gradient-to-r from-stone-200/50 to-transparent z-20 hidden sm:block"
              />

              {/* ============================================================ */}
              {/* SUCCESS STATE                                                 */}
              {/* ============================================================ */}

              {isSubmitted ? (
                <div className="p-8 sm:p-14 text-center animate-fadeIn">

                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-forest/10 text-forest text-4xl shadow-inner">
                    ✓
                  </div>

                  <span className="font-mono text-xs uppercase tracking-[0.24em] text-bronze font-semibold">
                    Registration Received
                  </span>

                  <h3
                    className="mt-2 text-3xl sm:text-4xl text-forest"
                    style={{
                      fontFamily: "var(--font-display)",
                    }}
                  >
                    Vendor Registration Submitted
                  </h3>

                  <p className="mx-auto mt-4 max-w-lg text-sm text-ink-soft leading-relaxed">
                    Thank you,{" "}
                    <span className="font-semibold text-ink">
                      {form.partyName}
                    </span>
                    . Your vendor profile has been received by
                    our procurement team.
                  </p>

                  {/* Reference card */}
                  <div className="my-8 mx-auto max-w-md rounded-none border border-line bg-cream/70 p-6 shadow-xs">

                    <div className="text-[11px] font-mono uppercase tracking-wider text-ink-soft">
                      Registration ID
                    </div>

                    <div className="mt-2 flex items-center justify-center gap-3">
                      <span className="font-mono text-xl sm:text-2xl font-bold tracking-wider text-forest">
                        {submissionId}
                      </span>

                      <button
                        type="button"
                        onClick={handleCopyId}
                        className="rounded-full border border-line bg-paper px-3 py-1 text-xs text-ink hover:border-forest transition-colors"
                      >
                        {copiedId
                          ? "Copied!"
                          : "Copy"}
                      </button>
                    </div>

                    <div className="mt-3 text-xs text-ink-soft border-t border-line/60 pt-3 flex justify-between gap-4">
                      <span>Registered Category:</span>

                      <span className="font-semibold text-ink text-right">
                        {form.category}
                      </span>
                    </div>

                    <div className="mt-2 text-xs text-ink-soft flex justify-between">
                      <span>Contact:</span>

                      <span className="font-semibold text-ink">
                        {form.contactPerson}
                      </span>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <Button
                      onClick={() => window.print()}
                      variant="secondary"
                    >
                      Print / Save Receipt
                    </Button>

                    <Button onClick={() => go("home")}>
                      Return to Homepage <Arrow />
                    </Button>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="p-6 sm:p-10 lg:p-12"
                >
                  {/* Honeypot */}
                  <div
                    className="sr-only pointer-events-none"
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

                  {/* ======================================================== */}
                  {/* STEP 1                                                     */}
                  {/* ======================================================== */}

                  {currentStep === 1 && (
                    <div className="animate-fadeIn space-y-7">

                      <div className="border-b border-line pb-4 flex items-center justify-between">
                        <div>
                          <span className="font-mono text-xs uppercase tracking-wider text-bronze font-semibold">
                            Step 01 of 03
                          </span>

                          <h3
                            className="mt-1 text-2xl text-ink font-normal"
                            style={{
                              fontFamily:
                                "var(--font-display)",
                            }}
                          >
                            Business &amp; Contact Information
                          </h3>
                        </div>

                        <span className="text-xs text-ink-soft hidden sm:block">
                          * Mandatory field
                        </span>
                      </div>

                      {/* Firm Type */}
                      <div>
                        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-ink">
                          Type of Business{" "}
                          <span className="text-bronze">
                            *
                          </span>
                        </label>

                        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
                          {FIRM_TYPES.map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() =>
                                setForm((prev) => ({
                                  ...prev,
                                  firmType: type,
                                }))
                              }
                              className={`rounded-none border px-3 py-2.5 text-xs font-medium transition-all ${
                                form.firmType === type
                                  ? "border-forest bg-forest text-paper shadow-xs"
                                  : "border-line bg-paper text-ink hover:border-forest/50"
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Business fields */}
                      <div className="grid gap-5 sm:grid-cols-2">

                        <Field
                          label="Business / Vendor Name"
                          required
                        >
                          <Input
                            name="partyName"
                            required
                            value={form.partyName}
                            onChange={handleInputChange}
                            placeholder="e.g. Royal Fresh Produce"
                          />

                          {errors.partyName && (
                            <p className="field-error mt-1 text-xs text-red-600 font-medium">
                              {errors.partyName}
                            </p>
                          )}
                        </Field>

                        <Field
                          label="Primary Supply Category"
                          required
                        >
                          <Select
                            name="category"
                            required
                            value={form.category}
                            onChange={handleInputChange}
                          >
                            <option
                              value=""
                              disabled
                            >
                              Select procurement category
                            </option>

                            {VENDOR_CATS.map((category) => (
                              <option
                                key={category}
                                value={category}
                              >
                                {category}
                              </option>
                            ))}
                          </Select>

                          {errors.category && (
                            <p className="field-error mt-1 text-xs text-red-600 font-medium">
                              {errors.category}
                            </p>
                          )}
                        </Field>

                        <Field
                          label="Contact Person"
                          required
                        >
                          <Input
                            name="contactPerson"
                            required
                            value={form.contactPerson}
                            onChange={handleInputChange}
                            placeholder="Full name"
                          />

                          {errors.contactPerson && (
                            <p className="field-error mt-1 text-xs text-red-600 font-medium">
                              {errors.contactPerson}
                            </p>
                          )}
                        </Field>

                        <Field
                          label="Designation / Role"
                          required
                        >
                          <Input
                            name="designation"
                            required
                            value={form.designation}
                            onChange={handleInputChange}
                            placeholder="e.g. Founder / Director"
                          />

                          {errors.designation && (
                            <p className="field-error mt-1 text-xs text-red-600 font-medium">
                              {errors.designation}
                            </p>
                          )}
                        </Field>

                        <Field
                          label="Primary Mobile / Phone"
                          required
                          hint="10-digit registered number"
                        >
                          <Input
                            name="phone"
                            type="tel"
                            required
                            value={form.phone}
                            onChange={handleInputChange}
                            placeholder="+91 98200 12345"
                          />

                          {errors.phone && (
                            <p className="field-error mt-1 text-xs text-red-600 font-medium">
                              {errors.phone}
                            </p>
                          )}
                        </Field>

                        <Field label="Alternate Phone (Optional)">
                          <Input
                            name="alternatePhone"
                            type="tel"
                            value={form.alternatePhone}
                            onChange={handleInputChange}
                            placeholder="Alternate contact number"
                          />
                        </Field>

                        <Field
                          label="Email Address"
                          required
                        >
                          <Input
                            name="email"
                            type="email"
                            required
                            value={form.email}
                            onChange={handleInputChange}
                            placeholder="hello@yourcompany.com"
                          />

                          {errors.email && (
                            <p className="field-error mt-1 text-xs text-red-600 font-medium">
                              {errors.email}
                            </p>
                          )}
                        </Field>

                        <Field label="Website (Optional)">
                          <Input
                            name="website"
                            type="url"
                            value={form.website}
                            onChange={handleInputChange}
                            placeholder="https://yourcompany.com"
                          />
                        </Field>

                      </div>

                      {/* Address */}
                      <div className="grid gap-5 sm:grid-cols-2">

                        <Field
                          label="Address Line 1"
                          required
                        >
                          <Input
                            name="address1"
                            required
                            value={form.address1}
                            onChange={handleInputChange}
                            placeholder="Building, street, area"
                          />

                          {errors.address1 && (
                            <p className="field-error mt-1 text-xs text-red-600 font-medium">
                              {errors.address1}
                            </p>
                          )}
                        </Field>

                        <Field label="Address Line 2 (Optional)">
                          <Input
                            name="address2"
                            value={form.address2}
                            onChange={handleInputChange}
                            placeholder="Landmark / locality"
                          />
                        </Field>

                        <Field
                          label="City"
                          required
                        >
                          <Input
                            name="city"
                            required
                            value={form.city}
                            onChange={handleInputChange}
                            placeholder="e.g. Mumbai"
                          />

                          {errors.city && (
                            <p className="field-error mt-1 text-xs text-red-600 font-medium">
                              {errors.city}
                            </p>
                          )}
                        </Field>

                        <Field
                          label="State"
                          required
                        >
                          <Select
                            name="state"
                            required
                            value={form.state}
                            onChange={handleInputChange}
                          >
                            {INDIAN_STATES.map((state) => (
                              <option
                                key={state}
                                value={state}
                              >
                                {state}
                              </option>
                            ))}
                          </Select>
                        </Field>

                        <Field
                          label="PIN Code"
                          required
                          hint="6-digit postal code"
                        >
                          <Input
                            name="pinCode"
                            required
                            value={form.pinCode}
                            onChange={handleInputChange}
                            placeholder="e.g. 400013"
                          />

                          {errors.pinCode && (
                            <p className="field-error mt-1 text-xs text-red-600 font-medium">
                              {errors.pinCode}
                            </p>
                          )}
                        </Field>

                      </div>
                    </div>
                  )}

                  {/* ======================================================== */}
                  {/* STEP 2                                                     */}
                  {/* ======================================================== */}

                  {currentStep === 2 && (
                    <div className="animate-fadeIn space-y-7">

                      <div className="border-b border-line pb-4 flex items-center justify-between">
                        <div>
                          <span className="font-mono text-xs uppercase tracking-wider text-bronze font-semibold">
                            Step 02 of 03
                          </span>

                          <h3
                            className="mt-1 text-2xl text-ink font-normal"
                            style={{
                              fontFamily:
                                "var(--font-display)",
                            }}
                          >
                            Products &amp; Supply Details
                          </h3>
                        </div>

                        <span className="text-xs text-ink-soft hidden sm:block">
                          Tell us about your capabilities
                        </span>
                      </div>

                      <div className="rounded-none border border-line/80 bg-cream/50 p-4 text-xs text-ink-soft flex items-start gap-3">

                        <svg
                          className="h-4 w-4 shrink-0 text-forest mt-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>

                        <span>
                          Please provide practical information about
                          your products, services, supply capacity,
                          and service areas. No financial or identity
                          documents are required.
                        </span>
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">

                        <Field
                          label="Years in Business"
                          hint="Optional"
                        >
                          <Input
                            name="yearsInBusiness"
                            type="text"
                            inputMode="numeric"
                            value={form.yearsInBusiness}
                            onChange={handleInputChange}
                            placeholder="e.g. 8"
                          />
                        </Field>

                        <Field
                          label="Approximate Supply Capacity"
                          required
                          hint="Daily / weekly / monthly"
                        >
                          <Input
                            name="supplyCapacity"
                            required
                            value={form.supplyCapacity}
                            onChange={handleInputChange}
                            placeholder="e.g. 500 kg per day"
                          />

                          {errors.supplyCapacity && (
                            <p className="field-error mt-1 text-xs text-red-600 font-medium">
                              {errors.supplyCapacity}
                            </p>
                          )}
                        </Field>

                      </div>

                      <Field
                        label="Products / Services You Offer"
                        required
                        hint="Mention your main products, services, brands or categories"
                      >
                        <Textarea
                          name="productDescription"
                          required
                          value={form.productDescription}
                          onChange={handleInputChange}
                          rows={5}
                          placeholder="Tell us about the products or services you can supply..."
                        />

                        {errors.productDescription && (
                          <p className="field-error mt-1 text-xs text-red-600 font-medium">
                            {errors.productDescription}
                          </p>
                        )}
                      </Field>

                      <Field
                        label="Delivery / Service Areas"
                        required
                        hint="Cities, regions or locations you currently serve"
                      >
                        <Textarea
                          name="deliveryAreas"
                          required
                          value={form.deliveryAreas}
                          onChange={handleInputChange}
                          rows={3}
                          placeholder="e.g. Mumbai, Thane, Navi Mumbai, Pune..."
                        />

                        {errors.deliveryAreas && (
                          <p className="field-error mt-1 text-xs text-red-600 font-medium">
                            {errors.deliveryAreas}
                          </p>
                        )}
                      </Field>

                      <Field
                        label="Additional Information"
                        hint="Optional"
                      >
                        <Textarea
                          name="additionalInformation"
                          value={form.additionalInformation}
                          onChange={handleInputChange}
                          rows={4}
                          placeholder="Anything else you would like our procurement team to know..."
                        />
                      </Field>

                    </div>
                  )}

                  {/* ======================================================== */}
                  {/* STEP 3                                                     */}
                  {/* ======================================================== */}

                  {currentStep === 3 && (
                    <div className="animate-fadeIn space-y-7">

                      <div className="border-b border-line pb-4 flex items-center justify-between">
                        <div>
                          <span className="font-mono text-xs uppercase tracking-wider text-bronze font-semibold">
                            Step 03 of 03
                          </span>

                          <h3
                            className="mt-1 text-2xl text-ink font-normal"
                            style={{
                              fontFamily:
                                "var(--font-display)",
                            }}
                          >
                            Review &amp; Submit
                          </h3>
                        </div>

                        <span className="text-xs text-ink-soft hidden sm:block">
                          Final confirmation
                        </span>
                      </div>

                      {/* Business Summary */}
                      <div className="rounded-none border border-line bg-cream/40 p-6 space-y-5">

                        <div className="flex items-start justify-between border-b border-line/60 pb-4 gap-4">

                          <div>
                            <span className="text-xs font-mono uppercase tracking-wider text-bronze">
                              Business
                            </span>

                            <h4 className="text-xl font-semibold text-ink">
                              {form.partyName ||
                                "Not Provided"}
                            </h4>

                            <p className="text-xs text-ink-soft mt-1">
                              {form.firmType}
                              {" • "}
                              {form.category ||
                                "Category not selected"}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              setCurrentStep(1)
                            }
                            className="text-xs font-semibold text-forest hover:underline"
                          >
                            Edit
                          </button>

                        </div>

                        <div className="grid gap-5 sm:grid-cols-2 text-xs">

                          <div>
                            <span className="text-ink-soft block">
                              Contact Person
                            </span>

                            <span className="font-semibold text-ink">
                              {form.contactPerson ||
                                "Not Provided"}
                            </span>
                          </div>

                          <div>
                            <span className="text-ink-soft block">
                              Designation
                            </span>

                            <span className="font-semibold text-ink">
                              {form.designation ||
                                "Not Provided"}
                            </span>
                          </div>

                          <div>
                            <span className="text-ink-soft block">
                              Phone
                            </span>

                            <span className="font-semibold text-ink">
                              {form.phone ||
                                "Not Provided"}
                            </span>
                          </div>

                          <div>
                            <span className="text-ink-soft block">
                              Email
                            </span>

                            <span className="font-semibold text-ink break-all">
                              {form.email ||
                                "Not Provided"}
                            </span>
                          </div>

                          <div>
                            <span className="text-ink-soft block">
                              Location
                            </span>

                            <span className="font-semibold text-ink">
                              {form.city},{" "}
                              {form.state}
                            </span>
                          </div>

                          <div>
                            <span className="text-ink-soft block">
                              Supply Areas
                            </span>

                            <span className="font-semibold text-ink">
                              {form.deliveryAreas ||
                                "Not Provided"}
                            </span>
                          </div>

                        </div>

                        <div className="border-t border-line/60 pt-4">

                          <span className="text-ink-soft block text-xs">
                            Products / Services
                          </span>

                          <p className="mt-1 text-sm leading-relaxed text-ink">
                            {form.productDescription ||
                              "Not Provided"}
                          </p>

                        </div>

                        <div className="border-t border-line/60 pt-4">

                          <span className="text-ink-soft block text-xs">
                            Supply Capacity
                          </span>

                          <p className="mt-1 text-sm font-semibold text-ink">
                            {form.supplyCapacity ||
                              "Not Provided"}
                          </p>

                        </div>

                      </div>

                      {/* Confirmation */}
                      <div className="rounded-none border border-line bg-paper p-5 space-y-4">

                        <label className="flex items-start gap-3 cursor-pointer">

                          <input
                            type="checkbox"
                            name="finalConsent"
                            checked={form.finalConsent}
                            onChange={(e) => {
                              setForm((prev) => ({
                                ...prev,
                                finalConsent:
                                  e.target.checked,
                              }))

                              if (
                                errors.finalConsent
                              ) {
                                setErrors((prev) => {
                                  const next = {
                                    ...prev,
                                  }

                                  delete next.finalConsent

                                  return next
                                })
                              }
                            }}
                            className="mt-1 h-4 w-4 rounded-none border-line text-forest focus:ring-forest"
                          />

                          <span className="text-xs leading-relaxed text-ink-soft">

                            <strong className="text-ink">
                              Confirmation:
                            </strong>{" "}

                            I confirm that the information provided
                            in this vendor registration form is
                            accurate and complete to the best of my
                            knowledge. I understand that this
                            registration is an initial business
                            enquiry and does not guarantee vendor
                            empanelment or a purchase order.

                          </span>

                        </label>

                        {errors.finalConsent && (
                          <p className="field-error text-xs text-red-600 font-medium pl-7">
                            {errors.finalConsent}
                          </p>
                        )}

                      </div>

                      {/* Privacy note */}
                      <div className="rounded-none border border-forest/15 bg-forest/[0.04] p-5">

                        <div className="flex items-start gap-3">

                          <svg
                            className="h-5 w-5 shrink-0 text-forest mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.7}
                              d="M12 9v4m0 4h.01M10.29 3.86l-7.1 12.28A2 2 0 004.93 19h14.14a2 2 0 001.73-2.86L13.7 3.86a2 2 0 00-3.41 0z"
                            />
                          </svg>

                          <div>

                            <p className="text-xs font-semibold text-ink">
                              Please do not submit sensitive
                              documents.
                            </p>

                            <p className="mt-1 text-xs leading-relaxed text-ink-soft">
                              This public registration form does not
                              request PAN, Aadhaar, bank account
                              details, tax documents, identity
                              documents, cancelled cheques, or other
                              confidential legal documents.
                            </p>

                          </div>
                        </div>
                      </div>

                    </div>
                  )}

                  {/* ======================================================== */}
                  {/* NAVIGATION                                                 */}
                  {/* ======================================================== */}

                  <div className="mt-10 flex items-center justify-between border-t border-line pt-6">

                    {currentStep > 1 ? (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={handlePrevStep}
                        disabled={isSubmitting}
                      >
                        ← Previous Step
                      </Button>
                    ) : (
                      <div />
                    )}

                    {currentStep < 3 ? (
                      <Button
                        type="button"
                        onClick={handleNextStep}
                        className="group"
                      >
                        Continue to Step{" "}
                        {currentStep + 1}

                        <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 ml-1 font-sans">
                          📖 →
                        </span>
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">

                            <svg
                              className="animate-spin h-4 w-4 text-paper"
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

                            Submitting Registration...
                          </span>
                        ) : (
                          <>
                            Submit Vendor Registration{" "}
                            <Arrow />
                          </>
                        )}
                      </Button>
                    )}

                  </div>

                </form>
              )}
            </div>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* BOTTOM INFORMATION                                               */}
          {/* ---------------------------------------------------------------- */}

          <div className="mt-12 grid gap-6 md:grid-cols-2">

            {/* Empanelment */}
            <div className="rounded-none border border-line bg-forest-deep p-8 text-paper">

              <span className="font-mono text-[11px] uppercase tracking-wider text-bronze">
                Working With Us
              </span>

              <h3 className="mt-1 font-display text-2xl text-bronze">
                Empanelment Standards
              </h3>

              <p className="mt-2 text-xs text-paper/70 leading-relaxed">
                Vendor profiles are reviewed by our procurement
                team based on category relevance, product quality,
                service capability, supply capacity, and business
                requirements.
              </p>

              <ul className="mt-5 space-y-2.5 text-xs text-paper/90">

                <li className="flex items-center gap-2">
                  <span className="text-bronze">
                    ✓
                  </span>

                  Reliable product and service quality
                </li>

                <li className="flex items-center gap-2">
                  <span className="text-bronze">
                    ✓
                  </span>

                  Consistent supply and service capability
                </li>

                <li className="flex items-center gap-2">
                  <span className="text-bronze">
                    ✓
                  </span>

                  Responsive procurement coordination
                </li>

              </ul>
            </div>

            {/* Support */}
            <div className="rounded-none border border-line bg-paper p-8 flex flex-col justify-between">

              <div>

                <span className="font-mono text-[11px] uppercase tracking-wider text-bronze">
                  Direct Assistance
                </span>

                <h3
                  className="mt-1 text-2xl text-ink"
                  style={{
                    fontFamily:
                      "var(--font-display)",
                  }}
                >
                  Vendor Desk Support
                </h3>

                <p className="mt-2 text-xs text-ink-soft leading-relaxed">
                  Have questions about becoming a vendor,
                  procurement categories, supply capabilities,
                  or the registration process? Reach our vendor
                  relations desk directly.
                </p>

              </div>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold text-forest">

                <a
                  href="mailto:connect@leohospitality.in"
                  className="inline-flex items-center gap-1.5 hover:underline"
                >
                  support@leohospitality.in →
                </a>

              </div>

            </div>

          </div>

        </div>
      </section>
    </>
  )
}

export default Vendor;