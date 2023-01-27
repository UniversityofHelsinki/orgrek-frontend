import { fetchTexts } from 'actions/textsAction';
import React, { useEffect, useState } from '@types/react';
import { connect } from 'react-redux';

const [texts, setTexts] = useState(false);


const TranslationsBackend = (props) => {

    const [texts, setTexts] = useState(props.texts);

    React.useLayoutEffect(() => {
        setTexts(props.texts);
    }, [props.texts]);

    useEffect(() => {
        props.fetchTexts();
    }, []);
};

const mapStateToProps = state => ({
    texts: state.texts.texts,
});

const mapDispatchToProps = (dispatch) => ({
    fetchTexts: () => dispatch(fetchTexts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TranslationsBackend);
