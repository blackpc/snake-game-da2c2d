export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'
export type GameStatus = 'idle' | 'running' | 'paused' | 'gameover'

export interface Position {
  x: number
  y: number
}

export interface GameState {
  snake: Position[]
  food: Position
  direction: Direction
  nextDirection: Direction
  status: GameStatus
  score: number
  highScore: number
  speed: number
}
