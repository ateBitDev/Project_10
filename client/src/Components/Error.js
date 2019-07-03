import React from 'react'

const Error = (props) => {

    return (
        <div>
            <h2 className="validation--errors--label">{props.err.data?'Validation errors': ""}</h2>
            <div className="validation-errors">
                <ul>{props.err ? 
                    props.err.data.errors.map((err, index) => (
                    <li key={index}>{err}</li>
                    ))
                    : "" }
                </ul>
            </div>
        </div> 
    )
}

export default Error