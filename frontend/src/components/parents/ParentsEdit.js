import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getTokenCookie } from '../../services/tokenCookie'
import { Link } from 'react-router-dom'
import urlApi from '../../services/httpService'


const ParentsEdit = props => {
    const [values, setValues] = useState('')
    const [valuesError, setValuesError] = useState('')
    const [userId] = useState(props.match.params.id)

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = 'Token ' + getTokenCookie()
        axios.get(urlApi + 'parents/detail/' + userId + '/')
            .then(response => {
                setValues(values => ({
                    ...values,
                    userId: response.data.property,
                    motherFirstName: response.data.mother_first_name,
                    motherLastName: response.data.mother_last_name,
                    fatherFirstName: response.data.father_first_name,
                    fatherLastName: response.data.father_last_name
                }))
            })
            .catch(error => {
                console.log('parents/edit', error)
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] )

    function handleChange(e) {
        e.persist()
        const name = e.target.name
        const value = e.target.value
        setValues(values => ({ ...values, [name]: value }))
    }

    function handleUpdate(e) {
        e.preventDefault();
        axios.defaults.headers.common['Authorization'] = 'Token ' + getTokenCookie()
        axios.put(urlApi + 'parents/edit/' + userId + '/', {
            user_id: userId,
            mother_first_name: values.motherFirstName,
            mother_last_name: values.motherLastName,
            father_first_name: values.fatherFirstName,
            father_last_name: values.fatherLastName,
        })
            .then((response) => {
                localStorage.getItem('loggedUserIsStaff') === true
                ?
                    props.history.push('/parents/' + userId + '/')
                :
                    props.history.push('/parents/all/')
            })
            .catch((error) => {
                console.log('error', error.response);
                setValuesError('')
                if (error.response !== undefined) {
                    let errorMessage
                    for (errorMessage in error.response.data) {
                        // eslint-disable-next-line no-loop-func
                        setValuesError(valuesError => ({ ...valuesError, [errorMessage]: error.response.data[errorMessage][0] }))
                    }
                }
            })
    }


    return (
        <main className='parent'>
            <div className='card create-edit'>

                <section className='top'>
                    <h1>Edit a parent</h1>
                    <Link to={'/parents/all/'} className='btn btn-primary'>Parents list</Link>
                </section>

                <section className='body'>
                    <form onSubmit={e => handleUpdate(e)}>
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
                            {valuesError.nonFieldError && <span className='form-error-message'>{valuesError.nonFieldError}</span>}
                        <p>
                            <input
                                type='submit'
                                className='btn btn-big btn-primary w-100 uppercase'
                                value='Edit a parent'
                            />
                        </p>
                    </form>
                </section>

            </div>
        </main>
    )
}

export default ParentsEdit