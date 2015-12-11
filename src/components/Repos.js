
import React from 'react';
import { render } from 'react-dom';
import qs from 'qs';
import xhr from 'xhr';
import {RaisedButton} from 'material-ui';
export default class Repos extends React.Component {

    _authenticate() {
        const code = this.props.location.query.code;
        xhr({
            url: 'https://fork-explorer-lh.herokuapp.com/authenticate/' + code,
            json: true
        }, (err, req, body) => {
            console.log('re-authentication successful');
            window.localStorage.token = body.token;
        });
    }
    componentWillMount() {
        if (!window.localStorage.token || window.localStorage.token === 'undefined') {
            this._authenticate()
        }
    }

    _fetchUserData(params) {
        xhr({
            url: 'https://api.github.com/user',
            json: true,
            headers: {
               Authorization: 'token ' + window.localStorage.token
            }
        }, (err, req, body) => {
            console.log('data fetching successful');
            console.log('req')
            console.log(req)
            console.log('body')
            console.log(body)
        });
    }
    _fetchUserFile(params) {
        xhr({
            url: 'https://api.github.com/repos/hackreactor/2015-11-toy-problems/contents/primeTester/primeTester.js',
            json: true,
            headers: {
                Authorization: 'token ' + window.localStorage.token
            }
        }, (err, req, body) => {
            console.log('data fetching successful');
            console.log('req')
            console.log(req)
            console.log('body')
            console.log(body)
        });
    }
    render() {

        return (
            <div>
                <h1> Welcome! </h1>
                <RaisedButton label="fetch user data" onClick={this._fetchUserData}/>
                <RaisedButton label="fetch file data" onClick={this._fetchUserFile}/>
            </div>
        )
    }
}
