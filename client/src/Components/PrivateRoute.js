import React from 'react'
import {Route, Redirect} from 'react-router-dom'

//private route that checks if user is logged in and if not then reroutes user to signin page
const PrivateRoute = ({ component: Component, ...rest }) => (

        <Route {...rest} render={(props) => (
            localStorage.getItem("name")
            ?(<Component {...props} />)
            :(<Redirect to="/signIn" />)
        )}/>
)

export default PrivateRoute