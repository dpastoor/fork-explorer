import React from 'react';
import { render } from 'react-dom'
import { createHistory, useBasename } from 'history'
import { Router, Route, Link } from 'react-router'
import Products from './components/Products'
import Login from './components/Login'
import Repos from './components/Repos'
import App from './App'
const history = useBasename(createHistory)({
    basename: '/'
});


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
            <Route path={"/login"} component={Login} />
            <Route path={"/auth/callback"} component={Repos} />
        </Route>
    </Router>), document.getElementById('root'));
