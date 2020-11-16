import { faMinusSquare, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { db } from '../services/firebase'
import './Group.css';

export default function Group({group, notOn}) {
    const[groupInfo, setGroupInfo] = useState({})
    const groupsDbRef = db.ref("groups")
    const user = useSelector((state) => state.user)
    const usersGroupDbRef = db.ref(`users/${user.user.uid}/groups`);
    useEffect(() => {
        console.log(group)
        groupsDbRef.child(group).once("value")
            .then((groupInfo) => {
                setGroupInfo(groupInfo.val())
            })
    }, [])
    
    const subscribeToGroup = () => {
        groupsDbRef.child(`${group}/members`).push({uid: user.user.uid})
        usersGroupDbRef.push({groupKey: group})
    }

    const deSubscribeToGroup = () => {
        //query to find the right member under the current group and delete

        //query to find the right group under the current member and delete
    }

    const changeCurrentGroup = () => {
        //Dispatch current groupFocus and change to this groups name
        console.log('Hey');
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
