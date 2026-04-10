import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Direction } from '../types/game'

interface DirectionPadProps {
  onDirection: (dir: Direction) => void
}

function DPadButton({
  dir,
  label,
  children,
  onDirection,
}: {
  dir: Direction
  label: string
  children: React.ReactNode
  onDirection: (dir: Direction) => void
}) {
  return (
    <button
      className="flex items-center justify-center w-14 h-14 rounded-xl
                 bg-[#0f1629] border border-[#1e2d4d] text-slate-400
                 hover:text-lime-400 hover:border-lime-800/60 hover:bg-[#162040]
                 active:scale-90 active:bg-[#1a2845]
                 transition-all duration-100
                 focus:outline-none focus:ring-2 focus:ring-lime-500/40
                 touch-manipulation"
      onPointerDown={e => { e.preventDefault(); onDirection(dir) }}
      aria-label={label}
    >
      {children}
    </button>
  )
}

export default function DirectionPad({ onDirection }: DirectionPadProps) {
  return (
    /* Visible below lg breakpoint — tablets included */
    <div className="flex flex-col items-center gap-1.5 lg:hidden" aria-label="Direction controls">
      <DPadButton dir="UP" label="Move up" onDirection={onDirection}>
        <ChevronUp size={22} />
      </DPadButton>

      <div className="flex gap-1.5">
        <DPadButton dir="LEFT" label="Move left" onDirection={onDirection}>
          <ChevronLeft size={22} />
        </DPadButton>

        {/* Centre pip */}
        <div className="w-14 h-14 rounded-xl bg-[#080b14] border border-[#0f1629]
                        flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#1e2d4d]" />
        </div>

        <DPadButton dir="RIGHT" label="Move right" onDirection={onDirection}>
          <ChevronRight size={22} />
        </DPadButton>
      </div>

      <DPadButton dir="DOWN" label="Move down" onDirection={onDirection}>
        <ChevronDown size={22} />
      </DPadButton>
    </div>
  )
}
