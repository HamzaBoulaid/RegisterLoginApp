import React ,{useEffect, useState} from 'react';
import { Redirect } from 'react-router'
import {Link} from "react-router-dom";
import './style.css';
import axios from 'axios';
import {getToken} from "../jwtAutho/jwtAutho";

function RegisterScreen() {
    // state
    const [userEmail,setuserEmail] = useState('')
    const [userPassword,setuserPassword] = useState('')
    const [messageErr , setMessageErr] = useState('')
    const [isAccountCreated, setIsAccountCreated] = useState(false); 

    useEffect(() =>{
        getToken().then(data => {
            if(data && data.length > 0) 
                setIsAccountCreated(true)
            else
                setIsAccountCreated(false)
        })
    } ,[])

    // handlers
    const mySubmitHandler = async (event) => {
        event.preventDefault();

        await axios.post('http://localhost:9000/register', { email: userEmail, password: userPassword }).then(resp => {
            console.log('Logging result ' + resp.data);
            if (resp.data === 'Ok') {
                setIsAccountCreated(true)
            } else {
                setMessageErr(resp.data)
            }
        });
    }

    return (
        <>
            {
                isAccountCreated === false && (
                    <div className='container-hei container-fluid  center'>
                        <main className="form-signin">
                            {
                                (messageErr && messageErr.length > 1 && (
                                    <div className='alert-danger' role="alert">
                                        {messageErr}
                                    </div>
                                ))
                            }
                            <form onSubmit={mySubmitHandler}>
                                <h1 className="h3 mb-3 fw-normal">Sign up</h1>
                                <div className="form-floating">
                                    <label htmlFor="floatingInput">email</label>
                                    <input type="email" className="form-control"
                                           placeholder="name@example.com"  
                                           onChange={e => setuserEmail(e.target.value)} required/>
                                </div>
                                <div className="form-floating">
                                    <label htmlFor="floatingPassword">Password</label>
                                    <input type="password" className="form-control"
                                           placeholder="Password" 
                                           onChange={e => setuserPassword(e.target.value)} required/>
                                </div>

                                <button className="w-100 btn btn-lg btn-primary mb-4" type="submit">Sign up</button>
                                <Link to='/login' className="w-100 btn btn-lg btn-info mt-4" type="submit">Sign in</Link>
                                <p className="mt-5 mb-3 text-muted">
                                    &copy; 2021</p>
                            </form>
                        </main>
                    </div>
                )
            }
            {
                isAccountCreated === true && (<Redirect  to='/login'/>)
            }
        </>
    );
}

export default RegisterScreen
