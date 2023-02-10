/* eslint-disable complexity */
/* eslint-disable max-lines */
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import {
  Button,
  ButtonGroup,
  DropdownButton,
  Form,
  InputGroup,
  Pagination as BSPagination,
  Table,
  Dropdown as BSDropdown,
  Spinner,
  Container,
  Row as BSRow,
  Col,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import {
  fetchHierarchyFilters,
  updateHierarchyFilter,
  deleteHierarchyFilter,
  insertHierarchyFilters,
  setHierarchyFilters,
} from '../actions/hierarchyFiltersAction';
import { fetchSelectableHierarchies } from '../actions/treeAction';

const FEEDBACK_TIMEOUT_MS = 10000;

const Search = (props) => {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState('');

  const onQueryChange = (event) => {
    setQuery(event.target.value);
    props.onChange(event.target.value);
  };

  return (
    <>
      <InputGroup>
        <InputGroup.Text>&#x1F50D;</InputGroup.Text>
        <Form.Control
          placeholder={t('hierarchy_filters_search_placeholder')}
          value={query}
          onChange={onQueryChange}
        />
      </InputGroup>
    </>
  );
};

const DropDown = (props) => {
  return (
    <DropdownButton title={props.current}>
      {props.items.map((item) => (
        <BSDropdown.Item key={item} onClick={() => props.onClick(item)}>
          {item}
        </BSDropdown.Item>
      ))}
    </DropdownButton>
  );
};

const Header = (props) => {
  const { t, i18n } = useTranslation();
  const [scendings] = useState({
    hierarchy: -1,
    key: -1,
    value: -1,
    startDate: -1,
    endDate: -1,
  });
  const [arrow, setArrow] = useState();

  const onClick = (key) => {
    return () => {
      scendings[key] *= -1;
      props.onClick(key, scendings[key]);
      setArrow(key);
    };
  };

  return (
    <>
      <tr>
        <th>
          <span onClick={onClick('hierarchy')} className="boldHeader">
            {t('hierarchy_filters_hierarchy')}
          </span>
          {arrow === 'hierarchy' && (
            <span className="littleLeftMargin">
              {scendings['hierarchy'] === 1 ? '\u25bd' : '\u25b3'}
            </span>
          )}
        </th>
        <th>
          <span onClick={onClick('key')} className="boldHeader">
            {t('hierarchy_filters_key')}
          </span>
          {arrow === 'key' && (
            <span className="littleLeftMargin">
              {scendings['key'] === 1 ? '\u25bd' : '\u25b3'}
            </span>
          )}
        </th>
        <th>
          <span onClick={onClick('value')} className="boldHeader">
            {t('hierarchy_filters_value')}
          </span>
          {arrow === 'value' && (
            <span className="littleLeftMargin">
              {scendings['value'] === 1 ? '\u25bd' : '\u25b3'}
            </span>
          )}
        </th>
        <th>
          <span onClick={onClick('startDate')} className="boldHeader">
            {t('hierarchy_filters_start_date')}
          </span>
          {arrow === 'startDate' && (
            <span className="littleLeftMargin">
              {scendings['startDate'] === 1 ? '\u25bd' : '\u25b3'}
            </span>
          )}
        </th>
        <th>
          <span onClick={onClick('endDate')} className="boldHeader">
            {t('hierarchy_filters_end_date')}
          </span>
          {arrow === 'endDate' && (
            <span className="littleLeftMargin">
              {scendings['endDate'] === 1 ? '\u25bd' : '\u25b3'}
            </span>
          )}
        </th>
        <th>
          <span className="boldHeader">{t('hierarchy_filters_edit')}</span>
        </th>
      </tr>
    </>
  );
};

const Row = connect(
  (state) => ({
    feedback: state.hierarchyFilters.feedback,
    hierarchyFilters: state.hierarchyFilters.hierarchyFilters,
    user: state.ur.user,
    hierarchies: state.tree.selectableHierarchies,
  }),
  (dispatch) => ({
    updateHierarchyFilter: (hierarchyFilter) =>
      dispatch(updateHierarchyFilter(hierarchyFilter)),
    deleteHierarchyFilter: (hierarchyFilter) =>
      dispatch(deleteHierarchyFilter(hierarchyFilter)),
    setHierarchyFilters: (hierarchyFilters) =>
      dispatch(setHierarchyFilters(hierarchyFilters)),
  })
)((props) => {
  const { t, i18n } = useTranslation();
  const [edit, setEdit] = useState(false);
  const [modified, setModified] = useState({ ...props.hierarchyFilter });
  const [hierarchyFilter, setHierarchyFilter] = useState(props.hierarchyFilter);
  const [saveInProgress, setSaveInProgress] = useState(false);
  const [deletionInProgress, setDeletionInProgress] = useState(false);
  const [awaitingSaveFeedback, setAwaitingSaveFeedback] = useState(false);
  const [awaitingDeletionFeedback, setAwaitingDeletionFeedback] =
    useState(false);
  const [feedback, setFeedback] = useState();
  const [feedbackTimeoutID, setFeedbackTimeoutID] = useState();
  const [validationErrorMessages, setValidationErrorMessages] = useState({});

  useEffect(() => {
    setHierarchyFilter(props.hierarchyFilter);
    setModified({ ...props.hierarchyFilter });
  }, [props.hierarchyFilter]);

  useEffect(() => {
    if (feedbackTimeoutID) {
      clearTimeout(feedbackTimeoutID);
    }
  }, []);

  useEffect(() => {
    if (awaitingSaveFeedback) {
      if (feedbackTimeoutID) {
        clearTimeout(feedbackTimeoutID);
      }
      const timeoutID = setTimeout(setFeedback, FEEDBACK_TIMEOUT_MS);
      setFeedbackTimeoutID(timeoutID);
      setAwaitingSaveFeedback(false);
      setSaveInProgress(false);
      setFeedback(props.feedback);
      if (props.feedback.success && props.feedback.hierarchyFilter) {
        setEdit(false);
        setHierarchyFilter(props.feedback.hierarchyFilter);
        setModified({ ...props.feedback.hierarchyFilter });
        if (props.onHierarchyFilterUpdated) {
          props.onHierarchyFilterUpdated(props.feedback.hierarchyFilter);
        }
      }
      return () => {
        if (timeoutID) {
          clearTimeout(timeoutID);
        }
      };
    }
    if (awaitingDeletionFeedback) {
      setAwaitingDeletionFeedback(false);
      setDeletionInProgress(false);
      props.setExternalFeedback(props.feedback);
      if (props.feedback.success) {
        setEdit(false);
        props.setHierarchyFilters([
          ...props.hierarchyFilters.filter((t) => t.id !== hierarchyFilter.id),
        ]);
      }
    }
  }, [props.feedback]);

  const toggleEdit = () => {
    setModified({ ...hierarchyFilter });
    setEdit(!edit);
  };

  const onChange = (event, column) => {
    setModified({ ...modified, [column]: event.target.value });
  };

  const save = () => {
    setSaveInProgress(true);
    setAwaitingSaveFeedback(true);
    props.updateHierarchyFilter({ ...modified });
  };

  const remove = () => {
    setDeletionInProgress(true);
    setAwaitingDeletionFeedback(true);
    props.deleteHierarchyFilter({ ...modified });
  };

  const notModified = () => {
    return Object.keys(hierarchyFilter).every(
      (key) => hierarchyFilter[key] === modified[key]
    );
  };

  const isValid = () => {
    const sd = modified.startDate && new Date(modified.startDate);
    const ed = modified.endDate && new Date(modified.endDate);
    if (sd && ed) {
      return ed > sd;
    }
    return true;
  };

  const startDate = modified.startDate && new Date(modified.startDate);
  const startDateValue =
    startDate &&
    `${startDate.getFullYear()}-${new String(startDate.getMonth() + 1).padStart(
      2,
      '0'
    )}-${new String(startDate.getDate()).padStart(2, '0')}`;
  const endDate = modified.endDate && new Date(modified.endDate);
  const endDateValue =
    endDate &&
    `${endDate.getFullYear()}-${new String(endDate.getMonth() + 1).padStart(
      2,
      '0'
    )}-${new String(endDate.getDate()).padStart(2, '0')}`;

  return (
    <tr>
      <td>
        {edit ? (
          <Form.Select
            value={modified.hierarchy}
            onChange={(e) => onChange(e, 'hierarchy')}
          >
            {props.hierarchies
              .filter((h) => h !== 'history')
              .map((hierarchy) => (
                <option key={hierarchy} value={hierarchy}>
                  {t(hierarchy)}
                </option>
              ))}
          </Form.Select>
        ) : (
          t(hierarchyFilter.hierarchy)
        )}
        {validationErrorMessages.hierarchy && (
          <span className="warningText">
            {t(validationErrorMessages.hierarchy)}
          </span>
        )}
      </td>
      <td>
        {edit ? (
          <>
            <Form.Control
              value={modified.key}
              onChange={(e) => onChange(e, 'key')}
            />
          </>
        ) : (
          modified.key
        )}
      </td>
      <td onClick={() => !edit && toggleEdit()}>
        {edit ? (
          <>
            <Form.Control
              value={modified.value}
              onChange={(e) => onChange(e, 'value')}
            />
          </>
        ) : (
          <span>{hierarchyFilter.value || ''}</span>
        )}
        {validationErrorMessages.value && (
          <span className="warningText">
            {t(validationErrorMessages.value)}
          </span>
        )}
      </td>
      <td>
        {edit ? (
          <>
            <input
              type="date"
              value={startDateValue || ''}
              onChange={(e) => onChange(e, 'startDate')}
            />
          </>
        ) : modified.startDate ? (
          new Date(modified.startDate).toLocaleDateString('fi-FI')
        ) : (
          ''
        )}
        {validationErrorMessages.startDate && (
          <span className="warningText">
            {t(validationErrorMessages.startDate)}
          </span>
        )}
      </td>
      <td>
        {edit ? (
          <>
            <input
              type="date"
              value={endDateValue || ''}
              onChange={(e) => onChange(e, 'endDate')}
            />
          </>
        ) : modified.endDate ? (
          new Date(modified.endDate).toLocaleDateString('fi-FI')
        ) : (
          ''
        )}
        {validationErrorMessages.endDate && (
          <span className="warningText">
            {t(validationErrorMessages.endDate)}
          </span>
        )}
      </td>
      <td style={{ textAlign: 'center' }}>
        {edit ? (
          <ButtonGroup vertical>
            <Button size="sm" variant="warning" onClick={toggleEdit}>
              {t('hierarchy_filters_cancel_button')}
            </Button>
            <Button
              size="sm"
              variant="success"
              onClick={save}
              disabled={saveInProgress || notModified() || !isValid()}
            >
              {saveInProgress ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  <span style={{ marginLeft: '10px' }}>
                    {t('hierarchy_filters_save_in_progress')}
                  </span>
                </>
              ) : (
                t('hierarchy_filters_save_button')
              )}
            </Button>
            <DropdownButton
              disabled={deletionInProgress}
              size="sm"
              as={ButtonGroup}
              title={
                deletionInProgress ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span style={{ marginLeft: '10px' }}>
                      {t('hierarchy_filters_deletion_in_progress')}
                    </span>
                  </>
                ) : (
                  t('hierarchy_filters_delete_button')
                )
              }
              variant="danger"
            >
              <Dropdown.Item onClick={remove}>
                {t('hierarchy_filters_delete_confirm')}
              </Dropdown.Item>
            </DropdownButton>
            {feedback && (
              <span className={feedback.success ? '' : 'error'}>
                {t(feedback.message)}
                <br />
                {feedback.success ||
                  `${t('status_code')}: ${feedback.statusCode}`}
              </span>
            )}
          </ButtonGroup>
        ) : (
          <>
            <Button size="sm" onClick={toggleEdit}>
              {t('hierarchy_filters_edit_button')}
            </Button>
            <div>
              {feedback && (
                <span className={feedback.success ? '' : 'error'}>
                  {t(feedback.message)}
                  <br />
                  {feedback.success ||
                    `${t('status_code')}: ${feedback.statusCode}`}
                </span>
              )}
            </div>
          </>
        )}
      </td>
    </tr>
  );
});

