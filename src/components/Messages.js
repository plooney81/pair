import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { db } from '../services/firebase';
import './Messages.css';
import {pairLogoURL} from '../services/usersDbFunctions';
import ReactMarkdown from 'react-markdown';
import CodeBlock from './CodeBlock';

export default function Messages({message}) {
    const {user} = useSelector(state => state.user)
    const [messageImgURL , setMessageImgURL ] = useState('');
    const isCurrentUser = message.uid === user.uid
    const time = new Date(message.timeStamp)
    const imgStyling = {
        height: '40px',
        borderRadius: '.25rem',
        cursor: 'pointer',
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
        marginRight: '4px'
    }
    useEffect(() => {
        db.ref('users').child(`${message.uid}/photoURL`).on("value", (snapshot) => {
            if(snapshot.val()){
                setMessageImgURL(snapshot.val());
            }else{
                setMessageImgURL(pairLogoURL)
            }
        })
    }, [])
    
    //TODO: Time function to display the message time

    return (
        <div className="m-3">
        {isCurrentUser ? (
            <div className="d-flex">
                <div>
                    <img src={messageImgURL} alt={`${message.name}'s profile pic`} style={imgStyling}/>
                </div>
                <div className='message-card user p-2'>
                    <div className="d-flex align-items-center">
                        <h4>{message.name}</h4>
                        <span className="pb-1 ml-3">{`${time.getMonth() + 1}/${time.getDate()}/${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}`}</span>
                    </div>
                    <div>
                        <ReactMarkdown source={message.content} renderers={{code: CodeBlock}} className="markdown-messages"/>
                    </div>
                </div>
            </div>
        ) : (        
            <div className="d-flex justify-content-end">
                <div className='message-card notuser p-2'>
                    <div className="d-flex align-items-center">
                        <h4>{message.name}</h4>
                        <span className="pb-1 ml-3">{`${time.getMonth() + 1}/${time.getDate()}/${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}`}</span>
                    </div>
                    <div>
                        <ReactMarkdown source={message.content} renderers={{code: CodeBlock}} className="markdown-messages"/>
                    </div>
                </div>
                <div className="ml-1">
                    <img src={messageImgURL} alt={`${message.name}'s profile pic`} style={imgStyling}/>
                </div>
            </div>
        )}
        </div>
    )
}
