import {
  MapPin,
  Phone,
  Mail,
 
} from "lucide-react";
import { NAV_ITEMS } from "./Nav";
import logoDark from "../assets/LEO Logo-dark.svg";

export function Footer({ go }) {
 

  return (
    <footer data-tone="dark" className="bg-forest-deep text-paper">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Main Footer */}
        <div className="grid gap-12 border-b border-white/10 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-20">
          {/* Brand */}
          <div>
            <button
              onClick={() => go("home")}
              className="flex items-center cursor-pointer transition-opacity duration-300 hover:opacity-90 focus:outline-none"
              aria-label="Leo Hospitality & Ventures — Back to home"
            >
              <img
                src={logoDark}
                alt="Leo Hospitality & Ventures"
                className="h-10 w-auto object-contain sm:h-11"
              />
            </button>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/65">
              Creating experiences. Building hospitality brands. A management
              partner for restaurants, cafés, clubhouse cafeterias and cloud
              kitchens.
            </p>

            {/* Social Icons */}
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.instagram.com/leohospitalityandventuresllp?stkn=dWhnNmI4OHVuYzdi"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-paper/70 transition-all duration-300 hover:border-bronze hover:bg-bronze/10 hover:text-bronze"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="kicker text-bronze">Explore</h4>

            <ul className="mt-5 space-y-3 text-sm">
              {NAV_ITEMS.slice(0, 6).map((it) => (
                <li key={it.id}>
                  <button
                    onClick={() => go(it.id)}
                    className="text-paper/70 transition-colors hover:text-paper"
                  >
                    {it.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="kicker text-bronze">Company</h4>

            <ul className="mt-5 space-y-3 text-sm">
              {NAV_ITEMS.slice(6).map((it) => (
                <li key={it.id}>
                  <button
                    onClick={() => go(it.id)}
                    className="text-paper/70 transition-colors hover:text-paper"
                  >
                    {it.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="kicker text-bronze">Connect</h4>

            <div className="mt-5 space-y-5 text-sm text-paper/65">
              {/* Location */}
              <div className="flex items-start gap-3">
                <MapPin
                  size={18}
                  strokeWidth={1.6}
                  className="mt-0.5 shrink-0 text-bronze"
                />

                <p className="leading-relaxed">
                  FN 2402, F 24, Alpine BN 01,
                 
                  Regency Anantham City,
                 
                  Dombivali I. A., Kalyan,
                 
                  Thane - 421203,
                 
                  Maharashtra, India.
                </p>
              </div>

              {/* Phone */}
              <a
                href="tel:+918087759997"
                className="flex items-center gap-3 transition-colors hover:text-paper"
              >
                <Phone
                  size={18}
                  strokeWidth={1.6}
                  className="shrink-0 text-bronze"
                />

                <span>+91 80877 59997</span>
              </a>

              {/* Email */}
              <a
                href="mailto:support@leohospitality.in"
                className="flex items-center gap-3 transition-colors hover:text-paper"
              >
                <Mail
                  size={18}
                  strokeWidth={1.6}
                  className="shrink-0 text-bronze"
                />

                <span>support@leohospitality.in</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="flex flex-col gap-3 py-8 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Leo Hospitality & Ventures LLP. All
            rights reserved.
          </p>

          <p className="flex gap-5">
            <a href="#" className="transition-colors hover:text-paper">
              Privacy
            </a>

            <a href="#" className="transition-colors hover:text-paper">
              Terms
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
