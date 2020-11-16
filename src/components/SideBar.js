import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Group from './Group';
import './SideBar.css';

export default function SideBar() {
    const [visible, setVisible] = useState(false);
    const [differenceArray, setDifferenceArray] = useState([]);
    const userGroups = useSelector((state) => state.userGroups);
    const allGroups = useSelector((state) => state.allGroups);

    useEffect(() => {
        //! This filters out all of the groups that current user doesn't below too
        const difference = allGroups.filter((group) => !userGroups.includes(group));
        setDifferenceArray(difference);
    }, [allGroups, userGroups])

    return (
        <div style={{width: '30vw'}}>
            <Card style={{height: 'calc(100vh - 56px)', width: '85vw'}} className="sidebar-card">
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
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}
