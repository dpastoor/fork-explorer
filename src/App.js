import React, { Component } from 'react';
import ReactDOM from 'react-dom';
export class App extends Component {
    constructor(props) {
        super(props);
        this.state = {counter: 0}
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



