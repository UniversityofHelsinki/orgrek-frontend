import React from 'react';
import Link from '../Link';
import { useTranslation } from 'react-i18next';
import useHierarchies from '../../hooks/useHierarchies';

const NodeLabel = ({ node, labelId, onClick, style }) => {
  const { t } = useTranslation();
  const [hierarchies] = useHierarchies();

  const hierarchiesHidden = hierarchies.every((hierarchy) =>
    node.hierarchies.includes(hierarchy)
  );

  const linkStyle = {
    textDecoration: 'none',
    ...style,
  };

  const hierarchyStyle = {
    color: '#953000',
    paddingLeft: '8px',
    fontSize: '0.86em',
  };

  const asSpans = (hierarchy, i) => {
    return (
      <span key={hierarchy} hidden={hierarchiesHidden} style={hierarchyStyle}>
        {t(hierarchy)}
      </span>
    );
  };

  return (
    <>
      <Link onClick={onClick} node={node.uniqueId} id={labelId} sx={linkStyle}>
        {node.name}
      </Link>
      {node.hierarchies.map(asSpans)}
    </>
  );
};

export default NodeLabel;
