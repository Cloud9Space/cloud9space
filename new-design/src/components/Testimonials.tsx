import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

// ─── Logos (only for companies that have them) ────────────────────────────────

const EYLogo = () => (
  <svg viewBox="0 0 56 28" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="EY">
    <rect width="56" height="28" rx="3" fill="#FFE600" />
    <text
      x="9"
      y="21"
      fontFamily="Arial, sans-serif"
      fontWeight="900"
      fontSize="18"
      fill="#2E2E38"
    >
      EY
    </text>
  </svg>
);

const KentrixLogo = () => (
  <svg viewBox="0 0 96 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Kentrix.ai">
    {/* K lettermark */}
    <rect x="0" y="3" width="3" height="18" rx="1.5" fill="#6366F1" />
    <path d="M3 12 L11 3" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" />
    <path d="M3 12 L11 21" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" />
    {/* wordmark */}
    <text
      x="17"
      y="17"
      fontFamily="Arial, sans-serif"
      fontWeight="700"
      fontSize="12"
      fill="currentColor"
    >
      KENTRIX
    </text>
    <text
      x="72"
      y="17"
      fontFamily="Arial, sans-serif"
      fontWeight="400"
      fontSize="10"
      fill="#6366F1"
    >
      .ai
    </text>
  </svg>
);

// ─── Types ────────────────────────────────────────────────────────────────────

type Testimonial = {
  quote: string;
  name: string;
  title?: string;
  company?: string;
  Logo?: React.FC;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Shubham and his team have shown superb versatility and reliability in dealing with a high velocity engagement!",
    name: "Bibaswan Dutta",
    title: "Director",
    company: "EY Consulting",
    Logo: EYLogo,
  },
  {
    quote:
      "We at Kentrix.ai have repeatedly partnered with Cloud9Space for geospatial software development outsourcing, and our experience has consistently been excellent.\n\nShubham and his team are highly reliable, professional, and delivery-focused. The quality of work met exactly what was agreed upon, and timelines were honored without exception.\n\nA dependable technology partner for complex geospatial builds.",
    name: "Rahoul Andres",
    title: "CEO",
    company: "Kentrix.ai",
    Logo: KentrixLogo,
  }
  // {
  //   quote:
  //     "Cloud9Space has been a game-changer for MapMyCrop. Their geospatial expertise and deep understanding of agricultural intelligence helped us scale our platform significantly.\n\nShubham's team consistently delivers precise, high-quality solutions that align with our product vision. They are a trusted long-term partner.",
  //   name: "Neil Jadhav",
  //   title: "CEO",
  //   company: "MapMyCrop",
  // },
  // {
  //   quote:
  //     "Working with Cloud9Space was an exceptional experience from start to finish. Shubham's team brings technical depth and a product-first mindset that's rare to find.\n\nThey understood our requirements quickly and delivered clean, maintainable code on schedule. Highly recommend them for any serious tech build.",
  //   name: "Prashant Singh",
  //   title: "CEO",
  //   company: "Coderize",
  // },
  // {
  //   quote:
  //     "Cloud9Space brought a level of geospatial precision and domain expertise to our collaboration that made a real difference at Terra Helix.\n\nShubham and the team are thoughtful, communicative, and technically strong. They approach each challenge with genuine curiosity and commitment — exactly the kind of partner you want on deep-tech projects.",
  //   name: "Devdatta Tengshe",
  //   title: "Co-Founder",
  //   company: "Terra Helix",
  // },
];

// ─── Card ─────────────────────────────────────────────────────────────────────

const TestimonialCard = ({
  t,
  delay,
}: {
  t: Testimonial;
  delay: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="group h-full flex flex-col glass-card rounded-3xl p-7 transition-all duration-500 hover:translate-y-[-4px] hover:shadow-[var(--shadow-glow)] hover:border-primary/30"
    >
      {/* Header row — quote icon left, logo right (only if exists) */}
      <div className="flex items-start justify-between gap-3 mb-5">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
          <Quote size={18} className="text-primary" />
        </div>

        {t.Logo ? (
          <div className="flex items-center opacity-75 group-hover:opacity-100 transition-opacity duration-300 max-h-7 overflow-hidden">
            <t.Logo />
          </div>
        ) : (
          /* Empty spacer so quote icon stays top-left on all cards */
          <div className="h-7 w-7" />
        )}
      </div>

      {/* Quote */}
      <p className="flex-1 text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
        "{t.quote}"
      </p>

      {/* Author */}
      <div className="mt-6 pt-5 border-t border-border/50 flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center flex-shrink-0">
          <span className="text-[11px] font-bold text-primary/80 font-heading">
            {t.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </span>
        </div>
        <div>
          <div className="font-heading font-semibold text-sm text-foreground leading-tight">
            {t.name}
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5">
            {[t.title, t.company].filter(Boolean).join(" — ")}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ─── Section ──────────────────────────────────────────────────────────────────

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const row1 = testimonials.slice(0, 3);
  const row2 = testimonials.slice(3);

  return (
    <section id="testimonials" className="py-28 relative" ref={ref}>
      <div className="absolute top-10 right-1/2 translate-x-1/2 w-[700px] h-[700px] rounded-full bg-secondary/5 blur-[140px]" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="section-badge mx-auto mb-4">Testimonials</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
            What our <span className="gradient-text">clients</span> say
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Feedback from leaders who've partnered with us across fast-moving engagements.
          </p>
        </motion.div>

        {/* Grid — 3 top, 2 centered below */}
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {row1.map((t, i) => (
              <TestimonialCard key={t.name} t={t} delay={i * 0.1} />
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:w-2/3 lg:mx-auto">
            {row2.map((t, i) => (
              <TestimonialCard key={t.name} t={t} delay={(i + 3) * 0.1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;