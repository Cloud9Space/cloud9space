import { Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { company } from "@/content/site";
import { Seo } from "@/components/kit/Seo";
import { PageHero } from "@/components/kit/PageHero";
import { Section } from "@/components/kit/Section";
import { ContactForm } from "@/components/sections/ContactForm";

const details = [
  { icon: Mail, label: "Email", value: company.email, href: `mailto:${company.email}` },
  { icon: Phone, label: "Phone", value: company.phone, href: company.phoneHref },
  {
    icon: MapPin,
    label: "Office",
    value: `${company.address.line1}, ${company.address.line2}, ${company.address.city}, ${company.address.region} ${company.address.postalCode}`,
    href: company.mapsHref,
    external: true,
  },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/company/cloud9space", href: company.social.linkedin, external: true },
];

const ContactPage = () => (
  <>
    <Seo path="/contact" />
    <PageHero
      crumb="Contact"
      eyebrow="Contact"
      title="Have a complex technology problem?"
      lead="Tell us what you are trying to build. A short description is enough — we will follow up to understand the details."
    />
    <Section labelledBy="form-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 id="form-title" className="t-h3 mb-6">
            Start a conversation
          </h2>
          <ContactForm />
        </div>
        <aside className="lg:col-span-5" aria-label="Contact details">
          <h2 className="t-h3 mb-6">Reach us directly</h2>
          <ul className="divide-y divide-border border-y border-border">
            {details.map((d) => (
              <li key={d.label}>
                <a
                  href={d.href}
                  {...(d.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex gap-4 py-5"
                >
                  <d.icon size={18} className="mt-0.5 shrink-0 text-primary" aria-hidden />
                  <span>
                    <span className="t-meta block uppercase tracking-[0.12em]">{d.label}</span>
                    <span className="mt-1 block text-[0.95rem] text-foreground group-hover:text-primary">{d.value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="t-meta mt-6">{company.legalName}</p>
        </aside>
      </div>
    </Section>
  </>
);

export default ContactPage;
