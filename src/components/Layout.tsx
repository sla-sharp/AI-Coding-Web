import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import './Layout.css'

interface LayoutProps {
  children: ReactNode
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <header className="header">
        <nav className="nav">
          <Link to="/" className="logo">
            🎮 AI Coding Web
          </Link>
          <div className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <div className="dropdown">
              <span className="nav-link">Games ▼</span>
              <div className="dropdown-content">
                <Link to="/games/dvd-screensaver">DVD Screensaver</Link>
                <Link to="/games/snake">Snake</Link>
                <Link to="/games/memory">Memory Game</Link>
                <Link to="/games/puzzle">Puzzle</Link>
                <Link to="/games/quiz">Quiz</Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
      
      <main className="main">
        {children}
      </main>
      
      <footer className="footer">
        <p>&copy; 2025 AI Coding Web - Mini Games Collection</p>
      </footer>
    </div>
  )
}

export default Layout