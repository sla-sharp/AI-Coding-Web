import { Link } from 'react-router-dom'
import './GamePage.css'

function Puzzle() {
  return (
    <div className="game-page">
      <div className="game-header">
        <Link to="/" className="back-button">← Back to Home</Link>
        <h1>🧩 Sliding Puzzle</h1>
        <p>Rearrange the tiles to complete the picture!</p>
      </div>
      
      <div className="game-container">
        <div className="puzzle-game-board">
          {Array.from({ length: 15 }, (_, i) => (
            <div key={i} className="puzzle-tile">
              {i + 1}
            </div>
          ))}
          <div className="puzzle-tile empty"></div>
        </div>
        
        <div className="game-info">
          <h3>How to Play:</h3>
          <ul>
            <li>Click on tiles adjacent to the empty space</li>
            <li>Arrange tiles in numerical order (1-15)</li>
            <li>The empty space should be in the bottom right</li>
            <li>Complete the puzzle as quickly as possible!</li>
          </ul>
          
          <div className="score-board">
            <h4>Moves: 0</h4>
            <h4>Time: 00:00</h4>
            <button className="shuffle-button">Shuffle</button>
            <button className="restart-button">Restart</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Puzzle