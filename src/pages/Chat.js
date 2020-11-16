import React, { useEffect, useState } from 'react'
import { auth } from '../services/firebase';
import { db } from '../services/firebase';
import {useDispatch, useSelector} from 'react-redux';
import { Button, Card } from 'react-bootstrap';
import SideBar from '../components/SideBar';
import Messages from '../components/Messages';
import './Chat.css';
import MessageForm from '../components/MessageForm';
import { setMessagesAction } from '../redux/action';


export default function Chat() {
const user = useSelector(state => state.user)
const messages = useSelector(state => state.messages)
const [content, setContent] = useState('');
const [readError, setReadError] = useState(null);
const [writeError, setWriteError] = useState(null);
const dispatch = useDispatch()

useEffect(() => {
    //! references to the chats path in the DB
    //! event listener to the value event which is triggered every time a new chat is added to the chats node in the db.

    //! Connection is created to the Firebase db by using the .on() method.
    try{
        db.ref("messages/group1").on("value", (messages) => {
            const newChatArray = [];
            messages.forEach((message) => {
                newChatArray.push(message.val());
            })
            dispatch(setMessagesAction(newChatArray));
        })
    } catch (error){
        dispatch(readError(error));
    }

}, [])

    return (
        <div className="d-flex" >
        <SideBar/>
        <Card style={{height: 'calc(100vh - 56px)', width: '70vw'}} className='chat-card'>
            <Card.Header className="d-flex justify-content-between">
                <span>{user.user.displayName}</span>
                <span>Chat Members</span>
            </Card.Header>
            <Card.Body className="d-flex flex-column">
                {messages.map((message, index) => {
                    return <Messages key={index} message={message}/>
                })}
                <MessageForm className="align-self-end mb-3"></MessageForm>
            </Card.Body>
        </Card>
        </div>
    )
}
