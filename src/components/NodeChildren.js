import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

const NodeChildren = (props) => {
    const { t } = useTranslation();
    const commaSep = (hierarchies) => hierarchies.map(item => item).join(', ');
    return (
        <div>
            {props.children && props.children.length > 0   ?
                <div>
                    <h3>{t('children_units')}</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>{t('unit')}</th>
                                <th>{t('hierarchies')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.children.map(child => (
                                <tr key={child.node.id}>
                                    <td>{child.node.name}</td>
                                    <td>{commaSep(child.hierarchies)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>: null
            }
        </div>
    );
};

const mapStateToProps = state => ({
    children : state.hr.children
});

export default connect(mapStateToProps, null)(NodeChildren);
