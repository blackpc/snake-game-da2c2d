/**
 * Procedural sound effects via Web Audio API — no audio files needed.
 * AudioContext is created lazily on first call (satisfies browser autoplay policy).
 */

let ctx: AudioContext | null = null
let _muted: boolean = localStorage.getItem('snakeMuted') === 'true'

export function setMuted(m: boolean) {
  _muted = m
  localStorage.setItem('snakeMuted', String(m))
}

export function getMuted() {
  return _muted
}

function getCtx(): AudioContext | null {
  if (_muted) return null
  if (!ctx) ctx = new AudioContext()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

function tone(
  c: AudioContext,
  type: OscillatorType,
  freq: number,
  startTime: number,
  duration: number,
  gain: number,
  freqEnd?: number,
) {
  const osc = c.createOscillator()
  const vol = c.createGain()
  osc.connect(vol)
  vol.connect(c.destination)

  osc.type = type
  osc.frequency.setValueAtTime(freq, startTime)
  if (freqEnd !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(freqEnd, startTime + duration)
  }

  vol.gain.setValueAtTime(0, startTime)
  vol.gain.linearRampToValueAtTime(gain, startTime + 0.008)
  vol.gain.exponentialRampToValueAtTime(0.0001, startTime + duration)

  osc.start(startTime)
  osc.stop(startTime + duration + 0.01)
}

/** Short ascending blip when the snake eats food. */
export function playEat() {
  const c = getCtx()
  if (!c) return
  const t = c.currentTime
  tone(c, 'square', 440, t,        0.06, 0.18)
  tone(c, 'square', 660, t + 0.05, 0.07, 0.14)
}

/** Four-note ascending arpeggio on level up. */
export function playLevelUp() {
  const c = getCtx()
  if (!c) return
  const t = c.currentTime
  const notes = [523, 659, 784, 1047] // C5 E5 G5 C6
  notes.forEach((freq, i) => {
    tone(c, 'sine', freq, t + i * 0.09, 0.18, 0.22)
  })
}

/** Descending crash on game over. */
export function playGameOver() {
  const c = getCtx()
  if (!c) return
  const t = c.currentTime
  tone(c, 'sawtooth', 440, t,        0.55, 0.28, 60)
  tone(c, 'square',   220, t + 0.08, 0.45, 0.12, 40)
}
