import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';


export default function NavigationBar() {
    const isLoggedIn = useSelector(state => state)
    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Navbar</Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Link>
                <NavLink to="/">Home</NavLink>
            </Nav.Link>
            <Nav.Link>
                <NavLink to="/signup">Signup</NavLink>
            </Nav.Link>
            <Nav.Link>
                <NavLink to="/login">Login</NavLink>
            </Nav.Link>
            <Nav.Link>
                <NavLink to="/chat">Chat</NavLink>
            </Nav.Link>
            </Nav>
        </Navbar>
    )
}
