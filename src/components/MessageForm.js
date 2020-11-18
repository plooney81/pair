import { faBold, faCode, faItalic, faLightbulb, faLink, faPaperclip, faPaperPlane, faSmileBeam, faStrikethrough } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Picker } from 'emoji-mart';
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { writeError } from '../redux/action';
import { db } from '../services/firebase';
import './MessageForm.css';
import 'emoji-mart/css/emoji-mart.css';

export default function MessageForm() {
    const [content, setContent] = useState('');
    const [showEmoji, setShowEmoji] = useState(false);
    const messagesArray = useSelector(state => state.messages)
    const user = useSelector(state => state.user)
    const currentGroup = useSelector(state => state.currentChatGroup)
    const dispatch = useDispatch();
    const messages = db.ref().child("messages");
    const primaryKey = `${currentGroup.group}/m${messagesArray.length}`;
    const handleSubmit = (e) => {
        e.preventDefault();
        setContent('');
        messages.child(primaryKey).set({
            name: user.displayName,
            content,
            timeStamp: Date.now(),
            uid: user.uid
        }, error => {
            if(error){
                dispatch(writeError(error))
            }else{
                dispatch(writeError('Successful'))
            }
        })
    }
    const pickEmoji = (e) => {
        setContent(content + ' ' + e.native)
    }
    const showEmojis = (e) => {
        setShowEmoji(!showEmoji)
    }

    return (
        <Form onSubmit={handleSubmit} className="d-flex flex-column message-form" >
            <Form.Group>
                <Form.Control className="text-input" type="text" placeholder={`Message to @${currentGroup.name}`} value={content} onChange={(e)=>{setContent(e.target.value)}}></Form.Control>
            </Form.Group>
            <div className="d-flex justify-content-between icons-group">
                <div className="first-btn-group d-flex">
                    <FontAwesomeIcon icon={faLightbulb}/>
                    <FontAwesomeIcon icon={faBold}/>
                    <FontAwesomeIcon icon={faItalic}/>
                    <FontAwesomeIcon icon={faStrikethrough}/>
                    <FontAwesomeIcon icon={faCode}/>
                    <FontAwesomeIcon icon={faLink}/>
                </div>
                <div className="first-btn-group d-flex">
                    <FontAwesomeIcon icon={faPaperclip}/>
                    {showEmoji ? (
                        <div className="d-flex flex-column">
                            <FontAwesomeIcon icon={faSmileBeam} onClick={showEmojis}/>
                            <Picker className="emoji-picker" onSelect={pickEmoji}/>
                        </div>
                    ) : (
                    <FontAwesomeIcon icon={faSmileBeam} onClick={showEmojis}/>
                    )}
                    
                    <FontAwesomeIcon icon={faPaperPlane} onClick={handleSubmit}/>
                </div>
            </div>
        </Form>
    )
}