const FormRow = (props) => {
  const { t, i18n } = useTranslation();
  const [hierarchyFilter, setHierarchyFilter] = useState({});
  const [valid, setValid] = useState(false);

  const isValid = (hierarchyFilter) => {
    const sd = hierarchyFilter.startDate && new Date(hierarchyFilter.startDate);
    const ed = hierarchyFilter.endDate && new Date(hierarchyFilter.endDate);
    if (sd && ed && ed < sd) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    setHierarchyFilter({ ...props.hierarchyFilter });
  }, [props.hierarchyFilter]);

  useEffect(() => {
    setValid(isValid(hierarchyFilter));
  }, [hierarchyFilter]);

  const onChange = (key, value) => {
    setHierarchyFilter({
      ...hierarchyFilter,
      [key]: value,
    });
    props.onChange(key, value);
  };

  return (
    <tr>
      <td>
        <Form.Select
          value={hierarchyFilter.hierarchy}
          onChange={(e) => onChange('hierarchy', e.target.value)}
        >
          {props.hierarchies
            .filter((h) => h !== 'history')
            .map((hierarchy) => (
              <option key={hierarchy} value={hierarchy}>
                {t(hierarchy)}
              </option>
            ))}
        </Form.Select>
      </td>
      <td>
        <InputGroup>
          <Form.Control
            placeholder={t('hierarchy_filters_key')}
            value={hierarchyFilter.key || ''}
            onChange={(e) => onChange('key', e.target.value)}
          />
        </InputGroup>
      </td>
      <td>
        <InputGroup>
          <Form.Control
            placeholder={t('hierarchy_filters_value')}
            value={hierarchyFilter.value || ''}
            onChange={(e) => onChange('value', e.target.value)}
          />
        </InputGroup>
      </td>
      <td>
        <input
          type="date"
          value={hierarchyFilter.startDate || ''}
          onChange={(e) => onChange('startDate', e.target.value)}
        />
        {/* end date comes before start date ? <span>end date comes before start date</span> */}
      </td>
      <td>
        <input
          type="date"
          value={hierarchyFilter.endDate || ''}
          onChange={(e) => onChange('endDate', e.target.value)}
        />
        {/* end date comes before start date ? <span>end date comes before start date</span> */}
      </td>
      <td style={{ textAlign: 'center' }}>
        <Button
          hidden={props.hideDeleteButton}
          onClick={props.onDelete}
          variant="outline-danger"
        >
          <b>-</b> {t('hierarchy_filters_delete_row')}
        </Button>
      </td>
    </tr>
  );
};

