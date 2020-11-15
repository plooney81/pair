import React, { useEffect, useState } from 'react'
import { auth } from '../services/firebase';
import { db } from '../services/firebase';
import {useSelector} from 'react-redux';
import { Button, Card } from 'react-bootstrap';
import SideBar from '../components/SideBar';
import './Chat.css';
export default function Chat() {
const user = useSelector(state => state.user)
const [chats, setChats] = useState([]);
const [content, setContent] = useState('');
const [readError, setReadError] = useState(null);
const [writeError, setWriteError] = useState(null);

useEffect( () => {
    //! references to the chats path in the DB
    //! event listener to the value event which is triggered every time a new chat is added to the chats node in the db.

    //! Connection is created to the Firebase db by using the .on() method.
    try{db.ref("chats").on("value", (messages) => {
        const newChatArray = [];
        messages.forEach((message) => {
            newChatArray.push(message.val());
        })
        setChats(newChatArray);
    })
    } catch (error){
        setReadError(error.message)
    }

}, [])

    return (
        <div className="d-flex" >
        <SideBar/>
        <Card style={{height: 'calc(100vh - 56px)', width: '70vw'}} className='chat-card'>
            <Card.Header className="d-flex justify-content-between">
                <span>Chat Name</span>
                <span>Chat Members</span>
            </Card.Header>
            <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                With supporting text below as a natural lead-in to additional content.
                </Card.Text>
            </Card.Body>
        </Card>
        </div>
    )
}
