import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import AddRepository from './AddRepository';
import BasicExample from './BasicTable';
import Pagination from 'react-bootstrap/Pagination';

function Repository() {
    const [currentTab, setCurrentTab] = useState(0)
    const [projects, setProjects] = useState([])
    const [currentPage, setcurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState([])

    useEffect(() => {
        if (currentTab === 0) {
            fetchProjects()
        } else {
            setProjects([])
        }
    }, [currentTab, currentPage])


    const fetchProjects = async () => {
        axios.get('http://localhost:5000/projects/all', {
            params: {
                page: currentPage,
                limit: 5
            }
        })
            .then(res => {
                setTotalPages(res.data.totalPages)
                setProjects(res.data.projects)
            })
            .catch((err) => {
            })
    }

    const deleteProject = async (projectId) => {
        axios.post(`http://localhost:5000/project/delete/${projectId}`)
            .then(res => {
                alert(`Project has been deleted successfully`);
                window.location.reload();
            })
            .catch((err) => {
                alert("Something went during fetch. Please try again.")
            })
    }

    return (
        <>
            <Nav variant="pills" defaultActiveKey={currentTab}>
                <Nav.Item>
                    <Nav.Link
                        onClick={() => {
                            setCurrentTab(0)
                        }}
                        eventKey={0}
                    >
                        List
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link
                        onClick={() => {
                            setCurrentTab(1)
                        }}
                        eventKey={1}
                    >
                        Add Repository
                    </Nav.Link>
                </Nav.Item>

            </Nav>
            {
                currentTab === 0 ?
                    <>
                        <BasicExample
                            projects={projects}
                            deleteProject={deleteProject}
                        />
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
                    :
                    currentTab === 1 ?
                        <AddRepository />
                        :
                        ''
            }

        </>
    )
}

export default Repository