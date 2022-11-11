import Table from 'react-bootstrap/Table';
import React from 'react'

function BasicExample({ projects, ...props }) {
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
                </tr>
            </thead>
            <tbody>
                {
                    projects?.map((project, idx) => {
                        console.log("debug project : ", idx + 1, " = ", project.completion_date)
                        return (
                            <tr key={idx}>
                                <td>{idx + 1}</td>
                                <td>{project.project_id}</td>
                                <td>{project.name}</td>
                                <td>{project.manager_name}</td>
                                <td>{project.scope}</td>
                                <td>{project.functional_requirements}</td>
                                <td>{new Date(project.completion_date).toUTCString().split(" ", 3)}</td>
                            </tr>
                        )
                    })
                }

            </tbody>
        </Table>
    );
}

export default BasicExample;