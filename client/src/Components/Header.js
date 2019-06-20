import React from "react"
import {
    Route,
    Switch,
    Link,
  } from 'react-router-dom'
import UserSignIn from "./UserSignIn";
import UserSignUp from './UserSignUp'
import Home from './Home'
import NotFound from "./Not-Found";

const Header = () =>   {

 return (
  <div>
        <div className="header">
            <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                <nav>< Link to="/SignUp" className="signup">Sign Up</Link></nav>
                <nav>< Link to="/SignIn" className="signin">Sign In</Link></nav>
            </div>
        </div>
        <Switch>
            <Route exact path="/" render= {()=> <Home />} />
            <Route path="/SignIn" render= {() => <UserSignIn />} />
            <Route path="/SignUp" render= {() => <UserSignUp />} />
            <Route  component={NotFound} />
        </Switch>
    </div>
    
)
}

export default Header