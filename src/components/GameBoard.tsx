import type { GameState } from '../types/game'
import { GRID_SIZE } from '../hooks/useSnakeGame'

interface GameBoardProps {
  state: GameState
}

export default function GameBoard({ state }: GameBoardProps) {
  const snakeMap = new Map<string, number>()
  state.snake.forEach((seg, i) => snakeMap.set(`${seg.x},${seg.y}`, i))
  const totalLength = state.snake.length

  return (
    <div
      className="w-full aspect-square rounded-xl overflow-hidden border border-[#1e2d4d]
                 shadow-[0_0_48px_rgba(132,204,22,0.07)]"
    >
      <div
        className="grid w-full h-full gap-[1px] bg-[#141b2d] p-[1px]"
        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => {
          const x = i % GRID_SIZE
          const y = Math.floor(i / GRID_SIZE)
          const segIndex = snakeMap.get(`${x},${y}`)
          const isHead = segIndex === 0
          const isBody = segIndex !== undefined && segIndex > 0
          const isFood = x === state.food.x && y === state.food.y

          if (isHead) {
            return (
              <div key={i} className="bg-[#0a0f1e]">
                <div className="w-full h-full rounded-sm bg-lime-400
                               shadow-[0_0_7px_rgba(163,230,53,0.85)]" />
              </div>
            )
          }

          if (isBody) {
            const opacity = Math.max(0.3, 1 - (segIndex! / totalLength) * 0.78)
            return (
              <div key={i} className="bg-[#0a0f1e]">
                <div
                  className="w-full h-full rounded-sm"
                  style={{ backgroundColor: `rgba(52, 211, 153, ${opacity})` }}
                />
              </div>
            )
          }

          if (isFood) {
            return (
              <div key={i} className="bg-[#0a0f1e] flex items-center justify-center">
                <div className="w-[68%] h-[68%] rounded-full bg-rose-500 food-animate" />
              </div>
            )
          }

          return <div key={i} className="bg-[#0a0f1e]" />
        })}
      </div>
    </div>
  )
}
