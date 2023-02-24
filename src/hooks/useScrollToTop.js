import { useLocation, useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';

/**
 * Scrolls to the top of the page when router location changes.
 */
const useScrollToTop = () => {
  const { pathName } = useLocation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathName, searchParams]);
};

export default useScrollToTop;
