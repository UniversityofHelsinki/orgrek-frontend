import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { switchHistory, switchComing } from '../actions/nodeViewAction';
import { fetchNodeAttributesFuture, fetchNodeAttributesHistory, clearNodeFuture, clearNodeHistory } from '../actions/nodeAction';
import { fetchNodeChildrenHistory, fetchNodeChildrenFuture, fetchNodeParentsHistory, fetchNodeParentsFuture, clearChildrenHistory, clearChildrenFuture, clearParentsFuture, clearParentsHistory } from '../actions/hierarchyAction';

const NodeViewControl = (props) => {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        if (props.showHistory) {
            props.fetchHistory();
        }
        if (props.showComing) {
            props.fetchComing();
        }
    }, [props.showHistory, props.showComing, props.node]);
    return (
            <Form>
                <Row className='align-items-center'>
                    <Col sm='auto'>
                        <Form.Check
                        inline
                        type='switch'
                        id='show_history_switch'
                        label={t('show_history')}
                        onChange={() =>
                            props.onSwitchHistory(!props.showHistory)
                        }
                        />
                    </Col>
                    <Col sm='auto'>
                        <label>{t('display_date')} {new Date(props.selectedDay).toLocaleDateString('fi-FI')}</label>
                    </Col>
                    <Col sm='auto'>
                        <Form.Check
                            inline
                            type='switch'
                            id='show_coming_switch'
                            label={t('show_coming')}
                            onChange={() =>
                                props.onSwitchComing(!props.showComing)
                            }
                        />
                    </Col>
                </Row>
            </Form>
    );
};

const mapStateToProps = state => ({
    showHistory: state.nvrd.showHistory,
    showComing: state.nvrd.showComing
});

const mapDispatchToProps = (dispatch, ownProps) => (
    {
    onSwitchHistory: (input) => {
        dispatch(switchHistory(input));
    },
    fetchHistory: () => {
        dispatch(clearNodeHistory());
        dispatch(clearChildrenHistory());
        dispatch(clearParentsHistory());
        dispatch(fetchNodeParentsHistory(ownProps.node.uniqueId, ownProps.selectedDay));
        dispatch(fetchNodeChildrenHistory(ownProps.node.uniqueId, ownProps.selectedDay));
        dispatch(fetchNodeAttributesHistory(ownProps.node.uniqueId, ownProps.selectedDay));
    },
    onSwitchComing: (input) => {
        dispatch(switchComing(input));
    },
    fetchComing: () => {
        dispatch(clearNodeFuture());
        dispatch(clearChildrenFuture());
        dispatch(clearParentsFuture());
        dispatch(fetchNodeParentsFuture(ownProps.node.uniqueId, ownProps.selectedDay));
        dispatch(fetchNodeChildrenFuture(ownProps.node.uniqueId, ownProps.selectedDay));
        dispatch(fetchNodeAttributesFuture(ownProps.node.uniqueId, ownProps.selectedDay));
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(NodeViewControl);
