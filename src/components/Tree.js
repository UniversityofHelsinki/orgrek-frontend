import React from 'react';
import { connect } from 'react-redux';
import Branch from './Branch';

const Tree = (props) => {
    return (
        <div>
            {Object.values(props.tree).map((item) => <Branch key={item.id} item={item} level={0} />)}
        </div>
    );
};

const mapStateToProps = state => ({
    tree : state.tr.tree
});


export default connect(mapStateToProps, null)(Tree);
