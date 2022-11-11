import React, { useState } from 'react'
import axios from 'axios'

const Signup=()=>{
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const collectData=()=>{

        console.warn(name,email,password)

    }
    
    const submitData = event => {
        event.preventDefault();

        let postData = {name, email, password};
        console.log("postdata: ", postData); 
        
        axios.post('http://localhost:5000/register', postData)
        .then(res => {
            console.log("Response : ", res);
            alert(`User ${name} register successfuly.`);
            window.location.reload();
        });
    }

    return(
    
        <div className="Register">
            <h1>Register page</h1>
            <form onSubmit={submitData}>
                <input className="inputBox" type='text' onChange={(e)=>setName(e.target.value)} placeholder='Enter your name' required></input>
                <input className="inputBox" type='email' onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your Email' required></input>
                <input className="inputBox" type='Password' onChange={(e)=>setPassword(e.target.value)} placeholder='Enter your Password' required></input>
                <button onClick={collectData} className="appButton" type='submit' > Signup </button>
            </form>
        </div>
    )
}

export default Signup