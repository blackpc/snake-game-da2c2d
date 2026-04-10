import { Play, Pause, RotateCcw } from 'lucide-react'
import type { GameStatus } from '../types/game'

interface GameControlsProps {
  status: GameStatus
  onStart: () => void
  onTogglePause: () => void
}

const btnBase =
  'flex items-center gap-1.5 px-4 py-2 rounded-lg border text-sm font-medium ' +
  'transition-all duration-150 active:scale-95 ' +
  'focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-[#080b14]'

export default function GameControls({ status, onStart, onTogglePause }: GameControlsProps) {
  const canPause = status === 'running' || status === 'paused'
  const canRestart = status === 'running' || status === 'paused' || status === 'gameover'

  return (
    <div className="flex items-center justify-between min-h-[2.25rem]">
      <div className="flex gap-2">
        {canPause && (
          <button
            onClick={onTogglePause}
            className={`${btnBase} bg-[#0f1629] border-[#1e2d4d] text-slate-300
                        hover:text-cyan-400 hover:border-cyan-900 hover:bg-[#0d1e36]
                        focus:ring-cyan-500/40`}
          >
            {status === 'paused'
              ? <><Play size={13} strokeWidth={2.5} /> Resume</>
              : <><Pause size={13} strokeWidth={2.5} /> Pause</>
            }
          </button>
        )}

        {canRestart && (
          <button
            onClick={onStart}
            className={`${btnBase} bg-[#0f1629] border-[#1e2d4d] text-slate-300
                        hover:text-rose-400 hover:border-rose-900 hover:bg-[#200f18]
                        focus:ring-rose-500/40`}
          >
            <RotateCcw size={13} strokeWidth={2.5} /> Restart
          </button>
        )}
      </div>

      {/* Keyboard hints — desktop only */}
      <p className="hidden lg:block text-[10px] text-slate-700 text-right leading-relaxed tracking-wide">
        WASD / Arrows to steer<br />
        Space · pause &nbsp;·&nbsp; Enter · restart
      </p>
    </div>
  )
}
