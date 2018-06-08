import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';

import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Notes from './components/Notes/Notes'
import LoggedIn from './components/LoggedIn/LoggedIn'

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/notes" component={Notes} />
            <Route path="/logged-in" component={LoggedIn} />
	          <Redirect from='/' to='/login'/>
          </Switch>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
