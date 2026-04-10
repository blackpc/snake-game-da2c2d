interface ScorePanelProps {
  score: number
  highScore: number
  speed: number
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-[#0f1629] border border-[#1e2d4d] rounded-xl p-3 flex flex-col items-center gap-1
                    hover:border-[#2a3d5e] transition-colors duration-200">
      <span className="text-[10px] uppercase tracking-[0.16em] text-slate-600 font-semibold">
        {label}
      </span>
      <span className={`font-mono text-2xl font-bold tabular-nums leading-none ${color}`}>
        {value}
      </span>
    </div>
  )
}

export default function ScorePanel({ score, highScore, speed }: ScorePanelProps) {
  const level = Math.floor(score / 50) + 1
  const speedPct = Math.round(((150 - speed) / (150 - 60)) * 100)

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-3 gap-3">
        <StatCard label="Score" value={score} color="text-lime-400" />
        <StatCard label="Level" value={level} color="text-cyan-400" />
        <StatCard label="Best"  value={highScore} color="text-amber-400" />
      </div>

      {/* Speed bar */}
      <div className="bg-[#0f1629] border border-[#1e2d4d] rounded-xl px-4 py-2.5
                      flex items-center gap-3">
        <span className="text-[10px] uppercase tracking-[0.16em] text-slate-600 font-semibold shrink-0">
          Speed
        </span>
        <div className="flex-1 h-1.5 bg-[#1a2640] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-lime-700 to-lime-400
                       transition-[width] duration-500"
            style={{ width: `${Math.max(4, speedPct)}%` }}
          />
        </div>
        <span className="font-mono text-xs text-slate-500 tabular-nums w-8 text-right">
          {speedPct}%
        </span>
      </div>
    </div>
  )
}
