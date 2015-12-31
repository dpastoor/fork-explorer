import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import mui, {RaisedButton} from 'material-ui';
import qs from 'qs';
export default class Login extends Component {
    constructor(props) {
        super(props);
    }
    onSubmit() {
        window.location='https://github.com/login/oauth/authorize?'+
            qs.stringify({
                client_id:'feacb4f6529c9ed7ed6e',
                redirect_uri: window.location.origin + '/auth/callback',
                scope:'user,repo'
            })
    }
  render() {
    return (
       <div style={{
        width: "100%",
        height: "100%",
        display: 'flex',
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        margin: "auto"

        }}
       >
           <RaisedButton label="Login with Github"
           onClick={this.onSubmit} />
       </div>
    );
  }
}



