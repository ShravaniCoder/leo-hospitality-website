import { IMG } from "./ui"

export const VENTURES_DATA = [
  {
    id: "bodhi-tree",
    tag: "Café · Restaurant",
    name: "Café Bodhi Tree",
    tagline: "Ambience-led café and restaurant experience.",
    copy: "A premium all-day dining space designed around warm, welcoming aesthetics and detail-oriented operational standards. Featuring speciality coffee and ingredient-led menus that cultivate a loyal local community.",
    points: [
      "All-day café & light restaurant format",
      "Speciality coffee programme",
      "Seasonal, ingredient-led menu",
      "Designed for community & regulars",
    ],
    images: [IMG.bodhiTree, IMG.latteArt],
    floatingAsset: [
      {
        type: "svg",
        // Leaf motif SVG path
        svgPath:
          "M12 2C11.5 2 6 6 6 12C6 15.3 8.7 18 12 18C15.3 18 18 15.3 18 12C18 6 12.5 2 12 2ZM12 16C9.8 16 8 14.2 8 12C8 9.5 11 6.2 12 5.2C13 6.2 16 9.5 16 12C16 14.2 14.2 16 12 16Z",
        style: {
          top: "15%",
          right: "12%",
          width: "90px",
          height: "90px",
          opacity: 0.85,
          color: "var(--color-bronze)",
        },
      },
      {
        type: "svg",
        // Coffee cup outline SVG path
        svgPath:
          "M2 5v8c0 2.2 1.8 4 4 4h6c2.2 0 4-1.8 4-4V5H2zm14 3h1.5c1.4 0 2.5-1.1 2.5-2.5S18.9 3 17.5 3H16v5zm-14 11h16v2H2v-2z",
        style: {
          bottom: "25%",
          left: "8%",
          width: "80px",
          height: "80px",
          opacity: 0.7,
          color: "var(--color-forest)",
        },
      },
    ],
  },
  {
    id: "ryvive-roots",
    tag: "Cloud Kitchen",
    name: "Ryvive Roots Cloud Kitchen",
    tagline: "Operational delivery-first kitchen ventures built for scale.",
    copy: "Ryviveroots runs its cloud kitchen operations with Leo Hospitality, a trusted name in hospitality and food & beverage consultancy. This brings together Ryviveroots' brand identity with Leo Hospitality's operational expertise in managing efficient, reliable cloud kitchen setups.",
    points: [
      "Standardised recipes & prep systems",
      "Multi-aggregator delivery operations",
      "Turnkey franchise & partnership model",
      "Unit economics designed for scale",
    ],
    images: [IMG.ryviveRoots, IMG.containers],
    floatingAsset: [
      {
        type: "svg",
        // Plate and fork/spoon chef motif SVG path
        svgPath:
          "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z",
        style: {
          top: "20%",
          left: "10%",
          width: "100px",
          height: "100px",
          opacity: 0.7,
          color: "var(--color-bronze)",
        },
      },
      {
        type: "svg",
        // Chef hat silhouette path
        svgPath:
          "M12 3a6 6 0 0 0-5.9 5 3 3 0 0 0-2.1 2.8c0 1.2.7 2.2 1.7 2.7A2 2 0 0 0 7 17h10a2 2 0 0 0 1.3-3.5c1-.5 1.7-1.5 1.7-2.7a3 3 0 0 0-2.1-2.8A6 6 0 0 0 12 3zm0 2c2.2 0 4 1.8 4 4H8c0-2.2 1.8-4 4-4z",
        style: {
          bottom: "18%",
          right: "10%",
          width: "90px",
          height: "90px",
          opacity: 0.8,
          color: "var(--color-forest)",
        },
      },
    ],
    cta: "franchise",
  },
]

export const PROJECTS_DATA = [
  {
    number: "01",
    name: "Lord of the Drinks",
    loc: "Powai & Worli, Mumbai",
    type: "Restaurant & Bar",
    period: "May 2019 – December 2025",
    img: IMG.drinks,
    description:
      "Served as Hospitality Management Partner across the Powai and Worli locations, overseeing restaurant operations, workforce management, guest experience, SOP implementation, quality control, and day-to-day operational excellence.",
  },

  {
    number: "02",
    name: "Tea Villa Café",
    loc: "Juhu, Mumbai",
    type: "Café Operations",
    period: "October 2018 – December 2020",
    img: IMG.pieLatte,
    description:
      "Worked as the Hospitality Management Partner, overseeing daily operations, team management, service quality, and guest experience while supporting consistent and efficient café operations.",
  },

  {
    number: "03",
    name: "M&S – The Food Factory Café",
    loc: "Sangli, Maharashtra",
    type: "Café & Restaurant",
    period: "2017 – July 2020",
    img: IMG.woodTable,
    description:
      "Founded and operated our own café, gaining hands-on experience across concept development, kitchen operations, staffing, customer service, marketing, and financial management.",
  },

  {
    number: "04",
    name: "Belge Cakes",
    loc: "Sangli – Pune, Maharashtra",
    type: "Celebrations & Event Services",
    period: "2015 – 2016",
    img: IMG.eventDessert,
    description:
      "Supported Belge Cakes in managing in-store and outdoor birthday and anniversary celebrations, coordinating service and event execution while ensuring a smooth and memorable experience for guests.",
  },
];

