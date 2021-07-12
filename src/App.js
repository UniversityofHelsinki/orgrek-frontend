import React from "react";
import './App.css';
const ORGREK_BACKEND_SERVER = process.env.REACT_APP_ORGREK_BACKEND_SERVER;

function App() {

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch(`${ORGREK_BACKEND_SERVER}/api`)
        .then((res) => res.json())
        .then((data) => setData(data.message));
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;
