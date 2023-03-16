import {
  useSearchParams,
  useNavigate as useRouterNavigate,
} from 'react-router-dom';

/**
 * Use this hook to navigate within the app.
 *
 * Customized version of React Router useNavigate hook, which preserves current
 * query parameters, i.e. current hierarchies are included in the link when
 * navigating to another node.
 */
const useNavigate = () => {
  const [searchParams] = useSearchParams();
  const navigate = useRouterNavigate();

  return ({ to, node, hierarchies }) => {
    const toParams = new URLSearchParams(searchParams.toString());

    if (hierarchies) {
      toParams.set('hierarchies', hierarchies);
    }

    if (node) {
      toParams.set('uid', node);
    }

    navigate(`${to || ''}?${toParams.toString()}`);
  };
};

export default useNavigate;
