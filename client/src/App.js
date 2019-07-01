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
import Content from './Components/Content'
import axios from 'axios'


class App extends Component {

  constructor() {

    super()

    this.state = {
      user : {},
      username : "",
      password : ""
    }


  }

  signOut = () => {
    localStorage.clear();

    this.props.history.push("/")
  }

  signIn = (e, emailAddress, password) => {
    if(e){
    e.preventDefault();
    }

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
          password : user.password
        })
      }
    })
  }



  render() {
    return (
      <Content.Provider 
      value={{
        signIn : this.signIn.bind(this),
        signOut : this.signOut.bind(this)
      }}>
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
      </Content.Provider>
    );
  }
}

export default App;
