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
    }
    
  }
  //added old code to check if email is valid

  //handles the subming of new users
  handleSubmit = (e, firstName, lastName, emailAddress, password, signIn, confirmPassword) => {
    e.preventDefault();

      axios.post("http://localhost:5000/api/users", {
        firstName,
        lastName,
        emailAddress,
        password,
        confirmPassword
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
  
}

//keeps states updated to changes in inputs
handleChange = (e) => {
    let input = e.target

    this.setState({[input.name] : input.value});
}

  //renders form to sign up new user
  render() {
      
    const {firstName, lastName, emailAddress, password, confirmPassword} = this.state

  return (
  <Content.Consumer>{ ({signIn}) => 
  <div className="grid-33 centered signin">
    <h1>Sign Up</h1>
    <Error err={this.state.err} />

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