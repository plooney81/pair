import { faBold, faCode, faItalic, faLightbulb, faLink, faPaperclip, faPaperPlane, faSmileBeam, faStrikethrough } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { writeError } from '../redux/action';
import { db } from '../services/firebase';
import './MessageForm.css';

export default function MessageForm() {
    const [content, setContent] = useState('');
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();
    const handleSubmit = (e) => {
        setContent('');
        db.ref("messages/group1").push({
            uid: user.user.uid,
            content,
            timeStamp: Date.now()
        }, (error) => {
            if(error){
                dispatch(writeError(error))
            }else{
                dispatch(writeError('Successful'))
            }
        })
    }

    return (
        <Form onSubmit={handleSubmit} className="d-flex flex-column message-form" >
            <Form.Group>
                <Form.Control className="text-input" type="text" placeholder="Message to @main-chat" value={content} onChange={(e)=>{setContent(e.target.value)}}></Form.Control>
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
                    <FontAwesomeIcon icon={faSmileBeam}/>
                    <FontAwesomeIcon icon={faPaperPlane} onClick={handleSubmit}/>
                </div>
            </div>
        </Form>
    )
}
