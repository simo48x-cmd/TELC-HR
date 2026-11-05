import { HoerenExam } from '../data/types';

export type AudioSourceMode = 'radio-tts' | 'cloud-stream' | 'local-file';

class SoundEffectsEngine {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
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

  playRadioGong(): void {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99]; // C5 - E5 - G5 TELC Radio Gong
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.16);
      gain.gain.setValueAtTime(0.001, now + i * 0.16);
      gain.gain.exponentialRampToValueAtTime(0.16, now + i * 0.16 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.16 + 0.45);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.16);
      osc.stop(now + i * 0.16 + 0.48);
    });
  }

  playSuccessChime(): void {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [587.33, 880].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.09);
      gain.gain.setValueAtTime(0.14, now + i * 0.09);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.09 + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + i * 0.09);
      osc.stop(now + i * 0.09 + 0.26);
    });
  }

  playErrorBuzz(): void {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.linearRampToValueAtTime(115, now + 0.22);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  }
}

export const soundFX = new SoundEffectsEngine();

export function speakGermanExamRadio(
  exam: HoerenExam,
  rate: number = 1.0,
  onStart?: () => void,
  onEnd?: () => void,
  onProgress?: (charIndex: number, totalLength: number) => void
): () => void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onEnd?.();
    return () => {};
  }

  window.speechSynthesis.cancel();
  soundFX.playRadioGong();

  const text = exam.radioTranscript;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'de-DE';
  utterance.rate = rate;
  utterance.pitch = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const germanVoice =
    voices.find((v) => v.lang.toLowerCase().startsWith('de') && v.name.toLowerCase().includes('google')) ||
    voices.find((v) => v.lang.toLowerCase().startsWith('de'));
  if (germanVoice) {
    utterance.voice = germanVoice;
  }

  utterance.onstart = () => {
    onStart?.();
  };
  utterance.onboundary = (event) => {
    if (typeof event.charIndex === 'number') {
      onProgress?.(event.charIndex, text.length);
    }
  };
  utterance.onend = () => {
    onEnd?.();
  };
  utterance.onerror = () => {
    onEnd?.();
  };

  const timer = window.setTimeout(() => {
    window.speechSynthesis.speak(utterance);
  }, 420);

  return () => {
    window.clearTimeout(timer);
    window.speechSynthesis.cancel();
  };
}

export function stopGermanExamRadio(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
