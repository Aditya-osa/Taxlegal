import React, { useEffect, useRef } from 'react';
import './Services.css';

// Services data
const servicesData = [
  {
    icon: 'assets/icons/Tax-litigation.png',
    title: 'Tax Litigation',
    subtitle: 'Direct & Indirect Tax Expert',
    items: ['Income Tax', 'GST', 'MVAT / P.T. (Professional Tax)', 'Service Tax & LBT (Local Body Tax)', 'EOW / Arbitration', 'Cyber Fraud']
  },
  {
    icon: 'assets/icons/audit.png',
    title: 'Accounts & Audit Support',
    subtitle: 'Structured accounting support with a focus on statutory readiness and accuracy.',
    items: ['Accounts Outsourcing', 'Maintain Complete Computerized Accounting', 'Ensure Statutory & Tax Compliances as per Government Norms']
  },
  {
    icon: 'assets/icons/Startup-company.png',
    title: 'Startup Company Formation',
    subtitle: 'Ideal for founders, new ventures and expanding firms that need a compliant start.',
    items: ['Proprietorship Registration', 'Partnership Firm Registration', 'LLP Registration under Companies Act', 'Nidhi Company Registration', 'Producer Company Registration', 'Trust Registration under Section 8 Company Registration Act']
  },
  {
    icon: 'assets/icons/registration.png',
    title: 'Registration Services',
    subtitle: 'Streamlined setup for statutory and business registrations across major requirements.',
    items: ['MSME Registration', 'TAN Registration', 'GST Registration', 'FSSAI Registration', 'Import Export Code', 'Digital signature', 'Udyog Aadhar', 'Trade Licenses']
  },
  {
    icon: 'assets/icons/tax.png',
    title: 'Direct Taxation',
    subtitle: 'End-to-end support for tax compliance, returns and notice-based responses.',
    items: ['Income Tax', 'TAN Number Registration', 'Filling of Returns of Income Tax, TDS', 'Assessment & Audit', 'Liaisoning with Government Authorities', 'Capital Gain']
  },
  {
    icon: 'assets/icons/tax-return.png',
    title: 'Indirect Taxation',
    subtitle: 'GST and indirect tax services designed for operational clarity and lower compliance friction.',
    items: ['GST', 'Pre-Implementation Support', 'Impact Analysis', 'Enrolment & Registration', 'Returns and Payments', 'Advisory and Consultancy', 'Opinion on Laws', 'GST Audit', 'Assessments']
  },
  {
    icon: 'assets/icons/Corporate-Compliance.png',
    title: 'Corporate Compliance',
    subtitle: 'Consistent support for company-level statutory and governance-related updates.',
    items: ['Register office changes', 'Add Director', 'Remove Director', 'Increase Authorised capital', 'Share Transfer', 'MOA Amendment', 'Winding up company', 'Winding up LLP']
  },
  {
    icon: 'assets/icons/payroll.png',
    title: 'Payroll Compliance',
    subtitle: 'Compliance support for salary-linked registrations and statutory return processes.',
    items: ['Payroll advisory support', 'PF Registration', 'PF Return filing', 'ESIC Registration', 'ESIC Return filing']
  }
];

