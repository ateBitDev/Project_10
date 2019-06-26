import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom'
import './styles/global.css';
import Header from './Components/Header'
import axios from 'axios'



class App extends Component {

  constructor() {

    super()

    this.state = {

    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/')
    .then(res => res.json)
    .then((data) => {
      this.setState({ courses : data})
    })
  }

  render() {
    return (
      <div className="root">
        <div>
          <BrowserRouter>
            <Header />
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
