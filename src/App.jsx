import { useEffect, useState } from "react";

import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { IntroSplash } from "./components/IntroSplash";

import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Ventures } from "./pages/Ventures";
import { Services } from "./pages/Services";
import { Experience } from "./pages/Experience";
import { Gallery } from "./pages/Gallery";
import { Franchise } from "./pages/Franchise";
import { Careers } from "./pages/Careers";
import { Vendor } from "./pages/Vendor";
import { Contact } from "./pages/Contact";

import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

// ---------------------------------------------
// VALID PAGES
// ---------------------------------------------

const VALID_PAGES = [
  "home",
  "about",
  "ventures",
  "services",
  "experience",
  "gallery",
  "franchise",
  "careers",
  "vendor",
  "contact",
  "privacy",
  "terms",
];

// ---------------------------------------------
// SITE URL
// ---------------------------------------------

const SITE_URL = "https://leohospitality.in";

// ---------------------------------------------
// GET PAGE FROM URL PATH
// ---------------------------------------------

const getPageFromPath = () => {
  if (typeof window === "undefined") return "home";

  const path = window.location.pathname
    .replace(/^\/+|\/+$/g, "")
    .toLowerCase();

  if (!path) return "home";

  return VALID_PAGES.includes(path) ? path : "home";
};

// ---------------------------------------------
// PAGE TITLES
// ---------------------------------------------

const PAGE_TITLES = {
  home: "Leo Hospitality & Ventures LLP — Creating Experiences",
  about: "About Us — Leo Hospitality & Ventures LLP",
  ventures: "Our Ventures — Leo Hospitality & Ventures LLP",
  services: "Services & Capabilities — Leo Hospitality & Ventures LLP",
  experience: "Past Projects & Experience — Leo Hospitality & Ventures LLP",
  gallery: "Gallery — Leo Hospitality & Ventures LLP",
  franchise: "Franchise & Business Opportunities — Leo Hospitality & Ventures LLP",
  careers: "Careers — Leo Hospitality & Ventures LLP",
  vendor: "Vendor Registration & KYC Portal — Leo Hospitality & Ventures LLP",
  contact: "Contact Executive Desk — Leo Hospitality & Ventures LLP",
  privacy: "Privacy Policy — Leo Hospitality & Ventures LLP",
  terms: "Terms & Conditions — Leo Hospitality & Ventures LLP",
};

// ---------------------------------------------
// PAGE DESCRIPTIONS
// ---------------------------------------------

const PAGE_DESCRIPTIONS = {
  home: "Leo Hospitality offers professional hotel, restaurant, and hospitality management solutions focused on operational excellence, guest experience, profitability, and sustainable growth.",
  about: "Discover the story behind Leo Hospitality — a team dedicated to delivering exceptional guest experiences, warm service, and unforgettable stays.",
  ventures: "See how Leo Hospitality has transformed cafes, hotels, restaurants, cloud kitchens, and cafeterias through hands-on consultancy and operational excellence.",
  services: "Leo Hospitality delivers specialized consultancy for cafes, hotels, restaurants, cloud kitchens, and cafeteria operations — helping businesses run smarter and grow faster.",
  experience: "Explore Leo Hospitality's hands-on experience across cafes, hotels, restaurants, cloud kitchens, and cafeteria operations — proven expertise that delivers results.",
  gallery: "Explore Leo Hospitality's gallery — a visual showcase of our consultancy work across cafes, hotels, restaurants, cloud kitchens, and cafeteria operations.",
  franchise: "Explore franchise and business opportunities with Leo Hospitality & Ventures LLP and discover opportunities to build and grow with our hospitality ventures.",
  careers: "Explore career opportunities at Leo Hospitality & Ventures LLP and join a professional team creating exceptional hospitality and business experiences.",
  vendor: "Register as a vendor with Leo Hospitality & Ventures LLP. Submit your business information and KYC details for potential vendor opportunities.",
  contact: "Reach out to Leo Hospitality for expert consultancy in cafe, hotel, restaurant, cloud kitchen, and cafeteria management. Let's discuss your project today.",
  privacy: "Read the Privacy Policy of Leo Hospitality & Ventures LLP to understand how information is collected, used and protected on our website.",
  terms: "Read the Terms & Conditions of Leo Hospitality & Ventures LLP governing the use of our website, services and business opportunities.",
};