// Process steps data
const processSteps = [
  {
    number: '01',
    title: 'Understanding Requirements',
    description: 'Initial understanding of the matter based on information and documents provided.'
  },
  {
    number: '02',
    title: 'Review & Assessment',
    description: 'Evaluation of applicable legal and tax provisions, along with procedural requirements.'
  },
  {
    number: '03',
    title: 'Engagement & Representation',
    description: 'Assistance in documentation, filings, and representation before appropriate authorities, where required.'
  },
  {
    number: '04',
    title: 'Ongoing Support',
    description: 'Continued assistance in compliance, follow-ups, and related proceedings.'
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

const Services = ({ onNavigate }) => {
  const observerRef = useRef(null);

  useEffect(() => {
    // Scroll reveal animation with Intersection Observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const revealItems = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    revealItems.forEach((item) => observerRef.current?.observe(item));

    return () => observerRef.current?.disconnect();
  }, []);

  // Header scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById('siteHeader');
      if (header) {
        if (window.scrollY > 20) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="services-page">
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
      <header id="siteHeader" className="services-header">
        <div className="services-header-container">
          <div className="services-header-content">
            {/* Logo */}
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="services-logo-link">
              <img
                src="assets/images/team/logo.png"
                alt="TaxLegal Logo"
                className="services-logo-img"
              />
            </a>

            {/* Navigation */}
            <nav className="services-nav">
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="services-nav-link">Home</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('services'); }} className="services-nav-link active">Services</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('about'); }} className="services-nav-link">About Us</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('blog'); }} className="services-nav-link">Blog</a>
              <a
                href="https://www.incometaxindia.gov.in/income-tax-calculator"
                target="_blank" rel="noopener noreferrer"
                className="services-nav-link"
              >
                Tax Calculator
              </a>
              <a href="https://taxlegal.bitrix24.site/" target="_blank" rel="noopener noreferrer" className="services-nav-link">Careers</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="services-nav-link">Contact Us</a>
            </nav>

            {/* Contact */}
            <div className="services-header-contact">
              <a href="tel:+919869005068" className="services-contact-link">
                +91-9869005068
              </a>
              <a href="mailto:info@taxlegal.in" className="services-contact-link">
                info@taxlegal.in
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="services-hero">
          <div className="services-hero-container">
            <div className="services-hero-content">
              <h2 className="reveal stagger-1">
                Our Practice Areas.
                <span>Comprehensive Solutions.</span>
                Expert Guidance.
              </h2>
              <p className="reveal stagger-2">
                With over two decades of experience, TaxLegal provides comprehensive solutions across taxation, regulatory
                compliance, and legal matters. Our expert team delivers structured, well-considered, and legally sound
                solutions tailored to your business needs.
              </p>
              <div className="services-hero-actions reveal stagger-3">
                <a href="#services" className="services-btn services-btn-primary">Explore Services</a>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="services-section">
          <div className="services-section-container">
            <div className="services-section-head">
              <div>
                <span className="services-section-title">Practice Areas</span>
                <div className="services-section-subtitle reveal-left stagger-2">
                  A redesigned services experience with clarity, hierarchy and motion.
                </div>
              </div>
            </div>

            <div className="services-grid">
              {servicesData.map((service, index) => (
                <article key={index} className={`service-card reveal stagger-${(index % 3) + 1}`}>
                  <div className="service-icon">
                    <img src={service.icon} alt={service.title} className="service-icon-img" />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.subtitle}</p>
                  <ul className="service-list">
                    {service.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Visual Spacer */}
        <div className="section-spacer"></div>

        {/* Process Section */}
        <section id="process" className="process-section">
          <div className="services-section-container">
            <div className="services-section-head">
              <div>
                <span className="process-section-title">How We Work</span>
                <div className="process-section-subtitle reveal-left stagger-2">
                  A simple, high-trust process that feels professional from the first click.
                </div>
              </div>
            </div>

            <div className="process-grid">
              <div className="process-panel reveal-left">
                <h3>Professional Standards</h3>
                <div className="section-line"></div>
                <p>
                  The practice adheres to applicable professional standards, ethical obligations,
                  and regulatory requirements.
                  All matters are handled with due regard to confidentiality
                  and in accordance with established legal and procedural frameworks.
                </p>
              </div>

              <div className="process-steps reveal-right">
                {processSteps.map((step, index) => (
                  <div key={index} className="step">
                    <div className="step-no">{step.number}</div>
                    <div>
                      <h4>{step.title}</h4>
                      <p>{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Premium Footer */}
      <footer className="services-footer">
        <div className="services-footer-container">
          <div className="services-footer-grid">
            <div className="services-footer-column">
              <h3>About TaxLegal</h3>
              <p>Established in 1996, TaxLegal provides tax and legal services, offering solutions for businesses across India.</p>
            </div>

            <div className="services-footer-column">
              <h3><i className="fas fa-cogs"></i> Our Services</h3>
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

            <div className="services-footer-column">
              <h3><i className="fas fa-link"></i> Quick Links</h3>
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

            <div className="services-footer-column">
              <h3><i className="fas fa-map-marker-alt"></i> Contact Info</h3>
              <div className="contact-info-services">
                <div className="contact-item-services">
                  <i className="fas fa-map-marker-alt"></i>
                  <div className="contact-details-services">
                    <strong>Office Address</strong>
                    <span>
                      <a href="https://maps.google.com?q=401-404,PrabhatCenter,CBD-Belapur,NaviMumbai-400614" target="_blank" rel="noopener noreferrer">
                        401-404, Prabhat Center, CBD-Belapur, Navi Mumbai - 400614
                      </a>
                    </span>
                  </div>
                </div>
                <div className="contact-item-services">
                  <i className="fas fa-phone"></i>
                  <div className="contact-details-services">
                    <strong>Call Us</strong>
                    <span>
                      <a href="tel:+919819705068">+91-9819705068</a> / <a href="tel:+919869005068">+91-9869005068</a>
                    </span>
                  </div>
                </div>
                <div className="contact-item-services">
                  <i className="fas fa-envelope"></i>
                  <div className="contact-details-services">
                    <strong>Email Us</strong>
                    <span><a href="mailto:info@taxlegal.in">info@taxlegal.in</a></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="services-footer-bottom">
            <div className="services-footer-bottom-content">
              <div className="services-footer-copyright">
                <p>&copy; 2024 TaxLegal. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Services;
