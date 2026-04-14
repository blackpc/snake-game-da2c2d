import { useState, useEffect, useCallback, useRef } from 'react'
import type { Direction, GameState, GameStatus, Position } from '../types/game'
import { playEat, playGameOver, playLevelUp } from '../lib/sounds'

export const GRID_SIZE = 20
const INITIAL_SPEED = 150

function randomFood(snake: Position[]): Position {
  const occupied = new Set(snake.map(p => `${p.x},${p.y}`))
  let pos: Position
  do {
    pos = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    }
  } while (occupied.has(`${pos.x},${pos.y}`))
  return pos
}

function getInitialSnake(): Position[] {
  return [
    { x: 12, y: 10 },
    { x: 11, y: 10 },
    { x: 10, y: 10 },
  ]
}

function getInitialState(prevHighScore?: number): GameState {
  const snake = getInitialSnake()
  return {
    snake,
    food: randomFood(snake),
    direction: 'RIGHT',
    nextDirection: 'RIGHT',
    status: 'idle',
    score: 0,
    highScore: prevHighScore ?? parseInt(localStorage.getItem('snakeHighScore') ?? '0', 10),
    speed: INITIAL_SPEED,
  }
}

export function useSnakeGame() {
  const [state, setState] = useState<GameState>(() => getInitialState())

  // Track previous score and status to fire sounds as side-effects
  const prevScoreRef = useRef(0)
  const prevStatusRef = useRef<GameStatus>('idle')

  useEffect(() => {
    const prevScore = prevScoreRef.current
    const prevStatus = prevStatusRef.current

    if (state.score > prevScore) {
      const prevLevel = Math.floor(prevScore / 50) + 1
      const newLevel  = Math.floor(state.score / 50) + 1
      if (newLevel > prevLevel) playLevelUp()
      else playEat()
    }

    if (state.status === 'gameover' && prevStatus !== 'gameover') {
      playGameOver()
    }

    prevScoreRef.current = state.score
    prevStatusRef.current = state.status
  }, [state.score, state.status])

  const tick = useCallback(() => {
    setState(prev => {
      if (prev.status !== 'running') return prev

      const dir = prev.nextDirection
      const head = prev.snake[0]

      const newHead: Position = {
        x: (head.x + (dir === 'RIGHT' ? 1 : dir === 'LEFT' ? -1 : 0) + GRID_SIZE) % GRID_SIZE,
        y: (head.y + (dir === 'DOWN' ? 1 : dir === 'UP' ? -1 : 0) + GRID_SIZE) % GRID_SIZE,
      }

      // Self collision
      if (prev.snake.some(s => s.x === newHead.x && s.y === newHead.y)) {
        const newHighScore = Math.max(prev.score, prev.highScore)
        localStorage.setItem('snakeHighScore', String(newHighScore))
        return { ...prev, status: 'gameover', highScore: newHighScore }
      }

      const ateFood = newHead.x === prev.food.x && newHead.y === prev.food.y
      const newSnake = ateFood
        ? [newHead, ...prev.snake]
        : [newHead, ...prev.snake.slice(0, -1)]

      const newScore = ateFood ? prev.score + 10 : prev.score
      const newFood  = ateFood ? randomFood(newSnake) : prev.food
      const level    = Math.floor(newScore / 50) + 1
      const newSpeed = Math.max(60, INITIAL_SPEED - (level - 1) * 15)

      return {
        ...prev,
        snake: newSnake,
        food: newFood,
        direction: dir,
        score: newScore,
        speed: newSpeed,
      }
    })
  }, [])

  // Game loop: re-fires whenever snake moves
  useEffect(() => {
    if (state.status !== 'running') return
    const id = setTimeout(tick, state.speed)
    return () => clearTimeout(id)
  }, [state.status, state.speed, state.snake, tick])

  const setDirection = useCallback((dir: Direction) => {
    const opposite: Record<Direction, Direction> = {
      UP: 'DOWN', DOWN: 'UP', LEFT: 'RIGHT', RIGHT: 'LEFT',
    }
    setState(prev => {
      if (opposite[dir] === prev.direction) return prev
      return { ...prev, nextDirection: dir }
    })
  }, [])

  const start = useCallback(() => {
    setState(prev => {
      const fresh = getInitialState(prev.highScore)
      return { ...fresh, status: 'running' }
    })
  }, [])

  const togglePause = useCallback(() => {
    setState(prev => {
      if (prev.status === 'running') return { ...prev, status: 'paused' }
      if (prev.status === 'paused')  return { ...prev, status: 'running' }
      return prev
    })
  }, [])

  // Keyboard controls
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':    case 'w': case 'W': e.preventDefault(); setDirection('UP');    break
        case 'ArrowDown':  case 's': case 'S': e.preventDefault(); setDirection('DOWN');  break
        case 'ArrowLeft':  case 'a': case 'A': e.preventDefault(); setDirection('LEFT');  break
        case 'ArrowRight': case 'd': case 'D': e.preventDefault(); setDirection('RIGHT'); break
        case ' ':     e.preventDefault(); togglePause(); break
        case 'Enter': e.preventDefault(); start();       break
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [setDirection, togglePause, start])

  return { state, start, togglePause, setDirection }
}
