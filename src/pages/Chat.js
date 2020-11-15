import React, { useEffect, useState } from 'react'
import { auth } from '../services/firebase';
import { db } from '../services/firebase';
import {useSelector} from 'react-redux';

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
    db.ref("chats").on("value")
        .then((snapshot) => {
            const newChatArray = [];
            snapshot.forEach((snap) => {
                newChatArray.push(snap.val());
            })
            setChats(newChatArray);
        })
        .catch((error) => {
            setReadError(error.message);
        })


}, [])

    return (
        <div>
            <h1>Lets Chat</h1>
        </div>
    )
}
