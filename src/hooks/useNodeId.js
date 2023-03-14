import { useSearchParams } from 'react-router-dom';

/**
 * Returns current node id.
 *
 * Value is updated when the current page changes.
 *
 * @return {string}
 */
export const useNodeId = () => {
  const [searchParams] = useSearchParams();
  return searchParams.get('uid');
};
