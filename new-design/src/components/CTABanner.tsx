import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const CTABanner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden p-12 sm:p-16 text-center"
          style={{ background: "var(--gradient-primary)" }}
        >
          {/* Glass overlay */}
          <div className="absolute inset-0 bg-background/10 backdrop-blur-sm" />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-primary-foreground mb-4">
              Let's Create Big Stories Together
            </h2>
            <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8">
              Our team consists of industry experts with years of experience. Choosing
              us will be your best decision.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-background text-foreground font-semibold text-sm hover:scale-105 transition-transform duration-300"
            >
              Get a Quote <ArrowRight size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABanner;
