import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios
      .get('http://localhost:6969/api', {
        responseType: 'arraybuffer',
        headers: {
          Accept: 'application/pdf'
        }
      })
      .then(response => setData(response.data))
      .catch(_ => setData({}));
  }, []);

  function handleClick() {
    const file = new Blob([data], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(file);
    link.download = `certificate.pdf`;
    link.click();
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={handleClick} className="btn btn-primary rounded mt-5">
          Export Certificate
        </button>
      </header>
    </div>
  );
}

export default App;
