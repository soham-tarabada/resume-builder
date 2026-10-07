import { useCallback, useEffect, useState } from 'react';

export type Route = 'home' | 'builder';

const readRoute = (): Route => (window.location.hash.startsWith('#/builder') ? 'builder' : 'home');

/** Tiny hash router: works on GitHub Pages with no server rewrites. */
export const useHashRoute = () => {
  const [route, setRoute] = useState<Route>(readRoute);

  useEffect(() => {
    const onChange = () => {
      setRoute(readRoute());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const navigate = useCallback((next: Route) => {
    window.location.hash = next === 'builder' ? '#/builder' : '#/';
  }, []);

  return { route, navigate };
};
