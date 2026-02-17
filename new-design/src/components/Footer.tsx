import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-15 w-15 rounded-lg flex items-center justify-center font-heading font-bold text-primary-foreground text-sm">
              <img src={logo} alt="Logo" className="h-12 w-auto object-contain" />
            </div>
            <span className="font-heading text-xl font-bold text-foreground">
              Cloud9Space
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#home" className="hover:text-foreground transition-colors">Home</a>
            <a href="#about" className="hover:text-foreground transition-colors">About</a>
            <a href="#services" className="hover:text-foreground transition-colors">Services</a>
            <a href="#testimonials" className="hover:text-foreground transition-colors">Testimonials</a>
            <a href="#process" className="hover:text-foreground transition-colors">Process</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </div>

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Cloud9Space. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
