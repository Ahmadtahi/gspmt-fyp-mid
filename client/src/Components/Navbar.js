import React, { Component } from 'react'
import Alert from 'react-bootstrap/Alert';

var Link = require('react-router-dom').Link
const Navbar = () => {

    return (
        <>
            <div >
                <ul className='nav-ul' style={{ borderBottom: '1px solid black' }}>

                    <li> <Link to='/'> Homepage </Link> </li>
                    {
                        !localStorage.getItem("user") ?
                            <>
                                <li> <Link to='/Signup'> Signup Page </Link> </li>
                                <li> <Link to='/Login'> Login </Link> </li>
                            </>
                            :
                            <>
                                <li> <Link to='/Repository'> Repository </Link> </li>
                                <li
                                    onClick={async () => {
                                        await localStorage.removeItem("user")
                                        window.location.replace('/')
                                    }}
                                > <Link to='/'> Logout </Link> </li>
                            </>
                    }
                </ul>
            </div>
            {
                JSON.parse(localStorage.getItem("user"))?.status == 'not_verified' ?
                    <Alert key={"warning"} variant={"warning"}>
                        Please verify your account. Relogin if you have already verified.
                    </Alert>
                    :
                    ''
            }
        </>
    )
};

export default Navbar;