import { Link } from 'react-router-dom';
import './Page.css';

function About() {
  return (
    <div className="page">
      <nav className="page-nav">
        <Link to="/" className="back-link">← Back to Home</Link>
      </nav>
      
      <header className="page-header">
        <h1>About Us</h1>
      </header>

      <section className="page-content">
        <p>
          We are passionate about creating innovative web solutions using cutting-edge
          technologies like React and TypeScript.
        </p>
        <p>
          Our team is dedicated to delivering high-quality, user-friendly applications
          that meet the needs of modern businesses and users.
        </p>

        <h2>Our Mission</h2>
        <p>
          To empower businesses and individuals through technology, creating seamless
          digital experiences that drive growth and success.
        </p>

        <h2>Our Values</h2>
        <ul>
          <li>Innovation and creativity</li>
          <li>Quality and excellence</li>
          <li>User-centric design</li>
          <li>Continuous improvement</li>
        </ul>
      </section>
    </div>
  );
}

export default About;
