import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { writeError } from '../redux/action';
import { db } from '../services/firebase';
import Group from './Group';
import './SideBar.css';

export default function SideBar() {
    const [text, setText] = useState('');
    const [differenceArray, setDifferenceArray] = useState([]);
    const userGroups = useSelector((state) => state.userGroups);
    const allGroups = useSelector((state) => state.allGroups);
    const {user} = useSelector((state) => state.user);
    const groupsDbRef = db.ref("groups");
    const dispatch = useDispatch()

    useEffect(() => {
        //! This filters out all of the groups that current user doesn't below too
        const difference = allGroups.filter((group) => !userGroups.includes(group));
        setDifferenceArray(difference);
    }, [allGroups, userGroups])

    const createNewGroup = (n) => {
        console.log(n)
        //! Check to see if the group name isn't already being used
        groupsDbRef.child(`group${n}`).once("value")
        .then((snapshot) => {
            // //! exists() method is part of the snapshot object which is returned by firebase queries
            if(snapshot.exists()){
                createNewGroup(n+1)
            }else{
                //! create the new group with criteria: createdAt: , createdBy, id, name, and finally members;
                groupsDbRef.child(`group${n}`).set({
                    createdAt: Date.now(),
                    createdBy: user.uid,
                    id: `group${n}`,
                    name: text,
                    members: {[user.uid]:{uid: user.uid}}
                }, error => {
                    if(error){
                        dispatch(writeError(error))
                    }else{
                        dispatch(writeError('Successful'))
                    }
                })
                //! add the group to the person who created it list
                const usersGroupDbRef = db.ref(`users/${user.uid}/groups`);
                usersGroupDbRef.child(`group${n}`).set({groupKey: `group${n}`})
            }
        })
    }

    return (
        <div style={{width: '30vw'}}>
            <Card style={{height: 'calc(100vh - 56px)', width: '30vw', overflow: 'auto'}} className="sidebar-card">
                <Card.Header>Channel</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <h3>Current Groups</h3>
                        <ul>
                        {userGroups.map((group) => {
                            return <Group key={group} group={group}/>
                        })}
                        </ul>
                        <hr></hr>
                        <h3>Join a Group</h3>
                        <ul>
                        {differenceArray.length > 0 ? 
                            differenceArray.map((group) => {
                                return <Group key={group} group={group} notOn={true}/>
                            })
                        :(
                            <li>You're Killing it</li>
                        )}
                        </ul>
                        <hr></hr>
                        <h3>Create a Group</h3>
                            <Form>
                                <Form.Group controlId="newGroupForm">
                                    <Form.Label>Group Name</Form.Label>
                                    <Form.Control 
                                    type="text" 
                                    size="sm" 
                                    placeholder="Something Fun" 
                                    value={text} 
                                    onChange={(e) => {setText(e.target.value)}} 
                                    style={{width: '20vw'}}/>
                                </Form.Group>
                            </Form>
                            <Button onClick={() => {createNewGroup(allGroups.length)}}>Add</Button>
                        <hr></hr>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
