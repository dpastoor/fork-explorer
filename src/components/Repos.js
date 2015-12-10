
import React from 'react';
import { render } from 'react-dom'
export default class Repos extends React.Component {
    render() {

        return (
            <div>
                <h1> callback gave the code: {this.props.location.query.code} </h1>
            </div>
        )
    }
}
