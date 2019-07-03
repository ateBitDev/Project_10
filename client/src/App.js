import React, { Component } from 'react';
import {Route, Switch, Redirect, withRouter} from 'react-router-dom'
import './styles/global.css';
import Header from './Components/Header'
import UserSignIn from "./Components/UserSignIn";
import UserSignUp from './Components/UserSignUp'
import UserSignOut from './Components/UserSignOut'
import Courses from './Components/Courses'
import NotFound from "./Components/Not-Found";
import CreateCourse from './Components/Create-Course'
import UpdateCourse from './Components/Update-Course'
import CourseDetails from './Components/Course-Details'
import Content from './Components/Content'
import PrivateRoute from './Components/PrivateRoute'
import axios from 'axios'


class App extends Component {

  constructor() {

    super()

    this.state = {
      user : {},
      username : "",
      password : "",
      signedIn : false
    }
  }

  //signOut funtion that removes the currently saved user
  signOut = () => {
    this.setState({
      user : {},
      username : "",
      password : "",
    })
    localStorage.clear();
    console.log("User signed out")
  }

  //signIn function that checks the auth of entered user
  signIn = ( emailAddress, password) => {
 

    axios.get("http://localhost:5000/api/users", {
      auth : {
        username : emailAddress,
        password : password
      }
    })
    .then(res => {
      if(res.status === 200) {
        const user = res.data
        this.setState({
          user : user,
          username : user.emailAddress,
          password : user.password,
        })
        localStorage.setItem("name", user.firstName + " " + user.lastName)
        localStorage.setItem("id", user.id)
        localStorage.setItem("user", user)
        this.props.history.push("/courses")
      } else{
        localStorage.clear()
        this.props.history.push("/SignUp")
      }
    })

  }

  //renders entire app
  render() {

    return (
      <Content.Provider 
      value={{
        signIn : this.signIn.bind(this),
        signOut : this.signOut.bind(this)
      }}>
      <div className="root">
        <div>
            <Header bool={this.state.signedIn} name={this.state.user.firstName + " " + this.state.user.lastName}/>
              <Switch>
                <Route exact path="/" render= {() => <Redirect to="/courses"/>} />
                <Route exact path="/courses" render= {()=> <Courses/>} />
                <PrivateRoute exact path="/courses/create" component={CreateCourse} />
                <PrivateRoute exact path="/courses/:id/update" component={UpdateCourse} />
                <Route path="/courses/:id" render={() => <CourseDetails />} />
                <Route path="/SignIn" render= {() => <UserSignIn />} />
                <Route path="/SignUp" render= {() => <UserSignUp />} />
                <Route path="/SignOut" render= {() => <UserSignOut />} />
                <Route path="/notFound" component={NotFound} />
                <Route  component={NotFound} />
              </Switch>
        </div>
      </div>
      </Content.Provider>
    );
  }
}

export default withRouter(App);