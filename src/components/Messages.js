import React from 'react';
import { Card } from 'react-bootstrap';

export default function Messages({message}) {
    return (
        <Card style={{width: '70vw'}} className='chat-card'>
            <Card.Header className="d-flex justify-content-around">
                <span>Messenger Name</span>
                <span>Message Time</span>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                Message Content
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
