
import React from 'react';

import { render } from 'react-dom'
import xhr from 'xhr'
export default class Repos extends React.Component {

    _authenticate() {
        const code = this.props.location.query.code;
        xhr({
            url: 'https://fork-explorer-lh.herokuapp.com/authenticate/' + code,
            json: true
        }, (err, req, body) => {
            console.log('body');
            window.localStorage.token = body.token;
        });
    }
    componentWillMount() {
        if (!window.localStorage.token || window.localStorage.token === 'undefined') {
            this._authenticate()
        }
    }
    render() {

        return (
            <div>
                <h1> Welcome! </h1>
            </div>
        )
    }
}
