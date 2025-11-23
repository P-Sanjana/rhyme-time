'use client';

import { useEffect, useRef } from 'react';

const digitPaths: (string | undefined)[] = [
  undefined,
  'M87.9,79.2c1.1-0.4,53.7-39.2,54.9-39.1v180.5',
  'M81.7,85.7c-1.4-67,112.3-55.1,90.2,11.6c-12.6,32-70.6,83.7-88.8,113.7h105.8',
  'M74.8,178.5c3,39.4,63.9,46.7,88.6,23.7c34.3-35.1,5.4-75.8-41.7-77c29.9,5.5,68.7-43.1,36.5-73.7 c-23.4-21.5-76.5-11.1-78.6,25',
];
const Countdown = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const circlesRef = useRef<SVGCircleElement[]>([]);
  const currentRef = useRef(3);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const circlesGroup = svg.querySelector('.circles');
    if (!circlesGroup) return;
    circlesGroup.innerHTML = '';
    const namespace = 'http://www.w3.org/2000/svg';
    circlesRef.current = [];
    for (let i = 0; i < 28; i++) {
      const c = document.createElementNS(namespace, 'circle');
      c.setAttribute('r', '10');
      c.setAttribute('cx', '0');
      c.setAttribute('cy', '0');
      c.classList.add('count-circle');
      c.dataset.index = String(i);
      circlesGroup.appendChild(c);
      circlesRef.current.push(c);
    }

    const animateAlong = (n: number) => {
      const pathEl = svg.querySelector(`#path-${n}`) as SVGPathElement;
      if (!pathEl) return;
      const length = pathEl.getTotalLength();
      const step = length / 28;

      for (let i = 0; i < 28; i++) {
        const pos = pathEl.getPointAtLength(i * step);
        const delay = i * 0.02;
        const circle = circlesRef.current[i];
        circle.setAttribute('cx', String(pos.x));
        circle.setAttribute('cy', String(pos.y));
        if (i % 2 === 0) circle.setAttribute('fill', '#407c51');
        else circle.setAttribute('fill', '#407c51');
        circle.style.transformOrigin = `${pos.x}px ${pos.y}px`;
        circle.style.transitionDelay = `${delay}s`;
        circle.style.opacity = '1';
      }
    };
    animateAlong(currentRef.current);
    let n = 3;
    const timer = setInterval(() => {
      n = n - 1;
      if (n <= 0) {
        animateAlong(1);
        clearInterval(timer);
        return;
      }
      animateAlong(n);
      currentRef.current = n;
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className='flex items-center justify-center p-6'>
      <div className='w-[360px] h-[360px]'>
        <svg
          ref={svgRef}
          viewBox='0 0 320 240'
          className='w-full h-full'
          xmlns='http://www.w3.org/2000/svg'
        >
          <defs>
            <filter id='goo'>
              <feGaussianBlur in='SourceGraphic' stdDeviation='8' result='' />
              <feColorMatrix
                in='blur'
                mode='matrix'
                values='1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 18 -7'
                result='goo'
              />
              <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>
            <path
              id='path-1'
              d={digitPaths[1]}
              fill='none'
              stroke='transparent'
              strokeWidth='2'
            />
            <path
              id='path-2'
              d={digitPaths[2]}
              fill='none'
              stroke='transparent'
              strokeWidth='2'
            />
            <path
              id='path-3'
              d={digitPaths[3]}
              fill='none'
              stroke='transparent'
              strokeWidth='2'
            />
          </defs>
          <rect width='100%' height='100%' fill='transparent' />
          <g filter='url(#goo)' className='circles' />
        </svg>
        <style jsx>{`
          :global(.count-circle) {
            transition: cx 0.6s cubic-bezier(0.22, 1, 0.36, 1),
              cy 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.35s ease,
              opacity 0.25s ease;
            stroke: rgba(0, 0, 0, 0.06);
            stroke-width: 0.6;
            opacity: 0.95;
          }
          :global(svg) {
            will-change: transform;
          }
        `}</style>
      </div>
    </div>
  );
}
export default Countdown;