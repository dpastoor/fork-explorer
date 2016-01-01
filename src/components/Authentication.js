
import React from 'react';
import { render } from 'react-dom';
import qs from 'qs';
import xhr from 'xhr';
import Select from 'react-select';
import {RaisedButton} from 'material-ui';
import _ from 'lodash';
import AceEditor from 'react-ace';
import brace from 'brace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

export default class Authentication extends React.Component {
  constructor(props) {
    super(props);
  }

  _authenticate() {
    const code = this.props.location.query.code;
      xhr({
        url: 'https://fork-explorer-lh.herokuapp.com/authenticate/' + code,
        json: true
      }, (err, req, body) => {
        window.localStorage.token = body.token;
        window.location.href = window.location.origin + "/branches";
      });
    }
    componentWillMount() {
      this._authenticate()
    }

    render() {
      return (
        <div>
            Authenticating...
        </div>
      )
    }
}
