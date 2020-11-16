import React, { useEffect, useState } from 'react'
import { auth } from '../services/firebase';
import { db } from '../services/firebase';
import {useDispatch, useSelector} from 'react-redux';
import { Button, Card } from 'react-bootstrap';
import SideBar from '../components/SideBar';
import Messages from '../components/Messages';
import './Chat.css';
import MessageForm from '../components/MessageForm';
import { setMessagesAction, setUsersGroupsList } from '../redux/action';


export default function Chat() {
const user = useSelector(state => state.user)
const messages = useSelector(state => state.messages)
const [readError, setReadError] = useState(null);
const dispatch = useDispatch()


const messagesDbRef = db.ref("messages");
//TODO This will eventually need to change depending on what group the user has currently clicked on
//TODO needs to be in the redux store eventually
const groupRef = `group1`

const usersGroupDbRef = db.ref(`users/${user.user.uid}/groups`);

useEffect(() => {
    //! references to the chats path in the DB
    //! event listener to the value event which is triggered every time a new chat is added to the chats node in the db.

    //! Connection is created to the Firebase db by using the .on() method.
    try{
        messagesDbRef.child(groupRef).on("value", (messages) => {
            const newChatArray = [];
            messages.forEach((message) => {
                newChatArray.push(message.val());
            })
            dispatch(setMessagesAction(newChatArray));
        })
    } catch (error){
        dispatch(readError(error));
    }

    //! Get the current users groups they belong too.
    usersGroupDbRef.on('value', (groups) => {
        const newGroupArray = [];
        groups.forEach((group) => {
            newGroupArray.push(group.val());
        })
        dispatch(setUsersGroupsList(newGroupArray))
    })

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
