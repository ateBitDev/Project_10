import React from 'react'
import {Link} from 'react-router-dom'

const UserSignIn = () => {

    return (
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <form>
              <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" defaultValue="" /></div>
              <div><input id="password" name="password" type="password" className="" placeholder="Password" defaultValue="" /></div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button><Link to="/" className="button button-secondary" >Cancel</Link></div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <a href="signUp">Click here</a> to sign up!</p>
        </div>
    )
}

export default UserSignIn