import React, { useState, useContext } from 'react'
import axios from 'axios'
import { setTokenCookie } from '../services/tokenCookie'
import { LoginContext } from '../contexts/LoginContext'
import urlApi from '../services/httpService'
import PropTypes from 'prop-types'


const LoginForm = props => {

    const { login, setLogin } = useContext(LoginContext)

    const [values, setValues] = useState({})
    const [valuesError, setValuesError] = useState({})

    function handleChange(e) {
        e.persist()
        const name = e.target.name
        const value = e.target.value
        setValues(values => ({ ...values, [name]: value }))
    }

    function handleLogin(e) {
        e.preventDefault()
        axios.defaults.headers.common['Authorization'] = '' // TODO <-- can do better ?
        axios.post(urlApi + 'rest-auth/login/', {
            username: values.username,
            password: values.password
        })
            .then((response) => {
                setLoginUserData(response.data.key)
            })
            .catch((error) => {
                setValuesError('')
                if (error.response !== undefined) {
                    let errorMessage
                    for (errorMessage in error.response.data) {
                        // eslint-disable-next-line no-loop-func
                        setValuesError(valuesError =>
                            ({ ...valuesError, [errorMessage]: error.response.data[errorMessage][0] })
                        )
                    }
                }
            })
    }

    function setLoginUserData(token) {
        axios.defaults.headers.common['Authorization'] = 'Token ' + token
        axios.get(urlApi + 'rest-auth/user/')
        .then(response => {
            setTokenCookie(token)
            checkIfIsStaff(response.data.username, response.data.pk)
        })
        .catch(error => {
            console.log('Login error: ', error.response)
        })
    }

    function checkIfIsStaff(loggedUserUsername, loggedUserId) {
        axios.get(urlApi + 'user/' + loggedUserId)
            .then(response => {
                if (response.data.is_staff) {
                    setLogin({loggedUserUsername: loggedUserUsername, loggedUserId: loggedUserId, loggedUserIsStaff: true})
                    props.history.push('/user/')
                } else {
                    setLogin({loggedUserUsername: loggedUserUsername, loggedUserId: loggedUserId, loggedUserIsStaff: false})
                    props.history.push('/parents/all/')
                }
            })
            .catch(error => {
                console.log('checkIfIsStaff', error.response)
            })
    }


    return (
        <div id='hero'>
            <div className='container'>
                <form onSubmit={e => handleLogin(e)} >
                    <h2>Log In</h2>
                    <label htmlFor='username'>Username</label>
                    <input
                        type='text'
                        name='username'
                        value={values.username || ''}
                        onChange={handleChange}
                    />
                    {valuesError.username && <div className='form-error-message'>{valuesError.username}</div>}
                    <label htmlFor='password'>Password</label>
                    <input
                        type='password'
                        name='password'
                        value={values.password || ''}
                        onChange={handleChange}
                    />
                    {valuesError.password && <div className='form-error-message'>{valuesError.password}</div>}
                    {valuesError.non_field_errors && <div className='form-error-message'>{valuesError.non_field_errors}</div>}
                    <input
                        type='submit'
                        className='btn btn-big btn-secondary w-100 no-radius'
                        value='Login'
                    />
                </form>
            </div>
        </div>
    )
}


LoginForm.propTypes = {
    values: PropTypes.func,
    setValues: PropTypes.object,
    valuesError: PropTypes.func,
    setValuesError: PropTypes.object,
    handleChange: PropTypes.func,
    handleLogin: PropTypes.func,
    setLoginUserData: PropTypes.func,
    checkIfIsStaff: PropTypes.func
}


export default LoginForm