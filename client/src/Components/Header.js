import React from "react"
import {Link} from 'react-router-dom'

const Header = (props) =>   {

 return (
  <div>
        <div className="header">
            <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                <nav>< Link to="/SignUp" className="signup">Sign Up</Link></nav>
                <nav>< Link to="/SignIn" className="signin">Sign In</Link></nav>
            </div>
        </div>
    </div>
    
)
}

export default Header