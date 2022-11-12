import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import moment from "moment";
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

function EditProjects() {
    const params = useParams();
    const [repoDetails, setrepoDetails] = useState({})
    const hiddenFileInput = React.useRef(null);
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [renderuploadedFiles, setRenderUploadedFiles] = useState([])
    // Programatically click the hidden file input element
    // when the Button component is clicked
    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    // Call a function (passed as a prop from the parent component)
    // to handle the user-selected file 
    const handleChange = event => {
        const filesUploaded = event.target.files;
        setUploadedFiles([...uploadedFiles, ...filesUploaded])
    };

    useEffect(() => {
        if (params.id) {
            getProject(params.id)
        }
    }, [params])

    const handleInput = (e) => {
        const { name, value } = e.target
        setrepoDetails((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    const submitData = event => {
        event.preventDefault();
        let postData = {
            project_id: repoDetails.projectID.trim(),
            name: repoDetails.projectName.trim(),
            completion_date: repoDetails.completionDate,
            manager_name: repoDetails.projectManager.trim(),
            functional_requirements: repoDetails.projectFunctionalRequirement.trim(),
            scope: repoDetails.projectScope.trim(),
        };
        var bodyFormData = new FormData();
        for (const data in postData) {
            // console.log(`obj.${prop} = ${obj[prop]}`);
            bodyFormData.append(data, postData[data])
        }
        for (const file of uploadedFiles) {
            bodyFormData.append(file.name, file)
        }
        axios.put(`http://localhost:5000/project/update/${params.id}`, bodyFormData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(res => {
                console.log("Response : ", res);
                alert(`Project has been updated successfully`);
                window.location.reload();
            })
            .catch((err) => {
                alert("Something went wrong. Please try again.")
            })
    }

    const getProject = async (projectId) => {
        axios.get(`http://localhost:5000/project/${projectId}`)
            .then(res => {
                const data = {
                    completionDate: moment(res.data.completion_date).utc().format('YYYY-MM-DD'),
                    projectFunctionalRequirement: res.data.functional_requirements,
                    projectManager: res.data.manager_name,
                    projectName: res.data.name,
                    projectID: res.data.project_id,
                    projectScope: res.data.scope
                }
                console.log(`Project has been fetched : `, res.data.fileNames);
                setrepoDetails(data)
                setRenderUploadedFiles(res.data.fileNames)
            })
            .catch((err) => {
                // alert("Something went during fetch. Please try again.")
            })
    }

    return (
        <div className="AddRepo">
            <h1>Edit Project</h1>
            <form onSubmit={submitData} className="flex flex-col">
                <Col xs={10} >
                    <Row>
                        <Col xs={6}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">Project Name</InputGroup.Text>
                                <Form.Control
                                    placeholder="Project Name"
                                    aria-label="Project Name"
                                    aria-describedby="basic-addon1"
                                    name="projectName"
                                    value={repoDetails.projectName}
                                    onChange={handleInput}
                                    required
                                    disabled
                                />
                            </InputGroup>
                        </Col>
                        <Col xs={6}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">Project ID</InputGroup.Text>
                                <Form.Control
                                    placeholder="Project ID"
                                    aria-label="Project ID"
                                    aria-describedby="basic-addon1"
                                    name="projectID"
                                    value={repoDetails.projectID}
                                    onChange={handleInput}
                                    required
                                    disabled
                                />
                            </InputGroup>
                        </Col>
                        <Col xs={6}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">Project Manager</InputGroup.Text>
                                <Form.Control
                                    placeholder="Project Manager"
                                    aria-label="Project Manager"
                                    aria-describedby="basic-addon1"
                                    name="projectManager"
                                    value={repoDetails.projectManager}
                                    onChange={handleInput}
                                    required
                                    disabled
                                />
                            </InputGroup>
                        </Col>
                        <Col xs={6}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">Project Scope</InputGroup.Text>
                                <Form.Control
                                    placeholder="Project Scope"
                                    aria-label="Project Scope"
                                    aria-describedby="basic-addon1"
                                    name="projectScope"
                                    value={repoDetails.projectScope}
                                    onChange={handleInput}
                                    required
                                />
                            </InputGroup>
                        </Col>
                        <Col xs={6}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">Project Functional Requirement</InputGroup.Text>
                                <Form.Control
                                    placeholder="Project Functional Requirement"
                                    aria-label="Project FunctionalRequirement"
                                    aria-describedby="basic-addon1"
                                    name="projectFunctionalRequirement"
                                    value={repoDetails.projectFunctionalRequirement}
                                    onChange={handleInput}
                                    required
                                />
                            </InputGroup>
                        </Col>
                        <Col xs={6}>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">Project Completion Date</InputGroup.Text>
                                <input
                                    type="date"
                                    class="form-control"
                                    name="completionDate"
                                    value={repoDetails.completionDate}
                                    onChange={handleInput}
                                    required
                                    disabled
                                />
                            </InputGroup>
                        </Col>
                        {
                            renderuploadedFiles.map((file, idx) => {
                                return (
                                    <Col xs={6} className="mb-3">
                                        <Card key={idx}>
                                            <Card.Body>{file}</Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                        <Col xs={12} className="mb-3">
                            <input
                                type="file"
                                ref={hiddenFileInput}
                                onChange={handleChange}
                                style={{ display: 'none' }}
                                multiple
                            />
                            <Button onClick={handleClick} variant="info fullWidth" >Replace Project Related Files</Button>
                            <Alert variant={'info'} className="mt-3">
                                {uploadedFiles.length} new files uploaded.
                                <br />
                                Old files will be replaced by news files.
                            </Alert>
                        </Col>
                        <Col xs={12}>
                            <Button variant="primary fullWidth" type="submit">Update Project</Button>
                        </Col>
                    </Row>
                </Col>
            </form>
        </div>
    )
}

export default EditProjects