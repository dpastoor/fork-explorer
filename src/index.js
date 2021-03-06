import React from 'react';
import { render } from 'react-dom'
import { createHistory, useBasename } from 'history'
import { Router, Route, Link } from 'react-router'
import Login from './components/Login'
import Branches from './components/Branches'
import Authentication from './components/Authentication'
import App from './App'
const history = useBasename(createHistory)({
    basename: '/'
});
render((
    <Router history={history}>
        <Route path={"/"} component={App}>
            <Route path={"/login"} component={Login} />
            <Route path={"/auth/callback"} component={Authentication} />
          <Route path={"/branches"} component={Branches} />
        </Route>
    </Router>), document.getElementById('root'));
