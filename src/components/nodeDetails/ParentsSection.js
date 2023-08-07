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

const asAttribute = (nodeId, uniqueId) => (hierarchy) => ({
  id: hierarchy.edgeId,
  key: uniqueId,
  nodeId: nodeId,
  value: hierarchy.hierarchy,
  startDate: hierarchy.startDate,
  endDate: hierarchy.endDate,
  isNew: Boolean(hierarchy.isNew),
  deleted: Boolean(hierarchy.deleted),
});

const asFormValues = (parents) => {
  return parents.reduce((a, c) => {
    // we add an arbitrary character as yup seems to crash (does not find the schema path) if the string could be cast to integer.
    a[`s${c.uniqueId}`] = c.hierarchies.map(
      asAttribute(c.id, `s${c.uniqueId}`)
    );
    return a;
  }, {});
};

const ParentsSection = ({ showHistory, showFuture }) => {
  const { t } = useTranslation();
  const { parents: parentsByLanguage, isFetching } = useParents();
  const [saveParents] = useSaveParentsMutation();
  const currentNodeId = useNodeId();
  const contentLanguage = useContentLanguage();

  const existingParents = parentsByLanguage[contentLanguage] || [];
  const title = t('upper_units');
  const filteredByDateParents = useFilterUnitsByDate(
    existingParents,
    showHistory,
    showFuture
  );
  const empty = filteredByDateParents.length === 0;
  const initialFormValues = asFormValues(existingParents);
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
            units={existingParents}
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
          <HierarchyTable data={filteredByDateParents} caption={title} />
        </Placeholder>
      </EditableContent>
    </EditableAccordion>
  );
};

export default ParentsSection;
