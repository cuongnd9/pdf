import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import renderHTML from 'react-render-html';
import jsPDF from 'jspdf';
import logo from './logo.svg';
import './App.css';

const ids = ['code', 'name', 'dob'];
const data = ['dv123', 'Cuong Duy Nguyen', '06/04/98'];

class App extends Component {
  state = {
    template: ''
  };

  componentDidMount = () => {
    axios
      .get('http://localhost:6969/api')
      .then(response => {
        // const value = response.data.replace(/id/gm, 'ref');
        this.setState({ template: response.data });
      })
      .catch(_ => this.setState({ template: '' }));
  };

  componentDidUpdate = () => {
    for (let i = 0; i < ids.length; i++) {
      document.getElementById(ids[i]).innerHTML = data[i];
    }
  }

  handleExport = () => {
    const doc = new jsPDF();
    doc.fromHTML(this.state.template);
    doc.save('certificate.pdf');
  };

  render = () => {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Button id="btn" variant="success" onClick={this.handleExport}>
            Export
          </Button>
          {renderHTML(`<div id="certificate">${this.state.template}</div>`)}
        </header>
      </div>
    );
  };
}

export default App;
