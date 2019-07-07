import React, {Component} from "react"
import {Link, withRouter} from 'react-router-dom'
import Error from './Error'
import Content from './Content'
import axios from 'axios'

class UserSignUp extends Component {

  constructor() {

    super()

    this.state = {
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
      confirmPassword : "",
      err : "",
      errors : []
    }
    
  }
  //added old code to check if email is valid
  isValidEmail = (userEmail) =>
  {
  return /^[^@]+@[^@.]+\.[a-z]+$/i.test(userEmail);
  }

  //handles the subming of new users
  handleSubmit = (e, firstName, lastName, emailAddress, password, signIn, confirmPassword) => {
    e.preventDefault();

    let arr = []

    if(firstName === "" ) 
    {
      arr.push("Please enter a first name")
     }
     if(lastName === ""){
      arr.push("Please enter a last name")
     }
     if(emailAddress === "") {
       arr.push("please enter an email address")
     }
     if(password === "") {
       arr.push("please enter a password")
     }
     if(password !== confirmPassword) {
       arr.push("Passwords don't match")
     }

     if(!this.isValidEmail(emailAddress)) {
       arr.push("The email field has to follow this example Example@domain.com")
     }

     this.setState({
       errors : arr
     })

     if(arr.length === 0) {
      axios.post("http://localhost:5000/api/users", {
        firstName,
        lastName,
        emailAddress,
        password
    })
    .then( res => {
      if(res.status === 201) {
        signIn( emailAddress, password)
      }
        
        this.props.history.push("/")

    }).catch(err => {
      console.log(err, 'err')
      this.setState({
        err : err.response
      })
    })

    this.setState({
      errors : []
    })
     }
     else {

     }
  
}

//keeps states updated to changes in inputs
handleChange = (e) => {
    let input = e.target

    this.setState({[input.name] : input.value});
}

  //renders form to sign up new user
  render() {
      
    const {firstName, lastName, emailAddress, password, confirmPassword, errors} = this.state

  return (
  <Content.Consumer>{ ({signIn}) => 
  <div className="grid-33 centered signin">
    <h1>Sign Up</h1>
    <Error err={this.state.err} />
    {(errors.length !== 0) ?
                <div>
                  <h2 className="validation--errors--label">Validation errors</h2> 
                  <div className="validation-errors">
                    <ul>{errors.map((err,index) => (
                      <li key={index}>{err}</li>
                    ))}
                      
                    </ul>
                </div>
                  </div> : ""}
    <form onSubmit={e => this.handleSubmit(e, firstName, lastName, emailAddress, password, signIn, confirmPassword)}>
              <div><input id="firstName" name="firstName" type="text" className="" placeholder="First Name" defaultValue="" onChange={this.handleChange}/></div>
              <div><input id="lastName" name="lastName" type="text" className="" placeholder="Last Name" defaultValue="" onChange={this.handleChange}/></div>
              <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" defaultValue="" onChange={this.handleChange}/></div>
              <div><input id="password" name="password" type="password" className="" placeholder="Password" defaultValue="" onChange={this.handleChange}/></div>
              <div><input id="confirmPassword" name="confirmPassword" type="password" className="" placeholder="Confirm Password" defaultValue="" onChange={this.handleChange}/></div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign Up</button><Link to="/" className="button button-secondary" >Cancel</Link></div>
    </form>
  </div>
  }</Content.Consumer>
 )
  }

}
export default withRouter(UserSignUp)