import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Error from "./Error"
import axios from 'axios'

class UpdateCourse extends Component {

    constructor() 
    {
        super()

        this.state = {
            course : {},
            id : "", 
            title : "",
            estimatedTime : "",
            description : "",
            materialsNeeded : "",
            err : "",
            errors : []
        }
    }

    componentDidMount() {
        this.getCourse()
      }
    
    //updates the currently rendered course with the submited changes
    handleSubmit = (e, title, estimatedTime, description, materialsNeeded) => { 

      this.setState({
        errors : []
      })

      e.preventDefault();

      let arr = []

      console.log(title)
      if(title === "" )
      {
        arr.push("Please enter a title")
      }
      if(description === "") {
        arr.push("Please enter a description")
      }

      this.setState({
        errors : arr
      })

      if(arr.length === 0) {
        axios.put("http://localhost:5000/api/courses/" + this.props.match.params.id, {
            title,
            estimatedTime,
            description,
            materialsNeeded
        })
        .then( () => {
            this.props.history.push("/")
        })
        .catch(err => {
          console.log(err, 'err')
          this.setState({
            err : err.response
          })
        })
      }

    }

    //updates state to keep track of changes in inputs
    handleChange = (e) => {
        let input = e.target

        this.setState({[input.name] : input.value});
    }

    //gets the course that was clicked on in the detailed page 
    getCourse = () => {
        this.setState({id : this.props.match.params.id})
        axios.get('http://localhost:5000/api/courses/' + this.props.match.params.id)
        .then(res => {
          this.setState({
            course : res.data,
            id : this.props.match.params.id,
            title : res.data.title,
            estimatedTime : res.data.estimatedTime,
            description : res.data.description,
            materialsNeeded : res.data.materialsNeeded
          });
          
        })
    }

    //renders course from course-details page 
    render() {
      let {title, estimatedTime, description, materialsNeeded, errors} = this.state


        return (
            <div className="bounds course--detail">
            <h1>Update Course</h1>
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
            <div>
              <form onSubmit={e => this.handleSubmit(e, title, estimatedTime, description, materialsNeeded)}>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                    <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                        defaultValue={title} onChange={this.handleChange} onKeyUp={this.handleChange} /></div>
                    <p>By Joe Smith</p>
                  </div>
                  <div className="course--description">
                    <div><textarea id="description" name="description" className="" placeholder="Course description..." value={description} onChange={this.handleChange} onKeyUp={this.handleChange}>
                     </textarea></div>
                  </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                            placeholder="Hours" defaultValue={estimatedTime} onChange={this.handleChange} onKeyUp={this.handleChange}/></div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>


                        <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." value={materialsNeeded} onChange={this.handleChange} onKeyUp={this.handleChange}>
                             </textarea></div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="grid-100 pad-bottom"><button className="button" type="submit">Update Course</button><Link to={"/Courses/" + this.props.match.params.id} className="button button-secondary" >Cancel</Link></div>
              </form>
            </div>
          </div>
        )
        }
    }
export default withRouter(UpdateCourse)