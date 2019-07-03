import React, {Component} from "react"
import {Link, withRouter} from 'react-router-dom'
import axios from 'axios'

class UserSignUp extends Component {

  constructor() {

    super()

    this.state = {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: ""
    }
    
  }

  //handles the subming of new users
  handleSubmit = (e, firstName, lastName, emailAddress, password) => {
    e.preventDefault();

    axios.post("http://localhost:5000/api/users", {
        firstName,
        lastName,
        emailAddress,
        password
    })
    .then( res => {
      if(res.status === 201) {
        localStorage.setItem("name", firstName + " " + lastName)
        localStorage.setItem("bool", "true")
      }
        
        this.props.history.push("/")

    })
    
}

//keeps states updated to changes in inputs
handleChange = (e) => {
    let input = e.target

    this.setState({[input.name] : input.value});
}

  //renders form to sign up new user
  render() {
      
    const {firstName, lastName, emailAddress, password} = this.state

  return (

  <div className="grid-33 centered signin">
    <h1>Sign Up</h1>
    <form onSubmit={e => this.handleSubmit(e, firstName, lastName, emailAddress, password)}>
              <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" defaultValue="" onChange={this.handleChange}/></div>
              <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" defaultValue="" onChange={this.handleChange}/></div>
              <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" defaultValue="" onChange={this.handleChange}/></div>
              <div><input id="password" name="password" type="password" className="" placeholder="Password" defaultValue="" onChange={this.handleChange}/></div>
              <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" defaultValue="" onChange={this.handleChange}/></div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><Link to="/" className="button button-secondary" >Cancel</Link></div>
    </form>
  </div>

 )
  }

}
export default withRouter(UserSignUp)