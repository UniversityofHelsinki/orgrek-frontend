import React from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import useHierarchy from '../../hooks/useHierarchy';
import HierarchyTable from '../attributes/HierarchyTable';
import useContentLanguage from '../../hooks/useContentLanguage';

const ChildrenSection = () => {
  const { t } = useTranslation();
  const { children } = useHierarchy();
  const contentLanguage = useContentLanguage();

  const data = children[contentLanguage] || [];
  const title = t('subunits');

  return (
    <EditableAccordion title={title} defaultExpanded>
      <HierarchyTable data={data} summary={title} />
    </EditableAccordion>
  );
};

export default ChildrenSection;
