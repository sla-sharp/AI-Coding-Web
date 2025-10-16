import { Link } from 'react-router-dom'
import { useState } from 'react'
import './GamePage.css'

interface QuizQuestion {
  type: string
  difficulty: string
  category: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

interface QuizResponse {
  response_code: number
  results: QuizQuestion[]
}

interface ProcessedQuestion {
  question: string
  options: string[]
  correctIndex: number
  category: string
  difficulty: string
}

function Quiz() {
  const [questions, setQuestions] = useState<ProcessedQuestion[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isGameActive, setIsGameActive] = useState(false)
  const [loading, setLoading] = useState(false)
  const [answered, setAnswered] = useState(false)

  const decodeHTML = (text: string): string => {
    const textArea = document.createElement('textarea')
    textArea.innerHTML = text
    return textArea.value
  }

  const shuffleArray = (array: string[]): string[] => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const fetchQuestions = async () => {
    setLoading(true)
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=10&type=multiple')
      const data: QuizResponse = await response.json()
      
      if (data.response_code === 0) {
        const processedQuestions: ProcessedQuestion[] = data.results.map(q => {
          const allOptions = [q.correct_answer, ...q.incorrect_answers]
          const shuffledOptions = shuffleArray(allOptions)
          const correctIndex = shuffledOptions.indexOf(q.correct_answer)
          
          return {
            question: decodeHTML(q.question),
            options: shuffledOptions.map(option => decodeHTML(option)),
            correctIndex,
            category: decodeHTML(q.category),
            difficulty: q.difficulty
          }
        })
        
        setQuestions(processedQuestions)
        setCurrentQuestionIndex(0)
        setScore(0)
        setSelectedAnswer(null)
        setShowResult(false)
        setIsGameActive(true)
        setAnswered(false)
      }
    } catch (error) {
      console.error('Failed to fetch questions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (answered) return
    
    setSelectedAnswer(answerIndex)
    setAnswered(true)
    
    if (answerIndex === currentQuestion.correctIndex) {
      setScore(prev => prev + 1)
    }
    
    // Show result for 2 seconds, then move to next question
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1)
        setSelectedAnswer(null)
        setAnswered(false)
      } else {
        setShowResult(true)
        setIsGameActive(false)
      }
    }, 2000)
  }

  const startNewQuiz = () => {
    fetchQuestions()
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progress = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0
  const accuracy = currentQuestionIndex > 0 ? Math.round((score / (currentQuestionIndex + (answered ? 1 : 0))) * 100) : 0

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '#10b981'
      case 'medium': return '#f59e0b'
      case 'hard': return '#ef4444'
      default: return '#60a5fa'
    }
  }

  if (loading) {
    return (
      <div className="game-page">
        <div className="game-header">
          <Link to="/" className="back-button">← Back to Home</Link>
          <h1>❓ Quiz Game</h1>
          <p>Loading questions...</p>
        </div>
        <div className="quiz-loading">
          <div className="loading-spinner"></div>
          <p>Fetching trivia questions...</p>
        </div>
      </div>
    )
  }

  if (!isGameActive && questions.length === 0) {
    return (
      <div className="game-page">
        <div className="game-header">
          <Link to="/" className="back-button">← Back to Home</Link>
          <h1>❓ Quiz Game</h1>
          <p>Test your knowledge with real trivia questions!</p>
        </div>
        
        <div className="game-container">
          <div className="quiz-start-screen">
            <h2>Ready to test your knowledge?</h2>
            <p>Get 10 random trivia questions from various categories!</p>
            <button className="start-quiz-button" onClick={startNewQuiz}>
              Start Quiz
            </button>
          </div>
          
          <div className="game-info">
            <h3>About this quiz:</h3>
            <ul>
              <li>10 multiple choice questions</li>
              <li>Questions from various categories</li>
              <li>Different difficulty levels</li>
              <li>Real-time scoring and feedback</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  if (showResult) {
    return (
      <div className="game-page">
        <div className="game-header">
          <Link to="/" className="back-button">← Back to Home</Link>
          <h1>❓ Quiz Complete!</h1>
          <p>Here's how you did:</p>
        </div>
        
        <div className="game-container">
          <div className="quiz-results">
            <div className="final-score">
              <h2>Final Score: {score}/{questions.length}</h2>
              <div className="accuracy-display">
                <span className="accuracy-number">{Math.round((score / questions.length) * 100)}%</span>
                <span className="accuracy-label">Accuracy</span>
              </div>
            </div>
            
            <div className="score-message">
              {score === questions.length && <p className="perfect">🎉 Perfect! You're a trivia master!</p>}
              {score >= questions.length * 0.8 && score < questions.length && <p className="excellent">🌟 Excellent work!</p>}
              {score >= questions.length * 0.6 && score < questions.length * 0.8 && <p className="good">👍 Good job!</p>}
              {score >= questions.length * 0.4 && score < questions.length * 0.6 && <p className="average">📚 Keep studying!</p>}
              {score < questions.length * 0.4 && <p className="needs-work">💪 Practice makes perfect!</p>}
            </div>
            
            <button className="restart-button" onClick={startNewQuiz}>
              Try Another Quiz
            </button>
          </div>
          
          <div className="game-info">
            <h3>Quiz Statistics:</h3>
            <ul>
              <li>Questions answered: {questions.length}</li>
              <li>Correct answers: {score}</li>
              <li>Accuracy: {Math.round((score / questions.length) * 100)}%</li>
              <li>Categories covered: {new Set(questions.map(q => q.category)).size}</li>
            </ul>
          </div>
        </div>
      </div>
    )
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
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
          
          <div className="quiz-metadata">
            <span className="quiz-category">{currentQuestion?.category}</span>
            <span 
              className="quiz-difficulty" 
              style={{ color: getDifficultyColor(currentQuestion?.difficulty) }}
            >
              {currentQuestion?.difficulty}
            </span>
          </div>
          
          <div className="quiz-question">
            <h3>{currentQuestion?.question}</h3>
          </div>
          
          <div className="quiz-options">
            {currentQuestion?.options.map((option, index) => (
              <button 
                key={index} 
                className={`quiz-option ${
                  answered && index === currentQuestion.correctIndex ? 'correct' : 
                  answered && index === selectedAnswer && index !== currentQuestion.correctIndex ? 'incorrect' :
                  selectedAnswer === index ? 'selected' : ''
                }`}
                onClick={() => handleAnswerSelect(index)}
                disabled={answered}
              >
                {String.fromCharCode(65 + index)}. {option}
              </button>
            ))}
          </div>
          
          {answered && (
            <div className="answer-feedback">
              {selectedAnswer === currentQuestion.correctIndex ? (
                <p className="correct-feedback">✅ Correct!</p>
              ) : (
                <p className="incorrect-feedback">❌ Incorrect. The answer was: {currentQuestion.options[currentQuestion.correctIndex]}</p>
              )}
            </div>
          )}
        </div>
        
        <div className="game-info">
          <h3>Current Progress:</h3>
          <ul>
            <li>Question {currentQuestionIndex + 1} of {questions.length}</li>
            <li>Score: {score}/{answered ? currentQuestionIndex + 1 : currentQuestionIndex}</li>
            <li>Accuracy: {currentQuestionIndex > 0 || answered ? accuracy : 0}%</li>
            <li>Category: {currentQuestion?.category}</li>
          </ul>
          
          <div className="score-board">
            <h4>Current Score: {score}</h4>
            <h4>Progress: {Math.round(progress)}%</h4>
            <button className="restart-button" onClick={startNewQuiz}>
              New Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Quiz