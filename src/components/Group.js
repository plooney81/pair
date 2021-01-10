import { faMinusSquare, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentChat, setSideBarShow } from '../redux/action'
import { db } from '../services/firebase'
import './Group.css';

export default function Group({group, notOn}) {
    const[groupInfo, setGroupInfo] = useState({})
    const groupsDbRef = db.ref("groups")
    const {user} = useSelector((state) => state.user)
    const usersGroupDbRef = db.ref(`users/${user.uid}/groups`);
    const dispatch = useDispatch();
    useEffect(() => {
        
        groupsDbRef.child(group).once("value")
            .then((groupInfo) => {
                if(groupInfo.exists()){
                    setGroupInfo(groupInfo.val())
                }else{
                    setGroupInfo('')
                }
            })
    }, [])
    
    const subscribeToGroup = () => {
        groupsDbRef.child(`${group}/members/${user.uid}`).set({uid: user.uid})
        usersGroupDbRef.child(group).set({groupKey: group})
    }

    const deSubscribeToGroup = () => {
        //query to find the right member under the current group and delete
        groupsDbRef.child(`${group}/members/${user.uid}`).remove()
            .then(() => {console.log("Removed Successfully")})
            .catch((e) => {console.log("Remove Failed" + e.message)})
        //query to find the right group under the current member and delete
        usersGroupDbRef.child(group).remove()
            .then(() => {console.log("Removed Successfully")})
            .catch((e) => {console.log("Remove Failed" + e.message)})
    }
    const handleGroupChoose = () => {
        dispatch(setCurrentChat({group: group, name: groupInfo.name}))
        dispatch(setSideBarShow(false))
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
                    <span onClick={handleGroupChoose} className={`addedGroup${groupInfo.name}`}>{groupInfo.name}</span>
                    <FontAwesomeIcon icon={faMinusSquare} className='ml-2' onClick={deSubscribeToGroup}/>
                </>
                }
            </li>
        )}
        </>
    )
}
