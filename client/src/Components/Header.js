import React from "react"
import {Link} from 'react-router-dom'
import Content from "./Content"

const Header = (props) =>   {

 return (
    <Content.Consumer>
        {({signOut}) => (

   props.bool
   ? 
   ( <div>
   <div className="header">
       <div className="bounds">
           <h1 className="header--logo">Courses</h1>
           <nav>
            <span className="signOut">Welcome {props.name}!</span>               
            < Link to="/signOut" className="signin" onClick={signOut}>Sign Out</Link>
            </nav>
       </div>
   </div>
   </div> )
   :     
  ( <div>
        <div className="header">
            <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                <nav>< Link to="/SignUp" className="signup">Sign Up</Link></nav>
                <nav>< Link to="/SignIn" className="signin">Sign In</Link></nav>
            </div>
        </div>
  </div> )
        )}
    </Content.Consumer>
)
}

export default Header