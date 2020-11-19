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
    const light = '#F9FBFB';
    const dark = '#484c56';
    const [content, setContent] = useState('');
    const [isCode, setIsCode] = useState(false);
    const [showEmoji, setShowEmoji] = useState(false);
    const [toggleFormColor, setToggleFormColor] = useState(light);
    const {user} = useSelector(state => state.user)
    const currentGroup = useSelector(state => state.currentChatGroup)
    const dispatch = useDispatch();
    const messages = db.ref().child("messages");
    const primaryKey = `${currentGroup.group}`;
    const handleSubmit = (e) => {
        e.preventDefault();
        setContent('');
        messages.child(primaryKey).push({
            name: user.displayName,
            content,
            timeStamp: Date.now(),
            isCode,
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
    const showEmojis = () => {
        setShowEmoji(!showEmoji)
    }
    const changeFormColor = () => {
        setIsCode(!isCode);
        const changeColor = toggleFormColor === light ? dark : light
        setToggleFormColor(changeColor);
    }


    return (
        <div>
            {showEmoji && (
                <Picker className="emoji-picker" onSelect={pickEmoji} style={{width: '70vw'}}/>
            )}
            <Form onSubmit={handleSubmit} className={"d-flex flex-column message-form"} style={{backgroundColor: toggleFormColor}}>
                <Form.Group>
                    <Form.Control className="text-input" as="textarea" value={content} rows={2} placeholder={`Message to @${currentGroup.name}`} onChange={(e)=>{setContent(e.target.value)}}></Form.Control>
                </Form.Group>
                <div className="d-flex justify-content-between icons-group">
                    <div className="first-btn-group d-flex">
                        {/* <FontAwesomeIcon icon={faLightbulb}/>
                        <FontAwesomeIcon icon={faBold}/>
                        <FontAwesomeIcon icon={faItalic}/>
                        <FontAwesomeIcon icon={faStrikethrough}/> */}
                        <FontAwesomeIcon icon={faCode} onClick={changeFormColor}/>
                        {/* <FontAwesomeIcon icon={faLink}/> */}
                    </div>
                    <div className="first-btn-group d-flex">
                        {/* <FontAwesomeIcon icon={faPaperclip}/> */}
                        <FontAwesomeIcon icon={faSmileBeam} onClick={showEmojis}/>
                        <FontAwesomeIcon icon={faPaperPlane} onClick={handleSubmit}/>
                    </div>
                </div>
            </Form>
        </div>
    )
}
