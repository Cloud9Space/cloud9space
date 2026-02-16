import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle } from "lucide-react";

const highlights = [
  "Geospatial Intelligence (GIS)",
  "Agritech Services Using AI & GIS",
  "Cloud Services",
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-28 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="glass-card rounded-3xl p-1">
              <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-muted to-card aspect-[4/3] flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10" />
                <div className="relative z-10 text-center p-10">
                  <div className="text-6xl font-heading font-bold gradient-text mb-2">C9S</div>
                  <p className="text-muted-foreground text-sm">Technology · Innovation · Impact</p>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 blur-xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full bg-secondary/10 blur-2xl" />
          </motion.div>

          {/* Right content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="section-badge mb-4">About Us</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold leading-tight mb-6">
              We believe technology should be{" "}
              <span className="gradient-text">intelligent & impactful</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              At Cloud9Space, we've evolved from a software service provider into a
              full-spectrum technology partner specializing in AI/ML, Data Engineering,
              GIS and QA. We've helped startups and enterprises alike harness advanced
              analytics, predictive modeling and intelligent automation.
            </p>

            <div className="space-y-3 mb-8">
              {highlights.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle size={18} className="text-primary flex-shrink-0" />
                  <span className="text-foreground font-medium text-sm">{item}</span>
                </motion.div>
              ))}
            </div>

            <a
              href="#services"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold text-sm hover:scale-105 transition-transform duration-300"
            >
              Discover More
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
