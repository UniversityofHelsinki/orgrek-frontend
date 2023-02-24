import React from 'react';
import { Link as RouterLink, useSearchParams } from 'react-router-dom';
import MuiLink from '@mui/material/Link';

/**
 * Use this component to create links within the app.
 *
 * Styled as MUI Link but behaves like a router link.
 * Preserves current query parameters, i.e. current hierarchies are included
 * in the link when linking to another node.
 *
 * @param to router path
 * @param node uid query param
 * @param hierarchies hierarchies query param
 * @param props any other props passed to MUI and router Link
 */
const Link = ({ to, node, hierarchies, ...props }) => {
  const [searchParams] = useSearchParams();

  const toParams = new URLSearchParams(searchParams.toString());

  if (hierarchies) {
    toParams.set('hierarchies', hierarchies);
  }

  if (node) {
    toParams.set('uid', node);
  }

  return (
    <MuiLink
      component={RouterLink}
      {...props}
      to={`${to || ''}?${toParams.toString()}`}
    />
  );
};

export default Link;
