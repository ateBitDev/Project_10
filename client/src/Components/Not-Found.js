import React from "react"
import {Link} from 'react-router-dom'

const NotFound = () => {

    //renders not found component if an address is loaded that isn't handled
    return (
        <div>
            <h1>Not Found</h1>
            <p>Sorry! We couldn't find the page you're looking for.</p>
            <Link  className="button button-secondary" to="/">Home</Link>
         </div>
    )
}

export default NotFound