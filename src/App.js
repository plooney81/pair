import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import { auth } from './services/firebase';
import {useSelector, useDispatch} from 'react-redux';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar';

export default function App() {
  // const isLoggedIn = useSelector(state => state)
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  console.log(Object.keys(user).length > 0)
  return (
    <div>
      <BrowserRouter>
      <NavigationBar/>
        <Switch>
          <Route exact path="/" component={Home} />
          {Object.keys(user).length > 0 && (
            <Route path="/chat" component={Chat} />
          )}
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

