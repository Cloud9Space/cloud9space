import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyChoose from "@/components/WhyChoose";
import Testimonials from "@/components/Testimonials";
import Process from "@/components/Process";
import CTABanner from "@/components/CTABanner";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <WhyChoose />
      <Testimonials />
      <Process />
      <CTABanner />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
