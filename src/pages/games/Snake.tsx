import { Link } from 'react-router-dom'
import { useState, useEffect, useRef, useCallback } from 'react'
import './GamePage.css'

interface Position {
  x: number
  y: number
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

const BOARD_WIDTH = 20
const BOARD_HEIGHT = 20
const CELL_SIZE = 20

function Snake() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }])
  const [food, setFood] = useState<Position>({ x: 15, y: 15 })
  const [direction, setDirection] = useState<Direction>('RIGHT')
  const [gameRunning, setGameRunning] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('snakeHighScore')
    return saved ? parseInt(saved) : 0
  })
  const [gameOver, setGameOver] = useState(false)
  const [interpolationProgress, setInterpolationProgress] = useState(0)
  const [previousSnake, setPreviousSnake] = useState<Position[]>([{ x: 10, y: 10 }])

  const generateFood = useCallback((snakeBody: Position[]): Position => {
    let newFood: Position
    do {
      newFood = {
        x: Math.floor(Math.random() * BOARD_WIDTH),
        y: Math.floor(Math.random() * BOARD_HEIGHT)
      }
    } while (snakeBody.some(segment => segment.x === newFood.x && segment.y === newFood.y))
    return newFood
  }, [])

  const resetGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }]
    setSnake(initialSnake)
    setPreviousSnake(initialSnake)
    setFood(generateFood(initialSnake))
    setDirection('RIGHT')
    setGameRunning(false)
    setScore(0)
    setGameOver(false)
    setInterpolationProgress(0)
  }, [generateFood])

  const checkCollision = useCallback((head: Position, snakeBody: Position[]): boolean => {
    // Wall collision
    if (head.x < 0 || head.x >= BOARD_WIDTH || head.y < 0 || head.y >= BOARD_HEIGHT) {
      return true
    }
    
    // Self collision
    return snakeBody.some(segment => segment.x === head.x && segment.y === head.y)
  }, [])

  const moveSnake = useCallback(() => {
    setSnake(currentSnake => {
      setPreviousSnake(currentSnake)
      const newSnake = [...currentSnake]
      const head = { ...newSnake[0] }

      // Move head based on direction
      switch (direction) {
        case 'UP':
          head.y -= 1
          break
        case 'DOWN':
          head.y += 1
          break
        case 'LEFT':
          head.x -= 1
          break
        case 'RIGHT':
          head.x += 1
          break
      }

      // Check collision
      if (checkCollision(head, newSnake)) {
        setGameRunning(false)
        setGameOver(true)
        return currentSnake
      }

      newSnake.unshift(head)

      // Check if food is eaten
      if (head.x === food.x && head.y === food.y) {
        setScore(prevScore => {
          const newScore = prevScore + 10
          if (newScore > highScore) {
            setHighScore(newScore)
            localStorage.setItem('snakeHighScore', newScore.toString())
          }
          return newScore
        })
        setFood(generateFood(newSnake))
      } else {
        newSnake.pop()
      }

      return newSnake
    })
    setInterpolationProgress(0)
  }, [direction, food, checkCollision, generateFood, highScore])

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
        if (gameRunning && !gameOver) {
          event.preventDefault()
          setDirection(current => current !== 'DOWN' ? 'UP' : current)
        }
        break
      case 'ArrowDown':
        if (gameRunning && !gameOver) {
          event.preventDefault()
          setDirection(current => current !== 'UP' ? 'DOWN' : current)
        }
        break
      case 'ArrowLeft':
        if (gameRunning && !gameOver) {
          event.preventDefault()
          setDirection(current => current !== 'RIGHT' ? 'LEFT' : current)
        }
        break
      case 'ArrowRight':
        if (gameRunning && !gameOver) {
          event.preventDefault()
          setDirection(current => current !== 'LEFT' ? 'RIGHT' : current)
        }
        break
      case ' ':
        event.preventDefault()
        if (gameOver) {
          resetGame()
          setGameRunning(true)
        } else if (!gameRunning) {
          setGameRunning(true)
        } else {
          setGameRunning(false)
        }
        break
    }
  }, [gameRunning, gameOver, resetGame])

  const drawGame = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.fillStyle = '#0f172a'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid with smoother lines
    ctx.strokeStyle = '#1e293b'
    ctx.lineWidth = 0.5
    ctx.globalAlpha = 0.3
    
    for (let i = 0; i <= BOARD_WIDTH; i++) {
      ctx.beginPath()
      ctx.moveTo(i * CELL_SIZE, 0)
      ctx.lineTo(i * CELL_SIZE, BOARD_HEIGHT * CELL_SIZE)
      ctx.stroke()
    }
    for (let i = 0; i <= BOARD_HEIGHT; i++) {
      ctx.beginPath()
      ctx.moveTo(0, i * CELL_SIZE)
      ctx.lineTo(BOARD_WIDTH * CELL_SIZE, i * CELL_SIZE)
      ctx.stroke()
    }
    
    ctx.globalAlpha = 1

    // Draw snake with interpolation
    const currentSnake = gameRunning && !gameOver ? snake : snake
    const prevSnake = gameRunning && !gameOver ? previousSnake : snake
    
    currentSnake.forEach((segment, index) => {
      const isHead = index === 0
      const prevSegment = prevSnake[index] || segment
      
      // Interpolate position for smooth movement
      const progress = Math.min(interpolationProgress, 1)
      const easeProgress = 1 - Math.pow(1 - progress, 3) // Ease out cubic
      
      const interpolatedX = prevSegment.x + (segment.x - prevSegment.x) * easeProgress
      const interpolatedY = prevSegment.y + (segment.y - prevSegment.y) * easeProgress
      
      const x = interpolatedX * CELL_SIZE + 1
      const y = interpolatedY * CELL_SIZE + 1
      const size = CELL_SIZE - 2
      
      if (isHead) {
        // Draw head with gradient
        const gradient = ctx.createLinearGradient(x, y, x + size, y + size)
        gradient.addColorStop(0, '#93c5fd')
        gradient.addColorStop(1, '#60a5fa')
        ctx.fillStyle = gradient
      } else {
        // Draw body with gradient
        const gradient = ctx.createLinearGradient(x, y, x + size, y + size)
        gradient.addColorStop(0, '#60a5fa')
        gradient.addColorStop(1, '#3b82f6')
        ctx.fillStyle = gradient
      }
      
      // Draw rounded rectangle
      ctx.beginPath()
      ctx.roundRect(x, y, size, size, 3)
      ctx.fill()
    })

    // Draw food with pulsing effect
    const time = Date.now() * 0.005
    const pulse = Math.sin(time) * 0.1 + 0.9
    const foodSize = (CELL_SIZE - 2) * pulse
    const foodOffset = (CELL_SIZE - foodSize) / 2
    
    const foodGradient = ctx.createRadialGradient(
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      0,
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      foodSize / 2
    )
    foodGradient.addColorStop(0, '#fca5a5')
    foodGradient.addColorStop(1, '#ef4444')
    
    ctx.fillStyle = foodGradient
    ctx.beginPath()
    ctx.roundRect(
      food.x * CELL_SIZE + foodOffset,
      food.y * CELL_SIZE + foodOffset,
      foodSize,
      foodSize,
      4
    )
    ctx.fill()

    // Draw game over message
    if (gameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.fillStyle = '#f1f5f9'
      ctx.font = 'bold 24px Inter'
      ctx.textAlign = 'center'
      ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 20)
      
      ctx.font = '16px Inter'
      ctx.fillText('Press SPACE to restart', canvas.width / 2, canvas.height / 2 + 10)
    } else if (!gameRunning) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.fillStyle = '#f1f5f9'
      ctx.font = 'bold 20px Inter'
      ctx.textAlign = 'center'
      ctx.fillText('Press SPACE to start', canvas.width / 2, canvas.height / 2)
    }
  }, [snake, previousSnake, food, gameRunning, gameOver, interpolationProgress])

  // Game loop with interpolation
  useEffect(() => {
    let lastMoveTime = 0
    const MOVE_INTERVAL = 100 // Move every 100ms
    
    const gameLoop = (currentTime: number) => {
      if (gameRunning && !gameOver) {
        // Update interpolation progress
        const timeSinceLastMove = currentTime - lastMoveTime
        const progress = Math.min(timeSinceLastMove / MOVE_INTERVAL, 1)
        setInterpolationProgress(progress)
        
        // Move snake when interval is reached
        if (timeSinceLastMove >= MOVE_INTERVAL) {
          moveSnake()
          lastMoveTime = currentTime
        }
        
        animationRef.current = requestAnimationFrame(gameLoop)
      }
    }
    
    if (gameRunning && !gameOver) {
      lastMoveTime = performance.now()
      animationRef.current = requestAnimationFrame(gameLoop)
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [gameRunning, gameOver, moveSnake])

  // Continuous animation loop for smooth rendering
  useEffect(() => {
    const animate = () => {
      drawGame()
      requestAnimationFrame(animate)
    }
    
    animate()
  }, [drawGame])

  // Event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  const startGame = () => {
    if (gameOver) {
      resetGame()
    }
    setGameRunning(true)
  }

  const pauseGame = () => {
    setGameRunning(false)
  }

  return (
    <div className="game-page">
      <div className="game-header">
        <Link to="/" className="back-button">← Back to Home</Link>
        <h1>🐍 Snake Game</h1>
        <p>Control the snake to eat food and grow longer!</p>
      </div>
      
      <div className="game-container">
        <div className="snake-game-board">
          <canvas 
            ref={canvasRef}
            width={BOARD_WIDTH * CELL_SIZE}
            height={BOARD_HEIGHT * CELL_SIZE}
            className="snake-canvas"
          />
        </div>
        
        <div className="game-info">
          <h3>How to Play:</h3>
          <ul>
            <li>Use arrow keys to control the snake</li>
            <li>Eat the red food to grow longer</li>
            <li>Avoid hitting the walls or yourself</li>
            <li>Press SPACE to start/pause</li>
          </ul>
          
          <div className="score-board">
            <h4>Score: {score}</h4>
            <h4>High Score: {highScore}</h4>
            <h4>Length: {snake.length}</h4>
            
            <div className="game-controls">
              {!gameRunning && !gameOver && (
                <button className="restart-button" onClick={startGame}>
                  Start Game
                </button>
              )}
              
              {gameRunning && (
                <button className="restart-button" onClick={pauseGame}>
                  Pause Game
                </button>
              )}
              
              {gameOver && (
                <button className="restart-button" onClick={resetGame}>
                  New Game
                </button>
              )}
              
              <button className="restart-button" onClick={resetGame}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Snake