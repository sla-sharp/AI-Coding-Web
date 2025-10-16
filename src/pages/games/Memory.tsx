import { Link } from 'react-router-dom'
import './GamePage.css'

function Memory() {
  return (
    <div className="game-page">
      <div className="game-header">
        <Link to="/" className="back-button">← Back to Home</Link>
        <h1>🧠 Memory Game</h1>
        <p>Test your memory by matching pairs of cards!</p>
      </div>
      
      <div className="game-container">
        <div className="memory-game-board">
          {Array.from({ length: 16 }, (_, i) => (
            <div key={i} className="memory-card">
              <div className="card-front">?</div>
              <div className="card-back">🎮</div>
            </div>
          ))}
        </div>
        
        <div className="game-info">
          <h3>How to Play:</h3>
          <ul>
            <li>Click on cards to flip them over</li>
            <li>Try to find matching pairs</li>
            <li>Remember where each card is located</li>
            <li>Match all pairs to win!</li>
          </ul>
          
          <div className="score-board">
            <h4>Moves: 0</h4>
            <h4>Pairs Found: 0/8</h4>
            <button className="restart-button">Restart Game</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Memory