import { useLayoutEffect, useRef } from 'react';
import { gsap, prefersReduced } from '../lib/motion';
import { Arrow, GitHubIcon } from './Logo';
import { MotionToggle, useMagnetic } from './Chrome';
import { profile } from '../data/content';

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const cta = useMagnetic<HTMLAnchorElement>(0.35);
  const gh = useMagnetic<HTMLAnchorElement>(0.35);

  useLayoutEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.15 });
      tl.from('.hero__tag', { autoAlpha: 0, x: -20, duration: 0.8 })
        .from('.hero__title .mask > span', { yPercent: 110, rotate: 2, duration: 1.2, stagger: 0.09 }, '<0.05')
        .from('.hero__lead', { autoAlpha: 0, y: 16, duration: 0.9 }, '-=0.8')
        .from('.hero__actions > *', { autoAlpha: 0, y: 16, duration: 0.8, stagger: 0.07 }, '<0.1')
        .from('.hero__bar', { autoAlpha: 0, duration: 1 }, '<0.2');

      // Ao rolar, o título se afasta em camadas.
      gsap.to('.hero__title .l1', { xPercent: -6, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.hero__title .l2', { xPercent: 5, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.hero__title .l3', { xPercent: -3, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('.hero__body', { autoAlpha: 0.15, y: -60, ease: 'none', scrollTrigger: { trigger: root.current, start: '30% top', end: 'bottom top', scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" id="top" ref={root} aria-labelledby="hero-title">
      <div className="hero__body">
        <p className="hero__tag label">
          <i /> <b>NX</b> · Paulo Silva<span className="hide-sm"> · desenvolvedor full stack</span>
        </p>
        <h1 className="hero__title" id="hero-title">
          <span className="mask l1">
            <span>Software para</span>
          </span>
          <span className="mask indent l2">
            <span>
              <span className="thin">quem</span> opera
            </span>
          </span>
          <span className="mask l3">
            <span>
              o negócio<em>.</em>
            </span>
          </span>
        </h1>
        <div className="hero__foot">
          <p className="hero__lead">
            Sou <strong>Paulo Silva</strong>. Construo ERPs, APIs REST e automações com TypeScript, JavaScript e Python. Este é o
            meu laboratório: <strong>NeutronX</strong>.
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="#projetos" ref={cta}>
              Explorar projetos <Arrow />
            </a>
            <a className="btn btn--ghost" href={profile.github} target="_blank" rel="noopener noreferrer" ref={gh}>
              <GitHubIcon /> GitHub
            </a>
          </div>
        </div>
      </div>
      <div className="hero__bar">
        <a href="#manifesto" className="scroll-cue label" aria-label="Rolar para a próxima seção">
          <span className="scroll-cue__track" /> Role para explorar
        </a>
        <MotionToggle />
      </div>
    </section>
  );
}
