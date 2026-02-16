import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Testimonial = {
  quote: string;
  name: string;
  title?: string;
  company?: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Shubham and his team have shown superb versatility and reliability in dealing with a high velocity engagement!",
    name: "Bibaswan Dutta",
    title: "Director",
    company: "EY Consulting",
  },
];

const TestimonialCard = ({ t }: { t: Testimonial }) => {
  return (
    <div className="h-full glass-card rounded-3xl p-8 md:p-10 transition-all duration-500 hover:translate-y-[-4px] hover:shadow-[var(--shadow-glow)] hover:border-primary/30">
      <div className="flex items-start justify-between gap-4">
        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <Quote size={20} className="text-primary" />
        </div>
      </div>

      <p className="mt-6 text-base sm:text-lg text-foreground/90 leading-relaxed">
        “{t.quote}”
      </p>

      <div className="mt-10 pt-6 border-t border-border/50">
        <div className="font-heading font-semibold text-foreground">{t.name}</div>
        <div className="text-sm text-muted-foreground">
          {[t.title, t.company].filter(Boolean).join(" — ")}
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="py-28 relative" ref={ref}>
      {/* Background accent */}
      <div className="absolute top-10 right-1/2 translate-x-1/2 w-[700px] h-[700px] rounded-full bg-secondary/5 blur-[140px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-badge mx-auto mb-4">Testimonials</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
            What our <span className="gradient-text">clients</span> say
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Feedback from leaders who’ve partnered with us across fast-moving engagements.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative max-w-6xl mx-auto"
        >
          {testimonials.length === 1 ? (
            <div className="max-w-3xl mx-auto">
              <TestimonialCard t={testimonials[0]} />
            </div>
          ) : (
            <Carousel opts={{ align: "start", loop: true }}>
              <CarouselContent>
                {testimonials.map((t) => (
                  <CarouselItem
                    key={`${t.name}-${t.company ?? "client"}`}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <TestimonialCard t={t} />
                  </CarouselItem>
                ))}
              </CarouselContent>

              <>
                <CarouselPrevious className="hidden md:inline-flex left-2" />
                <CarouselNext className="hidden md:inline-flex right-2" />
              </>
            </Carousel>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;

