import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export class App extends Component {
    constructor(props) {
        super(props);
    }
  render() {
    return (
       <div>
           <h1> Fork Explorer</h1>
           {console.log('in login')}
               {this.props.children}
       </div>
    );
  }
}



