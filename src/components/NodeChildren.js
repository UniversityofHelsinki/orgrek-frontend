import React from 'react';
import { connect } from 'react-redux';

const NodeChildren = (props) => {
    const commaSep = (hierarchies) => hierarchies.map(item => item).join(', ');
    return (
        <div>
            {props.children && props.children.length > 0   ?
                <div>
                    <h3>Alayksiköt</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Yksikkö</th>
                                <th>Hierarkiat</th>
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
