import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0" style={{ background: "var(--gradient-glow)" }} />

      {/* Floating orbs */}
      <div className="absolute top-20 right-1/4 w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-float" />
      <div className="absolute bottom-20 left-1/4 w-96 h-96 rounded-full bg-secondary/5 blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      <div className="container mx-auto px-6 pt-28 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="section-badge mb-6"
            >
              <Sparkles size={14} />
              AI · Data · Geospatial Intelligence
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-[1.1] tracking-tight mb-6"
            >
              Empowering Innovation with{" "}
              <span className="gradient-text">AI, Data</span> & Geospatial Intelligence
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed"
            >
              Cloud9Space delivers cutting-edge AI/ML solutions, scalable software
              engineering and geospatial insights for businesses transforming the future.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold text-sm hover:scale-105 hover:shadow-lg transition-all duration-300 glow-effect"
              >
                Contact Us <ArrowRight size={16} />
              </a>
              <a
                href="#about"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-primary/30 text-foreground font-semibold text-sm hover:bg-primary/10 hover:border-primary/50 transition-all duration-300"
              >
                Explore Now <ArrowRight size={16} />
              </a>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-3xl overflow-hidden glow-effect">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 z-10 rounded-3xl" />
              <img
                src={heroImage}
                alt="Cloud9Space AI and Geospatial Intelligence team"
                className="w-full h-auto rounded-3xl object-cover"
              />
            </div>
            {/* Floating stat badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 glass-card rounded-2xl px-6 py-4 z-20"
            >
              <div className="text-2xl font-heading font-bold gradient-text">20+</div>
              <div className="text-xs text-muted-foreground">Professional Members</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
