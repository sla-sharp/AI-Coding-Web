import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import TicTacToe from './pages/games/TicTacToe'
import Snake from './pages/games/Snake'
import Memory from './pages/games/Memory'
import Puzzle from './pages/games/Puzzle'
import Quiz from './pages/games/Quiz'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games/tic-tac-toe" element={<TicTacToe />} />
        <Route path="/games/snake" element={<Snake />} />
        <Route path="/games/memory" element={<Memory />} />
        <Route path="/games/puzzle" element={<Puzzle />} />
        <Route path="/games/quiz" element={<Quiz />} />
      </Routes>
    </Layout>
  )
}

export default App