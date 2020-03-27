import React from 'react';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp'
import Index from './components/Index/Index'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

const App = () => {
  return (
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signUp">
            <SignUp />
          </Route>
          <Route exact path="/">
            <Index />
          </Route>
        </Switch>
      </Router>
  );
};

export default App;
