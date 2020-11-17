import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { storageRef } from '../services/firebase';

export default function Profile() {
    const user = useSelector((state) => state.user)
    const [show, setShow] = useState(false);
    const [displayName, setDisplayName] = useState(user.displayName)
    const [email, setEmail] = useState(user.email)
    const [photoURL, setPhotoURL] = useState(user.photoURL)
    const [selectedFile, setSelectedFile] = useState(null);
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
        //TODO: Send all of the form data to the correct users info in the realtime db...look at the usersDbFunctions for some inspiration
        
    }
    return (
        <>
            <Button variant="primary" onClick={() => {setShow(true)}}>
                Launch static backdrop modal
            </Button>

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
                            <img src={`${photoURL}`} alt={`${user.displayName}'s profile`}/>
                            <Form.Group>
                                <Form.File label="Upload an Image" onChange={(e) => {setSelectedFile(e.target.files[0])}}/>
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
