import { Link } from 'react-router-dom';
import './Page.css';

function Contact() {
  return (
    <div className="page">
      <nav className="page-nav">
        <Link to="/" className="back-link">← Back to Home</Link>
      </nav>
      
      <header className="page-header">
        <h1>Contact Us</h1>
      </header>

      <section className="page-content">
        <p>
          We'd love to hear from you! Get in touch with us for any inquiries,
          questions, or collaboration opportunities.
        </p>

        <div className="contact-info">
          <div className="contact-item">
            <h3>Email</h3>
            <p>info@example.com</p>
          </div>

          <div className="contact-item">
            <h3>Phone</h3>
            <p>+1 (555) 123-4567</p>
          </div>

          <div className="contact-item">
            <h3>Address</h3>
            <p>
              123 Web Street<br />
              Tech City, TC 12345<br />
              United States
            </p>
          </div>

          <div className="contact-item">
            <h3>Business Hours</h3>
            <p>
              Monday - Friday: 9:00 AM - 6:00 PM<br />
              Saturday - Sunday: Closed
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
