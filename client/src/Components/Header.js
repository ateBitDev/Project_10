import React from "react"
import {Link} from 'react-router-dom'
import Content from "./Content"

const Header = () =>   {

 return (

    //consumer passes signout method from app and uses it as click funtion to remove current user
    <Content.Consumer>
        {({signOut}) => (
   localStorage.getItem("name")
   ?
   //if name exist then renders user name and signout 
   ( <div>
   <div className="header">
       <div className="bounds">
           <h1 className="header--logo">Courses</h1>
           <nav>
            <span className="signOut">Welcome {localStorage.getItem("name")}!</span>               
            < Link to="/signOut" className="signin" onClick={signOut}>Sign Out</Link>
            </nav>
       </div>
   </div>
   </div> )
   :
   //if name Dosen't exist then renders just signIn and signUp      
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