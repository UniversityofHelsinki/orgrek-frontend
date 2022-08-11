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
import { fetchTexts, updateText, deleteText, insertTexts, setTexts } from '../actions/textsAction';

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
            <Form.Control placeholder={t('texts_search_placeholder')} value={query} onChange={onQueryChange} />
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
                    <span onClick={onClick('key')} className='boldHeader'>{t('texts_key')}</span>
                    {arrow === 'key' && <span className='littleLeftMargin'>{scendings['key'] === 1 ? '\u25bd' : '\u25b3' }</span>}
                </th>
                <th>
                    <span onClick={onClick('language')} className='boldHeader'>{t('texts_language')}</span>
                    {arrow === 'language' && <span className='littleLeftMargin'>{scendings['language'] === 1 ? '\u25bd' : '\u25b3' }</span>}
                </th>
                <th>
                    <span onClick={onClick('value')} className='boldHeader'>{t('texts_value')}</span>
                    {arrow === 'value' && <span className='littleLeftMargin'>{scendings['value'] === 1 ? '\u25bd' : '\u25b3' }</span>}
                </th>
                <th>
                    <span onClick={onClick('user_name')} className='boldHeader'>{t('texts_editor')}</span>
                    {arrow === 'user_name' && <span className='littleLeftMargin'>{scendings['user_name'] === 1 ? '\u25bd' : '\u25b3' }</span>}
                </th>
                <th>
                    <span onClick={onClick('timestamp')} className='boldHeader'>{t('texts_timestamp')}</span>
                    {arrow === 'timestamp' && <span className='littleLeftMargin'>{scendings['timestamp'] === 1 ? '\u25bd' : '\u25b3' }</span>}
                </th>
                <th>
                    <span className='boldHeader'>{t('texts_edit')}</span>
                </th>
            </tr>
    </>);
};

