/**
 * Trilha ambiente generativa, composta ao vivo com a Web Audio API.
 * Nada é um arquivo de áudio: cada capítulo tem seus acordes, o scroll abre o
 * filtro e as notas soltas são sorteadas de uma escala pentatônica.
 */

const midi = (n: number) => 440 * Math.pow(2, (n - 69) / 12);

// Acordes por capítulo (notas MIDI): calmos, com sétimas e nonas.
const CHORDS: number[][] = [
  [48, 55, 59, 64, 71], // Cmaj7 — Início
  [45, 52, 59, 60, 67], // Am9 — Abordagem
  [41, 48, 55, 57, 64], // Fmaj7 — Projetos
  [50, 57, 60, 64, 69], // Dm9 — Sobre
  [52, 59, 62, 67, 71], // Em7 — Ferramentas
  [48, 55, 62, 64, 71], // Cmaj9 — Contato
];
const PENTA = [72, 74, 76, 79, 81, 84, 86, 88];

interface Voice {
  oscs: OscillatorNode[];
  gain: GainNode;
}

export class Ambient {
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private filter!: BiquadFilterNode;
  private reverb!: ConvolverNode;
  private wet!: GainNode;
  private voices: Voice[] = [];
  private chapter = -1;
  private bellTimer = 0;
  private energy = 0;
  private energyRaf = 0;
  enabled = false;

  /** Precisa ser chamado dentro de um gesto do usuário (clique). */
  start() {
    if (!this.ctx) this.build();
    const ctx = this.ctx!;
    void ctx.resume();
    this.enabled = true;
    this.master.gain.cancelScheduledValues(ctx.currentTime);
    this.master.gain.setTargetAtTime(0.5, ctx.currentTime, 1.6);
    this.setChapter(Math.max(0, this.chapter), true);
    this.scheduleBell();
    this.loopEnergy();
  }

  stop() {
    if (!this.ctx) return;
    this.enabled = false;
    this.master.gain.setTargetAtTime(0, this.ctx.currentTime, 0.6);
    clearTimeout(this.bellTimer);
    cancelAnimationFrame(this.energyRaf);
    setTimeout(() => !this.enabled && this.ctx?.suspend(), 2500);
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
    comp.threshold.value = -20;
    comp.ratio.value = 3;
    this.master.connect(comp).connect(ctx.destination);

    this.filter = ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.value = 700;
    this.filter.Q.value = 0.6;

    // Reverb gerado: ruído com decaimento exponencial.
    this.reverb = ctx.createConvolver();
    const len = ctx.sampleRate * 5;
    const ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const d = ir.getChannelData(c);
      for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2);
    }
    this.reverb.buffer = ir;
    this.wet = ctx.createGain();
    this.wet.gain.value = 0.55;
    const dry = ctx.createGain();
    dry.gain.value = 0.45;
    this.filter.connect(dry).connect(this.master);
    this.filter.connect(this.reverb).connect(this.wet).connect(this.master);

    // LFO lento no filtro: o som "respira".
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 0.07;
    lfoGain.gain.value = 180;
    lfo.connect(lfoGain).connect(this.filter.frequency);
    lfo.start();
  }

  /** Troca o acorde com um crossfade longo. */
  setChapter(i: number, force = false) {
    if (!this.ctx || (!force && i === this.chapter)) {
      this.chapter = i;
      return;
    }
    this.chapter = i;
    if (!this.enabled) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;
    this.voices.forEach((v) => {
      v.gain.gain.cancelScheduledValues(now);
      v.gain.gain.setTargetAtTime(0, now, 1.8);
      v.oscs.forEach((o) => o.stop(now + 9));
    });
    this.voices = CHORDS[i % CHORDS.length].map((n, k) => {
      const gain = ctx.createGain();
      gain.gain.value = 0;
      gain.gain.setTargetAtTime(k === 0 ? 0.11 : 0.06, now, 2.4);
      gain.connect(this.filter);
      const oscs = [-7, 0, 7].map((det, j) => {
        const o = ctx.createOscillator();
        o.type = j === 1 ? 'triangle' : 'sawtooth';
        o.frequency.value = midi(n);
        o.detune.value = det + (Math.random() - 0.5) * 4;
        const g = ctx.createGain();
        g.gain.value = j === 1 ? 0.9 : 0.18;
        o.connect(g).connect(gain);
        o.start(now);
        return o;
      });
      return { oscs, gain };
    });
  }

  /** Intensidade do scroll (0…1): abre o filtro e realça o reverb. */
  push(v: number) {
    this.energy = Math.min(1, this.energy + Math.abs(v));
  }

  private loopEnergy = () => {
    if (!this.ctx || !this.enabled) return;
    this.energy *= 0.94;
    const t = this.ctx.currentTime;
    this.filter.frequency.setTargetAtTime(650 + this.energy * 1600, t, 0.25);
    this.energyRaf = requestAnimationFrame(this.loopEnergy);
  };

  /** Uma nota de sino, suave e com eco. */
  bell(n = PENTA[Math.floor(Math.random() * PENTA.length)], vol = 0.05) {
    if (!this.ctx || !this.enabled) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(vol, now + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);
    [1, 2.01, 3.98].forEach((h, i) => {
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.value = midi(n) * h;
      const og = ctx.createGain();
      og.gain.value = [1, 0.25, 0.08][i];
      o.connect(og).connect(g);
      o.start(now);
      o.stop(now + 3.6);
    });
    g.connect(this.reverb);
    g.connect(this.master);
  }

  private scheduleBell() {
    clearTimeout(this.bellTimer);
    if (!this.enabled) return;
    this.bellTimer = window.setTimeout(() => {
      this.bell();
      this.scheduleBell();
    }, 2200 + Math.random() * 4200);
  }

  dispose() {
    clearTimeout(this.bellTimer);
    cancelAnimationFrame(this.energyRaf);
    void this.ctx?.close();
    this.ctx = null;
  }
}
