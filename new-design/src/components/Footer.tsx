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
            From startup to Big 4 — your trusted technology partner
            {/* <a href="home" className="hover:text-foreground transition-colors">Home</a>
            <a href="about" className="hover:text-foreground transition-colors">About</a>
            <a href="services" className="hover:text-foreground transition-colors">Services</a>
            <a href="testimonials" className="hover:text-foreground transition-colors">Testimonials</a>
            <a href="process" className="hover:text-foreground transition-colors">Process</a>
            <a href="contact" className="hover:text-foreground transition-colors">Contact</a> */}
          </div>

          <div className="flex items-center gap-4">
            
            <a href="https://in.linkedin.com/company/cloud9space"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors duration-300"
              aria-label="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Cloud9Space. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;