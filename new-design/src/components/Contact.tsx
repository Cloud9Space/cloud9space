import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Phone, Mail, MapPin, Send } from "lucide-react";

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+91 86690 23458", href: "tel:+918669023458" },
  { icon: Mail, label: "Email", value: "contact@cloud9space.com", href: "mailto:contact@cloud9space.com" },
  { icon: MapPin, label: "Address", value: "Splendour County, Wagholi, Pune", href: "#" },
];

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
  };

  return (
    <section id="contact" className="py-28 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-badge mx-auto mb-4">Get in Touch</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold">
            Send Us A <span className="gradient-text">Note</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="glass-card rounded-2xl p-8 space-y-5"
          >
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Your Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Message</label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border text-foreground text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none"
                placeholder="Tell us about your project..."
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold text-sm hover:scale-[1.02] transition-transform duration-300 flex items-center justify-center gap-2"
            >
              Send Message <Send size={16} />
            </button>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col justify-center gap-6"
          >
            {contactInfo.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                className="glass-card rounded-2xl p-6 flex items-center gap-5 hover:border-primary/30 transition-colors duration-300 group"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <item.icon size={20} className="text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground mb-0.5">{item.label}</div>
                  <div className="text-foreground font-medium text-sm">{item.value}</div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
