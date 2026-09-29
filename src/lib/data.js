import { IMG } from "./ui"

export const VENTURES_DATA = [
  {
    id: "bodhi-tree",
    tag: "Café · Restaurant",
    name: "Café Bodhi Tree",
    tagline: "Thoughtfully managed spaces, crafted for memorable dining.",
    copy: "Café Bodhi Tree is our flagship dine-in venue, a calm and considered space for all-day dining. Operated with the consultancy support of Leo Hospitality, it reflects a hands-on approach to management, where thoughtful details and consistent standards shape every visit.",
    points: [
      "Consistent service & operational standards",
      "Optimized menu and kitchen workflow",
      "Trained staff delivering quality guest experience",
      "Focused on efficiency and profitability",
    ],
    images: [IMG.bodhiTree, IMG.dish],
  
  },
  {
    id: "ryvive-roots",
    tag: "Fresh • Wholesome • Delicious ",
    name: "Ryvive Roots Cloud Kitchen",
    tagline: "Built around consistency, efficiency, and mindful food operations.",
    copy: "Ryvive Roots Cloud Kitchen is structured around a disciplined operating model that brings together culinary consistency, efficient kitchen processes, quality control, and seamless delivery. Every touchpoint is thoughtfully managed to ensure that freshness, presentation, and service standards remain consistent from preparation to doorstep.",
    points: [
      "Our promise for hygine and quality standard meal",
      "We focus on taste & nutritious ingredients",
      "Our meal subscriptions designed for hassle-free dining.",
      "Quick doorstep delivery, ensuring your food arrives fresh every time.",
    ],
    images: [IMG.ryviveRoots, IMG.pack],
  
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
    img: IMG.cafe,
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

// All icons: 24x24 viewBox, stroke-based (fill="none", stroke="currentColor",
// strokeWidth 1.75, strokeLinecap "round", strokeLinejoin "round").
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
    // Clipboard with checkmark / operations
    svgIcon:
      "M9 2h6a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1zM16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2m1 10 2 2 4-4",
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
    // Coffee cup / cafeteria
    svgIcon:
      "M6 2v2M10 2v2M14 2v2M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h12zm1 0h1a3 3 0 0 1 0 8h-1",
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
    // Fork & knife / dining
    svgIcon:
      "M3 2v7a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V2M7 2v20M21 15V2a5 5 0 0 0-5 5v6a2 2 0 0 0 2 2h3zm0 0v7",
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
    // Graduation cap / training
    svgIcon:
      "M21.42 10.92a1 1 0 0 0-.02-1.84L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.83l8.57 3.91a2 2 0 0 0 1.66 0zM22 10v6M6 12.5V16a6 3 0 0 0 12 0v-3.5",
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
    // Chef hat / kitchen
    svgIcon:
      "M17 21a1 1 0 0 0 1-1v-5.35c0-.46.32-.84.73-1.04a4 4 0 0 0-2.13-7.59 5 5 0 0 0-9.19 0 4 4 0 0 0-2.13 7.59c.41.2.72.58.72 1.04V20a1 1 0 0 0 1 1zM6 17h12",
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
    // Document / menu
    svgIcon:
      "M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7zM14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8",
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
    // Shield with check / quality
    svgIcon:
      "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1zM9 12l2 2 4-4",
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
    // Indian Rupee ₹ (fixed)
    svgIcon:
      "M6 3h12M6 8h12M6 13l8.5 8M6 13h3M9 13c6.67 0 6.67-10 0-10",
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
    // Smiley face / guest satisfaction
    svgIcon:
      "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0zM8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01",
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
    // Package / inventory
    svgIcon:
      "M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73zM12 22V12M3.29 7 12 12l8.71-5M7.5 4.27l9 5.15",
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
  { value: 4, label: "Cities & Locations", suffix: "+" },
]
