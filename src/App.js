import React, { useEffect } from 'react';
import { Route, BrowserRouter, Switch, Redirect, useHistory } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import { auth, db } from './services/firebase';
import {useSelector, useDispatch} from 'react-redux';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavigationBar from './components/NavigationBar';
import Profile from './pages/Profile';
import { login, logout } from './redux/action';
import { pairLogoURL } from './services/usersDbFunctions';

export default function App() {
  const {user, checked} = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
     auth().onAuthStateChanged((user) => {
        if (user) {
          const {displayName, email, uid} = user
          let photoURL = ''
          db.ref('users').child(`${uid}/photoURL`).on("value", (snapshot) => {
            if(snapshot.val()){
                photoURL = snapshot.val()
            }else if(user.photoURL){
              photoURL = user.photoURL;
            }else{
              photoURL = pairLogoURL;
            }
            dispatch(login({displayName, photoURL, email, uid}))
          })
        } else {
          //! Logout
          dispatch(logout()); 
        }
      });
  }, [])

  if(!checked){
    return 'loading';
  }
  return (
    <div>
      <BrowserRouter>
      <NavigationBar/>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          {user !== null && (
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

