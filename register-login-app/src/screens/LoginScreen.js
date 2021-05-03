import React ,{useEffect, useState} from 'react';
import axios from 'axios';
import './style.css';
import { Redirect } from 'react-router'
import { Link } from "react-router-dom";
import {getToken, saveToken} from "../jwtAutho/jwtAutho";

function LoginScreen() {

    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);    
    const [messageErr, setMessageErr] = useState('');

    useEffect(() =>{
        getToken().then(data => {
            if(data && data.length > 0) 
                setIsUserAuthenticated(true)
            else
                setIsUserAuthenticated(false)
        })
    } ,[])

    const mySubmitHandler = async (event) => {
        event.preventDefault();
        await axios.post('http://localhost:9000/login', { email: userEmail, password: userPassword }).then(resp => {
            if (resp.data === 'Ok') {
                setIsUserAuthenticated(true)
                // generate token 
                saveToken("testestestest")
            } else {
                setMessageErr(resp.data)
            }
        });
    }

    return (
        <>
            {
                isUserAuthenticated === false && (
                    <div className='container-hei container-fluid  center'>

                        <main className="form-signin">
                            {
                                (messageErr && messageErr.length > 1 && (
                                    <div className="alert alert-danger" role="alert">
                                        {messageErr}
                                    </div>
                                ))
                            }
                            <form onSubmit={mySubmitHandler}>
                                <h1 className="h3 mb-3 fw-normal">Sign in</h1>

                                <div className="form-floating">
                                    <label htmlFor="floatingInput">Email</label>
                                    <input type="email" className="form-control" placeholder="email" 
                                    onChange={e => setUserEmail(e.target.value)} required/>
                                </div>
                                <div className="form-floating">
                                    <label htmlFor="floatingPassword">Password</label>
                                    <input type="password" className="form-control" placeholder="Password" 
                                    onChange={e => setUserPassword(e.target.value)} required/>
                                </div>

                                <div className="checkbox mb-3">
                                    <label>
                                        <input type="checkbox" value="remember-me" /> Remember me
                                    </label>
                                </div>
                                <button className="w-100 btn btn-lg btn-primary mb-4" type="submit">Sign in</button>
                                <Link to='/register' className="w-100 btn btn-lg btn-info mt-4" type="submit">Sign up</Link>
                                <p className="mt-5 mb-3 text-muted">
                                    &copy; 2021</p>
                            </form>
                        </main>
                    </div>
                )
            }
            {
                isUserAuthenticated === true && (<Redirect to='/home' />)
            }
        </>
    )
}

export default LoginScreen
