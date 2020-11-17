import React, { useState } from 'react';
import {Navbar, Nav, Form, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { logout } from '../redux/action';
import { auth } from '../services/firebase';
import './NavigationBar.css';

export default function NavigationBar() {
    const isLoggedIn = useSelector(state => state)
    const dispatch = useDispatch()
    const [error, setError] = useState('');
    const history = useHistory();
    const loginLocation = { pathname: '/login'}
    
    const signOut = async (e) => {
        e.preventDefault()
        await auth().signOut()
            .then(() => {
                dispatch(logout());
                history.push(loginLocation)
            })
            .catch((error) => {
                setError(error);
            })
    }
    return (
        <Navbar bg="dark" variant="dark" className='navbar'>
            <Navbar.Brand><NavLink to="/">Pair</NavLink></Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Link>
                <NavLink to="/" className="navbar-link">
                    Home
                </NavLink>
            </Nav.Link>
            <Nav.Link>
                <NavLink to="/signup" className="navbar-link">
                    Signup
                </NavLink>
            </Nav.Link>
            <Nav.Link>
                <NavLink to="/login" className="navbar-link">
                    Login
                </NavLink>
            </Nav.Link>
            <Nav.Link>
                <NavLink to="/chat" className="navbar-link">
                    Chat
                </NavLink>
            </Nav.Link>
            </Nav>
            <Form inline onSubmit={signOut}>
                <Button variant="outline-info" className="sign-out" type="submit" style={{color: '#fafafa', borderColor: '#fafafa'}}>Sign Out</Button>
            </Form>
        </Navbar>
    )
}
