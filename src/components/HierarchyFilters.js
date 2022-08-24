/* eslint-disable max-lines */
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import {
    Button, ButtonGroup, DropdownButton, Form,
    InputGroup, Pagination as BSPagination,
    Table, Dropdown as BSDropdown, Spinner,
    Container, Row as BSRow, Col
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { fetchHierarchyFilters, updateHierarchyFilter, deleteHierarchyFilter, insertHierarchyFilters, setHierarchyFilters } from '../actions/hierarchyFiltersAction';

const FEEDBACK_TIMEOUT_MS = 10000;

const Search = (props) => {
    const { t, i18n } = useTranslation();
    const [query, setQuery] = useState('');

    const onQueryChange = (event) => {
        setQuery(event.target.value);
        props.onChange(event.target.value);
    };

    return (<>
        <InputGroup>
            <InputGroup.Text>&#x1F50D;</InputGroup.Text>
            <Form.Control placeholder={t('hierarchy_filters_search_placeholder')} value={query} onChange={onQueryChange} />
        </InputGroup>
    </>);
};

const DropDown = (props) => {
    return (
        <DropdownButton title={props.current}>
            {props.items.map(item =>
                <BSDropdown.Item key={item} onClick={() => props.onClick(item)}>{item}</BSDropdown.Item>
            )}
        </DropdownButton>
    );
};

const Header = (props) => {
    const { t, i18n } = useTranslation();
    const [scendings] = useState({ key: -1, value: -1, language: -1, user_name: -1, timestamp: -1 });
    const [arrow, setArrow] = useState();

    const onClick = (key) => {
        return () => {
            scendings[key] *= -1;
            props.onClick(key, scendings[key]);
            setArrow(key);
        };
    };

    return (<>
            <tr>
                <th>
                    <span onClick={onClick('id')} className='boldHeader'>{t('hierarchy_filters_id')}</span>
                    {arrow === 'id' && <span className='littleLeftMargin'>{scendings['id'] === 1 ? '\u25bd' : '\u25b3' }</span>}
                </th>
                <th>
                    <span onClick={onClick('hierarchy')} className='boldHeader'>{t('hierarchy_filters_hierarchy')}</span>
                    {arrow === 'hierarchy' && <span className='littleLeftMargin'>{scendings['hierarchy'] === 1 ? '\u25bd' : '\u25b3' }</span>}
                </th>
                <th>
                    <span onClick={onClick('key')} className='boldHeader'>{t('hierarchy_filters_key')}</span>
                    {arrow === 'key' && <span className='littleLeftMargin'>{scendings['key'] === 1 ? '\u25bd' : '\u25b3' }</span>}
                </th>
                <th>
                    <span onClick={onClick('value')} className='boldHeader'>{t('hierarchy_filters_value')}</span>
                    {arrow === 'value' && <span className='littleLeftMargin'>{scendings['value'] === 1 ? '\u25bd' : '\u25b3' }</span>}
                </th>
                <th>
                    <span onClick={onClick('startDate')} className='boldHeader'>{t('hierarchy_filters_start_date')}</span>
                    {arrow === 'startDate' && <span className='littleLeftMargin'>{scendings['startDate'] === 1 ? '\u25bd' : '\u25b3' }</span>}
                </th>
                <th>
                    <span onClick={onClick('endDate')} className='boldHeader'>{t('hierarchy_filters_end_date')}</span>
                    {arrow === 'endDate' && <span className='littleLeftMargin'>{scendings['endDate'] === 1 ? '\u25bd' : '\u25b3' }</span>}
                </th>
                <th>
                    <span className='boldHeader'>{t('hierarchy_filters_edit')}</span>
                </th>
            </tr>
    </>);
};

const Row = connect(
        (state) => ({ feedback: state.hierarchyFilters.feedback, hierarchyFilters: state.hierarchyFilters.hierarchyFilters, user: state.ur.user }),
        (dispatch) => ({
            updateHierarchyFilter: (hierarchyFilter) => dispatch(updateHierarchyFilter(hierarchyFilter)),
            deleteHierarchyFilter: (hierarchyFilter) => dispatch(deleteHierarchyFilter(hierarchyFilter)),
            setHierarchyFilters: (hierarchyFilters) => dispatch(setHierarchyFilters(hierarchyFilters))
        }))((props) => {
    const { t, i18n } = useTranslation();
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(props.hierarchyFilter.value);
    const [hierarchyFilter, setHierarchyFilter] = useState(props.hierarchyFilter);
    const [saveInProgress, setSaveInProgress] = useState(false);
    const [deletionInProgress, setDeletionInProgress] = useState(false);
    const [awaitingSaveFeedback, setAwaitingSaveFeedback] = useState(false);
    const [awaitingDeletionFeedback, setAwaitingDeletionFeedback] = useState(false);
    const [feedback, setFeedback] = useState();
    const [feedbackTimeoutID, setFeedbackTimeoutID] = useState();

    useEffect(() => {
        setHierarchyFilter(props.hierarchyFilter);
        setValue(props.hierarchyFilter.value);
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
                    ...props.hierarchyFilters.filter(t => t.id !== hierarchyFilter.id)
                ]);
            }
        }
    }, [props.feedback]);

    const toggleEdit = (event) => {
        setValue(hierarchyFilter.value);
        setEdit(!edit);
    };

    const onValueChange = (event) => {
        setValue(event.target.value);
    };

    const save = () => {
        setSaveInProgress(true);
        setAwaitingSaveFeedback(true);
        props.updateHierarchyFilter({ ...hierarchyFilter, value });
    };

    const remove = () => {
        setDeletionInProgress(true);
        setAwaitingDeletionFeedback(true);
        props.deleteHierarchyFilter({ ...hierarchyFilter });
    };

    return (<tr>
                <td>{hierarchyFilter.id}</td>
                <td>{hierarchyFilter.hierarchy}</td>
                <td>{hierarchyFilter.key}</td>
                <td onClick={() => !edit && toggleEdit()}>
                    {edit ? <>
                                <Form.Control as="textarea" rows={3} value={value} onChange={(e) => e.target.value.length <= 255 && onValueChange(e)} />
                                <span>{255-value.length} {t('hierarchy_filters_value_characters_left')}</span>
                            </>
                        : <span>{hierarchyFilter.value}</span>}
                </td>
                <td>{hierarchyFilter.startDate}</td>
                <td>{hierarchyFilter.endDate}</td>
                <td style={{ textAlign: 'center' }}>
                    {edit ? (
                        <ButtonGroup vertical>
                            <Button size="sm" variant="warning" onClick={toggleEdit}>
                                {t('hierarchy_filters_cancel_button')}
                            </Button>
                            <Button size="sm" variant="success" onClick={save} disabled={saveInProgress || value === hierarchyFilter.value}>
                                {saveInProgress ? (<>
                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    <span style={{ marginLeft: '10px' }}>{t('hierarchy_filters_save_in_progress')}</span>
                                </>) : (
                                    t('hierarchy_filters_save_button')
                                )}
                            </Button>
                            <DropdownButton disabled={deletionInProgress} size="sm" as={ButtonGroup} title={
                                    deletionInProgress ? (<>
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                        <span style={{ marginLeft: '10px' }}>{t('hierarchy_filters_deletion_in_progress')}</span>
                                    </>) : (
                                        t('hierarchy_filters_delete_button')
                                    )
                            } variant="danger">
                                    <Dropdown.Item onClick={remove}>{t('hierarchy_filters_delete_confirm')}</Dropdown.Item>
                            </DropdownButton>
                            {feedback && <span className={feedback.success ? '' : 'error'}>{t(feedback.message)}<br/>{feedback.success || `${t('status_code')}: ${feedback.statusCode}`}</span>}
                        </ButtonGroup>
                    ) : (<>
                        <Button size="sm" onClick={toggleEdit}>
                            {t('hierarchy_filters_edit_button')}
                        </Button>
                        <div>
                            {feedback && <span className={feedback.success ? '' : 'error'}>{t(feedback.message)}<br/>{feedback.success || `${t('status_code')}: ${feedback.statusCode}`}</span>}
                        </div>
                    </>)}
                </td>
        </tr>);
});

