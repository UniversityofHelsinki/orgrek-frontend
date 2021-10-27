import React from 'react';
import { connect } from 'react-redux';

const NodeValidity = (props) => {

    return (
        <div>
            {props.node  ?
                <table>
                    <thead>

                    </thead>
                    <tbody>

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
