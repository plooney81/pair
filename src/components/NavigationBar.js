import React from 'react';
import {Navbar, Nav, Form, Button} from 'react-bootstrap';
import { useDispatch} from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
import { logout } from '../redux/action';
import { auth } from '../services/firebase';
import './NavigationBar.css';
import pairLogo from '../img/pair_logo.svg';


export default function NavigationBar() {
    const dispatch = useDispatch()
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
                console.log(error)
            })
    }
    return (
        <Navbar bg="dark" variant="dark" className='navbar' expand='md' >
                <Navbar.Brand><NavLink to="/">
                    <img src={pairLogo} className="pair-logo" alt="pair logo" />
                </NavLink></Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse >
                <Nav className="mr-auto">
                    <NavLink to="/" className="nav-link" role="button">
                        Home
                    </NavLink>
                    <NavLink to="/signup" className="nav-link" role="button">
                        Signup
                    </NavLink>
                    <NavLink to="/login" className="nav-link" role="button">
                        Login
                    </NavLink>
                    <NavLink to="/chat" className="nav-link" role="button">
                        Chat
                    </NavLink>
                </Nav>
                <Form inline onSubmit={signOut}>
                    <Button variant="outline-info" className="sign-out" type="submit" style={{color: '#fafafa', borderColor: '#fafafa'}}>Sign Out</Button>
                </Form>

            </Navbar.Collapse>
        </Navbar>
    )
}
