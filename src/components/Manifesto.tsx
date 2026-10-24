import { useLayoutEffect, useRef } from 'react';
import { gsap, prefersReduced, splitWords } from '../lib/motion';

export const MANIFESTO_PIN = 1.4; // duração do pin em alturas de tela

export function Manifesto() {
  const root = useRef<HTMLElement>(null);
  const text = useRef<HTMLParagraphElement>(null);

  useLayoutEffect(() => {
    if (!text.current || prefersReduced()) return;
    const ctx = gsap.context(() => {
      const words = splitWords(text.current!);
      gsap.to(words, {
        opacity: 1,
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${window.innerHeight * MANIFESTO_PIN}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="manifesto" id="manifesto" ref={root} aria-label="Abordagem">
      <div className="manifesto__inner">
        <p className="label">
          <b>00</b> · Abordagem
        </p>
        <p className="manifesto__text" ref={text}>
          Meus projetos mais recentes vivem na parte que ninguém vê: <span className="hl">autenticação, validação, papéis de acesso</span>{' '}
          e regras de negócio. E em interfaces que deixam tudo isso simples para quem usa no dia a dia.
        </p>
      </div>
    </section>
  );
}
