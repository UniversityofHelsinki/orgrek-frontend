import React from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import HierarchyTable from '../attributes/HierarchyTable';
import useHierarchy from '../../hooks/useHierarchy';
import useContentLanguage from '../../hooks/useContentLanguage';

const ParentsSection = () => {
  const { t } = useTranslation();
  const { parents } = useHierarchy();
  const contentLanguage = useContentLanguage();

  const data = parents[contentLanguage] || [];
  const title = t('upper_units');

  return (
    <EditableAccordion title={title} defaultExpanded>
      <HierarchyTable data={data} summary={title} />
    </EditableAccordion>
  );
};

export default ParentsSection;