const Row = connect(
        (state) => ({ feedback: state.texts.feedback, texts: state.texts.texts, user: state.ur.user }),
        (dispatch) => ({
            updateText: (text) => dispatch(updateText(text)),
            deleteText: (text) => dispatch(deleteText(text)),
            setTexts: (texts) => dispatch(setTexts(texts))
        }))((props) => {
    const { t, i18n } = useTranslation();
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(props.text.value);
    const [text, setText] = useState(props.text);
    const [saveInProgress, setSaveInProgress] = useState(false);
    const [deletionInProgress, setDeletionInProgress] = useState(false);
    const [awaitingSaveFeedback, setAwaitingSaveFeedback] = useState(false);
    const [awaitingDeletionFeedback, setAwaitingDeletionFeedback] = useState(false);
    const [feedback, setFeedback] = useState();
    const [feedbackTimeoutID, setFeedbackTimeoutID] = useState();

    useEffect(() => {
        setText(props.text);
        setValue(props.text.value);
    }, [props.text]);

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
            if (props.feedback.success && props.feedback.text) {
                setEdit(false);
                setText(props.feedback.text);
                if (props.onTextUpdated) {
                    props.onTextUpdated(props.feedback.text);
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
                props.setTexts([
                    ...props.texts.filter(t => !(t.key === text.key && t.language === text.language))
                ]);
            }
        }
    }, [props.feedback]);

    const toggleEdit = (event) => {
        setValue(text.value);
        setEdit(!edit);
    };

    const onValueChange = (event) => {
        setValue(event.target.value);
    };

    const save = () => {
        setSaveInProgress(true);
        setAwaitingSaveFeedback(true);
        props.updateText({ ...text, user_name: props.user.eppn, value });
    };

    const remove = () => {
        setDeletionInProgress(true);
        setAwaitingDeletionFeedback(true);
        props.deleteText({ ...text, user_name: props.user.eppn, value });
    };

    return (<tr>
                <td>{text.key}</td>
                <td>{text.language}</td>
                <td onClick={() => !edit && toggleEdit()}>
                    {edit ? <>
                                <Form.Control as="textarea" rows={3} value={value} onChange={(e) => e.target.value.length <= 255 && onValueChange(e)} />
                                <span>{255-value.length} {t('texts_value_characters_left')}</span>
                            </>
                        : <span>{text.value}</span>}
                </td>
                <td>{text.user_name}</td>
                <td>{text.timestamp}</td>
                <td style={{ textAlign: 'center' }}>
                    {edit ? (
                        <ButtonGroup vertical>
                            <Button size="sm" variant="warning" onClick={toggleEdit}>
                                {t('texts_cancel_button')}
                            </Button>
                            <Button size="sm" variant="success" onClick={save} disabled={saveInProgress || value === text.value}>
                                {saveInProgress ? (<>
                                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                    <span style={{ marginLeft: '10px' }}>{t('texts_save_in_progress')}</span>
                                </>) : (
                                    t('texts_save_button')
                                )}
                            </Button>
                            <DropdownButton disabled={deletionInProgress} size="sm" as={ButtonGroup} title={
                                    deletionInProgress ? (<>
                                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                        <span style={{ marginLeft: '10px' }}>{t('texts_deletion_in_progress')}</span>
                                    </>) : (
                                        t('texts_delete_button')
                                    )
                            } variant="danger">
                                    <Dropdown.Item onClick={remove}>{t('texts_delete_confirm')}</Dropdown.Item>
                            </DropdownButton>
                            {feedback && <span className={feedback.success ? '' : 'error'}>{t(feedback.message)}<br/>{feedback.success || `${t('status_code')}: ${feedback.statusCode}`}</span>}
                        </ButtonGroup>
                    ) : (<>
                        <Button size="sm" onClick={toggleEdit}>
                            {t('texts_edit_button')}
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
    const [text, setText] = useState({});
    const [valid, setValid] = useState(false);

    const isValid = (text) => {
        return text.key && !alreadyExists(text.key, text.language) &&
            text.value?.length > 0 && text.value?.length < 256 &&
            text.language?.length > 0;
    };

    useEffect(() => {
        setText({ ...props.text });
    }, [props.text]);

    useEffect(() => {
        setValid(isValid(text));
    }, [text]);

    const onChange = (key, value) => {
        setText({
            ...text,
            [key]: value
        });
        props.onChange(key, value);
    };

    const alreadyExists = (key, language) => {
        return key && props.texts?.some(t => t.key === key.toLowerCase() && t.language === language);
    };

    return (<tr>
            <td>
                <InputGroup>
                    <Form.Control placeholder={t('texts_key')} value={text.key || ''} onChange={(e) => onChange('key', e.target.value)} />
                </InputGroup>
                {props.alreadyExists(text.key, text.language) && <span className="warningText">{t('texts_key_already_exists')}</span>}
            </td>
            <td>
                <DropdownButton title={text.language || t('texts_language')}>
                    <BSDropdown.Item onClick={() => onChange('language', 'fi')}>{t('fi')}</BSDropdown.Item>
                    <BSDropdown.Item onClick={() => onChange('language', 'sv')}>{t('sv')}</BSDropdown.Item>
                    <BSDropdown.Item onClick={() => onChange('language', 'en')}>{t('en')}</BSDropdown.Item>
                </DropdownButton>
                {props.showLanguageWarning && !text.language && <span className="warningText">{t('texts_language_missing')}</span>}
            </td>
            <td>
                <InputGroup>
                    <Form.Control as="textarea" rows={1} placeholder={t('texts_value')} value={text.value || ''} onChange={(e) => e.target.value.length <= 255 && onChange('value', e.target.value)} />
                </InputGroup>
                {text.value?.length > 0 && <span>{255-text.value.length} {t('texts_value_characters_left')}</span>}
            </td>
            <td>{text.user_name}</td>
            <td></td>
            <td style={{ textAlign: 'center' }}>
                <Button hidden={props.hideDeleteButton} onClick={props.onDelete} variant="outline-danger"><b>-</b> {t('texts_delete_row')}</Button>
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

const Texts = (props) => {
    const { t, i18n } = useTranslation();
    const [pageNo, setPageNo] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [texts, setTexts] = useState(props.texts);
    const [updatedTexts, setUpdatedTexts] = useState([]);
    const [formRows, setFormRows] = useState([{}]);
    const [showLanguageWarning, setShowLanguageWarning] = useState(false);
    const [areNewTextsValid, setAreNewTextsValid] = useState(false);
    const [saveNewTextsInProgress, setSaveNewTextsInProgress] = useState(false);
    const [awaitingFeedback, setAwaitingFeedback] = useState(false);
    const [feedback, setFeedback] = useState();
    const [feedbackTimeoutID, setFeedbackTimeoutID] = useState();
    const [searchQuery, setSearchQuery] = useState();

    useEffect(() => {
        props.fetchTexts();
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
            setSaveNewTextsInProgress(false);
            setFeedback(props.feedback);
            setFeedbackTimeoutID(setTimeout(setFeedback, FEEDBACK_TIMEOUT_MS));
            if (props.feedback.success && props.feedback.texts) {
                setAreNewTextsValid(false);
                setShowLanguageWarning(false);
                setFormRows([
                    ...formRows.map(row => undefined),
                    { user_name: props.user.eppn }
                ]);
                props.setTexts([
                    ...props.texts,
                    ...props.feedback.texts
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
        setTexts([...texts].sort((a,b) => {
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
        const currentTexts = props.texts.map(t => {
            const found = updatedTexts.find(ut => ut.key === t.key && ut.language === t.language);
            return found || t;
        });
        if (searchQuery && searchQuery.length > 0) {
            setTexts(currentTexts.filter(text => {
                const includedFields = ['key', 'value'];
                return includedFields.some(field => {
                    return text[field]?.toLowerCase().includes(searchQuery);
                });
            }));
        } else {
            setTexts(currentTexts);
        }
    }, [searchQuery, props.texts]);

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
        return key && language && (props.texts?.some(t => t.key === key.toLowerCase() && t.language === language)
            || formRows.filter(r => r).filter(t => t.key === key && t.language === language).length > 1);
    };

    const isValid = (text) => {
        return text.key && text.key?.length < 256 && !alreadyExists(text.key, text.language) &&
            text.value?.length > 0 && text.value?.length < 256 &&
            text.language?.length > 0;
    };

    const onFormRowChange = (key, value, i) => {
        const updated = [...formRows.map((r,ri) => i === ri ? { ...r, [key]: value } : r)];
        setFormRows(updated);
    };

    useEffect(() => {
        setAreNewTextsValid(formRows.filter(r => r).every(isValid));
    }, [formRows]);

    const createMissingLanguages = (text) => {
        const existingLanguages = [ ...props.texts.filter(t => t.key === text.key), ...formRows.filter(r => r && r.key === text.key)];
        const missingLanguages = ['fi', 'sv', 'en'].filter(lang => !existingLanguages.some(t => t.language === lang));
        return missingLanguages.map(lang => ({ ...text, value: text.key, language: lang }));
    };

    const saveNewTexts = () => {
        setSaveNewTextsInProgress(true);
        setAwaitingFeedback(true);
        props.insertTexts(formRows.filter(r => r).reduce((prev, curr) =>
            prev.some(t => t.key === curr.key) ? [ ...prev, curr ] : [ ...prev, curr, ...createMissingLanguages(curr) ], [])
        );
    };

    const timeoutFeedback = (feedback, ms = FEEDBACK_TIMEOUT_MS) => {
        if (feedbackTimeoutID) {
            clearTimeout(feedbackTimeoutID);
        }
        setFeedback(feedback);
        setFeedbackTimeoutID(setTimeout(setFeedback, ms));
    };

    const onTextUpdated = (updatedText) => {
        const duplicateRemoved = updatedTexts.filter(text => text.key !== updatedText.key && text.language !== updatedText.language);
        setUpdatedTexts([...duplicateRemoved, updatedText]);
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
                        {texts.slice((pageNo-1)*itemsPerPage, pageNo*itemsPerPage).map((text, i) =>
                            <Row key={text.key + text.language + i} text={text} setExternalFeedback={(feedback) => timeoutFeedback(feedback)} onTextUpdated={onTextUpdated} />
                        )}
                    </tbody>
                    <tfoot>
                        {formRows.map((row, i) =>
                            row && <FormRow onChange={(key,value) => onFormRowChange(key, value, i)} hideDeleteButton={formRows.filter(r => r).length === 1} onDelete={() => deleteFormRow(i)} key={i} text={row} alreadyExists={alreadyExists} showLanguageWarning={showLanguageWarning} />
                        )}
                    </tfoot>
                </Table>
            </Col>
        </BSRow>
        <BSRow className="justify-content-between">
            <Col md="auto">
                <Pagination pageNo={pageNo} itemsPerPage={itemsPerPage} elements={texts.length} onClick={pageChange} />
            </Col>
            <Col md="auto">
                {feedback && <span className={feedback.success ? '' : 'error'}>{feedback.message}<br/>{feedback.success || `${t('status_code')}: ${feedback.statusCode}`}</span>}
            </Col>
            <Col md="auto">
                <BSRow className="justify-content-end">
                    <Col md="auto">
                        <Button onClick={() => setFormRows([...formRows, { user_name: props.user.eppn }])} disabled={saveNewTextsInProgress} variant="outline-secondary"><b>+</b> {t('add_new_row')}</Button>
                    </Col>
                    <Col md="auto" onClick={!areNewTextsValid || saveNewTextsInProgress ? () => setShowLanguageWarning(true) : () => {}}>
                        <Button onClick={saveNewTexts} disabled={!areNewTextsValid || saveNewTextsInProgress} variant="success">
                            {saveNewTextsInProgress ? (<>
                                <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                                <span style={{ marginLeft: '10px' }}>{t('texts_save_new_rows_in_progress')}</span>
                            </>) : t('texts_save_new_rows')}
                        </Button>
                    </Col>
                </BSRow>
            </Col>
        </BSRow>
    </Container>);

};

const mapStateToProps = state => ({
    texts: state.texts.texts,
    user: state.ur.user,
    feedback: state.texts.feedback,
});

const mapDispatchToProps = (dispatch) => ({
    fetchTexts: () => dispatch(fetchTexts()),
    insertTexts: (texts) => dispatch(insertTexts(texts)),
    setTexts: (texts) => dispatch(setTexts(texts))
});

export default connect(mapStateToProps, mapDispatchToProps)(Texts);