import { Link } from 'react-router-dom'
import './GamePage.css'

function TicTacToe() {
  return (
    <div className="game-page">
      <div className="game-header">
        <Link to="/" className="back-button">← Back to Home</Link>
        <h1>🎯 Tic Tac Toe</h1>
        <p>Classic 3x3 grid game. Get three in a row to win!</p>
      </div>
      
      <div className="game-container">
        <div className="tic-tac-toe-board">
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} className="tic-tac-toe-cell">
              {/* Game logic will be implemented here */}
            </div>
          ))}
        </div>
        
        <div className="game-info">
          <h3>How to Play:</h3>
          <ul>
            <li>Click on any empty cell to place your mark</li>
            <li>Get three of your marks in a row to win</li>
            <li>Rows can be horizontal, vertical, or diagonal</li>
            <li>Game ends in a tie if all cells are filled</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TicTacToe