import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getTokenCookie } from '../../services/tokenCookie'
import { Link } from 'react-router-dom'
import urlApi from '../../services/httpService'


const ParentsCreate = props => {

    const [users, setUsers] = useState([])
    const [values, setValues] = useState('')
    const [valuesError, setValuesError] = useState('')

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = 'Token ' + getTokenCookie()
        axios.get(urlApi + 'user/')
            .then(response => {
                if (localStorage.getItem('loggedUserIsStaff') === 'true') {
                    setUsers( response.data )
                }
                else if (localStorage.getItem('loggedUserIsStaff') !== 'true') {
                    setUsers( response.data[0].id )
                }
                console.log('ParentsCreate', response.data)
            })
            .catch(error => {
                console.log(error)
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] )

    function handleChange(e) {
        const name = e.target.name
        const value = e.target.value
        setValues(values => ({ ...values, [name]: value }))
        if (name === 'motherLastName' && values.motherLastName === values.fatherLastName) {
            setValues(values => ({ ...values, fatherLastName: value }))
        }
    }

    function handleCreate(e) {
        e.preventDefault()
        setValuesError('')

        // Check form
        let formError = false
        if (values.userId === 'unset') {
            setValuesError(valuesError => ({ ...valuesError, userIdError: 'Please select a user' }))
            formError = true
        }
        if (values.motherFirstName === undefined && values.motherLastName === undefined && values.fatherFirstName === undefined && values.fatherLastName === undefined) {
            setValuesError(valuesError => ({ ...valuesError, nonFieldError: 'The form can\'t be empty' }))
            formError = true
        }

        if (!formError) {
            axios.defaults.headers.common['Authorization'] = 'Token ' + getTokenCookie()
            axios.post(urlApi + 'parents/create/', {
                user_id: values.userId,
                mother_first_name: values.motherFirstName,
                mother_last_name: values.motherLastName,
                father_first_name: values.fatherFirstName,
                father_last_name: values.fatherLastName
            })
                .then((response) => {
                    props.history.push('/parents/all/')
                })
                .catch((error) => {
                    console.log(error.response)
                    if (error.response !== undefined) {
                        let errorMessage
                        for (errorMessage in error.response.data) {
                            // eslint-disable-next-line no-loop-func
                            setValuesError(valuesError => ({ ...valuesError, [errorMessage]: error.response.data[errorMessage][0] }))
                        }
                    }
                })
        }
    }


    return (
        <main className='parent'>
            <div className='card create-edit'>

                <section className='top'>
                    <h1>Create new parents</h1>
                    <Link to={'/parents/all/'} className='btn btn-primary'>Parents list</Link>
                </section>

                <section className='body'>
                    <form onSubmit={e => handleCreate(e)}>
                            {
                                localStorage.getItem('loggedUserIsStaff') === 'true'
                                ?
                                    <p>
                                        <label htmlFor='userId'>User:</label>
                                        <select
                                            name='userId'
                                            value={values.userId || 'unset'}
                                            onChange={handleChange}
                                        >
                                            <option value='unset'>---</option>
                                            {users.map((user, i) =>
                                                (user.entity.length > 0 || user.last_name.length > 0) &&
                                                    <option key={'user' + i} value={user.id}>
                                                        {user.entity}{(user.entity.length > 0 && user.last_name.length > 0) && ' - '}{user.title + ' '}{user.first_name + ' '}{user.last_name}
                                                    </option>
                                            )}
                                        </select>
                                        {valuesError.userIdError && <span className='form-error-message'>{valuesError.userIdError}</span>}
                                    </p>
                                :
                                    <span className='d-none'>
                                        <input name='userId' value={users}></input>
                                    </span>
                            }
                        <h2>Mother:</h2>
                        <p>
                            <label htmlFor='motherFirstName'>First name:</label>
                            <input
                                type='text'
                                name='motherFirstName'
                                value={values.motherFirstName || ''}
                                onChange={handleChange}
                            />
                            {valuesError.motherFirstNameError && <span className='form-error-message'>{valuesError.motherFirstNameError}</span>}
                        </p>
                        <p>
                            <label htmlFor='lastName'>Last name:</label>
                            <input
                                type='text'
                                name='motherLastName'
                                value={values.motherLastName || ''}
                                onChange={handleChange}
                            />
                            {valuesError.motherLastNameError && <span className='form-error-message'>{valuesError.motherLastNameError}</span>}
                        </p>

                        <hr />

                        <h2>Father:</h2>
                        <p>
                            <label htmlFor='fatherFirstName'>First name:</label>
                            <input
                                type='text'
                                name='fatherFirstName'
                                value={values.fatherFirstName || ''}
                                onChange={handleChange}
                            />
                            {valuesError.fatherFirstNameError && <span className='form-error-message'>{valuesError.fatherFirstNameError}</span>}
                        </p>
                        <p>
                            <label htmlFor='fatherLastName'>Last name:</label>
                            <input
                                type='text'
                                name='fatherLastName'
                                value={values.fatherLastName || ''}
                                onChange={handleChange}
                            />
                            {valuesError.fatherLastNameError && <span className='form-error-message'>{valuesError.fatherLastNameError}</span>}
                        </p>
                        <p>
                            {valuesError.nonFieldError && <span className='form-error-message'>{valuesError.nonFieldError}</span>}
                        </p>
                        <p>
                            <input
                                type='submit'
                                className='btn btn-big btn-primary w-100 uppercase'
                                value='Create new parents'
                            />
                        </p>
                    </form>
                </section>

            </div>
        </main>
    )
}

export default ParentsCreate