import React from 'react';
import { connect } from 'react-redux';
import { Form, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { switchHistory, switchComing } from '../actions/nodeViewAction';
import { fetchNodeAttributesFuture, fetchNodeAttributesHistory } from '../actions/nodeAction';
import { fetchNodeChildrenHistory, fetchNodeChildrenFuture, fetchNodeParentsHistory, fetchNodeParentsFuture } from '../actions/hierarchyAction';

const NodeViewControl = (props) => {
    const { t, i18n } = useTranslation();
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
        if (input) {
            dispatch(fetchNodeParentsHistory(ownProps.node.unique_id, ownProps.selectedDay));
            dispatch(fetchNodeChildrenHistory(ownProps.node.unique_id, ownProps.selectedDay));
            dispatch(fetchNodeAttributesHistory(ownProps.node.unique_id, ownProps.selectedDay));
        }
    },
    onSwitchComing: (input) => {
        dispatch(switchComing(input));
        if (input) {
            dispatch(fetchNodeParentsFuture(ownProps.node.unique_id, ownProps.selectedDay));
            dispatch(fetchNodeChildrenFuture(ownProps.node.unique_id, ownProps.selectedDay));
            dispatch(fetchNodeAttributesFuture(ownProps.node.unique_id, ownProps.selectedDay));
        }
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(NodeViewControl);