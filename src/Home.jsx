import React, { useState, useEffect } from 'react';
import './Home.css';

// Team members data
const teamMembers = [
  {
    name: 'Adv. Suresh Sharma',
    role: 'IT & GST Taxation Matters\nGST Arrest & Court Cases',
    image: 'assets/images/team/image.png',
    alt: 'professional portrait of senior advocate Suresh Sharma in a formal suit against a dark grey background'
  },
  {
    name: 'Adv. Santosh Shukla',
    role: 'ADR | Maritime Matters | Insurance\nConsumer | Society Matters',
    image: 'assets/images/team/santosh-sir.png',
    alt: 'professional headshot of Adv. Santosh Shukla looking confident in a tailored blazer'
  },
  {
    name: 'Adv. Varun Sharma',
    role: 'Direct and Indirect Tax Expert',
    image: 'assets/images/team/varun-sharma.png',
    alt: 'portrait of a young professional advocate Varun Sharma with a modern executive look'
  },
  {
    name: 'Sanjay Dhadich',
    role: 'CS Corporate Laws | Foreign Exchange Laws | Company Formation | ROC Matter',
    image: 'assets/images/team/sanjay.jpg',
    alt: 'professional portrait of Sanjay Dhadich, an expert in legal audit and compliance'
  },
  {
    name: 'CA Narendra Rajput',
    role: 'Chartered Accountant - Income Tax and Audit',
    image: 'assets/images/team/narendra.jpg',
    alt: 'professional portrait of CA Narendra Rajput with a technical and trustworthy demeanor'
  }
];

