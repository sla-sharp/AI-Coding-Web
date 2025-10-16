import { Link } from 'react-router-dom'
import './GamePage.css'

function Quiz() {
  const sampleQuestion = {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correct: 2
  }

  return (
    <div className="game-page">
      <div className="game-header">
        <Link to="/" className="back-button">← Back to Home</Link>
        <h1>❓ Quiz Game</h1>
        <p>Test your knowledge with fun trivia questions!</p>
      </div>
      
      <div className="game-container">
        <div className="quiz-game-board">
          <div className="quiz-progress">
            <span>Question 1 of 10</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '10%' }}></div>
            </div>
          </div>
          
          <div className="quiz-question">
            <h3>{sampleQuestion.question}</h3>
          </div>
          
          <div className="quiz-options">
            {sampleQuestion.options.map((option, index) => (
              <button key={index} className="quiz-option">
                {String.fromCharCode(65 + index)}. {option}
              </button>
            ))}
          </div>
        </div>
        
        <div className="game-info">
          <h3>How to Play:</h3>
          <ul>
            <li>Read each question carefully</li>
            <li>Click on the answer you think is correct</li>
            <li>You'll get immediate feedback</li>
            <li>Try to get the highest score possible!</li>
          </ul>
          
          <div className="score-board">
            <h4>Score: 0/0</h4>
            <h4>Accuracy: 0%</h4>
            <button className="restart-button">Start New Quiz</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quiz