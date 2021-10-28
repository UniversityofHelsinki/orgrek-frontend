import React from 'react';
import { connect } from 'react-redux';

const NodeParents = (props) => {
    const commaSep = (hierarchies) => hierarchies.map(item => item).join(', ');
    return (
        <div>
            {props.parents && props.parents.length > 0   ?
                <table>
                    <thead>
                        <tr>
                            <th>Ylä-yksikkö</th>
                            <th>Hierarkiat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.parents.map(parent => (
                            <tr key={parent.node.id}>
                                <td>{parent.node.name}</td>
                                <td>{commaSep(parent.hierarchies)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table> : null
            }
        </div>
    );
};

const mapStateToProps = state => ({
    parents : state.hr.parents
});

export default connect(mapStateToProps, null)(NodeParents);
