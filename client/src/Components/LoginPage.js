import React, { useState } from 'react'
import axios from 'axios'
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/esm/Button';
import AppLoader from './AppLoader';

const Login = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showLoader, setshowLoader] = useState(false)

    const collectData = () => {
        console.warn(name, email, password)
    }

    const login = event => {
        event.preventDefault();
        setshowLoader(true)
        let postData = { name, email, password };
        console.log("postdata: ", postData);

        axios.post('http://localhost:5000/login', postData)
            .then(async res => {
                console.log("Response : ", res.data);
                setshowLoader(false)
                if (res.data.message != undefined) {
                    alert(res.data.message);
                } else {
                    alert('login successfully');
                    await localStorage.setItem("user", JSON.stringify(res.data))
                    window.location.replace('/')
                }
            })
            .catch((err) => {
                setshowLoader(false)
            })
    }

    return (
        <Row style={{ margin: 0, marginTop: 100 }}>
            {
                showLoader ?
                    <AppLoader />
                    :
                    ''
            }

            <Col xs={4} style={{ margin: 0 }}></Col>
            <Col xs={4} style={{ margin: 0 }} className="flex flex-col">
                <h1>Login page</h1>
                <form onSubmit={login}>
                    <Col xs={12}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Enter Your Email</InputGroup.Text>
                            <Form.Control
                                placeholder="Enter Your Email"
                                aria-label="Enter Your Email"
                                aria-describedby="basic-addon1"
                                name="projectName"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </InputGroup>
                    </Col>
                    <Col xs={12}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Enter Your Password</InputGroup.Text>
                            <Form.Control
                                placeholder="Enter Your Password"
                                aria-label="Enter Your Password"
                                aria-describedby="basic-addon1"
                                name="projectName"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                type='Password'
                            />
                        </InputGroup>
                    </Col>
                    <Col xs={12}>
                        <Button variant="primary fullWidth" type="submit" onClick={collectData}>Login</Button>
                    </Col>
                </form>
            </Col>
            <Col xs={4} style={{ margin: 0 }}></Col>
        </Row>
    )
}

export default Login