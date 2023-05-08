import React from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import HierarchyTable from '../attributes/HierarchyTable';
import useContentLanguage from '../../hooks/useContentLanguage';
import Placeholder from '../Placeholder';
import { authActions } from '../../auth';
import { useNodeId } from '../../hooks/useNodeId';
import EditableContent from '../EditableContent';
import ParentEditor from './ParentEditor';
import { useSaveParentsMutation } from '../../store';
import { useParents } from '../../hooks/useParents';
import useFilterParentsByDate from '../../hooks/useFilterParentsByDate';

const ParentsSection = () => {
  const { t } = useTranslation();
  const { parents, isFetching } = useParents();
  const currentNodeId = useNodeId();
  const contentLanguage = useContentLanguage();

  const data = parents[contentLanguage] || [];
  const title = t('upper_units');
  const empty = data.length === 0;
  const [saveParents] = useSaveParentsMutation();

  const filteredByDateParents = useFilterParentsByDate(data);

  const asAttribute = (nodeId) => (hierarchy) => ({
    id: hierarchy.edgeId,
    nodeId: nodeId,
    value: hierarchy.hierarchy,
    startDate: hierarchy.startDate,
    endDate: hierarchy.endDate,
    isNew: Boolean(hierarchy.isNew),
    deleted: Boolean(hierarchy.deleted),
  });

  const asFormValues = data.reduce((a, c) => {
    a[c.uniqueId] = c.hierarchies.map(asAttribute(c.id));
    return a;
  }, {});

  const asEdge = (parent) => ({
    id: parent.id,
    hierarchy: parent.value,
    childUniqueId: currentNodeId,
    parentUniqueId: '',
    startDate: parent.startDate,
    endDate: parent.endDate,
    isNew: parent.isNew,
    deleted: parent.deleted,
  });

  const handleSubmit = (parents) => {
    const edges = Object.entries(parents)
      .map(([key, values]) =>
        values.map((value) => ({ ...asEdge(value), parentUniqueId: key }))
      )
      .flat();
    return saveParents({ edges, nodeId: currentNodeId }).unwrap();
  };

  if (isFetching) {
    return <EditableAccordion title={title} loading />;
  }

  return (
    <EditableAccordion title={title}>
      <EditableContent
        editorComponent={<ParentEditor />}
        initialValues={asFormValues}
        onSubmit={handleSubmit}
        successMessage={t('parentInfo.saveSuccess')}
        errorMessage={t('parentInfo.saveError')}
        authActions={authActions.parents}
      >
        <Placeholder empty={empty} placeholder={t('upperUnits.empty')}>
          <HierarchyTable data={filteredByDateParents} summary={title} />
        </Placeholder>
      </EditableContent>
    </EditableAccordion>
  );
};

export default ParentsSection;
