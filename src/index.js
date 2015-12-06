import React from 'react';
import { render } from 'react-dom'
import { createHistory, useBasename } from 'history'
import { Router, Route, Link } from 'react-router'
import Products from './components/Products'

const history = useBasename(createHistory)({
    basename: '/'
});

class App extends React.Component {
    render() {
        const depth = this.props.routes.length;

        return (
            <div>
                <aside>
                    <ul>
                        <li><Link to={"/products"}>Products</Link></li>
                        <li><Link to={"/orders"}>Orders</Link></li>
                    </ul>
                </aside>
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

class Orders extends React.Component {
    render() {
        return (
            <div className="Page">
                <h1>input 2</h1>
            </div>
        )
    }
}

render((
    <Router history={history}>
        <Route path={"/"} component={App}>
            <Route path={"/products"} component={Products} />
            <Route path={"/orders"} component={Orders} />
        </Route>
    </Router>), document.getElementById('root'));
