import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Globe, Leaf, Cloud, Database, Users, Brain } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Geospatial Intelligence (GIS)",
    description: "Satellite imagery analysis, land parcel segmentation, vegetation and water detection, , and geospatial dashboards.",
    num: "01",
  },
  {
    icon: Leaf,
    title: "Agritech Services Using AI & GIS",
    description: "Developing intelligent platforms for precision farming by integrating AI and Geographic Information Systems.",
    num: "02",
  },
  {
    icon: Cloud,
    title: "Cloud Services",
    description: "24/7 managed services with scalable, compliance-ready infrastructure and CI/CD pipelines across AWS, Azure, and GCP.",
    num: "03",
  },
  {
    icon: Database,
    title: "Data Engineering",
    description: "Scalable batch and real-time data pipelines, ETL processes, data lakes and warehouses with automation for data quality.",
    num: "04",
  },
  {
    icon: Users,
    title: "Staff Outsourcing",
    description: "On-demand developers, AI engineers, and data scientists, with fully managed outsourced teams across industries.",
    num: "05",
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description: "Custom models for classification, forecasting, and computer vision, including NLP solutions and MLOps pipelines.",
    num: "06",
  },
];

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-28 relative" ref={ref}>
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-[120px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-badge mx-auto mb-4">Our Services</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4">
            We care about your <span className="gradient-text">business</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Comprehensive technology solutions designed to accelerate your growth and digital transformation.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.num}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.6 }}
              className="service-card group relative overflow-hidden"
            >
              {/* Number watermark */}
              <span className="absolute top-4 right-6 text-6xl font-heading font-bold text-foreground/[0.03] group-hover:text-primary/10 transition-colors duration-500">
                {service.num}
              </span>

              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <service.icon size={22} className="text-primary" />
              </div>

              <h3 className="font-heading font-semibold text-lg mb-3 text-foreground">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
