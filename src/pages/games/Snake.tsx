import { Link } from 'react-router-dom'
import './GamePage.css'

function Snake() {
  return (
    <div className="game-page">
      <div className="game-header">
        <Link to="/" className="back-button">← Back to Home</Link>
        <h1>🐍 Snake Game</h1>
        <p>Control the snake to eat food and grow longer!</p>
      </div>
      
      <div className="game-container">
        <div className="snake-game-board">
          <div className="game-canvas">
            <p>Game canvas will be implemented here</p>
            <p>Use arrow keys to control the snake</p>
          </div>
        </div>
        
        <div className="game-info">
          <h3>How to Play:</h3>
          <ul>
            <li>Use arrow keys to control the snake</li>
            <li>Eat the red food to grow longer</li>
            <li>Avoid hitting the walls or yourself</li>
            <li>Try to get the highest score!</li>
          </ul>
          
          <div className="score-board">
            <h4>Score: 0</h4>
            <h4>High Score: 0</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Snake