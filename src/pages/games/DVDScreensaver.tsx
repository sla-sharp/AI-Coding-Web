import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import './GamePage.css'

function DVDScreensaver() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const [hitCornerCount, setHitCornerCount] = useState(0)
  const [currentColor, setCurrentColor] = useState('#60a5fa')
  const [totalBounces, setTotalBounces] = useState(0)
  
  // DVD logo position and velocity
  const dvdRef = useRef({
    x: 50,
    y: 50,
    vx: 3,
    vy: 2,
    width: 80,
    height: 40
  })

  const colors = ['#60a5fa', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#84cc16']

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = '#0f172a'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const dvd = dvdRef.current

      // Update position
      dvd.x += dvd.vx
      dvd.y += dvd.vy

      // Check for bounces and corner hits
      let hitCorner = false
      let bounced = false
      let hitHorizontalWall = false
      let hitVerticalWall = false
      
      if (dvd.x <= 0 || dvd.x + dvd.width >= canvas.width) {
        dvd.vx = -dvd.vx
        dvd.x = dvd.x <= 0 ? 0 : canvas.width - dvd.width
        bounced = true
        hitHorizontalWall = true
      }
      
      if (dvd.y <= 0 || dvd.y + dvd.height >= canvas.height) {
        dvd.vy = -dvd.vy
        dvd.y = dvd.y <= 0 ? 0 : canvas.height - dvd.height
        bounced = true
        hitVerticalWall = true
      }

      // Check for corner hit - when both horizontal and vertical walls are hit in same frame
      if (hitHorizontalWall && hitVerticalWall) {
        hitCorner = true
      }

      // Handle any bounce (wall or corner)
      if (bounced) {
        setTotalBounces(prev => prev + 1)
        const newColor = colors[Math.floor(Math.random() * colors.length)]
        setCurrentColor(newColor)
        
        // Handle corner hit specifically
        if (hitCorner) {
          setHitCornerCount(prev => prev + 1)
        }
      }

      // Draw DVD logo
      ctx.fillStyle = currentColor
      ctx.fillRect(dvd.x, dvd.y, dvd.width, dvd.height)
      
      // Draw "DVD" text
      ctx.fillStyle = '#ffffff'
      ctx.font = 'bold 16px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('DVD', dvd.x + dvd.width / 2, dvd.y + dvd.height / 2 + 6)

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [currentColor])

  const resetAnimation = () => {
    const dvd = dvdRef.current
    dvd.x = Math.random() * 200 + 50
    dvd.y = Math.random() * 150 + 50
    dvd.vx = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 3 + 2)
    dvd.vy = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 3 + 2)
    setHitCornerCount(0)
    setTotalBounces(0)
    setCurrentColor('#60a5fa')
  }

  return (
    <div className="game-page">
      <div className="game-header">
        <Link to="/" className="back-button">← Back to Home</Link>
        <h1>📺 DVD Screensaver</h1>
        <p>Watch the DVD logo bounce around and celebrate when it hits a corner!</p>
      </div>
      
      <div className="game-container">
        <div className="dvd-screensaver">
          <canvas 
            ref={canvasRef}
            width={600}
            height={400}
            className="dvd-canvas"
          />
        </div>
        
        <div className="game-info">
          <h3>About this classic:</h3>
          <ul>
            <li>The DVD logo bounces around the screen</li>
            <li>It changes color every time it hits any wall</li>
            <li>Everyone gets excited when it hits a corner!</li>
            <li>This was the ultimate screensaver of the 2000s</li>
          </ul>
          
          <div className="score-board">
            <h4>Total Bounces: {totalBounces}</h4>
            <h4>Corner Hits: {hitCornerCount}</h4>
            <h4 style={{ color: hitCornerCount > 0 ? '#10b981' : 'inherit' }}>
              {hitCornerCount === 0 && "Waiting for corner hit..."}
              {hitCornerCount === 1 && "🎉 First corner hit!"}
              {hitCornerCount > 1 && `🎉 ${hitCornerCount} corner hits!`}
            </h4>
            <button className="restart-button" onClick={resetAnimation}>
              Reset Position
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DVDScreensaver