import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Cpu, Handshake, Zap, Shield } from "lucide-react";

const reasons = [
  {
    icon: Cpu,
    title: "Proven Experience in AI for Agriculture",
    description: "Delivering AI-powered insights and geospatial intelligence to transform modern farming practices.",
  },
  {
    icon: Handshake,
    title: "Blend of Deep Tech + Business Consulting",
    description: "Combining advanced technology expertise with strategic consulting to solve real-world problems.",
  },
  {
    icon: Zap,
    title: "Agile, Scalable & Delivery-Focused",
    description: "Adaptive teams and flexible architectures that prioritize timely, high-impact outcomes.",
  },
  {
    icon: Shield,
    title: "Trusted by Startups & Enterprise Firms",
    description: "Proven partner across business sizes, delivering innovative and dependable solutions at scale.",
  },
];

const WhyChoose = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-28 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-32"
          >
            <div className="section-badge mb-4">Why Choose Us</div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-6 leading-tight">
              We Empower Businesses With{" "}
              <span className="gradient-text">Innovative Solutions</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Blending and geospatial insights to navigate complexities and
              secure a position of proactive dominance in a dynamic operational ecosystem.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                { num: "20+", label: "Team Members" },
                { num: "20+", label: "Projects Done" },
                { num: "99%", label: "Client Satisfaction" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="stat-number">{stat.num}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right - cards */}
          <div className="space-y-5">
            {reasons.map((reason, i) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.15 * i, duration: 0.6 }}
                className="glass-card rounded-2xl p-6 flex gap-5 items-start hover:border-primary/30 transition-colors duration-300 group"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <reason.icon size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-foreground mb-1.5">
                    {reason.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
