import React, { useEffect, useRef } from 'react';
import './About.css';

// Team members data
const teamMembers = [
  {
    name: 'Adv. Suresh Sharma',
    role: 'IT & GST TAXATION MATTERS\nGST ARREST & COURT CASES',
    image: 'assets/images/team/image.png',
    alt: 'professional portrait of senior advocate Suresh Sharma in a formal suit against a dark grey background'
  },
  {
    name: 'Adv. Santosh Shukla',
    role: 'ADR | MARITIME MATTERS | INSURANCE\nCONSUMER | SOCIETY MATTERS',
    image: 'assets/images/team/santosh-sir.png',
    alt: 'professional headshot of Adv. Santosh Shukla looking confident in a tailored blazer'
  },
  {
    name: 'Adv. Varun Sharma',
    role: 'DIRECT & INDIRECT TAX EXPERT',
    image: 'assets/images/team/varun-sharma.png',
    alt: 'portrait of a young professional advocate Varun Sharma with a modern executive look'
  },
  {
    name: 'Sanjay Dhadich',
    role: 'CS CORPORATE LAWS | FOREIGN EXCHANGE LAWS | COMPANY FORMATION | ROC MATTER',
    image: 'assets/images/team/sanjay.jpg',
    alt: 'professional portrait of Sanjay Dhadich, an expert in legal audit and compliance'
  },
  {
    name: 'CA Narendra Rajput',
    role: 'CHARTERED ACCOUNTANT - INCOME TAX AND AUDIT',
    image: 'assets/images/team/narendra.jpg',
    alt: 'professional portrait of CA Narendra Rajput with a technical and trustworthy demeanor'
  }
];

// Values data
const values = [
  {
    icon: 'fa-scale-balanced',
    title: 'Integrity',
    description: 'Professional ethics and principled conduct in every engagement.'
  },
  {
    icon: 'fa-handshake',
    title: 'Transparency',
    description: 'Clear communication, structured process, and informed guidance.'
  },
  {
    icon: 'fa-shield-halved',
    title: 'Excellence',
    description: 'Precision, discipline, and consistency in legal and tax work.'
  },
  {
    icon: 'fa-compass',
    title: 'Client Focus',
    description: "Solutions aligned with the client's context and objectives."
  }
];

// Services links
const services = [
  'Startup Company Formation',
  'Registration Services',
  'Accounts & Audit',
  'Direct Taxation'
];

// Quick links
const quickLinks = [
  { name: 'Home', page: 'home' },
  { name: 'About Us', page: 'about' },
  { name: 'Services', page: 'services' },
  { name: 'Blog', page: 'blog' },
  { name: 'Contact', page: 'contact' },
  { name: 'Careers', href: 'https://taxlegal.bitrix24.site/', external: true }
];

