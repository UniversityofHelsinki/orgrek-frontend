import React from 'react';
import { connect } from 'react-redux';
import { Form, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { switchHistory, switchComing } from '../actions/nodeViewAction';

const NodeViewControl = (props) => {
    const { t, i18n } = useTranslation();
    return (
        <Row>
            <Row>
                <span>{t('display_date')} {new Date(props.selectedDay).toLocaleDateString('fi-FI')}</span>
            </Row>
            <Row>
                <Form>
                    <Form.Check
                        inline
                        type='switch'
                        id='show_history_switch'
                        label={t('show_history')}
                        onChange={() =>
                            props.onSwitchHistory(!props.showHistory)
                        }
                    />
                    <Form.Check
                        inline
                        type='switch'
                        id='show_coming_switch'
                        label={t('show_coming')}
                        onChange={() =>
                            props.onSwitchComing(!props.showComing)
                        }
                    />
                </Form>
            </Row>
        </Row>
    );
};

const mapStateToProps = state => ({
    selectedDay: state.dr.selectedDay,
    showHistory: state.nvrd.showHistory,
    showComing: state.nvrd.showComing
});

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSwitchHistory: (input) => {
        dispatch(switchHistory(input));
    },
    onSwitchComing: (input) => {
        dispatch(switchComing(input));
    }

});

export default connect(mapStateToProps, mapDispatchToProps)(NodeViewControl);