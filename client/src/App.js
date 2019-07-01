import React, { Component } from 'react';
import {Route, BrowserRouter, Switch} from 'react-router-dom'
import './styles/global.css';
import Header from './Components/Header'
import UserSignIn from "./Components/UserSignIn";
import UserSignUp from './Components/UserSignUp'
import Home from './Components/Home'
import NotFound from "./Components/Not-Found";
import CreateCourse from './Components/Create-Course'
import UpdateCourse from './Components/Update-Course'
import CourseDetails from './Components/Course-Details'
import axios from 'axios'



class App extends Component {

  constructor() {

    super()

    this.state = {
      courses: []
    }


  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/courses')
    .then(res => {
      const courses = res.data;
      this.setState({courses});
      console.log(this.state.courses)
    })
  }

  render() {
    return (
      <div className="root">
        <div>
          <BrowserRouter>
            <Header courses={this.state.courses}/>
              <Switch>
                <Route exact path="/" render= {()=> <Home courses={this.state.courses}/>} />
                <Route path="/SignIn" render= {() => <UserSignIn />} />
                <Route path="/SignUp" render= {() => <UserSignUp />} />
                <Route path="/Create-Course" render= {() => <CreateCourse />} />
                <Route path="/Update-Course" render= {() => <UpdateCourse />} />
                <Route path="/Course-Details" render={() => <CourseDetails />} />
                <Route  component={NotFound} />
              </Switch>
          </BrowserRouter>
        </div>
      </div>
    );
  }
}

export default App;
