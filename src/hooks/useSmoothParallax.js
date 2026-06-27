import { useEffect } from 'react';

/**
 * A high-performance parallax hook that uses cached offsets
 * and requestAnimationFrame to avoid layout thrashing during scroll.
 * 
 * To ensure stability, the `targets` array should be memoized using `useMemo`
 * in the calling component.
 * 
 * @param {Array<{ ref: React.RefObject, factor: number, type?: string, baseOffset?: number }>} targets 
 */
export default function useSmoothParallax(targets, watchVal) {
  useEffect(() => {
    // Respect prefers-reduced-motion media query
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Filter and map targets that are ready
    const items = targets
      .map(target => {
        const el = target.ref.current;
        return {
          element: el,
          factor: target.factor || 0.1,
          type: target.type || 'translateY', // 'translateY', 'translateX', 'scale', etc.
          baseOffset: target.baseOffset || 0,
          offsetTop: 0,
          height: 0,
        };
      })
      .filter(item => item.element !== null);

    if (items.length === 0) return;

    // Helper to calculate element's offset relative to document
    const calculateOffsets = () => {
      items.forEach(item => {
        let offsetTop = 0;
        let el = item.element;
        const height = el.offsetHeight;
        
        while (el) {
          offsetTop += el.offsetTop;
          el = el.offsetParent;
        }
        
        item.offsetTop = offsetTop;
        item.height = height;
      });
    };

    // Calculate initial offsets
    calculateOffsets();

    let animationFrameId = null;

    const updatePositions = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      items.forEach(item => {
        if (!item.element) return;

        const elementOffsetTop = item.offsetTop;
        const elementHeight = item.height;

        // Check if element is in/near viewport
        const startScroll = elementOffsetTop - viewportHeight;
        const endScroll = elementOffsetTop + elementHeight;

        if (scrollY >= startScroll && scrollY <= endScroll) {
          const totalScrollRange = endScroll - startScroll;
          const currentScroll = scrollY - startScroll;
          const progress = totalScrollRange > 0 ? currentScroll / totalScrollRange : 0.5; // 0 to 1
          
          // Center the effect (so at progress 0.5, translation is 0)
          const offset = (progress - 0.5) * viewportHeight * item.factor;

          if (item.type === 'translateY') {
            item.element.style.transform = `translate3d(0, ${offset + item.baseOffset}px, 0) ${item.element.dataset.baseTransform || ''}`;
          } else if (item.type === 'translateX') {
            item.element.style.transform = `translate3d(${offset + item.baseOffset}px, 0, 0) ${item.element.dataset.baseTransform || ''}`;
          } else if (item.type === 'scale') {
            const scale = 1 + (progress - 0.5) * item.factor;
            item.element.style.transform = `scale(${scale}) ${item.element.dataset.baseTransform || ''}`;
          }
        }
      });

      animationFrameId = null;
    };

    const onScroll = () => {
      if (animationFrameId === null) {
        animationFrameId = requestAnimationFrame(updatePositions);
      }
    };

    const onResize = () => {
      calculateOffsets();
      onScroll();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    
    // Trigger initial positioning
    updatePositions();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [targets, watchVal]);
}
