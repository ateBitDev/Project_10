import React from "react"

const UserSignUp = () => {

 return (

  <div class="grid-33 centered signin">
    <form>
              <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" value="" /></div>
              <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" value="" /></div>
              <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" value="" /></div>
              <div><input id="password" name="password" type="password" className="" placeholder="Password" value="" /></div>
              <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" value="" /></div>
              <div class="grid-100 pad-bottom"><button class="button" type="submit">Sign Up</button><button className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button></div>
    </form>
  </div>

 )
}
export default UserSignUp