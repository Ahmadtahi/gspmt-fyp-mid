import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const collectData = () => {
        console.warn(name, email, password)
    }

    const login = event => {
        event.preventDefault();

        let postData = { name, email, password };
        console.log("postdata: ", postData);

        axios.post('http://localhost:5000/login', postData)
            .then(async res => {
                console.log("Response : ", res.data);

                if (res.data.message != undefined) {
                    alert(res.data.message);
                } else {
                    alert('login successfully');
                    await localStorage.setItem("user", JSON.stringify(res.data))
                    window.location.replace('/')
                }
            });
    }

    return (

        <div className="Register">
            <h1>Login page</h1>
            <form onSubmit={login}>
                <input className="inputBox" type='email' onChange={(e) => setEmail(e.target.value)} placeholder='Enter your Email' required></input>
                <input className="inputBox" type='Password' onChange={(e) => setPassword(e.target.value)} placeholder='Enter your Password' required></input>
                <button onClick={collectData} className="appButton" type='submit'> Login </button>
            </form>
        </div>
    )
}

export default Login