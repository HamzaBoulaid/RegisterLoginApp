import React ,{useEffect, useState} from 'react';
import axios from 'axios';
import {getToken, deleteToken} from "../jwtAutho/jwtAutho";
import { Link } from "react-router-dom";

function HomeScreen() {

    const [users, setUsers] = useState([]);
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);    

    useEffect(() =>{
        getToken().then(data => {
            if(data && data.length > 0) {
                setIsUserAuthenticated(true)
                axios.get('http://localhost:9000/users').then(res => {
                    setUsers(res.data);
                })
            }
            else
                setIsUserAuthenticated(false)
        })
    } ,[])

    const _disconnect = () => {
        deleteToken();
        setIsUserAuthenticated(false);
    }

    return (
        <>
            {
                isUserAuthenticated === false && (
                    <div className="container-hei container-fluid">
                        <Link to='/login' className="w-100 btn btn-lg btn-info mt-4" type="submit">Sign in</Link>
                        <Link to='/register' className="w-100 btn btn-lg btn-info mt-4" type="submit">Sign up</Link>
                    </div>
                )
            }
            {
                isUserAuthenticated === true && (
                    <div className="container-hei container-fluid">
                        <h2>Users </h2>
                        <button className="w-100 btn btn-lg btn-info mt-4" onClick={() => _disconnect()}>Disconnect</button>
                        <ul className="list-group">
                        {
                            users.map(user => (
                                <li key={user.email} className="list-group-item list-group-item-action">{user.email}</li>
                            ))
                        }
                        </ul>
                    </div>
                )
            }
        </>
    )
}

export default HomeScreen
