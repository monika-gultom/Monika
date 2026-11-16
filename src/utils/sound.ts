// Efek suara ramah anak menggunakan Web Audio API (tanpa file eksternal)

class SoundEngine {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;

  public setMuted(mute: boolean) {
    this.muted = mute;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  private getContext(): AudioContext | null {
    if (this.muted || typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private playTone(freq: number, duration: number, startTimeOffset = 0, type: OscillatorType = 'sine', volume = 0.14) {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime + startTimeOffset;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  public playClick() {
    this.playTone(580, 0.08, 0, 'sine', 0.1);
  }

  public playCorrect() {
    this.playTone(523.25, 0.12, 0, 'triangle', 0.14); // C5
    this.playTone(659.25, 0.12, 0.09, 'triangle', 0.14); // E5
    this.playTone(783.99, 0.22, 0.18, 'triangle', 0.16); // G5
  }

  public playWrong() {
    this.playTone(310, 0.14, 0, 'sine', 0.12);
    this.playTone(250, 0.2, 0.12, 'sine', 0.12);
  }

  public playStar() {
    this.playTone(659.25, 0.1, 0, 'sine', 0.12); // E5
    this.playTone(880, 0.12, 0.07, 'sine', 0.14); // A5
    this.playTone(1046.5, 0.24, 0.15, 'sine', 0.15); // C6
  }

  public playFanfare() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      this.playTone(freq, idx === 3 ? 0.35 : 0.14, idx * 0.11, 'triangle', 0.15);
    });
  }
}

export const sound = new SoundEngine();
