import React from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import useHierarchy from '../../hooks/useHierarchy';
import HierarchyTable from '../attributes/HierarchyTable';
import useContentLanguage from '../../hooks/useContentLanguage';
import Placeholder from '../Placeholder';

const ChildrenSection = () => {
  const { t } = useTranslation();
  const { children } = useHierarchy();
  const contentLanguage = useContentLanguage();

  const data = children[contentLanguage] || [];
  const title = t('subunits.title');
  const empty = data.length === 0;

  return (
    <EditableAccordion title={title}>
      <Placeholder empty={empty} placeholder={t('subunits.empty')}>
        <HierarchyTable data={data} summary={title} />
      </Placeholder>
    </EditableAccordion>
  );
};

export default ChildrenSection;
