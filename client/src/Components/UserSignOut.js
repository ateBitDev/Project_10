import React from "react"
import {Redirect} from 'react-router-dom'

const UserSignOut = () => {

    //after renders a redirect to home course page
    return (
        <Redirect to="/" > </Redirect>
    )
}

export default UserSignOut