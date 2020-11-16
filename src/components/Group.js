import { faMinusSquare, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentChat } from '../redux/action'
import { db } from '../services/firebase'
import './Group.css';

export default function Group({group, notOn}) {
    const[groupInfo, setGroupInfo] = useState({})
    const groupsDbRef = db.ref("groups")
    const user = useSelector((state) => state.user)
    const usersGroupDbRef = db.ref(`users/${user.user.uid}/groups`);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log(group)
        groupsDbRef.child(group).once("value")
            .then((groupInfo) => {
                setGroupInfo(groupInfo.val())
            })
    }, [])
    
    const subscribeToGroup = () => {
        groupsDbRef.child(`${group}/members/${user.user.uid}`).set({uid: user.user.uid})
        usersGroupDbRef.child(group).set({groupKey: group})
    }

    const deSubscribeToGroup = () => {
        //query to find the right member under the current group and delete
        groupsDbRef.child(`${group}/members/${user.user.uid}`).remove()
            .then(() => {console.log("Removed Successfully")})
            .catch((e) => {console.log("Remove Failed" + e.message)})
        //query to find the right group under the current member and delete
        usersGroupDbRef.child(group).remove()
            .then(() => {console.log("Removed Successfully")})
            .catch((e) => {console.log("Remove Failed" + e.message)})
    }

    const changeCurrentGroup = () => {
        dispatch(setCurrentChat(group))
    }

    return (
        <>
        {(groupInfo) && (
            <li>
                {notOn ? 
                <>
                    {groupInfo.name}
                    <FontAwesomeIcon icon={faPlusSquare} className="ml-2" onClick={subscribeToGroup}/>
                </>
                :
                <>
                    <span onClick={changeCurrentGroup}>{groupInfo.name}</span>
                    <FontAwesomeIcon icon={faMinusSquare} className='ml-2' onClick={deSubscribeToGroup}/>
                </>
                }
            </li>
        )}
        </>
    )
}
