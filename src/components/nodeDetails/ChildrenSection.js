import React, { useState } from 'react';
import EditableAccordion from '../EditableAccordion';
import { useTranslation } from 'react-i18next';
import useContentLanguage from '../../hooks/useContentLanguage';
import Placeholder from '../Placeholder';
import { useSaveChildrenMutation, useSaveChildMutation } from '../../store/api';
import { useNodeId } from '../../hooks/useNodeId';
import { authActions } from '../../auth';
import EditableContent from '../EditableContent';
import RelationEditor from './RelationEditor';
import useFilterUnitsByDate from '../../hooks/useFilterUnitsByDate';
import { defaultSchemaForAttributes } from '../../utils/validations';
import HierarchyTable from '../attributes/HierarchyTable';
import { useChildren } from '../../hooks/useChildren';
import NewUnitForm from './NewUnitForm';
import IfAuthorized from '../../auth/IfAuthorized';
import ActionBar from './ActionBar';
import Button from '../inputs/Button';
import { showNotification } from '../../store';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

const EditAction = ({ newChild, edit }) => {
  const { t } = useTranslation();
  return (
    <IfAuthorized action={authActions.children.edit}>
      <ActionBar>
        <Button variant="outlined" onClick={newChild} data-testid="editButton">
          {t('subunits.newChildButton')}
        </Button>
        <Button variant="outlined" onClick={edit} data-testid="editButton">
          {t('edit_button')}
        </Button>
      </ActionBar>
    </IfAuthorized>
  );
};

const newSearchParams = (currentSearchParams, newNodeId) => {
  const newParams = new URLSearchParams(
    Array.from(currentSearchParams.entries())
  );
  newParams.set('uid', newNodeId);
  return newParams;
};

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

const asFormValues = (children) => {
  return children.reduce((a, c) => {
    // we add an arbitrary character as yup seems to crash (does not find the schema path) if the string could be cast to integer.
    a[`s${c.uniqueId}`] = c.hierarchies.map(
      asAttribute(c.id, `s${c.uniqueId}`)
    );
    return a;
  }, {});
};

const ChildrenSection = () => {
  const { t } = useTranslation();
  const { children: childrenByLanguage, isFetching } = useChildren();
  const dispatch = useDispatch();
  const [currentSearchParams, setSearchParams] = useSearchParams();
  const contentLanguage = useContentLanguage();
  const [showForm, setShowForm] = useState(false);
  const existingChildren = childrenByLanguage[contentLanguage] || [];
  const filteredByDateChildren = useFilterUnitsByDate(existingChildren);
  const [validationSchema, setValidationSchema] = useState();
  const empty = existingChildren.length === 0;
  const initialFormValues = asFormValues(existingChildren);
  const [saveChildren] = useSaveChildrenMutation();
  const [saveChild] = useSaveChildMutation();
  const title = t('subunits.title');
  const currentNodeId = useNodeId();
  const initialValidationSchema = defaultSchemaForAttributes(
    Object.keys(initialFormValues)
  );

  if (isFetching) {
    return <EditableAccordion title={title} loading />;
  }

  const asEdge = (child) => ({
    id: child.id,
    hierarchy: child.value,
    parentUniqueId: currentNodeId,
    startDate: child.startDate,
    endDate: child.endDate,
    isNew: child.isNew,
    deleted: child.deleted,
  });

  const createNewUnit = (child) => {
    return saveChild({ data: child, id: currentNodeId })
      .unwrap()
      .then((response) => {
        dispatch(
          showNotification({
            message: t('subunits.createSuccess'),
            severity: 'success',
          })
        );
        setShowForm(false);
        if (response.childUniqueId) {
          const newNodeId = response.childUniqueId;
          setSearchParams(newSearchParams(currentSearchParams, newNodeId));
        }
      })
      .catch((error) => {
        dispatch(
          showNotification({
            message: t('subunits.createError'),
            severity: 'error',
          })
        );
      });
  };

  const handleSubmit = (children) => {
    const edges = Object.entries(children)
      .map(([key, values]) =>
        values.map((value) => ({
          ...asEdge(value),
          childUniqueId: key.substring(1),
        }))
      )
      .flat();
    return saveChildren({ edges, id: currentNodeId }).unwrap();
  };

  const handleChildChange = (children) => {
    setValidationSchema(defaultSchemaForAttributes(Object.keys(children)));
  };

  const formElement = showForm ? (
    <NewUnitForm
      open={showForm}
      onClose={() => setShowForm(false)}
      handleSubmit={createNewUnit}
    />
  ) : (
    <></>
  );

  return (
    <EditableAccordion title={title} defaultExpanded={!empty}>
      <EditableContent
        editorComponent={
          <RelationEditor
            units={existingChildren}
            onUnitChange={handleChildChange}
            editortitle={t('subunits.newSubUnit')}
          />
        }
        renderActions={({ edit }) => {
          return (
            <EditAction
              edit={edit}
              newChild={() => {
                return setShowForm(true);
              }}
            />
          );
        }}
        validationSchema={validationSchema || initialValidationSchema}
        initialValues={initialFormValues}
        onSubmit={handleSubmit}
        successMessage={t('subunits.saveSuccess')}
        errorMessage={t('subunits.saveError')}
        authActions={authActions.children}
      >
        <Placeholder empty={empty} placeholder={t('upperUnits.empty')}>
          <HierarchyTable data={filteredByDateChildren} summary={title} />
        </Placeholder>
        {formElement}
      </EditableContent>
    </EditableAccordion>
  );
};

export default ChildrenSection;
