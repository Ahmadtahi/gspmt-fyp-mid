import React, { Component } from 'react'


var Link = require('react-router-dom').Link
const Navbar = () => {

    return (
        <div >
            <ul className='nav-ul'>

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
    )
};

export default Navbar;