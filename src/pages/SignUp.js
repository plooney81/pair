import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../services/firebase';
import googleLogo from './google.svg';
import githubLogo from './github.png';


import { signup, signInWithGoogle, signInWithGitHub } from '../helpers/auth';
import { useDispatch } from 'react-redux';
import { login } from '../redux/action';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch()
    
    const history = useHistory();
    const chatLocation = { pathname: '/chat', state: {fromLogin: true}}

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setEmail('');
        setPassword('');
        await signup(email, password)
            .then((res) => {
                dispatch(login(res))
                history.push(chatLocation)
            })
            .catch((error) => {
                setError(error.message);
            })
    }

    const googleSignIn = async () => {
        await signInWithGoogle()
        .then((res) => {
            dispatch(login(res))
            history.push(chatLocation)
        })
        .catch((error) => {
            setError(error.message);
        })
    }

    const gitHubSignIn = async () => {
        await signInWithGitHub()
        .then((res) => {
            dispatch(login(res))
            history.push(chatLocation)
        })
        .catch((error) => {
            setError(error.message);
        })
    }

    return (
        <Container className="mt-5">
            <h1>Sign Up</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                    <Form.Text className="text-muted" >
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                </Form.Group>
                {error && (
                    <Form.Text className="danger">
                        {error}
                    </Form.Text>
                )}
                <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <div className="d-flex justify-content-around">
                    <Button variant="primary" type="submit">
                        Sign Up
                    </Button>
                    <Button variant="primary" onClick={googleSignIn} style={{padding: '0'}}>
                        <img src={googleLogo} alt="Google Logo"></img>
                        <span className="m-2">Sign Up with Google</span>
                    </Button>
                    <Button variant="primary" onClick={gitHubSignIn} 
                    style={{padding: '0', backgroundColor: '#f5f5f5', color: "#333", borderColor: '#333'}}>
                        <img src={githubLogo} alt="GitHub Logo" className="ml-1"></img>
                        <span className="m-2">Sign Up with GitHub</span>
                    </Button>
                </div>
                <Form.Text className="danger mt-3">
                    Already have an account? <Link to='/login'>Sign in</Link>
                </Form.Text>
            </Form>
        </Container>
    )
}
