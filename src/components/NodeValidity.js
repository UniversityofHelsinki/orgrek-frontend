import React from 'react';
import { connect } from 'react-redux';
import { showValidity } from '../actions/utilAction';
import { useTranslation } from 'react-i18next';

const NodeValidity = (props) => {
    const { t, i18n } = useTranslation();
    return (
        <div>
            {props.node  ?
                <table>
                    <thead>
                    <tr>
                        <th>{t('valid_until')}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>{t('valid_until')}</td>
                        <td>{showValidity(props.node.startDate, props.node.endDate, i18n)}</td>
                    </tr>
                    </tbody>
                </table> : null
            }
        </div>
    );
};

const mapStateToProps = state => ({
    node : state.nrd.node
});


export default connect(mapStateToProps, null)(NodeValidity);
