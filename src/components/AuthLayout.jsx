import React from 'react'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
const  AuthLayout = ({ children, authentication = true }) => {

    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("");
    const [loader, setLoader] = useState(true);
    const navigate = useNavigate();

    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        // true and false   = true and true
        // TODO: make is more easy to understand
        if (authStatus) {
            navigate('/')
        }
        else {
            navigate('/login')
        }



        if (authentication && authStatus !== authentication) {
            navigate('/login');
        }
        else if (!authentication && authStatus !== authentication) {
            navigate('/');
        }
        setLoader(false)
    }, [authStatus, navigate, authentication]);

    return loader ? <h1>loading</h1> : <>{children}</>
}


export default AuthLayout;
