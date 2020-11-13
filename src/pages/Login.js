import React, { useState } from 'react';
import { signin, singInWithGoogle, signInWithGitHub, signup } from '../helpers/auth';
import { Form, Button, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { login } from '../redux/action';
import { Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setEmail('');
        setPassword('');
        try {
            await signin(email, password);

        }catch (error){
            setError(error.message)
        }
        dispatch(login())
    }

    return (
        <Container className="mt-5">
            <h1>Login</h1>
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
                <Button variant="primary" type="submit">
                    Login
                </Button>
                <Form.Text className="danger mt-3">
                    Don't have an account? <Link to='/signup'>Sign up</Link>
                </Form.Text>
            </Form>
        </Container>
    )
}
