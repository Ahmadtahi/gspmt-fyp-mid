import React, { useState } from 'react'
import axios from 'axios'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/esm/Button';
import AppLoader from './AppLoader';

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("team_lead");
    const [showLoader, setshowLoader] = useState(false)

    const collectData = () => {

        console.warn(name, email, password)

    }

    const submitData = event => {
        event.preventDefault();
        setshowLoader(true)

        let postData = { name, email, password, userType };
        console.log("postdata: ", postData);

        axios.post('http://localhost:5000/register', postData)
            .then(res => {
                setshowLoader(false)
                console.log("Response : ", res);
                alert(`User ${name} register successfuly.`);
                window.location.replace('/Login');
            })
            .catch((err) => {
                setshowLoader(false)
                alert(`Something went wrong.`);
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
                <h1>Register page</h1>
                <form onSubmit={submitData}>
                    <Col xs={12}>
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Enter Your Name</InputGroup.Text>
                            <Form.Control
                                aria-label="Enter Your Name"
                                aria-describedby="basic-addon1"
                                name="projectName"
                                value={name}
                                type='text'
                                onChange={(e) => setName(e.target.value)}
                                placeholder='Enter your name'
                                required
                            />
                        </InputGroup>
                    </Col>
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
                        <InputGroup className="mb-3">
                            <InputGroup.Text id="basic-addon1">Enter Your Password</InputGroup.Text>
                            <Form.Select aria-label="Default select example">
                                <option value="team_lead">Team Lead</option>
                                <option value="project_manager">Project Manager</option>
                                <option value="team_member">Team Member</option>
                            </Form.Select>
                        </InputGroup>
                    </Col>
                    <Col xs={12}>
                        <Button variant="primary fullWidth" type="submit" onClick={collectData}>Signup</Button>
                    </Col>
                </form>
            </Col>
            <Col xs={4} style={{ margin: 0 }}></Col>
        </Row>
    )
}

export default Signup