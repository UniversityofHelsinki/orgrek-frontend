import React from "react";
import {connect} from 'react-redux';
import Hello from "./components/hello";
import {fetchHelloMessage} from "./actions/helloAction";

const App= (props) => {

    React.useEffect(() => {
        props.onFetchMessage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                <Hello />
            </header>
        </div>
    );
}

const mapStateToProps = state => ({
    message : state.hr.message
});

const mapDispatchToProps = dispatch => ({
    onFetchMessage: () => dispatch(fetchHelloMessage())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
