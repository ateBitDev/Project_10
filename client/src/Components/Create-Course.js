import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom'
import axios from 'axios';

class CreateCourse extends Component {

    constructor() {

        super()

        this.state = {

            title : "",
            time : "",
            description : "",
            needed : ""

        }
    }

    handleSubmit = (e, title, estimatedTime, description, materialsNeeded) => {
        e.preventDefault();

        axios.post("http://localhost:5000/api/courses", {
            title,
            estimatedTime,
            description,
            materialsNeeded
        })
        .then( () => {
            this.props.history.push("")
        })
        
    }

    handleChange = (e) => {
        let input = e.target

        this.setState({[input.name] : input.value});
    }

    render() {

        const {title, estimatedTime, description, materialsNeeded} = this.state

        return (
            <div className="bounds course--detail">
                <h1>Create Course</h1>
                <div>
                <div>
                    <div className="validation-errors">
                    </div>
                </div>
                <form onSubmit={e => this.handleSubmit(e, title, estimatedTime, description, materialsNeeded)}>
                    <div className="grid-66">
                    <div className="course--header">
                        <h4 className="course--label">Course</h4>
                        <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..."
                            defaultValue="" onChange={this.handleChange}/></div>
                        <p>By Joe Smith</p>
                    </div>
                    <div className="course--description">
                        <div><textarea id="description" name="description" className="" placeholder="Course description..." onChange={this.handleChange}></textarea></div>
                    </div>
                    </div>
                    <div className="grid-25 grid-right">
                    <div className="course--stats">
                        <ul className="course--stats--list">
                        <li className="course--stats--list--item">
                            <h4>Estimated Time</h4>
                            <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input"
                                placeholder="Hours" defaultValue="" onChange={this.handleChange}/></div>
                        </li>
                        <li className="course--stats--list--item">
                            <h4>Materials Needed</h4>
                            <div><textarea id="materialsNeeded" name="materialsNeeded" className="" placeholder="List materials..." onChange={this.handleChange}></textarea></div>
                        </li>
                        </ul>
                    </div>
                    </div>
                    <div className="grid-100 pad-bottom"><button className="button" type="submit">Create Course</button><Link  to="/" className="button button-secondary" >Cancel</Link></div>
                </form>
                </div>   
            </div>
        )
    }
} 

export default withRouter(CreateCourse)