// Practice areas data
const practiceAreas = [
  {
    icon: 'receipt_long',
    title: 'Income Tax Matters',
    description: 'Tax Litigation, Appeals, Search and Seizure Cases, and comprehensive tax advisory services.'
  },
  {
    icon: 'gavel',
    title: 'GST Matters',
    description: 'GST Litigation, GST Criminal Court Cases, GST Arrest Matters, and GST compliance services.'
  },
  {
    icon: 'business',
    title: 'Corporate Compliance',
    description: 'NCLT Proceedings, Corporate Recovery, Company Formation, and ROC matters.'
  },
  {
    icon: 'rocket_launch',
    title: 'Startup Services',
    description: 'Complete startup solutions from incorporation to compliance for new businesses.'
  },
  {
    icon: 'app_registration',
    title: 'Registration Services',
    description: 'Company registration, GST registration, trademark registration and other statutory registrations.'
  },
  {
    icon: 'account_balance_wallet',
    title: 'Accounts & Audit',
    description: 'Comprehensive accounting services, statutory audits, and financial reporting.'
  },
  {
    icon: 'balance',
    title: 'Direct Taxation',
    description: 'Income tax planning, filing, appeals, and representation before tax authorities.'
  },
  {
    icon: 'receipt',
    title: 'Indirect Taxation',
    description: 'GST compliance, customs duty, service tax and other indirect tax matters.'
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

// Disclaimer points
const disclaimerPoints = [
  'You are seeking information about the firm of your own accord.',
  'No form of solicitation or advertising has been made by the firm or its members.',
  'Any information provided on this website, including articles, updates, or resources, is general in nature and must not be construed as legal advice.',
  'No lawyer–client relationship is created merely by accessing or using this website.',
  'The firm shall not be liable for any actions taken based on the material available on this website.',
  'You are advised to obtain independent legal advice for any specific legal issue.',
  'The content on this website is the intellectual property of the firm and any unauthorized use, reproduction, or distribution of the material is prohibited. By clicking "I Agree", you accept this disclaimer and the terms of use.'
];

const Home = ({ onNavigate }) => {
  const [showDisclaimer, setShowDisclaimer] = useState(true);

  useEffect(() => {
    // Check if disclaimer was already accepted
    const accepted = localStorage.getItem('disclaimerAccepted');
    if (accepted) {
      setShowDisclaimer(false);
    }
  }, []);

  const handleAcceptDisclaimer = () => {
    localStorage.setItem('disclaimerAccepted', 'true');
    setShowDisclaimer(false);
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showDisclaimer) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showDisclaimer]);

  return (
    <div className="home-page">
      {/* Disclaimer Modal */}
      {showDisclaimer && (
        <div className="disclaimer-modal" onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleAcceptDisclaimer();
          }
        }}>
          <div className="disclaimer-content">
            <div className="disclaimer-header">
              <h2>Disclaimer</h2>
            </div>
            <div className="disclaimer-body">
              <p className="disclaimer-intro">
                As mandated by the Bar Council of India, this website is intended solely for informational purposes and does not constitute solicitation, advertisement, personal communication, or inducement of any kind to engage legal services. By accessing this website, you acknowledge and confirm that:
              </p>
              <div className="disclaimer-points">
                {disclaimerPoints.map((point, index) => (
                  <p key={index}>{index + 1}. {point}</p>
                ))}
              </div>
            </div>
            <div className="disclaimer-footer">
              <button className="disclaimer-btn" onClick={handleAcceptDisclaimer}>
                I Agree
              </button>
            </div>
          </div>
        </div>
      )}

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
      <header className="home-header">
        <div className="header-container">
          <div className="header-content">
            {/* Logo */}
            <a onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="logo-link">
              <img
                src="assets/images/team/logo.png"
                alt="TaxLegal Logo"
                className="logo-img-header"
              />
            </a>

            {/* Navigation */}
            <nav className="main-nav">
              <a onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="nav-link active">Home</a>
              <a onClick={(e) => { e.preventDefault(); onNavigate('services'); }} className="nav-link">Services</a>
              <a onClick={(e) => { e.preventDefault(); onNavigate('about'); }} className="nav-link">About Us</a>
              <a onClick={(e) => { e.preventDefault(); onNavigate('blog'); }} className="nav-link">Blog</a>
              <a
                href="https://www.incometaxindia.gov.in/income-tax-calculator"
                target="_blank" rel="noopener noreferrer"
                className="nav-link"
              >
                Tax Calculator
              </a>
              <a
                href="https://taxlegal.bitrix24.site/"
                target="_blank" rel="noopener noreferrer"
                className="nav-link"
              >
                Careers
              </a>
              <a onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="nav-link">
                Contact Us
              </a>
            </nav>

            {/* Contact */}
            <div className="header-contact">
              <a href="tel:+919869005068" className="contact-link-header">
                +91-9869005068
              </a>
              <a href="mailto:info@taxlegal.in" className="contact-link-header">
                info@taxlegal.in
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero-section-home">
          <div 
            className="hero-parallax-bg"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 10, 30, 0.65), rgba(0, 10, 30, 0.65)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAaUoRTd2Vqh1s4khYCYtRY-CFNWdNGdpRFPqTJvOVHgr-sxWNld1wiB9yyJ-PZp3-cPZtshpV8-VAtv_9f9sx6MB1b-A0LnWmiMzE2DTo8fg0pQafMlcJrNTah__R_AmXZxRNLRmJKTZkq_MNdBjm-H4v1z__GbR84pazyVl3FlB8Gg2J2ENLSF98xy9xRjhbORd9G3r71EE_Edg-0G49w99o0zgpbogo4lV93vUHvxk2lDTtUczP90isK0krdNQM1bkfX2o2MWScm')`
            }}
          ></div>
          <div className="hero-content-home">
            <h1 className="hero-title-home">
              <span className="hero-title-line">Taxation & Legal Counsel</span>
              <span className="hero-title-since">Since 1996.</span>
            </h1>
            <p className="hero-description-home">
              We are a multidisciplinary advisory practice offering integrated solutions across taxation,
              regulatory, and legal frameworks.
            </p>
          </div>
        </section>

        {/* Who We Are Section */}
        <section className="who-we-are-section">
          <div className="who-we-are-container">
            <div className="who-we-are-grid">
              {/* Left - Text Content */}
              <div className="who-we-are-text">
                <h2 className="who-we-are-title">Who We Are</h2>
                <p className="who-we-are-paragraph">
                  Established in 1996, TaxLegal operates in accounts and taxation, with experience across Sales
                  Tax, VAT, and GST frameworks.
                </p>
                <p className="who-we-are-paragraph">
                  We provide services in formation, compliance, advisory, and litigation, including representation
                  before authorities, supporting businesses across sectors in their establishment and ongoing
                  regulatory requirements.
                </p>
                
                {/* Timeline */}
                <div className="timeline-container">
                  <div className="timeline-strip">
                    <div className="timeline-item">
                      <div className="icon-wrapper">
                        <i className="fas fa-landmark"></i>
                      </div>
                      <div className="content-box">
                        <span className="year">1996</span>
                        <span className="label">Established</span>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="icon-wrapper">
                        <i className="fas fa-file-invoice-dollar"></i>
                      </div>
                      <div className="content-box">
                        <span className="year">Pre-GST</span>
                        <span className="label">VAT / Service Tax</span>
                      </div>
                    </div>
                    <div className="timeline-item">
                      <div className="icon-wrapper">
                        <i className="fas fa-gavel"></i>
                      </div>
                      <div className="content-box">
                        <span className="year">Post-2017</span>
                        <span className="label">GST Practice</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right - Image */}
              <div className="who-we-are-image-wrapper">
                <div className="who-we-are-image">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuLAi4s9OPqSEHeicspjMUTXlvli80kdLHk21o9a2eFAcRMqW4USpLl7FRi8-eUuHkGB6E86F-jdM4k2UyqNdcm4VurVW7elZ0aAQRfeskpwW3jLR10r8Cua0E2zHyS13xhL2fvBXypmOMxiAXormor4SI8m5lku072D-BIjGSQz4vHxf11eCFGGpyMh_IetC7JDxzxV0E3s2IxJoMKQ7Ldajgwq1HfdgkFlzkqh2QSlnr0kzAFNHuSLe6NgWLg8Tjr7WfTWCi3Idk"
                    alt="Professional tax and legal advisory team working in modern office"
                  />
                </div>
                <div className="who-we-are-quote">
                  <p>"Structured Legal & Taxation Services."</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section-home">
          <div className="team-container">
            <div className="team-header-home">
              <h2 className="team-main-title">Experienced Panel of Experts.</h2>
              <p className="team-subtitle">
                A collective of senior advocates and chartered accountants dedicated to sovereign excellence.
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

        {/* Secondary Parallax Section */}
        <section className="parallax-break-section">
          <div 
            className="parallax-break-bg"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 10, 30, 0.7), rgba(0, 10, 30, 0.7)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuDWIC0yC4yw90YLAl3iYpldYe017PI-uOG3y8dKznZkit7CzMQeuaRcyinLcRvZRZQcpmvoFhX2eoSAQe0XnUFK4Oq3ULOQZZmewFLXk6KsCtLL-u56rDUYikIDL-gOnRparnPbH7h3hH0OmkJKSP3YukybHYP2cl7euF1qR-73f9BYthvPmZeCGlF2qgoAD0eOZ07XdWhIXug3cZ1OKuNxz9fnl8gP0ieLx-HSxZvhsyLF0yOHDFIm3o475MPdK9B7kQJq2L9FLm37')`
            }}
          ></div>
          <div className="parallax-break-content">
            <h2>Overview of Legal and Regulatory Areas</h2>
          </div>
        </section>

        {/* Practice Areas Grid */}
        <section className="practice-areas-section">
          <div className="practice-areas-container">
            <div className="practice-areas-header">
              <h2 className="practice-areas-title">Practice Areas</h2>
              <a href="#" className="view-all-link">
                View All <span className="material-symbols-outlined">arrow_forward</span>
              </a>
            </div>
            <div className="practice-areas-grid">
              {practiceAreas.map((area, index) => (
                <div key={index} className="practice-card">
                  <div className="practice-icon-wrapper">
                    <span className="material-symbols-outlined">{area.icon}</span>
                  </div>
                  <h3>{area.title}</h3>
                  <p>{area.description}</p>
                  <a href="#" className="read-more-link">
                    Read More <span className="material-symbols-outlined">arrow_forward</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div 
            className="cta-bg"
            style={{
              backgroundImage: `linear-gradient(rgba(183, 16, 50, 0.85), rgba(183, 16, 50, 0.85)), url('assets/images/team/back.png')`
            }}
          ></div>
          <div className="cta-content">
            <h2><i>Connect with TaxLegal</i></h2>
            <p>Reach Out for Information on our Tax and Legal Counsel Services.</p>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('contact'); }} className="cta-btn">
              Get in Touch
            </a>
          </div>
        </section>

        {/* Premium Footer */}
        <footer className="footer-home">
          <div className="footer-container">
            {/* Footer Top */}
            <div className="footer-top">
              <div className="footer-logo">
                <div className="footer-logo-main">TaxLegal</div>
                <div className="footer-logo-tag">Excellence Since 1996</div>
                <div className="footer-social">
                  <a href="#" className="social-icon-footer" aria-label="LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="#" className="social-icon-footer" aria-label="Facebook">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="social-icon-footer" aria-label="Twitter">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="social-icon-footer" aria-label="Instagram">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="footer-divider"></div>

            {/* Footer Grid */}
            <div className="footer-grid-home">
              {/* About Column */}
              <div className="footer-column-home">
                <h3>About TaxLegal</h3>
                <p>Established in 1996, TaxLegal provides tax and legal services, offering solutions for businesses across India.</p>
              </div>

              {/* Services Column */}
              <div className="footer-column-home">
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

              {/* Quick Links Column */}
              <div className="footer-column-home">
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

              {/* Contact Info Column */}
              <div className="footer-column-home">
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

            {/* Footer Bottom */}
            <div className="footer-bottom-home">
              <div className="footer-bottom-content">
                <div className="footer-copyright">
                  <p>&copy; 2024 TaxLegal. All rights reserved.</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Home;