const FormRow = (props) => {
    const { t, i18n } = useTranslation();
    const [hierarchyFilter, setHierarchyFilter] = useState({});
    const [valid, setValid] = useState(false);

    const isValid = (hierarchyFilter) => {
        return true;
        /*return hierarchyFilter.key && !alreadyExists(hierarchyFilter.key, hierarchyFilter.language) &&
            hierarchyFilter.value?.length > 0 && hierarchyFilter.value?.length < 256 &&
            hierarchyFilter.language?.length > 0;*/
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
            [key]: value
        });
        props.onChange(key, value);
    };

    const alreadyExists = (key, language) => {
        return false;
        //return key && props.hierarchyFilters?.some(t => t.key === key.toLowerCase() && t.language === language);
    };

    return (<tr>
            <td></td>
            <td>
                <InputGroup>
                    <Form.Control placeholder={t('hierarchy_filters_hierarchy')} value={hierarchyFilter.hierarchy || ''} onChange={(e) => onChange('hierarchy', e.target.value)} />
                </InputGroup>
                {props.alreadyExists(hierarchyFilter.key, hierarchyFilter.language) && <span className="warningText">{t('hierarchy_filters_key_already_exists')}</span>}
            </td>
            <td>
                <InputGroup>
                    <Form.Control placeholder={t('hierarchy_filters_key')} value={hierarchyFilter.key || ''} onChange={(e) => onChange('key', e.target.value)} />
                </InputGroup>
            {/*
                <DropdownButton title={hierarchyFilter.language || t('hierarchy_filters_key')}>
                    <BSDropdown.Item onClick={() => onChange('language', 'fi')}>{t('fi')}</BSDropdown.Item>
                    <BSDropdown.Item onClick={() => onChange('language', 'sv')}>{t('sv')}</BSDropdown.Item>
                    <BSDropdown.Item onClick={() => onChange('language', 'en')}>{t('en')}</BSDropdown.Item>
                </DropdownButton>
                {props.showLanguageWarning && !hierarchyFilter.language && <span className="warninghierarchyFilter">{t('hierarchy_filters_language_missing')}</span>}
                */}
            </td>
            <td>
                <InputGroup>
                    <Form.Control placeholder={t('hierarchy_filters_value')} value={hierarchyFilter.value || ''} onChange={(e) => e.target.value.length <= 255 && onChange('value', e.target.value)} />
                </InputGroup>
                {hierarchyFilter.value?.length > 0 && <span>{255-hierarchyFilter.value.length} {t('hierarchy_filters_value_characters_left')}</span>}
            </td>
            <td></td>
            <td></td>
            <td style={{ textAlign: 'center' }}>
                <Button hidden={props.hideDeleteButton} onClick={props.onDelete} variant="outline-danger"><b>-</b> {t('hierarchy_filters_delete_row')}</Button>
            </td>
    </tr>);
};

