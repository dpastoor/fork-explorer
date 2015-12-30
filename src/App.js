import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router'
require('./main.scss');
export default class App extends React.Component {
  render() {
    return (
       <div>
               {this.props.children}
       </div>
    );
  }
}



