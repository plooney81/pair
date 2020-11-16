import React from 'react';
import { Card } from 'react-bootstrap';

export default function Messages({message}) {
    return (
        <Card className='chat-card'>
            <Card.Header className="d-flex justify-content-around">
                <span>{message.name}</span>
                <span>{message.timestamp}</span>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                {message.content}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
