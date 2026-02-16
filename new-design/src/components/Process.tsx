import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, PenTool, Settings, Trophy } from "lucide-react";

const steps = [
  { icon: Search, num: "01", title: "Discovery", description: "Deep-dive into your business to understand goals, pain points, and opportunities." },
  { icon: PenTool, num: "02", title: "Product Design", description: "Craft intuitive interfaces and robust architectures tailored to your vision." },
  { icon: Settings, num: "03", title: "Custom Solutions", description: "Build and deploy scalable, AI-powered solutions with agile methodology." },
  { icon: Trophy, num: "04", title: "Deliver & Scale", description: "Launch, monitor, and continuously optimize for long-term success." },
];

const Process = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="py-28 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-badge mx-auto mb-4">Work Process</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold">
            Our development <span className="gradient-text">process</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 * i, duration: 0.6 }}
              className="process-step text-center group"
            >
              <div className="inline-flex h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <step.icon size={24} className="text-primary" />
              </div>
              <div className="text-xs text-primary font-semibold tracking-widest mb-2">{step.num}</div>
              <h4 className="font-heading font-semibold text-foreground mb-2">{step.title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>

              {/* Connector line (hidden on last) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-primary/40 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