export const SERVICES_DATA = [
  {
    n: "01",
    t: "Restaurant & Café Management",
    d: "End-to-end management that brings operational discipline, service excellence, and commercial performance together.",
    caps: [
      "Daily operations & service standards",
      "Staffing, recruitment & team training",
      "Cost control & P&L management",
      "Vendor & inventory management",
      "Guest experience & service quality",
    ],
    svgIcon:
      "M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9h4m-4 4h6",
  },

  {
    n: "02",
    t: "Society Clubhouse Cafeteria Management",
    d: "Thoughtfully managed dining environments designed around convenience, consistency, and community.",
    caps: [
      "Daily cafeteria operations",
      "Menu planning & meal programmes",
      "Staffing & service management",
      "Hygiene & quality standards",
      "Resident experience & feedback",
    ],
    svgIcon: "M4 5h16v14H4V5zm3 3h10M7 12h4m2 0h4M7 16h10",
  },

  {
    n: "03",
    t: "Food & Beverage Operations",
    d: "Structured F&B operations that connect culinary quality, service delivery, and commercial performance.",
    caps: [
      "Concept & positioning strategy",
      "Menu engineering & costing",
      "Recipe standardisation",
      "Beverage & coffee programmes",
      "Food quality & service direction",
    ],
    svgIcon: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  },

  {
    n: "04",
    t: "Staff Training",
    d: "Building confident hospitality teams through structured training, service standards, and hands-on development.",
    caps: [
      "Service etiquette & guest handling",
      "Front-of-house training",
      "Kitchen & operational training",
      "SOP implementation & compliance",
      "Performance development & coaching",
    ],
    svgIcon: "M12 22V12m0 0 4-4m-4 4-4-4M6 12a6 6 0 1 1 12 0 6 6 0 0 1-12 0z",
  },

  {
    n: "05",
    t: "Cloud Kitchen Operations",
    d: "Delivery-first kitchen systems built around consistency, efficiency, quality, and scalable growth.",
    caps: [
      "Delivery-optimised kitchen planning",
      "Aggregator onboarding & strategy",
      "Packaging & food-safety systems",
      "Multi-brand kitchen operations",
      "Performance & rating management",
    ],
    svgIcon: "M4 4h16v16H4V4zm4 4h8v8H8V8z",
  },

  {
    n: "06",
    t: "Menu Planning & Development",
    d: "Thoughtfully engineered menus that balance culinary identity, customer appeal, operational efficiency, and profitability.",
    caps: [
      "Concept & menu positioning",
      "Menu engineering & costing",
      "Recipe development & standardisation",
      "Beverage & coffee programmes",
      "Menu presentation & food styling",
    ],
    svgIcon: "M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  },

  {
    n: "07",
    t: "Quality Control",
    d: "Consistent standards across food, service, hygiene, and operations to protect quality at every touchpoint.",
    caps: [
      "Food quality & consistency checks",
      "Hygiene & safety standards",
      "SOP & process audits",
      "Service quality monitoring",
      "Corrective action & improvement",
    ],
    svgIcon:
      "M12 3l8 4v5c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7l8-4zm-3 9 2 2 4-4",
  },

  {
    n: "08",
    t: "Cost Control",
    d: "Disciplined cost management designed to improve margins while protecting quality and operational standards.",
    caps: [
      "Food & beverage cost monitoring",
      "Purchase & procurement controls",
      "Inventory optimisation",
      "Waste reduction systems",
      "P&L analysis & performance tracking",
    ],
    svgIcon: "M12 1v22M17 5H9a3 3 0 0 0 0 6h6a3 3 0 0 1 0 6H6",
  },

  {
    n: "09",
    t: "Customer Experience Management",
    d: "Creating thoughtful guest journeys through attentive service, consistent standards, and meaningful feedback.",
    caps: [
      "Guest journey mapping",
      "Service standards & etiquette",
      "Feedback & review management",
      "Customer satisfaction tracking",
      "Experience improvement programmes",
    ],
    svgIcon:
      "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m8-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  },

  {
    n: "10",
    t: "Vendor & Inventory Management",
    d: "Streamlined procurement and inventory systems that maintain availability, quality, and cost efficiency.",
    caps: [
      "Vendor sourcing & evaluation",
      "Purchase planning & procurement",
      "Inventory tracking & control",
      "Stock optimisation & replenishment",
      "Supplier performance management",
    ],
    svgIcon: "M3 7h18M5 7l1-4h12l1 4M5 7v12h14V7M9 11h6",
  },
];

export const GALLERY_PHOTOS_DATA = [
  { src: IMG.Home, cat: "Restaurants & Cafés", span: true },
  { src: IMG.latteArt, cat: "Food & Beverages" },
  { src: IMG.chefKnife, cat: "Behind the Scenes" },
  { src: IMG.eventDessert, cat: "Food & Beverages", span: true  },
  { src: IMG.souffle, cat: "Food & Beverages" },
  { src: IMG.chefBoard, cat: "Team & Operations" },
  { src: IMG.bodhiTree, cat: "Restaurants & Cafés" },
  { src: IMG.containers, cat: "Projects" },
  { src: IMG.cupcakes, cat: "Food & Beverages", span: true },
  { src: IMG.chefBowl, cat: "Team & Operations" },
  { src: IMG.pieLatte, cat: "Food & Beverages", span: true },
  { src: IMG.chefSink, cat: "Behind the Scenes" },
  { src: IMG.woodTable, cat: "Restaurants & Cafés" },
  { src: IMG.deliveryBag, cat: "Projects" },
  { src: IMG.dessertPlatter, cat: "Food & Beverages" },
]

export const STATS_DATA = [
  { value: 10, label: "Years of Experience", suffix: "+" },
  { value: 15, label: "Ventures Managed", suffix: "+" },
  { value: 5, label: "Cities & Locations", suffix: "+" },
]
