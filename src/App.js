import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Slider, DropDownMenu, RaisedButton} from 'material-ui';
import _ from 'lodash';
import request from 'browser-request';
import axios from 'axios';
import superagent from 'superagent';
export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {counter: 0}
    }
    componentWillMount() {
        axios.get('https://raw.githubusercontent.com/dpastoor/awesome-shiny/master/README.md')
            .then(function (response) {
                console.log(response);
            });
    }

  render() {
    setTimeout(() => {
        this.setState({counter: this.state.counter+1})
    }, 1000)

    return (

       <div>
           <h1>hello how are you doing {this.state.counter}</h1>

       </div>
    );
  }
}



