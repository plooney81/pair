import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useSelector } from 'react-redux';

export default function Profile() {
    const user = useSelector((state) => state.user)
    const [show, setShow] = useState(false);
    const [displayName, setDisplayName] = useState(user.displayName)
    const [email, setEmail] = useState(user.email)
    const [photoURL, setPhotoURL] = useState(user.photoURL)
    const handleSubmit = () => {
        //
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
                                <Form.Control type="text" value={email}/>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Display Name</Form.Label>
                                <Form.Control type="text" value={displayName}/>
                                <Form.Text className="text-muted">
                                This could be a first name, a nickname, or really whatever.
                                </Form.Text>
                            </Form.Group>
                        </div>
                        <div className="ml-3 border">
                            <span>Profile Picture</span>
                            <img href={`${user.photoURL}`} alt={`${user.displayName}'s profile`}/>
                            <Form.Group>
                                <Form.File label="Upload an Image" />
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

            <img href={`${user.photoURL}`} alt={`${user.displayName}'s profile`}/>
        </>
    )
}
