import React, { useState } from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import HierarchyTable from '../attributes/HierarchyTable';
import useContentLanguage from '../../hooks/useContentLanguage';
import Placeholder from '../Placeholder';
import { authActions } from '../../auth';
import { useNodeId } from '../../hooks/useNodeId';
import EditableContent from '../EditableContent';
import RelationEditor from './RelationEditor';
import { useSaveParentsMutation } from '../../store';
import { useParents } from '../../hooks/useParents';
import useFilterUnitsByDate from '../../hooks/useFilterUnitsByDate';
import { defaultSchemaForAttributes } from '../../utils/validations';
import { valueComparator } from '../admin/fieldComparator';

const asAttribute = (nodeId, uniqueId) => (edge) => ({
  id: edge.id,
  key: uniqueId,
  nodeId: nodeId,
  value: edge.hierarchy,
  startDate: edge.startDate,
  endDate: edge.endDate,
  isNew: Boolean(edge.isNew),
  deleted: Boolean(edge.deleted),
});

const asFormValues = (parents) => {
  return parents.reduce((a, parent) => {
    // we add an arbitrary character as yup seems to crash (does not find the schema path) if the string could be cast to integer.
    a[`s${parent.node.uniqueId}`] = parent.edges.map(
      asAttribute(parent.node.id, `s${parent.node.uniqueId}`)
    );
    return a;
  }, {});
};

const ParentsSection = ({ showHistory, showFuture }) => {
  const { t } = useTranslation();
  const { parents, isFetching } = useParents();
  const [saveParents] = useSaveParentsMutation();
  const contentLanguage = useContentLanguage();
  const currentNodeId = useNodeId();

  const title = t('upper_units');
  const visibleParents = useFilterUnitsByDate(parents, showHistory, showFuture);
  const empty = visibleParents.length === 0;
  const initialFormValues = asFormValues(parents);
  const initialValidationSchema = defaultSchemaForAttributes(
    Object.keys(initialFormValues)
  );
  const [validationSchema, setValidationSchema] = useState();

  if (isFetching) {
    return <EditableAccordion title={title} loading />;
  }

  const asEdge = (parent) => ({
    id: parent.id,
    hierarchy: parent.value,
    childUniqueId: currentNodeId,
    startDate: parent.startDate,
    endDate: parent.endDate,
    isNew: parent.isNew,
    deleted: parent.deleted,
  });

  const handleSubmit = (parents) => {
    const edges = Object.entries(parents)
      .map(([key, values]) =>
        values.map((value) => ({
          ...asEdge(value),
          parentUniqueId: key.substring(1),
        }))
      )
      .flat();
    return saveParents({ edges, id: currentNodeId }).unwrap();
  };

  const handleParentChange = (parents) => {
    setValidationSchema(defaultSchemaForAttributes(Object.keys(parents)));
  };

  return (
    <EditableAccordion title={title} defaultExpanded={!empty}>
      <EditableContent
        editorComponent={
          <RelationEditor
            units={parents}
            onUnitChange={handleParentChange}
            editortitle={t('upperUnits.newUpperUnit')}
          />
        }
        validationSchema={validationSchema || initialValidationSchema}
        initialValues={initialFormValues}
        onSubmit={handleSubmit}
        successMessage={t('upperUnits.saveSuccess')}
        errorMessage={t('upperUnits.saveError')}
        authActions={authActions.parents}
      >
        <Placeholder empty={empty} placeholder={t('upperUnits.empty')}>
          <HierarchyTable
            data={visibleParents.sort(
              valueComparator((p) => p.node.names[contentLanguage])
            )}
            caption={title}
          />
        </Placeholder>
      </EditableContent>
    </EditableAccordion>
  );
};

export default ParentsSection;
