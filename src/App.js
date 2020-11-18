import React, { useEffect } from 'react';
import { Route, BrowserRouter, Switch, Redirect, useHistory } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import { auth } from './services/firebase';
import {useSelector, useDispatch} from 'react-redux';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar';
import Profile from './pages/Profile';
import { login } from './redux/action';

export default function App() {
  const user = useSelector(state => state.user);
  const fireBaseUser = auth().currentUser;
  const dispatch = useDispatch();

  useEffect(() => {
      //! if the redux state is empty, but firebase still has a current user
      //! then we call the login function
      if(fireBaseUser){
        const {displayName, photoURL, email, uid} = fireBaseUser
        dispatch(login({displayName, photoURL, email, uid}))
      }
  }, [])

  return (
    <div>
      <BrowserRouter>
      <NavigationBar/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          {fireBaseUser && (
            <>
              <Route path="/chat" component={Chat} />
              <Route path="/profile" component={Profile} />
            </>
          )}
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

