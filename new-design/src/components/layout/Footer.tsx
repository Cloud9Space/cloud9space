import { Link } from "react-router-dom";
import { Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { company, footerNav } from "@/content/site";
import { Brand } from "./Header";

export const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="tone-deep bg-background text-foreground border-t border-border" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Brand />
            <p className="t-body mt-5 max-w-sm">
              AI, data and geospatial engineering for organisations that need technology to work in the real world.
            </p>
            <address className="not-italic mt-8 space-y-3 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">{company.legalName}</p>
              <a href={company.mapsHref} target="_blank" rel="noopener noreferrer" className="flex gap-2.5 hover:text-foreground">
                <MapPin size={16} className="mt-0.5 shrink-0" aria-hidden />
                <span>
                  {company.address.line1}, {company.address.line2}, {company.address.city},{" "}
                  {company.address.region} {company.address.postalCode}
                </span>
              </a>
              <a href={`mailto:${company.email}`} className="flex items-center gap-2.5 hover:text-foreground">
                <Mail size={16} aria-hidden /> {company.email}
              </a>
              <a href={company.phoneHref} className="flex items-center gap-2.5 hover:text-foreground">
                <Phone size={16} aria-hidden /> {company.phone}
              </a>
            </address>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            {Object.entries(footerNav).map(([title, links]) => (
              <div key={title}>
                <h3 className="eyebrow !text-muted-foreground mb-4">{title}</h3>
                <ul className="space-y-2.5">
                  {links.map((l) => (
                    <li key={l.href}>
                      <Link to={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse gap-6 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-meta">
            © {year} {company.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground">
              Terms
            </Link>
            <a
              href={company.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Cloud9Space on LinkedIn"
              className="text-muted-foreground hover:text-foreground"
            >
              <Linkedin size={18} />
            </a>
            <a
              href={company.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Cloud9Space on Instagram"
              className="text-muted-foreground hover:text-foreground"
            >
              <Instagram size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
