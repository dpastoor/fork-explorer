import React from 'react';
import { render } from 'react-dom'
import { createHistory, useBasename } from 'history'
import { Router, Route, Link } from 'react-router'
import Login from './components/Login'
import Repos from './components/Repos'
import App from './App'
const history = useBasename(createHistory)({
    basename: '/'
});
render((
    <Router history={history}>
        <Route path={"/"} component={App}>
            <Route path={"/login"} component={Login} />
            <Route path={"/auth/callback"} component={Repos} />
        </Route>
    </Router>), document.getElementById('root'));
