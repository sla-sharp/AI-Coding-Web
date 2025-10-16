import { Link } from 'react-router-dom'
import './Home.css'

const games = [
  {
    id: 'dvd-screensaver',
    title: 'DVD Screensaver',
    description: 'Classic bouncing DVD logo! Watch it hit the corners!',
    emoji: '📺',
    path: '/games/dvd-screensaver'
  },
  {
    id: 'snake',
    title: 'Snake Game',
    description: 'Control the snake to eat food and grow longer!',
    emoji: '🐍',
    path: '/games/snake'
  },
  {
    id: 'memory',
    title: 'Memory Game',
    description: 'Test your memory by matching pairs of cards!',
    emoji: '🧠',
    path: '/games/memory'
  },
  {
    id: 'puzzle',
    title: 'Sliding Puzzle',
    description: 'Rearrange the tiles to complete the picture!',
    emoji: '🧩',
    path: '/games/puzzle'
  },
  {
    id: 'quiz',
    title: 'Quiz Game',
    description: 'Test your knowledge with fun trivia questions!',
    emoji: '❓',
    path: '/games/quiz'
  }
]

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <h1>Welcome to AI Coding Web</h1>
        <p>A collection of fun mini games built with React and TypeScript</p>
      </div>
      
      <section className="games-section">
        <h2>Choose Your Game</h2>
        <div className="games-grid">
          {games.map((game) => (
            <Link to={game.path} key={game.id} className="game-card">
              <div className="game-emoji">{game.emoji}</div>
              <h3>{game.title}</h3>
              <p>{game.description}</p>
              <span className="play-button">Play Now →</span>
            </Link>
          ))}
        </div>
      </section>
      
      <section className="features">
        <h2>Features</h2>
        <div className="features-grid">
          <div className="feature">
            <h3>🎮 Multiple Games</h3>
            <p>Choose from a variety of classic and modern mini games</p>
          </div>
          <div className="feature">
            <h3>⚡ Fast & Responsive</h3>
            <p>Built with React and TypeScript for optimal performance</p>
          </div>
          <div className="feature">
            <h3>📱 Mobile Friendly</h3>
            <p>Play on any device with responsive design</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home