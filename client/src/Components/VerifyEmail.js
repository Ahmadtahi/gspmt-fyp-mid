import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';

function VerifyEmail() {
    const params = useParams();
    console.log("params ", params.id);
    useEffect(() => {
        verifyUser()
    }, [])

    const verifyUser = async () => {
        const data = {
            status: 'verified'
        }
        axios.patch(`http://localhost:5000/verify/user/${params.id}`, data)
            .then(res => {
                setTimeout(() => {
                    window.location.replace('/')
                }, 4000);
            })
            .catch((err) => {
            })
    }

    return (
        <>
            <Alert key={"info"} variant={"info"}>
                Your account has been verified. You'll be redirected to home page.
            </Alert>
        </>
    )
}

export default VerifyEmail