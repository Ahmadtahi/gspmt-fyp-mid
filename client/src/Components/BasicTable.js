import Table from 'react-bootstrap/Table';
import React from 'react'
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

function BasicExample({ projects, deleteProject, ...props }) {
    return (
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
                    {
                        JSON.parse(localStorage.getItem("user")).userType == 'project_manager' || JSON.parse(localStorage.getItem("user")).userType == 'team_member' ?
                            <th>Actions</th>
                            :
                            ''
                    }
                </tr>
            </thead>
            <tbody>
                {
                    projects?.map((project, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{project.project_id}</td>
                                <td>{project.name}</td>
                                <td>{project.manager_name}</td>
                                <td>{project.scope}</td>
                                <td>{project.functional_requirements}</td>
                                <td>{new Date(project.completion_date).toUTCString().split(" ", 3)}</td>
                                {
                                    JSON.parse(localStorage.getItem("user")).userType == 'project_manager' || JSON.parse(localStorage.getItem("user")).userType == 'team_member' ?
                                        <td
                                            className='pointer'
                                            style={{ boxSizing: 'border-box', paddingLeft: '40px' }}
                                        >
                                            {
                                                JSON.parse(localStorage.getItem("user")).userType == 'project_manager' ?
                                                    <AiOutlineDelete
                                                        onClick={() => {
                                                            deleteProject(project._id)
                                                        }} />
                                                    :
                                                    <AiOutlineEdit
                                                        onClick={() => {
                                                            window.location.replace(`/Repository/${project._id}`)
                                                        }}
                                                    />
                                            }
                                        </td>
                                        :
                                        ''
                                }
                            </tr>
                        )
                    })
                }

            </tbody>
        </Table>
    );
}

export default BasicExample;