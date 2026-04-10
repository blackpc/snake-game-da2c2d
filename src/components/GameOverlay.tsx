import type { GameStatus } from '../types/game'

interface GameOverlayProps {
  status: GameStatus
  score: number
  onStart: () => void
  onTogglePause: () => void
}

export default function GameOverlay({ status, score, onStart, onTogglePause }: GameOverlayProps) {
  if (status === 'running') return null

  return (
    <div className="absolute inset-0 z-10 rounded-xl flex items-center justify-center
                    bg-[#080b14]/82 backdrop-blur-[2px]">

      {status === 'idle' && (
        <div className="flex flex-col items-center gap-6 px-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <p className="font-mono font-black text-5xl tracking-[0.22em] text-lime-400
                          [text-shadow:0_0_28px_rgba(163,230,53,0.55)]">
              SNAKE
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Classic arcade — eat, grow, survive.
            </p>
          </div>

          <div className="flex flex-col gap-1 text-xs text-slate-500 leading-relaxed">
            <span>Arrow keys or WASD to steer</span>
            <span>Space to pause · Enter to restart</span>
          </div>

          <button
            onClick={onStart}
            className="px-9 py-3 rounded-lg bg-lime-500 hover:bg-lime-400
                       text-black text-sm font-bold tracking-wide
                       transition-all duration-150 active:scale-95
                       focus:outline-none focus:ring-2 focus:ring-lime-400 focus:ring-offset-2 focus:ring-offset-[#080b14]
                       shadow-[0_0_20px_rgba(132,204,22,0.3)] hover:shadow-[0_0_28px_rgba(132,204,22,0.5)]"
          >
            Start Game
          </button>
        </div>
      )}

      {status === 'paused' && (
        <div className="flex flex-col items-center gap-6 px-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <p className="font-mono font-black text-4xl tracking-[0.18em] text-cyan-400
                          [text-shadow:0_0_20px_rgba(34,211,238,0.45)]">
              PAUSED
            </p>
            <p className="text-sm text-slate-400 font-mono tabular-nums">
              Score: {score}
            </p>
          </div>

          <button
            onClick={onTogglePause}
            className="px-9 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400
                       text-black text-sm font-bold tracking-wide
                       transition-all duration-150 active:scale-95
                       focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#080b14]
                       shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:shadow-[0_0_28px_rgba(34,211,238,0.45)]"
          >
            Resume
          </button>
        </div>
      )}

      {status === 'gameover' && (
        <div className="flex flex-col items-center gap-6 px-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <p className="font-mono font-black text-4xl tracking-[0.12em] text-rose-400
                          [text-shadow:0_0_20px_rgba(244,63,94,0.5)]">
              GAME OVER
            </p>
            <p className="text-xl font-mono font-bold text-slate-200 tabular-nums">
              {score} <span className="text-sm font-normal text-slate-500">pts</span>
            </p>
          </div>

          <button
            onClick={onStart}
            className="px-9 py-3 rounded-lg bg-rose-500 hover:bg-rose-400
                       text-white text-sm font-bold tracking-wide
                       transition-all duration-150 active:scale-95
                       focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2 focus:ring-offset-[#080b14]
                       shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:shadow-[0_0_28px_rgba(244,63,94,0.5)]"
          >
            Play Again
          </button>
        </div>
      )}

    </div>
  )
}
