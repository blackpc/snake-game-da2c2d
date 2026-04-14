import { useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { useSnakeGame } from './hooks/useSnakeGame'
import { getMuted, setMuted } from './lib/sounds'
import ScorePanel from './components/ScorePanel'
import GameBoard from './components/GameBoard'
import GameOverlay from './components/GameOverlay'
import DirectionPad from './components/DirectionPad'
import GameControls from './components/GameControls'

export default function App() {
  const { state, start, togglePause, setDirection } = useSnakeGame()
  const [muted, setMutedState] = useState(getMuted)

  function toggleMute() {
    const next = !muted
    setMutedState(next)
    setMuted(next)
  }

  return (
    <div className="min-h-screen bg-[#080b14] flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-[440px] flex flex-col gap-4">

        {/* Header */}
        <header className="flex items-center justify-between px-1">
          <h1 className="font-mono font-black text-3xl tracking-[0.25em] text-lime-400
                         [text-shadow:0_0_24px_rgba(163,230,53,0.45)]">
            SNAKE
          </h1>

          <div className="flex items-center gap-3">
            {/* Mute toggle */}
            <button
              onClick={toggleMute}
              className="flex items-center justify-center w-8 h-8 rounded-lg
                         text-slate-500 hover:text-slate-300 hover:bg-[#0f1629]
                         transition-all duration-150
                         focus:outline-none focus:ring-2 focus:ring-slate-600"
              aria-label={muted ? 'Unmute sounds' : 'Mute sounds'}
            >
              {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>

            <span className="text-[10px] uppercase tracking-[0.18em] text-slate-600 font-semibold">
              Classic arcade
            </span>
          </div>
        </header>

        {/* Score strip */}
        <ScorePanel
          score={state.score}
          highScore={state.highScore}
          speed={state.speed}
        />

        {/* Board + overlay wrapper */}
        <div className="relative board-scanlines rounded-xl">
          <GameBoard state={state} />
          <GameOverlay
            status={state.status}
            score={state.score}
            onStart={start}
            onTogglePause={togglePause}
          />
        </div>

        {/* Mobile D-pad (hidden on lg+) */}
        <DirectionPad onDirection={setDirection} />

        {/* Controls row */}
        <GameControls
          status={state.status}
          onStart={start}
          onTogglePause={togglePause}
        />

      </div>
    </div>
  )
}
