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
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import AppLoader from './AppLoader';

function SimilarityCheck() {
    const params = useParams();
    const [repoDetails, setrepoDetails] = useState({})
    const [projects, setProjects] = useState([])
    const [currentPage, setcurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState([])
    const [search, setsearch] = useState("")
    const [selectedSimilarityType, setselectedSimilarityType] = useState('Scope')
    const [showLoader, setshowLoader] = useState(false)

    useEffect(() => {
        if (params.id) {
            getProject(params.id)
        }
    }, [params])

    const fetchProjects = async () => {
        setshowLoader(true)

        axios.get('http://localhost:5000/projects/similarity', {
            params: {
                // ...(search ? { search } : {})
                selectedSimilarityType,
                search
            }
        })
            .then(res => {
                setProjects(res.data.projects)
                setshowLoader(false)
            })
            .catch((err) => {
                setshowLoader(false)
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
                {
                    showLoader ?
                        <AppLoader />
                        :
                        ''
                }
                <Col xs={6}></Col>
                <Col xs={6}>
                    <InputGroup className="mb-3 mt-3">
                        <DropdownButton
                            variant="outline-secondary"
                            title={selectedSimilarityType}
                            id="input-group-dropdown-1"
                        >
                            <Dropdown.Item onClick={() => {
                                setselectedSimilarityType('Scope')
                            }}>Scope</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={() => {
                                setselectedSimilarityType('Functional Requirement')
                            }}>Functional Requirement</Dropdown.Item>
                        </DropdownButton>
                        <Form.Control
                            placeholder="Search Similarity"
                            aria-label="Search Similarity"
                            aria-describedby="basic-addon2"
                            onChange={(e) => {
                                setsearch(e.target.value)
                            }}
                            value={search}
                        />
                        <Button variant="outline-secondary" id="button-addon2"
                            onClick={() => {
                                if (!search) {
                                    alert("Search similariy can not be empty.")
                                } else {
                                    setProjects([])
                                    fetchProjects()
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
                        <th>Similarity</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        projects.filter((project) => project._id != repoDetails._id)?.map((project, idx) => {
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
                                                selectedSimilarityType === 'Scope' ?
                                                    <>
                                                        {project.scopeSimilarity.toFixed(2) * 100} %
                                                    </>
                                                    :
                                                    <>
                                                        {(project.functionalSimilarity.toFixed(2) * 100).toFixed(2)} %
                                                    </>
                                            }
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </Table >
            {/* <Pagination className='flex' style={{ justifyContent: 'flex-end' }}>
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
            </Pagination> */}
        </>
    )
}

export default SimilarityCheck