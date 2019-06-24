import React from "react"

const UserSignUp = () => {

    let handleClick = (event) => {
        window.history.replaceState({foo: "bar"},"Search", "/")
        //event.preventDefault();
    }


 return (

  <div className="grid-33 centered signin">
    <h1>Sign Up</h1>
    <form >
              <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" defaultValue="" /></div>
              <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" defaultValue="" /></div>
              <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" defaultValue="" /></div>
              <div><input id="password" name="password" type="password" className="" placeholder="Password" defaultValue="" /></div>
              <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" defaultValue="" /></div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><button className="button button-secondary" onClick= {handleClick} >Cancel</button></div>
    </form>
  </div>

 )
}
export default UserSignUp