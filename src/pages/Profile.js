import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/action';
import { storageRef } from '../services/firebase';
import { signUpFunction } from '../services/usersDbFunctions';

export default function Profile() {
    const user = useSelector((state) => state.user)
    const [show, setShow] = useState(false);
    const [displayName, setDisplayName] = useState(user.displayName)
    const [email, setEmail] = useState(user.email)
    const [photoURL, setPhotoURL] = useState(user.photoURL)
    const [selectedFile, setSelectedFile] = useState(null);
    const dispatch = useDispatch();
    const handleSubmit = () => {
        //! Send the photo to the storage reference
        //? The reference is images/the logged in users id/profilePic
        const uploadPic = storageRef.child(`images/${user.uid}/profilePic`).put(selectedFile)
        //! first function is the state change observer
        //! second is error handling
        //! last is on successful completion
        uploadPic.on('state_changed', (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`${progress}% completed`)
        }, (error) => {
            console.log('Error: '+error)
        }, async () => {
            await uploadPic.snapshot.ref.getDownloadURL()
                .then((downloadURL) => {
                    setPhotoURL(downloadURL)
                })
        })
        //! Send all of the form data to the correct users info in the realtime db...look at the usersDbFunctions for some inspiration
        //! We can actually reuse the signUpFunction from our usersDbFunction if we send the data in the right way...i.e. an object
        const newUserSave = {
            displayName, 
            photoURL: photoURL, 
            email, 
            uid: user.uid, 
            groups: user.userGroups
        }
        console.log(user)
        console.log(newUserSave)
        signUpFunction(newUserSave);
        dispatch(login(newUserSave))
        setShow(false);
    }

    const imgStyling = {
        height: '40px',
        borderRadius: '.25rem',
        cursor: 'pointer',
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)'
    }
    return (
        <>
            <img src={`${photoURL}`} alt={`${user.displayName}'s profile`} onClick={() => {setShow(true)}} style={imgStyling} />
            <Modal
                show={show}
                onHide={() => {setShow(false)}}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className="d-flex">
                        <div>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="text" value={email} onChange={(e) => {setEmail(e.target.value)}}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Display Name</Form.Label>
                                <Form.Control type="text" value={displayName} onChange={(e) => {setDisplayName(e.target.value)}}/>
                                <Form.Text className="text-muted">
                                This could be a first name, a nickname, or really whatever.
                                </Form.Text>
                            </Form.Group>
                        </div>
                        <div className="ml-3 border">
                            <span>Profile Picture</span>
                            <img src={`${photoURL}`} alt={`${user.displayName}'s profile`} style={{height: '100px'}}/>
                            <Form.Group>
                                <Form.File onChange={(e) => {setSelectedFile(e.target.files[0])}}/>
                            </Form.Group>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {setShow(false)}}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