const Pagination = (props) => {
  const [pageNo, setPageNo] = useState(1);
  useEffect(() => {
    setPageNo(props.pageNo);
  }, [props.pageNo]);
  const onClick = (event, pNo) => {
    if (pNo < 0 || pNo > Math.ceil(props.elements / props.itemsPerPage)) {
      return;
    }
    setPageNo(pNo);
    props.onClick(pNo);
  };

  return (
    <BSPagination>
      <BSPagination.First onClick={(e) => onClick(e, 1)} />
      <BSPagination.Prev onClick={(e) => onClick(e, pageNo - 1)} />
      {[...Array(Math.ceil(props.elements / props.itemsPerPage))]
        .map((_, i) => (
          <BSPagination.Item
            key={i}
            active={i + 1 === pageNo}
            onClick={(e) => onClick(e, i + 1)}
          >
            {i + 1}
          </BSPagination.Item>
        ))
        .slice(
          Math.max(0, pageNo - 1 - Math.floor(5 / 2)),
          Math.max(5, pageNo + Math.floor(5 / 2))
        )}
      <BSPagination.Next onClick={(e) => onClick(e, pageNo + 1)} />
      <BSPagination.Last
        onClick={(e) =>
          onClick(e, Math.ceil(props.elements / props.itemsPerPage))
        }
      />
    </BSPagination>
  );
};

