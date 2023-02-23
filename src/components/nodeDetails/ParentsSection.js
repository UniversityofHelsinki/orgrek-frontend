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
  const empty = data.length === 0;

  return (
    <EditableAccordion
      title={title}
      empty={empty}
      placeholder={t('upperUnits.empty')}
    >
      <HierarchyTable data={data} summary={title} />
    </EditableAccordion>
  );
};

export default ParentsSection;