const About = ({ onNavigate }) => {
  const parallaxRef = useRef(null);
  const observerRef = useRef(null);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        parallaxRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll animations with Intersection Observer
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            entry.target.classList.add('slide-in-left');
            entry.target.classList.add('slide-in-right');
            entry.target.classList.add('zoom-in');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
      '.reveal, .about-text, .about-image, .mission-box, .value-card'
    );
    animatedElements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <div className="about-page">
      {/* Vertical Social Media Sidebar */}
      <div className="social-sidebar">
        <a href="#" className="social-icon-sidebar" aria-label="LinkedIn">
          <i className="fab fa-linkedin-in"></i>
        </a>
        <a href="#" className="social-icon-sidebar" aria-label="Facebook">
          <i className="fab fa-facebook-f"></i>
        </a>
        <a href="#" className="social-icon-sidebar" aria-label="Twitter">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="#" className="social-icon-sidebar" aria-label="Instagram">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="#" className="social-icon-sidebar" aria-label="YouTube">
          <i className="fab fa-youtube"></i>
        </a>
      </div>

      {/* Top Navigation */}
      <header className="sticky-header">
        <div className="header-container">
          <div className="header-content">
            {/* Logo */}
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="logo-link">
              <img
                src="assets/images/team/logo.png"
                alt="TaxLegal Logo"
                className="logo-img"
              />
            </a>

            {/* Navigation */}
            <nav className="main-nav">
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="nav-link">Home</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('services'); }} className="nav-link">Services</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('about'); }} className="nav-link active">About Us</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('blog'); }} className="nav-link">Blog</a>
              <a
                href="https://www.incometaxindia.gov.in/income-tax-calculator"
                className="nav-link"
              >
                Tax Calculator
              </a>
              <a href="https://taxlegal.bitrix24.site/" target="_blank" rel="noopener noreferrer" className="nav-link">
                Careers
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="nav-link">
                Contact Us
              </a>
            </nav>

            {/* Contact */}
            <div className="header-contact">
              <a href="tel:+919869005068" className="contact-link">
                +91-9869005068
              </a>
              <a href="mailto:info@taxlegal.in" className="contact-link">
                info@taxlegal.in
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="parallax-bg">
          <img
            ref={parallaxRef}
            className="parallax-img"
            src="assets/images/team/banner-about.jpg"
            alt="Modern law firm office interior with high ceilings, glass walls, and professional wooden architectural details in soft natural light"
          />
          <div className="hero-overlay"></div>
          <div className="hero-gradient"></div>
        </div>
        <div className="hero-content">
          <div className="hero-text-container">
            <h1 className="hero-title">
              Precision
              <span className="hero-amp">&</span>{' '}
              <span className="hero-expertise">Expertise</span>.
            </h1>
            <p className="hero-description">
              For informational purposes, our team provides professional tax and
              legal insights, assisting with regulatory and compliance matters in
              accordance with applicable laws and ethical standards.
            </p>
          </div>
        </div>
      </section>

      {/* Main About Section */}
      <section className="about-section">
        <div className="container">
          <div className="about-grid">
            {/* Left - Text Content */}
            <div className="about-text-wrapper">
              <div className="about-text reveal">
                <h2 className="section-title">
                  Precision & Expertise in Tax and Legal Advisory
                </h2>

                <p>
                  Tax Legal is a professional advisory practice with experience
                  spanning over three decades in taxation and legal services.
                  Our work combines technical interpretation with practical
                  application across diverse business and regulatory
                  environments.
                </p>

                <p>
                  <strong>Chartered Accountants (CAs):</strong>
                  Handling accounting, financial reporting support, audit
                  assistance, and taxation assignments in accordance with
                  applicable statutory provisions.
                </p>

                <p>
                  <strong>Company Secretaries (CS):</strong>
                  Undertaking corporate regulatory compliances, statutory
                  filings, and governance-related matters as prescribed under
                  applicable laws.
                </p>

                <p>
                  <strong>Advocates:</strong>
                  Advising and representing clients in taxation and related
                  proceedings before appropriate authorities, subject to
                  applicable professional regulations.
                </p>

                <p>
                  All engagements are undertaken in accordance with applicable
                  laws, ethical standards, and the professional regulations
                  governing the respective disciplines. The information provided
                  herein is for general informational purposes only and does not
                  constitute legal advice or solicitation.
                </p>
              </div>
            </div>

            {/* Right - Image */}
            <div className="about-image-wrapper">
              <div className="about-image reveal">
                <img
                  src="assets/images/image.png"
                  alt="About TaxLegal - Professional Tax and Legal Services"
                />
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="values-section">
            <div className="values-container">
              <h3 className="values-heading">Our Values</h3>
              <div className="values-grid">
                {values.map((value, index) => (
                  <div key={index} className="value-card reveal">
                    <i className={`fa-solid ${value.icon}`}></i>
                    <h4>{value.title}</h4>
                    <p>{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Full Width Vision Section */}
          <div className="vision-section-full">
            <div className="vision-image-full">
              <img
                src="assets/images/team/hand-shake.png"
                alt="TaxLegal Team"
              />
              <div className="vision-overlay-full">
                <h3>Our mission</h3>
                <p>
                  <strong>
                    Professional integrity is not a PROMISE
                    <br />
                    it is a DISCIPLINE.
                  </strong>
                </p>
                <p>
                  Compliance reduces disputes; precision resolves them. In tax
                  litigation, facts defend what strategy presents.
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <section className="team-section-home">
            <div className="team-container">
              <div className="team-header-home">
                <h2 className="team-main-title">Experienced Panel of Experts.</h2>
                <p className="team-subtitle">
                  A collective of senior advocates and chartered accountants
                  dedicated to sovereign excellence.
                </p>
              </div>
              <div className="team-grid-home">
                {teamMembers.map((member, index) => (
                  <div key={index} className="team-card-home">
                    <div className="team-media-home">
                      <img
                        src={member.image}
                        alt={member.alt}
                        className="team-img-home"
                      />
                    </div>
                    <div className="team-info-home">
                      <h4>{member.name}</h4>
                      <p className="team-role-home">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Reach Box */}
          <div className="reach-box">
            <h3>Reach Us</h3>
            <p>401-404, Prabhat Center, CBD-Belapur, Navi Mumbai - 400614</p>
            <p>+91-9819705068 / +91-9869005068</p>
            <p>info@taxlegal.in / ss_tax@yahoo.com</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-grid">
            {/* About Column */}
            <div className="footer-column">
              <h3>About TaxLegal</h3>
              <p>
                Established in 1996, TaxLegal provides tax and legal services,
                offering solutions for businesses across India.
              </p>
            </div>

            {/* Services Column */}
            <div className="footer-column">
              <h3>
                <i className="fas fa-cogs"></i> Our Services
              </h3>
              <ul>
                {services.map((service, index) => (
                  <li key={index}>
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('services'); }}>
                      <i className="fas fa-chevron-right"></i> {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links Column */}
            <div className="footer-column">
              <h3>
                <i className="fas fa-link"></i> Quick Links
              </h3>
              <ul>
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    {link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        <i className="fas fa-chevron-right"></i> {link.name}
                      </a>
                    ) : (
                      <a href="#" onClick={(e) => { e.preventDefault(); onNavigate(link.page); }}>
                        <i className="fas fa-chevron-right"></i> {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info Column */}
            <div className="footer-column">
              <h3>
                <i className="fas fa-map-marker-alt"></i> Contact Info
              </h3>
              <div className="contact-info">
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <div className="contact-details">
                    <strong>Office Address</strong>
                    <span>
                      <a
                        href="https://maps.google.com?q=401-404,PrabhatCenter,CBD-Belapur,NaviMumbai-400614"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        401-404, Prabhat Center, CBD-Belapur, Navi Mumbai -
                        400614
                      </a>
                    </span>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <div className="contact-details">
                    <strong>Call Us</strong>
                    <span>
                      <a href="tel:+919819705068">+91-9819705068</a> /{' '}
                      <a href="tel:+919869005068">+91-9869005068</a>
                    </span>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <div className="contact-details">
                    <strong>Email Us</strong>
                    <span>
                      <a href="mailto:info@taxlegal.in">info@taxlegal.in</a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="footer-copyright">
              <p>&copy; 2024 TaxLegal. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;
