import React, { useState } from 'react'
import axios from 'axios'
import { getTokenCookie } from '../../services/tokenCookie'
import { Link } from 'react-router-dom'
import urlApi from '../../services/httpService'
import PropTypes from 'prop-types'


const UserCreate = props => {

    const [values, setValues] = useState({});
    const [valuesError, setValuesError] = useState('')

    function handleChange(e) {
        e.persist()
        const name = e.target.name
        const value = e.target.value
        setValues(values => ({ ...values, [name]: value }))
        if (name === 'email' && values.email === values.username) {
            setValues(values => ({ ...values, username: values.email }))
        }
    }

    function handleCreate(e) {
        e.preventDefault()
        axios.defaults.headers.common['Authorization'] = 'Token ' + getTokenCookie()
        axios.post(urlApi + 'user/', {
            username: values.username,
            password: values.password,
            entity: values.entity,
            title: values.title,
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            address: values.address,
            zip_code: values.zipCode,
            town: values.town,
            phone: values.phone
        })
            .then(() => {
                props.history.push('/user/')
            })
            .catch((error) => {
                setValuesError('')
                if (error.response !== undefined) {
                    let errorMessage
                    for (errorMessage in error.response.data) {
                        // eslint-disable-next-line no-loop-func
                        setValuesError(valuesError => ({
                            ...valuesError,
                            [errorMessage]: error.response.data[errorMessage][0]
                        }))
                    }
                }
            })
    }


    return (
        <main className='user'>
            <div className='card create-edit'>
                <section className='top'>
                    <h1>Create a new user</h1>
                    <Link to={'/user/'} className='btn btn-primary'>Users list</Link>
                </section>
                <section className='body'>
                    <form onSubmit={e => handleCreate(e)}>
                        <p>
                            <label htmlFor='title'>Title:</label>
                            <select
                                name='title'
                                value={values.title || ''}
                                onChange={handleChange}
                            >
                                <option value=''>---</option>
                                <option value='Dr'>Dr</option>
                                <option value='Ms'>Ms</option>
                                <option value='Mr'>Mr</option>
                                <option value='Professor'>Professor</option>
                            </select>
                            {valuesError.title && <span className='form-error-message'>{valuesError.title}</span>}
                        </p>
                        <p>
                            <label htmlFor='firstName'>First name:</label>
                            <input
                                type='text'
                                name='firstName'
                                value={values.firstName || ''}
                                onChange={handleChange}
                                className={valuesError.firstName && 'error'}
                            />
                            {valuesError.firstName && <span className='form-error-message'>{valuesError.firstName}</span>}
                        </p>
                        <p>
                            <label htmlFor='lastName'>Last name:</label>
                            <input
                                type='text'
                                name='lastName'
                                value={values.lastName || ''}
                                onChange={handleChange}
                                className={valuesError.lastName && 'error'}
                            />
                            {valuesError.lastName && <span className='form-error-message'>{valuesError.lastName}</span>}
                        </p>
                        <p>
                            <label htmlFor='email'>eMail:</label>
                            <input
                                type='text'
                                name='email'
                                value={values.email || ''}
                                onChange={handleChange}
                                className={valuesError.email && 'error'}
                            />
                            {valuesError.email && <span className='form-error-message'>{valuesError.email}</span>}
                        </p>

                        <hr />

                        <p>
                            <label htmlFor='entity'>Entity:</label>
                            <input
                                type='text'
                                name='entity'
                                value={values.entity || ''}
                                onChange={handleChange}
                                className={valuesError.entity && 'error'}
                            />
                            {valuesError.entity && <span className='form-error-message'>{valuesError.entity}</span>}
                        </p>
                        <p>
                            <label htmlFor='address'>Address:</label>
                            <input
                                type='text'
                                name='address'
                                value={values.address || ''}
                                onChange={handleChange}
                                className={valuesError.address && 'error'}
                            />
                            {valuesError.address && <span className='form-error-message'>{valuesError.address}</span>}
                        </p>
                        <p>
                            <label htmlFor='zipCode'>ZIP Code:</label>
                            <input
                                type='text'
                                name='zipCode'
                                value={values.zipCode || ''}
                                onChange={handleChange}
                                className={valuesError.zipCode && 'error'}
                            />
                            {valuesError.zipCode && <span className='form-error-message'>{valuesError.zipCode}</span>}
                        </p>
                        <p>
                            <label htmlFor='town'>Town:</label>
                            <input
                                type='text'
                                name='town'
                                value={values.town || ''}
                                onChange={handleChange}
                                className={valuesError.town && 'error'}
                            />
                            {valuesError.town && <span className='form-error-message'>{valuesError.town}</span>}
                        </p>
                        <p>
                            <label htmlFor='phone'>Phone:</label>
                            <input
                                type='text'
                                name='phone'
                                value={values.phone || ''}
                                onChange={handleChange}
                                className={valuesError.phone && 'error'}
                            />
                            {valuesError.phone && <span className='form-error-message'>{valuesError.phone}</span>}
                        </p>

                        <hr />

                        <p>
                            <label>Username:</label>
                            <input
                                type='text'
                                name='username'
                                value={values.username || ''}
                                onChange={handleChange}
                                className={valuesError.username && 'error'}
                            />
                            {valuesError.username && <span className='form-error-message'>{valuesError.username}</span>}
                        </p>
                        <p>
                            <label htmlFor='password'>Password:</label>
                            <input
                                type='text'
                                name='password'
                                value={values.password || ''}
                                onChange={handleChange}
                                className={valuesError.password && 'error'}
                            />
                            {valuesError.password && <span className='form-error-message'>{valuesError.password}</span>}
                        </p>
                            {valuesError.nonField && <span className='form-error-message'>{valuesError.nonField}</span>}
                        <p>
                            <input
                                type='submit'
                                className='btn btn-big btn-primary w-100 uppercase'
                                value='Create new user'
                            />
                        </p>
                    </form>
                </section>
            </div>
        </main>
    )
}


UserCreate.propTypes = {
    values: PropTypes.object,
    setValues: PropTypes.func,
    valuesError: PropTypes.object,
    setValuesError: PropTypes.func,
    handleChange: PropTypes.func,
    handleCreate: PropTypes.func,
}


export default UserCreate