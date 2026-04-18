import React, { useEffect, useState } from 'react';
import './Contact.css';

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

// Contact cards data
const contactCards = [
  {
    type: 'email',
    icon: 'fa-envelope',
    title: 'Email Us',
    content: 'info@taxlegal.in',
    link: 'mailto:info@taxlegal.in',
    buttonText: 'Send Email'
  },
  {
    type: 'call',
    icon: 'fa-phone-alt',
    title: 'Call Us',
    content: '+91-9819705068 / +91-9869005068',
    link: 'tel:+919819705068',
    buttonText: 'Click to Call'
  },
  {
    type: 'visit',
    icon: 'fa-map-marker-alt',
    title: 'Visit Us',
    content: '401-404, Prabhat Center,\nCBD-Belapur, Navi Mumbai - 400614, India',
    link: 'https://maps.google.com?q=401-404,PrabhatCenter,CBD-Belapur,NaviMumbai',
    buttonText: 'Get Directions',
    isExternal: true
  }
];

const Contact = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  // Scroll reveal animation
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');

    const handleScroll = () => {
      reveals.forEach((el) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
          el.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    // Trigger on load
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleCardAction = (link, isExternal) => {
    if (isExternal) {
      window.open(link, '_blank');
    } else {
      window.location.href = link;
    }
  };

  return (
    <div className="contact-page">
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
      <header className="contact-header">
        <div className="contact-header-container">
          <div className="contact-header-content">
            {/* Logo */}
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="contact-logo-link">
              <img
                src="assets/images/team/logo.png"
                alt="TaxLegal Logo"
                className="contact-logo-img"
              />
            </a>

            {/* Navigation */}
            <nav className="contact-nav">
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="contact-nav-link">Home</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('services'); }} className="contact-nav-link">Services</a>
               <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('about'); }} className="contact-nav-link">About Us</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('blog'); }} className="contact-nav-link">Blog</a>
              <a
                href="https://www.incometaxindia.gov.in/income-tax-calculator"
                target="_blank" rel="noopener noreferrer"
                className="contact-nav-link"
              >
                Tax Calculator
              </a>
              <a href="https://taxlegal.bitrix24.site/" target="_blank" rel="noopener noreferrer" className="contact-nav-link">
                Careers
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="contact-nav-link active">
                Contact Us
              </a>
            </nav>

            {/* Contact */}
            <div className="contact-header-info">
              <a href="tel:+919869005068" className="contact-header-link">
                +91-9869005068
              </a>
              <a href="mailto:info@taxlegal.in" className="contact-header-link">
                info@taxlegal.in
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="contact-hero-wrapper">
          <div className="contact-hero-content">
            <h1 className="contact-hero-heading">
              <span>Taxation & Legal Counsel</span>
              <i>Since 1996</i>
            </h1>
            <p className="contact-hero-text">
              Services are rendered in the areas of taxation and legal advisory, subject to applicable laws, regulations, and
              professional guidelines. Combining expertise with practical insight, we help businesses and institutions
              navigate complex compliance challenges.
            </p>
            <div className="contact-hero-cta">
              <button className="btn-premium">Schedule a Consultation</button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="contact-left reveal">
          <h2>Correspondence Details</h2>

          <div className="contact-container">
            {contactCards.map((card, index) => (
              <div key={index} className={`contact-card ${card.type}`}>
                <i className={`fas ${card.icon} icon`}></i>
                <div className="content">
                  <h4>{card.title}</h4>
                  <p>
                    {card.type === 'email' ? (
                      <a href={card.link}>{card.content}</a>
                    ) : card.type === 'call' ? (
                      <>
                        <a href="tel:+919819705068">+91-9819705068</a> / <a href="tel:+919869005068">+91-9869005068</a>
                      </>
                    ) : (
                      card.content.split('\n').map((line, i) => (
                        <React.Fragment key={i}>
                          {line}
                          {i < card.content.split('\n').length - 1 && <br />}
                        </React.Fragment>
                      ))
                    )}
                  </p>
                  <div className="actions">
                    <button onClick={() => handleCardAction(card.link, card.isExternal)}>
                      {card.buttonText}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="contact-right reveal">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="row">
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>

            <textarea
              name="message"
              placeholder="Briefly describe your requirements..."
              value={formData.message}
              onChange={handleInputChange}
            ></textarea>

            <button type="submit" className="btn-primary">Submit Request →</button>
          </form>
        </div>
      </section>

      {/* Map Section */}
      <section className="global-section">
        <div className="map">
          <div className="map-embed" aria-label="TaxLegal office map">
            <iframe
              title="TaxLegal - Prabhat Centre Annex, CBD Belapur"
              src="https://www.google.com/maps?q=Tax%20Legal%20Sharma%20%26%20Company%2C%20Prabhat%20Centre%20Annex%2C%20401-404%2C%20Sector%201A%2C%20CBD%20Belapur%2C%20Navi%20Mumbai%2C%20Maharashtra%20400614&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        <div className="global-text">
          {/* Footer */}
          <footer className="contact-footer">
            <div className="contact-footer-container">
              <div className="contact-footer-grid">
                <div className="contact-footer-column">
                  <h3>About TaxLegal</h3>
                  <p>Established in 1996, TaxLegal provides tax and legal services, offering solutions for businesses across India.</p>
                </div>

                <div className="contact-footer-column">
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

                <div className="contact-footer-column">
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

                <div className="contact-footer-column">
                  <h3><i className="fas fa-map-marker-alt"></i> Contact Info</h3>
                  <div className="contact-info-footer">
                    <div className="contact-item-footer">
                      <i className="fas fa-map-marker-alt"></i>
                      <div className="contact-details-footer">
                        <strong>Office Address</strong>
                        <span>
                          <a href="https://maps.google.com?q=401-404,PrabhatCenter,CBD-Belapur,NaviMumbai-400614" target="_blank" rel="noopener noreferrer">
                            401-404, Prabhat Center, CBD-Belapur, Navi Mumbai - 400614
                          </a>
                        </span>
                      </div>
                    </div>
                    <div className="contact-item-footer">
                      <i className="fas fa-phone"></i>
                      <div className="contact-details-footer">
                        <strong>Call Us</strong>
                        <span>
                          <a href="tel:+919819705068">+91-9819705068</a> / <a href="tel:+919869005068">+91-9869005068</a>
                        </span>
                      </div>
                    </div>
                    <div className="contact-item-footer">
                      <i className="fas fa-envelope"></i>
                      <div className="contact-details-footer">
                        <strong>Email Us</strong>
                        <span><a href="mailto:info@taxlegal.in">info@taxlegal.in</a></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-footer-bottom">
                <div className="contact-footer-bottom-content">
                  <div className="contact-footer-copyright">
                    <p>&copy; 2024 TaxLegal. All rights reserved.</p>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
};

export default Contact;
