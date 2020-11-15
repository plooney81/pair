import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import './SideBar.css';

export default function SideBar() {
    const [visible, setVisible] = useState(false);

    return (
        <div style={{width: '30vw'}}>
            <Card style={{height: 'calc(100vh - 56px)', width: '85vw'}} className="sidebar-card">
                <Card.Header>Channel</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <h3>Discussions</h3>
                        <ul>
                            <li>List</li>
                            <li>Discussions</li>
                            <li>Here</li>
                        </ul>
                        <hr></hr>
                        <h3>Direct Messages</h3>
                        <ul>
                            <li>List</li>
                            <li>Messages</li>
                            <li>Here</li>
                        </ul>
                        <hr></hr>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
