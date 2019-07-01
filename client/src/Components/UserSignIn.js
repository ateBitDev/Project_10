import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Content from './Content'

class  UserSignIn extends Component{

    constructor() {

      super()

      this.state = {

        emailAddress : "",
        password : ""
      }
      
    }

    handleSubmit = (e, signIn, emailAddress, password) => {
      e.preventDefault();

      signIn(e, emailAddress, password)
    }

    handleChange = (e) => {
      let input = e.target

      this.setState({[input.name] : input.value});
  }

    render() {

      const {emailAddress, password} = this.state

      return (
        <Content.Consumer>{ ({signIn}) => 
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <div>
            <form onSubmit={e => this.handleSubmit(e,signIn, emailAddress, password)}>
              <div><input id="emailAddress" name="emailAddress" type="text" className="" placeholder="Email Address" defaultValue="" onChange={this.handleChange} /></div>
              <div><input id="password" name="password" type="password" className="" placeholder="Password" defaultValue="" onChange={this.handleChange} /></div>
              <div className="grid-100 pad-bottom"><button className="button" type="submit">Sign In</button><Link to="/" className="button button-secondary" >Cancel</Link></div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>Don't have a user account? <a href="signUp">Click here</a> to sign up!</p>
      </div> }
        </Content.Consumer>
    )
    }
}

export default UserSignIn