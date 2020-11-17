import React from 'react';
import { useSelector } from 'react-redux';
import './Messages.css';

export default function Messages({message}) {
    const user = useSelector(state => state.user)
    const isCurrentUser = message.uid === user.uid
    const time = new Date(message.timeStamp)

    return (
        <div className="mt-3">
        {isCurrentUser ? (
            <div className='message-card user p-2 d-flex'>
                <div>
                    <div className="d-flex align-items-center">
                        <h4>{message.name}</h4>
                        <span className="pb-1 ml-3">{`${time.getMonth()}/${time.getDate()}/${time.getFullYear()}`}</span>
                    </div>
                    <div>
                        {message.content}
                    </div>
                </div>
                <div>
                    
                </div>
            </div>
        ) : (        
            <div className='message-card notuser p-2'>
                <div className="d-flex align-items-center">
                    <h4>{message.name}</h4>
                    <span className="pb-1 ml-3">{`${time.getMonth()}/${time.getDate()}/${time.getFullYear()}`}</span>
                </div>
                {message.content}
            </div>
        )}
        </div>
    )
}
