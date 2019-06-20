import React, { Component } from 'react';
import {
  BrowserRouter
} from 'react-router-dom'
import './styles/global.css';
import Header from './Components/Header'



class App extends Component {

  constructor() {

    super()

    this.state = {

    }
  }
  render() {
    return (
      <div className="root">
        <div >
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
