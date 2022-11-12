import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function SimilarityCheck() {
    const params = useParams();
    const [repoDetails, setrepoDetails] = useState({})
    const [projects, setProjects] = useState([])
    const [currentPage, setcurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState([])
    const [search, setsearch] = useState("")

    useEffect(() => {
        if (params.id) {
            getProject(params.id)
        }
    }, [params])


    useEffect(() => {
        fetchProjects()
    }, [currentPage])

    const fetchProjects = async () => {
        axios.get('http://localhost:5000/projects/all', {
            params: {
                page: currentPage,
                limit: 5,
                ...(search ? { search } : {})
            }
        })
            .then(res => {
                setTotalPages(res.data.totalPages)
                setProjects(res.data.projects)
            })
            .catch((err) => {
            })
    }

    const getProject = async (projectId) => {
        axios.get(`http://localhost:5000/project/${projectId}`)
            .then(res => {
                // const data = {
                //     completionDate: moment(res.data.completion_date).utc().format('YYYY-MM-DD'),
                //     projectFunctionalRequirement: res.data.functional_requirements,
                //     projectManager: res.data.manager_name,
                //     projectName: res.data.name,
                //     projectID: res.data.project_id,
                //     projectScope: res.data.scope
                // }
                // console.log(`Project has been fetched : `, data);
                setrepoDetails(res.data)
            })
            .catch((err) => {
                // alert("Something went during fetch. Please try again.")
            })
    }

    return (
        <>
            <Row style={{ margin: 0 }}>
                <Col xs={6}></Col>
                <Col xs={6}>
                    <InputGroup className="mb-3 mt-3">
                        <Form.Control
                            placeholder="Search Project By ID/Name"
                            aria-label="Search Project By ID/Name"
                            aria-describedby="basic-addon2"
                            onChange={(e) => {
                                setsearch(e.target.value)
                            }}
                            value={search}
                        />
                        <Button variant="outline-secondary" id="button-addon2"
                            onClick={() => {
                                if (currentPage === 1) {
                                    fetchProjects()
                                } else {
                                    setcurrentPage(1)
                                }
                            }}
                        >
                            Search
                        </Button>
                    </InputGroup>
                </Col>
            </Row>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Project Name</th>
                        <th>Manager Name</th>
                        <th>Scope</th>
                        <th>Functional Requirements</th>
                        <th>Completion Date</th>
                        <th>Functional Requirements Similarity</th>
                        <th>Scope Similarity</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        projects.filter((project) => project._id != repoDetails._id)?.map((project, idx) => {
                            console.log("🚀 debug ~ ", project, repoDetails)
                            return (
                                <tr key={idx}>
                                    <td>{idx + 1}</td>
                                    <td>{project.project_id}</td>
                                    <td>{project.name}</td>
                                    <td>{project.manager_name}</td>
                                    <td>{project.scope}</td>
                                    <td>{project.functional_requirements}</td>
                                    <td>{new Date(project.completion_date).toUTCString().split(" ", 3)}</td>
                                    <td>
                                        <Button
                                            variant={project.functional_requirements == repoDetails.functional_requirements ? "success" : "danger"}
                                            style={{ marginLeft: '30%' }}
                                        >
                                            {
                                                project.functional_requirements == repoDetails.functional_requirements ?
                                                    'Similar'
                                                    :
                                                    'Not Similar'
                                            }
                                        </Button>
                                    </td>
                                    <td className='flex'>
                                        <Button
                                            variant={project.scope == repoDetails.scope ? "success" : "danger"}
                                        >
                                            {
                                                project.scope == repoDetails.scope ?
                                                    'Similar'
                                                    :
                                                    'Not Similar'
                                            }
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </Table >
            <Pagination className='flex' style={{ justifyContent: 'flex-end' }}>
                <Pagination.First
                    onClick={() => {
                        setcurrentPage(1)
                    }}
                    disabled={currentPage === 1}
                />
                <Pagination.Prev
                    onClick={() => {
                        const num = currentPage - 1
                        setcurrentPage(num)
                    }}
                    disabled={currentPage === 1}
                />
                <Pagination.Item key={currentPage} active={true}>
                    {currentPage}
                </Pagination.Item>
                <Pagination.Next
                    onClick={() => {
                        const num = currentPage + 1
                        setcurrentPage(num)
                    }}
                    disabled={currentPage === totalPages}
                />
                <Pagination.Last
                    onClick={() => {
                        setcurrentPage(totalPages)
                    }}
                    disabled={currentPage === totalPages}
                />
            </Pagination>
        </>
    )
}

export default SimilarityCheck