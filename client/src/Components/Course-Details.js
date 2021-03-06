import React, {Component}from 'react'
import axios from 'axios'
import {Link, withRouter} from 'react-router-dom'
import ReactMarkDown from 'react-markdown'

class CourseDetails extends Component{

    constructor()
    {
        super()

        this.state = {
            course : {},
            id : ""
        }
        }

        componentDidMount() {
            this.getCourse()
          };
        
        //gets the course that matches the id in the params
        getCourse = () => {
            let num1 = window.location.pathname.lastIndexOf("/")
            let num2 = window.location.pathname.length
            let id = window.location.pathname.substring(num1 + 1,num2)
            this.setState({id : id})
            axios.get('http://localhost:5000/api/courses/' + id)
            .then(res => {
              this.setState({course : res.data});
            })
            .catch(err => {
              if(err){
                this.props.history.push("/notFound")
              }
            })
        }

        //deletes the course that matches the params from the api 
        deleteCourse = (e) => {
          e.preventDefault()

          axios.delete("http://localhost:5000/api/courses/" + this.state.id)
          .then(() => {
            this.props.history.replace("/")
          })
        }

        
    //renders the course that is saved to the state
    render() {
        return (
            <div>
            <div className="actions--bar">
              <div className="bounds">
              <div className="grid-100">
                { (localStorage.getItem("id") === this.state.course.user) && (localStorage.getItem("id")) !== "" ? (
                <span><Link className="button" to={this.props.match.params.id + "/update"}>Update Course</Link><Link className="button" to="#" onClick={e => this.deleteCourse(e)}>Delete Course</Link></span>

               )
                : ""
                } 
                 <Link className="button button-secondary" to="/">Return to List</Link>
                </div>
                </div>

            </div>
            <div className="bounds course--detail">
              <div className="grid-66">
                <div className="course--header">
                  <h4 className="course--label">Course</h4>
                  <h3 className="course--title">{this.state.course.title}</h3>
                  <p>By Joe Smith</p>
                </div>
                <div className="course--description">
                 <ReactMarkDown source={this.state.course.description} />
                </div>
              </div>
              <div className="grid-25 grid-right">
                <div className="course--stats">
                  <ul className="course--stats--list">
                    <li className="course--stats--list--item">
                      <h4>Estimated Time</h4>
                      <h3>{this.state.course.estimatedTime}</h3>
                    </li>
                    <li className="course--stats--list--item">
                      <h4>Materials Needed</h4>
                      <ul>
                        <ReactMarkDown source={this.state.course.materialsNeeded} />
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>  
        );
    }    
}

export default withRouter(CourseDetails)