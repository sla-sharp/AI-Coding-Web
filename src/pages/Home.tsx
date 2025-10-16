import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <header className="home-header">
        <h1>Welcome to Our Web App</h1>
        <p className="tagline">Building amazing experiences with React + TypeScript</p>
      </header>

      <nav className="home-nav">
        <h2>Explore Our Pages</h2>
        <div className="nav-links">
          <Link to="/about" className="nav-card">
            <h3>About Us</h3>
            <p>Learn more about our mission and team</p>
          </Link>
          <Link to="/services" className="nav-card">
            <h3>Services</h3>
            <p>Discover what we offer</p>
          </Link>
          <Link to="/contact" className="nav-card">
            <h3>Contact</h3>
            <p>Get in touch with us</p>
          </Link>
        </div>
      </nav>

      <section className="home-content">
        <h2>About This App</h2>
        <p>
          This is a modern web application built with React and TypeScript,
          featuring a clean landing page and multiple sub-pages for easy navigation.
        </p>
      </section>
    </div>
  );
}

export default Home;
