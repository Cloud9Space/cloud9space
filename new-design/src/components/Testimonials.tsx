import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";
import eyLogo from "../assets/ey-logo-black.png";
import kentrixLogo from "../assets/kentrix_logo_new.jpeg";

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
    Logo: () => <img src={eyLogo} alt="EY Logo" className="h-9 w-auto object-contain" />,
  },
  {
    quote:
      "We at Kentrix.ai have repeatedly partnered with Cloud9Space for geospatial software development outsourcing, and our experience has consistently been excellent.\n\nShubham and his team are highly reliable, professional, and delivery-focused. The quality of work met exactly what was agreed upon, and timelines were honored without exception.\n\nA dependable technology partner for complex geospatial builds.",
    name: "Rahoul Andres",
    title: "CEO",
    company: "Kentrix.ai",
    Logo: () => <img src={kentrixLogo} alt="Kentrix.ai Logo" className="h-9 w-auto object-contain" />,
  },
];

const TestimonialCard = ({ t, delay }: { t: Testimonial; delay: number }) => {
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
      <div className="flex items-start justify-between gap-3 mb-5">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
          <Quote size={18} className="text-primary" />
        </div>
        {t.Logo ? (
          <div className="flex items-center opacity-75 group-hover:opacity-100 transition-opacity duration-300 max-h-9 overflow-hidden">
            <t.Logo />
          </div>
        ) : (
          <div className="h-7 w-7" />
        )}
      </div>

      <p className="flex-1 text-sm text-foreground/80 leading-relaxed whitespace-pre-line">
        "{t.quote}"
      </p>

      <div className="mt-6 pt-5 border-t border-border/50 flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center flex-shrink-0">
          <span className="text-[11px] font-bold text-primary/80 font-heading">
            {t.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
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

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="py-28 relative" ref={ref}>
      <div className="absolute top-10 right-1/2 translate-x-1/2 w-[700px] h-[700px] rounded-full bg-secondary/5 blur-[140px]" />

      <div className="container mx-auto px-6 relative z-10">
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

        {/* 2 cards centered, max width constrained so they don't stretch too wide */}
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} t={t} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;