/**
 * Trilha noturna generativa, composta ao vivo com a Web Audio API.
 * Clima lo-fi bem calmo: piano elétrico suave tocando acordes lentos, um grave
 * redondo, um pad distante e chiado de vinil. Nada é arquivo de áudio.
 */

const midi = (n: number) => 440 * Math.pow(2, (n - 69) / 12);

// Progressão de 4 acordes (um por compasso, a ~62 bpm): Fmaj9 · Em7 · Dm9 · Cmaj7
const PROG: { bass: number; keys: number[] }[] = [
  { bass: 41, keys: [57, 60, 64, 67] },
  { bass: 40, keys: [55, 59, 62, 67] },
  { bass: 38, keys: [57, 60, 64, 65] },
  { bass: 36, keys: [55, 59, 62, 64] },
];
const BEAT = 60 / 62;
const BRIGHT = [900, 1100, 1300, 1000, 1200, 800]; // brilho do som por capítulo

export class Ambient {
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private tone!: BiquadFilterNode;
  private reverb!: ConvolverNode;
  private vinyl: AudioBufferSourceNode | null = null;
  private timer = 0;
  private nextBar = 0;
  private bar = 0;
  private chapter = 0;
  enabled = false;

  /** Precisa ser chamado dentro de um gesto do usuário (clique). */
  start() {
    if (!this.ctx) this.build();
    const ctx = this.ctx!;
    void ctx.resume();
    this.enabled = true;
    this.master.gain.cancelScheduledValues(ctx.currentTime);
    this.master.gain.setTargetAtTime(0.42, ctx.currentTime, 2.2);
    this.nextBar = ctx.currentTime + 0.3;
    this.schedule();
  }

  stop() {
    if (!this.ctx) return;
    this.enabled = false;
    this.master.gain.setTargetAtTime(0, this.ctx.currentTime, 0.8);
    clearTimeout(this.timer);
    setTimeout(() => !this.enabled && this.ctx?.suspend(), 3000);
  }

  toggle() {
    if (this.enabled) this.stop();
    else this.start();
    return this.enabled;
  }

  private build() {
    const ctx = new AudioContext();
    this.ctx = ctx;
    this.master = ctx.createGain();
    this.master.gain.value = 0;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -24;
    comp.ratio.value = 2.5;
    this.master.connect(comp).connect(ctx.destination);

    this.tone = ctx.createBiquadFilter();
    this.tone.type = 'lowpass';
    this.tone.frequency.value = 1000;
    this.tone.Q.value = 0.4;

    this.reverb = ctx.createConvolver();
    const len = ctx.sampleRate * 4;
    const ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = ir.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.5);
    }
    this.reverb.buffer = ir;
    const wet = ctx.createGain();
    wet.gain.value = 0.38;
    const dry = ctx.createGain();
    dry.gain.value = 0.7;
    this.tone.connect(dry).connect(this.master);
    this.tone.connect(this.reverb).connect(wet).connect(this.master);

    // chiado de vinil: ruído rosado bem baixo com estalos esparsos
    const nb = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate);
    const nd = nb.getChannelData(0);
    let b0 = 0;
    for (let i = 0; i < nd.length; i++) {
      b0 = 0.97 * b0 + 0.03 * (Math.random() * 2 - 1);
      nd[i] = b0 * 0.6 + (Math.random() < 0.0004 ? (Math.random() - 0.5) * 0.9 : 0);
    }
    const src = ctx.createBufferSource();
    src.buffer = nb;
    src.loop = true;
    const vg = ctx.createGain();
    vg.gain.value = 0.05;
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 900;
    src.connect(hp).connect(vg).connect(this.master);
    src.start();
    this.vinyl = src;
  }

  /** Agenda os compassos alguns segundos à frente (sem travar a página). */
  private schedule = () => {
    if (!this.ctx || !this.enabled) return;
    const ctx = this.ctx;
    while (this.nextBar < ctx.currentTime + 4) {
      this.playBar(this.nextBar, PROG[this.bar % PROG.length]);
      this.nextBar += BEAT * 4;
      this.bar++;
    }
    this.timer = window.setTimeout(this.schedule, 1000);
  };

  private playBar(t: number, chord: { bass: number; keys: number[] }) {
    // piano elétrico: acorde no tempo 1 e um eco mais suave no tempo 3
    chord.keys.forEach((n, i) => {
      this.epiano(n, t + i * 0.025, 0.055, BEAT * 3.6);
      if (Math.random() < 0.7) this.epiano(n, t + BEAT * 2 + i * 0.03, 0.03, BEAT * 2);
    });
    // uma nota de melodia, às vezes
    if (Math.random() < 0.45) {
      const top = chord.keys[chord.keys.length - 1] + 12;
      const pick = [top, top - 3, top + 2, top - 5][Math.floor(Math.random() * 4)];
      this.epiano(pick, t + BEAT * (1 + Math.floor(Math.random() * 3)), 0.035, BEAT * 2.5);
    }
    this.bass(chord.bass, t, BEAT * 3.8);
    this.pad(chord.keys, t, BEAT * 4.2);
  }

  /** Piano elétrico tipo Rhodes: senoide com leve FM e decaimento longo. */
  private epiano(n: number, t: number, vol: number, dur: number) {
    const ctx = this.ctx!;
    const car = ctx.createOscillator();
    const mod = ctx.createOscillator();
    const modG = ctx.createGain();
    const g = ctx.createGain();
    const f = midi(n);
    car.frequency.value = f;
    mod.frequency.value = f * 2;
    modG.gain.setValueAtTime(f * 0.9, t);
    modG.gain.exponentialRampToValueAtTime(f * 0.05, t + 0.6);
    mod.connect(modG).connect(car.frequency);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    car.connect(g).connect(this.tone);
    car.start(t);
    mod.start(t);
    car.stop(t + dur + 0.1);
    mod.stop(t + dur + 0.1);
  }

  private bass(n: number, t: number, dur: number) {
    const ctx = this.ctx!;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = 'sine';
    o.frequency.value = midi(n);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.09, t + 0.05);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(this.master);
    o.start(t);
    o.stop(t + dur + 0.1);
  }

  private pad(keys: number[], t: number, dur: number) {
    const ctx = this.ctx!;
    keys.slice(0, 3).forEach((n, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = 'triangle';
      o.frequency.value = midi(n + 12);
      o.detune.value = (i - 1) * 6;
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.012, t + dur * 0.4);
      g.gain.linearRampToValueAtTime(0, t + dur);
      o.connect(g).connect(this.reverb);
      o.start(t);
      o.stop(t + dur + 0.1);
    });
  }

  /** Cada capítulo só muda o brilho do som, sem quebrar a música. */
  setChapter(i: number, _force = false) {
    this.chapter = i;
    if (this.ctx) this.tone.frequency.setTargetAtTime(BRIGHT[i % BRIGHT.length], this.ctx.currentTime, 2.5);
  }

  /** Scroll rápido abre um pouco o filtro. */
  push(v: number) {
    if (!this.ctx || !this.enabled) return;
    const base = BRIGHT[this.chapter % BRIGHT.length];
    this.tone.frequency.setTargetAtTime(base + Math.min(1, v) * 700, this.ctx.currentTime, 0.4);
  }

  /** Nota de sino suave (hover em projeto, lanterna). */
  bell(n = 84, vol = 0.04) {
    if (!this.ctx || !this.enabled) return;
    this.epiano(n, this.ctx.currentTime, vol, 3);
  }

  dispose() {
    clearTimeout(this.timer);
    this.vinyl?.stop();
    void this.ctx?.close();
    this.ctx = null;
  }
}