// ---------------------------------------------
// PAGE CANONICAL URLS
// Each page has its own absolute canonical URL.
// ---------------------------------------------

const PAGE_URLS = {
  home: `${SITE_URL}/`,
  about: `${SITE_URL}/about`,
  ventures: `${SITE_URL}/ventures`,
  services: `${SITE_URL}/services`,
  experience: `${SITE_URL}/experience`,
  gallery: `${SITE_URL}/gallery`,
  franchise: `${SITE_URL}/franchise`,
  careers: `${SITE_URL}/careers`,
  vendor: `${SITE_URL}/vendor`,
  contact: `${SITE_URL}/contact`,
  privacy: `${SITE_URL}/privacy`,
  terms: `${SITE_URL}/terms`,
};

// ---------------------------------------------
// APP
// ---------------------------------------------

export default function App() {
  const [page, setPage] = useState(getPageFromPath);

  // Intro splash
  // Change to true whenever you want to display the intro banner.
  const [showIntro, setShowIntro] = useState(false);

  // -------------------------------------------
  // NAVIGATION
  // -------------------------------------------

  const go = (p) => {
    if (!VALID_PAGES.includes(p)) {
      return;
    }

    setPage(p);

    if (typeof window !== "undefined") {
      const newPath = p === "home" ? "/" : `/${p}`;

      if (window.location.pathname !== newPath) {
        window.history.pushState(null, "", newPath);
      }

      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
    }
  };

  // -------------------------------------------
  // HANDLE BROWSER BACK / FORWARD
  // -------------------------------------------

  useEffect(() => {
    const handlePopState = () => {
      setPage(getPageFromPath());

      window.scrollTo({
        top: 0,
        behavior: "auto",
      });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  // -------------------------------------------
  // UPDATE SEO TITLE + DESCRIPTION + CANONICAL
  // -------------------------------------------

  useEffect(() => {
    // Update page title
    document.title = PAGE_TITLES[page] || PAGE_TITLES.home;

    // Update meta description
    let descriptionTag = document.querySelector(
      'meta[name="description"]'
    );

    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute("name", "description");
      document.head.appendChild(descriptionTag);
    }

    descriptionTag.setAttribute(
      "content",
      PAGE_DESCRIPTIONS[page] || PAGE_DESCRIPTIONS.home
    );

    // Update or create the canonical link
    let canonicalTag = document.querySelector(
      'link[rel="canonical"]'
    );

    if (!canonicalTag) {
      canonicalTag = document.createElement("link");
      canonicalTag.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalTag);
    }

    canonicalTag.setAttribute(
      "href",
      PAGE_URLS[page] || PAGE_URLS.home
    );
  }, [page]);

  // -------------------------------------------
  // HOME PAGE SCROLL SNAP
  // -------------------------------------------

  useEffect(() => {
    const root = document.documentElement;

    if (page === "home") {
      root.classList.add("snap-page");
    } else {
      root.classList.remove("snap-page");
    }

    return () => {
      root.classList.remove("snap-page");
    };
  }, [page]);

  // -------------------------------------------
  // NAVBAR HERO STATE
  // -------------------------------------------

  const overHero = page === "home";

  // -------------------------------------------
  // RENDER PAGE
  // -------------------------------------------

  const renderPage = () => {
    switch (page) {
      case "home":
        return <Home go={go} />;
      case "about":
        return <About go={go} />;
      case "ventures":
        return <Ventures go={go} />;
      case "services":
        return <Services go={go} />;
      case "experience":
        return <Experience go={go} />;
      case "gallery":
        return <Gallery go={go} />;
      case "franchise":
        return <Franchise go={go} />;
      case "careers":
        return <Careers go={go} />;
      case "vendor":
        return <Vendor go={go} />;
      case "contact":
        return <Contact go={go} />;
      case "privacy":
        return <Privacy go={go} />;
      case "terms":
        return <Terms go={go} />;
      default:
        return <Home go={go} />;
    }
  };

  // -------------------------------------------
  // APP UI
  // -------------------------------------------

  return (
    <div className="min-h-full bg-cream">
      {showIntro && (
        <IntroSplash onEnter={() => setShowIntro(false)} />
      )}

      <Nav page={page} go={go} overHero={overHero} />

      <main id="main-content">
        <div key={page} className="page-enter">
          {renderPage()}
        </div>
      </main>

      <Footer go={go} />
    </div>
  );
}
