import React, {Component} from 'react'


var Link = require('react-router-dom').Link
const Navbar=()=>{
    return(
        <div >
        <ul className='nav-ul'>

        <li> <Link to='/'> Homepage </Link> </li>
        <li> <Link to='/Signup'> Signup Page </Link> </li>
        <li> <Link to='/Login'> Login </Link> </li>
        </ul>
        </div>
    )
};

export default Navbar;