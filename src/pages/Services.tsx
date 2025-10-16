import { Link } from 'react-router-dom';
import './Page.css';

function Services() {
  return (
    <div className="page">
      <nav className="page-nav">
        <Link to="/" className="back-link">← Back to Home</Link>
      </nav>
      
      <header className="page-header">
        <h1>Our Services</h1>
      </header>

      <section className="page-content">
        <p>
          We offer a comprehensive range of web development services to help you
          achieve your digital goals.
        </p>

        <div className="services-grid">
          <div className="service-item">
            <h3>Web Development</h3>
            <p>
              Custom web applications built with modern frameworks like React,
              Vue, and Angular.
            </p>
          </div>

          <div className="service-item">
            <h3>TypeScript Solutions</h3>
            <p>
              Type-safe applications that are easier to maintain and scale,
              reducing bugs and improving developer experience.
            </p>
          </div>

          <div className="service-item">
            <h3>UI/UX Design</h3>
            <p>
              Beautiful, intuitive interfaces that provide excellent user
              experiences across all devices.
            </p>
          </div>

          <div className="service-item">
            <h3>Consulting</h3>
            <p>
              Expert guidance on technology choices, architecture decisions,
              and best practices.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;
