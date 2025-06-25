import { useEffect, useState } from 'react';

const useMediaQuery = (query) => {
  const mediaQuery = window.matchMedia(query);
  const [matches, setMatches] = useState(mediaQuery.matches);

  const onMediaQueryChange = (event) => {
    setMatches(event.matches);
  };

  useEffect(() => {
    mediaQuery.addEventListener('change', onMediaQueryChange);
  }, []);

  return matches;
};
