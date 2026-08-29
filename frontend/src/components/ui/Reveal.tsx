import React, { useEffect, useRef, useState } from 'react';

/**
 * Scroll-reveal primitive.
 *
 * One IntersectionObserver per element, disconnected as soon as it has fired,
 * so a long page does not keep dozens of live observers around. The actual
 * motion lives in CSS (.reveal / .reveal-type / .reveal-media in index.css),
 * which means `prefers-reduced-motion` is honoured in one place instead of
 * being re-checked by every caller.
 */

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

export const useInView = <T extends HTMLElement>(options?: {
  threshold?: number;
  rootMargin?: string;
}) => {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // No observer support, or the user asked for no motion: show it immediately.
    if (typeof IntersectionObserver === 'undefined' || prefersReducedMotion()) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: options?.threshold ?? 0.12,
        rootMargin: options?.rootMargin ?? '0px 0px -8% 0px',
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [options?.threshold, options?.rootMargin]);

  return { ref, inView };
};

export type RevealVariant = 'fade' | 'type' | 'media';

export interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Stagger in milliseconds. */
  delay?: number;
  variant?: RevealVariant;
  as?: 'div' | 'span' | 'li' | 'section' | 'header' | 'figure';
  children: React.ReactNode;
}

const variantClass: Record<RevealVariant, string> = {
  fade: 'reveal',
  type: 'reveal-type',
  media: 'reveal-media',
};

export const Reveal: React.FC<RevealProps> = ({
  delay = 0,
  variant = 'fade',
  as: Tag = 'div',
  className = '',
  style,
  children,
  ...rest
}) => {
  const { ref, inView } = useInView<HTMLDivElement>();

  // Polymorphic tag: the per-element attribute unions do not unify, so the
  // component is typed against div attributes and rendered through a cast.
  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref as React.Ref<any>}
      data-revealed={inView ? 'true' : 'false'}
      className={`${variantClass[variant]} ${className}`}
      style={{ ...style, ['--reveal-delay' as any]: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Component>
  );
};

/**
 * Display type that rises out of a clipped baseline. Each child line is
 * wrapped so the clip happens per line rather than around the whole block.
 */
export const RevealLines: React.FC<{
  lines: React.ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
}> = ({ lines, className = '', lineClassName = '', delay = 0, stagger = 90 }) => (
  <span className={className}>
    {lines.map((line, i) => (
      <span key={i} className={`reveal-clip ${lineClassName}`}>
        <Reveal as="span" variant="type" delay={delay + i * stagger}>
          {line}
        </Reveal>
      </span>
    ))}
  </span>
);
