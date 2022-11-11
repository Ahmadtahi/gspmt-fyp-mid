import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Nav from 'react-bootstrap/Nav';
import AddRepository from './AddRepository';
import BasicExample from './BasicTable';

function Repository() {
    const [currentTab, setCurrentTab] = useState(0)
    const [projects, setProjects] = useState([])

    useEffect(() => {
        if (currentTab === 0) {
            fetchProjects()
        } else {
            setProjects([])
        }
    }, [currentTab])


    const fetchProjects = async () => {
        axios.get('http://localhost:5000/projects/all')
            .then(res => {
                setProjects(res.data)
            })
            .catch((err) => {
                alert("Something went during fetch. Please try again.")
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