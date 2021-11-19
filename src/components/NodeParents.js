import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

const NodeParents = (props) => {
    const { t } = useTranslation();
    const commaSep = (hierarchies) => hierarchies.map(item => t(item)).join(', ');
    const nodeattrNs = `nodeattr${props.selectedDay ? props.selectedDay.toLocaleDateString('EN-CA') : ''}`;

    return (
        <div>
            {props.parents && props.parents.length > 0   ?
                <div>
                    <h3>{t('parent_units')}</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>{t('unit')}</th>
                                <th>{t('hierarchies')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.parents.map(parent => (
                                <tr key={parent.node.id}>
                                    <td>{t(parent.node.id, { ns: nodeattrNs })}</td>
                                    <td>{commaSep(parent.hierarchies)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> : null
            }
        </div>
    );
};

const mapStateToProps = state => ({
    parents : state.hr.parents,
    selectedDay: state.dr.selectedDay,
});

export default connect(mapStateToProps, null)(NodeParents);
