import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

function AppLoader() {
    return (
        <Spinner animation="border" role="status" style={{ position: 'absolute', left: '48%', top: '43%', zIndex: 999 }}>
            <span className="visually-hidden">Loading...</span>
        </ Spinner>
    )
}

export default AppLoader