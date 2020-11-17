import React, { useEffect, useState } from 'react'
import { auth } from '../services/firebase';
import { db } from '../services/firebase';
import {useDispatch, useSelector} from 'react-redux';
import { Button, Card } from 'react-bootstrap';
import SideBar from '../components/SideBar';
import Messages from '../components/Messages';
import './Chat.css';
import MessageForm from '../components/MessageForm';
import { setAllPossibleGroups, setMessagesAction, setUsersGroupsList, readError } from '../redux/action';
import Profile from './Profile';

export default function Chat() {
const user = useSelector(state => state.user)
const messages = useSelector(state => state.messages)
const currentGroup = useSelector(state => state.currentChatGroup)
const dispatch = useDispatch()


const messagesDbRef = db.ref("messages");

const groupRef = currentGroup.group

const usersGroupDbRef = db.ref(`users/${user.uid}/groups`);
const allGroupsDbRef = db.ref(`groups`);

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
            newGroupArray.push(group.child('groupKey').val());
        })
        if(newGroupArray[0]){
            dispatch(setUsersGroupsList(newGroupArray))
        }
    })

    //! Get all of the available groups in the channel
    allGroupsDbRef.on('value', (groups) => {
        const allGroupArray = [];
        groups.forEach((group) => {
            allGroupArray.push(group.key);
        })
        dispatch(setAllPossibleGroups(allGroupArray));
    })
}, [groupRef])

    return (
        <div className="d-flex" >
        <SideBar/>
        <Card style={{height: 'calc(100vh - 56px)', width: '70vw'}} className='chat-card'>
            <Card.Header className="d-flex justify-content-between">
                <span>{currentGroup.name}</span>
                <Profile />
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