const HierarchyFilters = (props) => {
  const { t, i18n } = useTranslation();
  const [pageNo, setPageNo] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [hierarchyFilters, setHierarchyFilters] = useState(
    props.hierarchyFilters
  );
  const [updatedHierarchyFilters, setUpdatedHierarchyFilters] = useState([]);
  const [formRows, setFormRows] = useState([{}]);
  const [showWarning, setShowWarning] = useState(false);
  const [areNewHierarchyFiltersValid, setAreNewHierarchyFiltersValid] =
    useState(false);
  const [
    saveNewHierarchyFiltersInProgress,
    setSaveNewHierarchyFiltersInProgress,
  ] = useState(false);
  const [awaitingFeedback, setAwaitingFeedback] = useState(false);
  const [feedback, setFeedback] = useState();
  const [feedbackTimeoutID, setFeedbackTimeoutID] = useState();
  const [searchQuery, setSearchQuery] = useState();

  useEffect(() => {
    props.fetchHierarchyFilters();
    props.fetchHierarchies();
    if (feedbackTimeoutID) {
      clearTimeout(feedbackTimeoutID);
    }
  }, []);

  useEffect(() => {
    if (awaitingFeedback) {
      if (feedbackTimeoutID) {
        clearTimeout(feedbackTimeoutID);
      }
      setAwaitingFeedback(false);
      setSaveNewHierarchyFiltersInProgress(false);
      setFeedback(props.feedback);
      setFeedbackTimeoutID(setTimeout(setFeedback, FEEDBACK_TIMEOUT_MS));
      if (props.feedback.success && props.feedback.hierarchyFilters) {
        setAreNewHierarchyFiltersValid(false);
        setShowWarning(false);
        setFormRows([
          ...formRows.map((row) => undefined),
          { hierarchy: props.hierarchies[0] },
        ]);
        props.setHierarchyFilters([
          ...props.hierarchyFilters,
          ...props.feedback.hierarchyFilters,
        ]);
      }
    }
  }, [props.feedback]);

  useEffect(() => {
    setFormRows(
      formRows.map((row) => ({ ...row, hierarchy: props.hierarchies[0] }))
    );
  }, [props.hierarchies]);

  const pageChange = (pNo) => {
    setPageNo(pNo);
  };

  const sort = (by, scending) => {
    setHierarchyFilters(
      [...hierarchyFilters].sort((a, b) => {
        if (a[by] === b[by]) {
          return 0;
        } else if (a[by] === null) {
          return 1 * scending;
        } else if (b[by] === null) {
          return -1 * scending;
        }
        return a[by].localeCompare(b[by]) * scending;
      })
    );
  };

  useEffect(() => {
    const currentHierarchyFilters = props.hierarchyFilters.map((hf) => {
      const found = updatedHierarchyFilters.find((uhf) => uhf.id === hf.id);
      return found || hf;
    });
    if (searchQuery && searchQuery.length > 0) {
      setHierarchyFilters(
        currentHierarchyFilters.filter((hierarchy) => {
          const includedFields = ['hierarchy', 'key', 'value'];
          return includedFields.some((field) => {
            return hierarchy[field]?.toLowerCase().includes(searchQuery);
          });
        })
      );
    } else {
      setHierarchyFilters(currentHierarchyFilters);
    }
  }, [searchQuery, props.hierarchyFilters]);

  const searchQueryChange = (value) => {
    setSearchQuery(value);
    setPageNo(1);
  };

  const itemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setPageNo(1);
  };

  const deleteFormRow = (idx) => {
    setFormRows([
      ...formRows.map((_, i) => (i === idx ? undefined : formRows[i])),
    ]);
  };

  const alreadyExists = (key, language) => {
    return false;
    /* if the P wants that key and value pair should be unique, check it here*/
  };

  const isValid = (hierarchyFilter) => {
    /* add more validations here for the new hierarchy filters */
    const sd = hierarchyFilter.startDate && new Date(hierarchyFilter.startDate);
    const ed = hierarchyFilter.endDate && new Date(hierarchyFilter.endDate);
    if (sd && ed && ed < sd) {
      return false;
    }
    return true;
  };

  const onFormRowChange = (key, value, i) => {
    const updated = [
      ...formRows.map((r, ri) => (i === ri ? { ...r, [key]: value } : r)),
    ];
    setFormRows(updated);
  };

  useEffect(() => {
    setAreNewHierarchyFiltersValid(formRows.filter((r) => r).every(isValid));
  }, [formRows]);

  const saveNewHierarchyFilters = () => {
    setSaveNewHierarchyFiltersInProgress(true);
    setAwaitingFeedback(true);
    props.insertHierarchyFilters(formRows.filter((r) => r));
  };

  const timeoutFeedback = (feedback, ms = FEEDBACK_TIMEOUT_MS) => {
    if (feedbackTimeoutID) {
      clearTimeout(feedbackTimeoutID);
    }
    setFeedback(feedback);
    setFeedbackTimeoutID(setTimeout(setFeedback, ms));
  };

  const onHierarchyFilterUpdated = (updatedHierarchyFilter) => {
    const duplicateRemoved = updatedHierarchyFilters.filter(
      (hierarchyFilter) => hierarchyFilter.id !== updatedHierarchyFilter.id
    );
    setUpdatedHierarchyFilters([...duplicateRemoved, updatedHierarchyFilter]);
  };

  return (
    <Container>
      <BSRow
        className="justify-content-between"
        style={{ marginTop: '10px', marginBottom: '10px' }}
      >
        <Col sm={6}>
          <Search onChange={searchQueryChange} />
        </Col>
        <Col md="auto">
          <DropDown
            current={itemsPerPage}
            onClick={itemsPerPageChange}
            items={[12, 24, 48, 96]}
          />
        </Col>
      </BSRow>
      <BSRow>
        <Col>
          <Table hover bordered striped className="align-middle">
            <thead>
              <Header onClick={sort} />
            </thead>
            <tbody>
              {hierarchyFilters
                .slice((pageNo - 1) * itemsPerPage, pageNo * itemsPerPage)
                .map((hierarchyFilter, i) => (
                  <Row
                    key={hierarchyFilter.id}
                    hierarchyFilter={hierarchyFilter}
                    setExternalFeedback={(feedback) =>
                      timeoutFeedback(feedback)
                    }
                    onHierarchyFilterUpdated={onHierarchyFilterUpdated}
                  />
                ))}
            </tbody>
            <tfoot>
              {formRows.map(
                (row, i) =>
                  row && (
                    <FormRow
                      onChange={(key, value) => onFormRowChange(key, value, i)}
                      hideDeleteButton={formRows.filter((r) => r).length === 1}
                      onDelete={() => deleteFormRow(i)}
                      key={i}
                      hierarchyFilter={row}
                      alreadyExists={alreadyExists}
                      hierarchies={props.hierarchies}
                    />
                  )
              )}
            </tfoot>
          </Table>
        </Col>
      </BSRow>
      <BSRow className="justify-content-between">
        <Col md="auto">
          <Pagination
            pageNo={pageNo}
            itemsPerPage={itemsPerPage}
            elements={hierarchyFilters.length}
            onClick={pageChange}
          />
        </Col>
        <Col md="auto">
          {feedback && (
            <span className={feedback.success ? '' : 'error'}>
              {feedback.message}
              <br />
              {feedback.success ||
                `${t('status_code')}: ${feedback.statusCode}`}
            </span>
          )}
        </Col>
        <Col md="auto">
          <BSRow className="justify-content-end">
            <Col md="auto">
              <Button
                onClick={() =>
                  setFormRows([
                    ...formRows,
                    { hierarchy: props.hierarchies[0] },
                  ])
                }
                disabled={saveNewHierarchyFiltersInProgress}
                variant="outline-secondary"
              >
                <b>+</b> {t('add_new_row')}
              </Button>
            </Col>
            <Col
              md="auto"
              onClick={
                !areNewHierarchyFiltersValid ||
                saveNewHierarchyFiltersInProgress
                  ? () => setShowWarning(true)
                  : () => {}
              }
            >
              <Button
                onClick={saveNewHierarchyFilters}
                disabled={
                  !areNewHierarchyFiltersValid ||
                  saveNewHierarchyFiltersInProgress
                }
                variant="success"
              >
                {saveNewHierarchyFiltersInProgress ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span style={{ marginLeft: '10px' }}>
                      {t('hierarchy_filters_save_new_rows_in_progress')}
                    </span>
                  </>
                ) : (
                  t('hierarchy_filters_save_new_rows')
                )}
              </Button>
            </Col>
          </BSRow>
        </Col>
      </BSRow>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  hierarchyFilters: state.hierarchyFilters.hierarchyFilters,
  user: state.ur.user,
  feedback: state.hierarchyFilters.feedback,
  hierarchies: state.tree.selectableHierarchies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchHierarchyFilters: () => dispatch(fetchHierarchyFilters()),
  insertHierarchyFilters: (hierarchyFilters) =>
    dispatch(insertHierarchyFilters(hierarchyFilters)),
  setHierarchyFilters: (hierarchyFilters) =>
    dispatch(setHierarchyFilters(hierarchyFilters)),
  fetchHierarchies: () => dispatch(fetchSelectableHierarchies()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HierarchyFilters);