const Pagination = (props) => {
    const [pageNo, setPageNo] = useState(1);
    useEffect(() => {
        setPageNo(props.pageNo);
    }, [props.pageNo]);
    const onClick = (event, pNo) => {
        if (pNo < 0 || pNo > Math.ceil(props.elements/props.itemsPerPage)) {
            return;
        }
        setPageNo(pNo);
        props.onClick(pNo);
    };

    return (
        <BSPagination>
            <BSPagination.First onClick={e => onClick(e, 1)} />
            <BSPagination.Prev onClick={e => onClick(e, pageNo-1)}/>
                {[...Array(Math.ceil(props.elements/props.itemsPerPage))].map((_,i) =>
                    <BSPagination.Item key={i} active={i+1 === pageNo} onClick={e => onClick(e, i+1)}>
                        {i+1}
                    </BSPagination.Item>
                ).slice(Math.max(0, pageNo-1-Math.floor(5/2)), Math.max(5, pageNo+Math.floor(5/2)))}
            <BSPagination.Next onClick={e => onClick(e, pageNo+1)} />
            <BSPagination.Last onClick={e => onClick(e, Math.ceil(props.elements/props.itemsPerPage))} />
        </BSPagination>
    );
};

const HierarchyFilters = (props) => {
    const { t, i18n } = useTranslation();
    const [pageNo, setPageNo] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [hierarchyFilters, setHierarchyFilters] = useState(props.hierarchyFilters);
    const [updatedHierarchyFilters, setUpdatedHierarchyFilters] = useState([]);
    const [formRows, setFormRows] = useState([{}]);
    const [showLanguageWarning, setShowLanguageWarning] = useState(false);
    const [areNewHierarchyFiltersValid, setAreNewHierarchyFiltersValid] = useState(false);
    const [saveNewHierarchyFiltersInProgress, setSaveNewHierarchyFiltersInProgress] = useState(false);
    const [awaitingFeedback, setAwaitingFeedback] = useState(false);
    const [feedback, setFeedback] = useState();
    const [feedbackTimeoutID, setFeedbackTimeoutID] = useState();
    const [searchQuery, setSearchQuery] = useState();

    useEffect(() => {
        props.fetchHierarchyFilters();
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
                setShowLanguageWarning(false);
                setFormRows([
                    ...formRows.map(row => undefined),
                    { user_name: props.user.eppn }
                ]);
                props.setHierarchyFilters([
                    ...props.hierarchyFilters,
                    ...props.feedback.hierarchyFilters
                ]);
            }
        }
    }, [props.feedback]);

    useEffect(() => {
        setFormRows(formRows.map(row => ({ ...row, user_name: props.user.eppn })));
    }, [props.user]);

    const pageChange = (pNo) => {
        setPageNo(pNo);
    };

    const sort = (by, scending) => {
        setHierarchyFilters([...hierarchyFilters].sort((a,b) => {
            if (a[by] === b[by]) {
                return 0;
            } else if (a[by] === null) {
                return 1 * scending;
            } else if (b[by] === null) {
                return -1 * scending;
            }
            return a[by].localeCompare(b[by]) * scending;
        }));
    };

    useEffect(() => {
        const currentHierarchyFilters = props.hierarchyFilters.map(hf => {
            const found = updatedHierarchyFilters.find(uhf => uhf.id === hf.id);
            return found || hf;
        });
        if (searchQuery && searchQuery.length > 0) {
            setHierarchyFilters(currentHierarchyFilters.filter(hierarchy => {
                const includedFields = ['hierarchy', 'key', 'value'];
                return includedFields.some(field => {
                    return hierarchy[field]?.toLowerCase().includes(searchQuery);
                });
            }));
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
            ...formRows.map((_,i) => i === idx ? undefined : formRows[i])
        ]);
    };

    const alreadyExists = (key, language) => {
        return false;
        //return key && language && (props.hierarchyFilters?.some(t => t.key === key.toLowerCase() && t.language === language)
         //   || formRows.filter(r => r).filter(t => t.key === key && t.language === language).length > 1);
    };

    const isValid = (text) => {
        return true;
        /*return text.key && text.key?.length < 256 && !alreadyExists(text.key, text.language) &&
            text.value?.length > 0 && text.value?.length < 256 &&
            text.language?.length > 0;*/
    };

    const onFormRowChange = (key, value, i) => {
        const updated = [...formRows.map((r,ri) => i === ri ? { ...r, [key]: value } : r)];
        setFormRows(updated);
    };

    useEffect(() => {
        setAreNewHierarchyFiltersValid(formRows.filter(r => r).every(isValid));
    }, [formRows]);

    const saveNewHierarchyFilters = () => {
        setSaveNewHierarchyFiltersInProgress(true);
        setAwaitingFeedback(true);
        props.insertHierarchyFilters(formRows.filter(r => r));
    };

    const timeoutFeedback = (feedback, ms = FEEDBACK_TIMEOUT_MS) => {
        if (feedbackTimeoutID) {
            clearTimeout(feedbackTimeoutID);
        }
        setFeedback(feedback);
        setFeedbackTimeoutID(setTimeout(setFeedback, ms));
    };

    const onHierarchyFilterUpdated = (updatedHierarchyFilter) => {
        const duplicateRemoved = updatedHierarchyFilters.filter(hierarchyFilter => hierarchyFilter.id !== updatedHierarchyFilter.id);
        setUpdatedHierarchyFilters([...duplicateRemoved, updatedHierarchyFilter]);
    };

    return (<Container>
        <BSRow className="justify-content-between" style={{ marginTop: '10px', marginBottom: '10px' }}>
            <Col sm={6}><Search onChange={searchQueryChange} /></Col>
            <Col md="auto"><DropDown current={itemsPerPage} onClick={itemsPerPageChange} items={[12, 24, 48, 96]}/></Col>
        </BSRow>
        <BSRow>
            <Col>
                <Table hover bordered striped className="align-middle">
                    <thead>
                        <Header onClick={sort} />
                    </thead>
                    <tbody>
                        {hierarchyFilters.slice((pageNo-1)*itemsPerPage, pageNo*itemsPerPage).map((hierarchyFilter, i) =>
                            <Row key={hierarchyFilter.id} hierarchyFilter={hierarchyFilter} setExternalFeedback={(feedback) => timeoutFeedback(feedback)} onHierarchyFilterUpdated={onHierarchyFilterUpdated} />
                        )}
                    </tbody>
                    <tfoot>
                        {formRows.map((row, i) =>
                            row && <FormRow onChange={(key,value) => onFormRowChange(key, value, i)} hideDeleteButton={formRows.filter(r => r).length === 1} onDelete={() => deleteFormRow(i)} key={i} hierarchyFilter={row} alreadyExists={alreadyExists} showLanguageWarning={showLanguageWarning} />
                        )}
                    </tfoot>
                </Table>
            </Col>
        </BSRow>
        <BSRow className="justify-content-between">
            <Col md="auto">
                <Pagination pageNo={pageNo} itemsPerPage={itemsPerPage} elements={hierarchyFilters.length} onClick={pageChange} />
            </Col>
            <Col md="auto">
                {feedback && <span className={feedback.success ? '' : 'error'}>{feedback.message}<br/>{feedback.success || `${t('status_code')}: ${feedback.statusCode}`}</span>}
            </Col>
            <Col md="auto">
                <BSRow className="justify-content-end">
                    <Col md="auto">
                        <Button onClick={() => setFormRows([...formRows, { user_name: props.user.eppn }])} disabled={saveNewHierarchyFiltersInProgress} variant="outline-secondary"><b>+</b> {t('add_new_row')}</Button>
                    </Col>
                    <Col md="auto" onClick={!areNewHierarchyFiltersValid || saveNewHierarchyFiltersInProgress ? () => setShowLanguageWarning(true) : () => {}}>
                        <Button onClick={saveNewHierarchyFilters} disabled={!areNewHierarchyFiltersValid || saveNewHierarchyFiltersInProgress} variant="success">
                            {saveNewHierarchyFiltersInProgress ? (<>
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                <span style={{ marginLeft: '10px' }}>{t('hierarchy_filters_save_new_rows_in_progress')}</span>
                            </>) : t('hierarchy_filters_save_new_rows')}
                        </Button>
                    </Col>
                </BSRow>
            </Col>
        </BSRow>
    </Container>);

};

const mapStateToProps = state => ({
    hierarchyFilters: state.hierarchyFilters.hierarchyFilters,
    user: state.ur.user,
    feedback: state.hierarchyFilters.feedback,
});

const mapDispatchToProps = (dispatch) => ({
    fetchHierarchyFilters: () => dispatch(fetchHierarchyFilters()),
    insertHierarchyFilters: (hierarchyFilters) => dispatch(insertHierarchyFilters(hierarchyFilters)),
    setHierarchyFilters: (hierarchyFilters) => dispatch(setHierarchyFilters(hierarchyFilters))
});

export default connect(mapStateToProps, mapDispatchToProps)(HierarchyFilters);