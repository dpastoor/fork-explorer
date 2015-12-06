import React from 'react';
import { render } from 'react-dom'
import { createHistory, useBasename } from 'history'
import { Router, Route, Link } from 'react-router'


const history = useBasename(createHistory)({
    basename: '/breadcrumbs'
});

class App extends React.Component {
    render() {
        const depth = this.props.routes.length

        return (
            <div>
                <aside>
                    <ul>
                        <li><Link to={"/products"}>Products</Link></li>
                        <li><Link to={Orders.path}>Orders</Link></li>
                    </ul>
                </aside>
                <main>
                    {this.props.children}
                </main>
            </div>
        )
    }
}

App.title = 'Home'
App.path = '/'


class Products extends React.Component {
    render() {
        return (
            <div className="Page">
                <h1>Products</h1>
            </div>
        )
    }
}


class Orders extends React.Component {
    render() {
        return (
            <div className="Page">
                <h1>Orders</h1>
            </div>
        )
    }
}

Orders.title = 'Orders'
Orders.path = '/orders'

render((
    <Router history={history}>
        <Route path={App.path} component={App}>
            <Route path={"/products"} component={Products} />
            <Route path={Orders.path} component={Orders} />
        </Route>
    </Router>), document.getElementById('root'));
