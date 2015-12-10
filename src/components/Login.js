import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import mui, {RaisedButton} from 'material-ui';
import qs from 'qs';
export default class Login extends Component {
    constructor(props) {
        super(props);
    }
    _onSubmit() {
        console.log('going to new location')
        window.location='https://github.com/login/oauth/authorize?'+
            qs.stringify({
                client_id:'feacb4f6529c9ed7ed6e',
                redirect_uri: window.location.origin + '/auth/callback',
                scope:'user,repo'
            })
    }
  render() {
    return (
       <div>
           <RaisedButton label="Login with Github"
           onClick={this._onSubmit} />
       </div>
    );
  }
}



