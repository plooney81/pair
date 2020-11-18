import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import googleLogo from './google.svg';
import githubLogo from './github.png';


import { signup, signInWithGoogle, signInWithGitHub } from '../helpers/auth';
import { useDispatch } from 'react-redux';
import { login, writeError } from '../redux/action';
import { signUpFunction } from '../services/usersDbFunctions';

import './SignUp.css';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();
    const chatLocation = { pathname: '/chat', state: {fromLogin: true}}
    const dispatch = useDispatch()


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setEmail('');
        setPassword('');
        await signup(email, password)
            .then((res) => {
                //! First argument is user data, the second is the group number they belong to
                let userResponse = signUpFunction(res.user)
                if(userResponse === error){
                    dispatch(writeError(error))
                }else{
                    dispatch(writeError('Successful'))
                    dispatch(login(userResponse))
                }
                history.push(chatLocation)
            })
            .catch((error) => {
                setError(error.message);
            })
    }

    const googleSignIn = async () => {
        await signInWithGoogle()
        .then((res) => {
            //! First argument is user data, the second is the group number they belong to
            dispatch(login(res))
            let userResponse = signUpFunction(res.user)
            if(userResponse === error){
                dispatch(writeError(error))
            }else{
                dispatch(writeError('Successful'))
                dispatch(login(userResponse))
            }
            history.push(chatLocation)
        })
        .catch((error) => {
            setError(error.message);
        })
    }

    const gitHubSignIn = async () => {
        await signInWithGitHub()
        .then((res) => {
            //! First argument is user data, the second is the group number they belong to
            dispatch(login(res))
            let userResponse = signUpFunction(res.user)
            if(userResponse === error){
                dispatch(writeError(error))
            }else{
                dispatch(writeError('Successful'))
                dispatch(login(userResponse))
            }
            history.push(chatLocation)
        })
        .catch((error) => {
            setError(error.message);
        })
    }

    return (
        <Container className="mt-5 signup-form-container">
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
                <div className="d-flex justify-content-around mb-3">
                    <Button type="submit" className='signup-button'>
                        Sign Up
                    </Button>
                    <Button variant="primary" onClick={googleSignIn} style={{padding: '0'}}>
                        <img src={googleLogo} alt="Google Logo"></img>
                        <span className="m-2">Sign up with Google</span>
                    </Button>
                    <Button variant="primary" onClick={gitHubSignIn} 
                    style={{padding: '0', backgroundColor: '#f5f5f5', color: "#333", borderColor: '#333'}}>
                        <img src={githubLogo} alt="GitHub Logo" className="ml-1"></img>
                        <span className="m-2">Sign up with GitHub</span>
                    </Button>
                </div>
                <Form.Text className="danger pb-3">
                    Already have an account? <Link to='/login'>Sign in</Link>
                </Form.Text>
            </Form>
        </Container>
    )
}
