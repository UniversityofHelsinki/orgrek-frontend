import React, { useEffect, useState } from 'react';
import { Button, Pagination as BSPagination, Table, Form, InputGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { fetchTexts } from '../actions/textsAction';

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
                    <span onClick={onClick('value')} className='boldHeader'>{t('texts_value')}</span>
                    {arrow === 'value' && <span className='littleLeftMargin'>{scendings['value'] === 1 ? '\u25bd' : '\u25b3' }</span>}
                </th>
                <th>
                    <span onClick={onClick('language')} className='boldHeader'>{t('texts_language')}</span>
                    {arrow === 'language' && <span className='littleLeftMargin'>{scendings['language'] === 1 ? '\u25bd' : '\u25b3' }</span>}
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

const Row = (props) => {
    const { t, i18n } = useTranslation();
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(props.text.value);
    const [text, setText] = useState(props.text);

    useEffect(() => {
        setText(props.text);
        setValue(props.text.value);
    }, [props.text]);

    const toggleEdit = (event) => {
        setEdit(!edit);
    };

    const onValueChange = (event) => {
        console.log(event);
        setValue(event.target.value);
    };


    return (<tr>
                <td className='col-sm-1'>{text.key}</td>
                <td className='col-sm-3'>
                    {edit ? <input type="text" value={value} onChange={onValueChange} />
                        : <span>{text.value}</span>}
                </td>
                <td className='col-sm-1'>{text.language}</td>
                <td className='col-sm-2'>{text.user_name}</td>
                <td className='col-sm-2'>{text.timestamp}</td>
                <td className='col-sm-1'>
                    {edit ? (
                        <>
                            <Button size="sm" variant="warning" onClick={toggleEdit}>
                                {t('texts_cancel_button')}
                            </Button>
                            <Button size="sm" variant="success">
                                {t('texts_save_button')}
                            </Button>
                            <Button size="sm" variant="danger">
                                {t('texts_delete_button')}
                            </Button>
                        </>
                    ) : (
                        <Button size="sm" onClick={toggleEdit}>
                            {t('texts_edit_button')}
                        </Button>
                    )}
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
    useEffect(() => {
        props.fetchTexts();
    }, []);

    useEffect(() => {
        setTexts(props.texts);
    }, [props.texts]);

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

    const searchQueryChange = (value) => {
        setTexts([...props.texts].filter(text => {
            const includedFields = ['key', 'value'];
            return includedFields.some(field => {
                return text[field]?.toLowerCase().includes(value);
            });
        }));
        setPageNo(1);
    };

    return (<div>
        <Search onChange={searchQueryChange} />
        <Table hover bordered>
        <thead>
            <Header onClick={sort} />
        </thead>
        <tbody>
            {texts.slice((pageNo-1)*itemsPerPage, pageNo*itemsPerPage).map((text, i) =>
                <Row key={i} text={text} />
            )}
        </tbody>
    </Table>
    <Pagination pageNo={pageNo} itemsPerPage={itemsPerPage} elements={texts.length} onClick={pageChange} />
    </div>);

};

const mapStateToProps = state => ({
    texts: state.texts.texts
});

const mapDispatchToProps = (dispatch) => ({
    fetchTexts: () => dispatch(fetchTexts())
});

export default connect(mapStateToProps, mapDispatchToProps)(Texts);