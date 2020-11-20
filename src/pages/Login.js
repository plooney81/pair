import React, { useEffect, useState } from 'react';
import { signin, signInWithGoogle, signInWithGitHub } from '../helpers/auth';
import { Form, Button, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { login } from '../redux/action';
import { Link, useHistory } from 'react-router-dom';
import googleLogo from '../img/google.svg';
import githubLogo from '../img/github.png';
import { signInFunction } from '../services/usersDbFunctions';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();
    const chatLocation = { pathname: '/chat', state: {fromLogin: true}}
    const dispatch = useDispatch();
    
        //? Responsiveness addition
        const [windowWidth, setWindowWidth] = useState(null)
        const mediaQuery = {
            desktop: 1200,
            tablet: 768,
            phone: 576
        }

        useEffect(() => {
            window.addEventListener('resize', () => {
                setWindowWidth(document.body.clientWidth)
            })
        }, [])
    
        let [padding, fontSize, lineHeight, width, height, marginLeft, marginRight] = ['', '', '', '32px', '32px', '0', '0'];
    
        if(windowWidth < mediaQuery.phone){
            padding = '1px 2px'
            fontSize = '80%'
            lineHeight = '1'
            width = '25px'
            height = '25px'
            marginLeft = '5px'
            marginRight = '5px'
        }else if(windowWidth > mediaQuery.phone && windowWidth < mediaQuery.tablet){
            padding = '2px 4px'
            fontSize = '80%'
            lineHeight = '1'
        }else{
            padding = '4px 9px'
            fontSize = '90%'
            lineHeight = '1.2'
        }
    
        const responsiveButtonStyle = {padding, fontSize, lineHeight, marginLeft, marginRight}
    
        const responsiveGitHubButton = {
            padding, fontSize, lineHeight, marginLeft, marginRight,
            backgroundColor: '#f5f5f5',
            color: "#333",
            borderColor: '#333',
        }
    
        const responsiveLogoImgStyle = {width, height}

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setEmail('');
        setPassword('');
        await signin(email, password)
            .then((res) => {
                signInFunction(res.user)
                    .then(returnData => {
                        dispatch(login(returnData))
                        history.push(chatLocation)
                    })
            })
            .catch((error) => {
                setError(error.message);
            })
    }

    const googleSignIn = async () => {
        await signInWithGoogle()
        .then((res) => {
            signInFunction(res.user)
                .then(returnData => {
                    dispatch(login(returnData))
                    history.push(chatLocation)
                })
        })
        .catch((error) => {
            setError(error.message);
        })
    }

    const gitHubSignIn = async () => {
        await signInWithGitHub()
            .then((res) => {
                
                signInFunction(res.user)
                    .then(returnData => {
                        dispatch(login(returnData))
                        history.push(chatLocation)
                    })
            })
            .catch((error) => {
                setError(error.message);
            })
    }

    return (
        <Container className="mt-5 signup-form-container">
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
                <div className="d-flex justify-content-around mb-3">
                    <Button type="submit" className='signup-button' style={responsiveButtonStyle}>
                        Login
                    </Button>
                    <Button variant="primary" className="d-flex justify-content-around align-items-center" onClick={googleSignIn} style={responsiveButtonStyle}>
                        <img src={googleLogo} alt="Google Logo" style={responsiveLogoImgStyle} className="ml-1"></img>
                        <span className="m-2">Sign up with Google</span>
                    </Button>
                    <Button variant="primary" onClick={gitHubSignIn} className="d-flex justify-content-around align-items-center" style={responsiveGitHubButton}>
                        <img src={githubLogo} alt="GitHub Logo" className="ml-1" style={responsiveLogoImgStyle}></img>
                        <span className="m-2">Sign up with GitHub</span>
                    </Button>
                </div>
                <Form.Text className="danger pb-3">
                    Don't have an account? <Link to='/signup'>Sign up</Link>
                </Form.Text>
            </Form>
        </Container>
    )
}
