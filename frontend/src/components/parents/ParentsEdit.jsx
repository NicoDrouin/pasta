import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import urlApi from '../../services/httpService';


class ParentsEdit extends Component {
    state = {
        userId: '',
        motherFirstName: '',
        motherFirstNameError: '',
        motherLastName: '',
        motherLastNameError: '',
        fatherFirstName: '',
        fatherFirstNameError: '',
        fatherLastName: '',
        fatherLastNameError: '',
        nonFieldError: '',
    };

    componentDidMount() {
        axios.get(urlApi + 'parents/detail/' + this.props.match.params.id + '/')
            .then(response => {
                this.setState({
                    userId: response.data.user_id,
                    motherFirstName: response.data.mother_first_name,
                    motherLastName: response.data.mother_last_name,
                    fatherFirstName: response.data.father_first_name,
                    fatherLastName: response.data.father_last_name,
                });
            })
            .catch(error => {
                console.log('parents/edit', error);
            });
    };

    handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    };

    handleUpdate(event, formData) {
        event.preventDefault();

        axios.put(urlApi + 'parents/edit/' + this.props.match.params.id + '/', {
            user_id: this.state.userId,
            mother_first_name: formData.motherFirstName,
            mother_last_name: formData.motherLastName,
            father_first_name: formData.fatherFirstName,
            father_last_name: formData.fatherLastName,
        })
            .then((response) => {
                localStorage.getItem('loggedUserIsStaff') === true
                ?
                    this.props.history.push('/parents/' + this.state.userId + '/')
                :
                    this.props.history.push('/parents/all/')
            })
            .catch((error) => {
                const motherFirstNameError = typeof error.response.data.motherFirstName !== undefined ? error.response.data.motherFirstName : '';
                const motherLastNameError = typeof error.response.data.motherLastName !== undefined ? error.response.data.motherLastName : '';
                const fatherFirstNameError = typeof error.response.data.fatherFirstName !== undefined ? error.response.data.fatherFirstName : '';
                const fatherLastNameError = typeof error.response.data.fatherLastName !== undefined ? error.response.data.fatherLastName : '';
                const nonFieldError =  typeof error.response.data.non_field_errors !== undefined ? error.response.data.non_field_errors : '';
                this.setState({
                    motherFirstNameError,
                    motherLastNameError,
                    fatherFirstNameError,
                    fatherLastNameError,
                    nonFieldError
                })
            });
    };


    render() {
        return (
            <main className='parent'>
                <div className='card create-edit'>

                    <section className='top'>
                        <h1>Edit a parent</h1>
                        <Link to={'/parents/all/'} className='btn btn-primary'>Parents list</Link>
                    </section>

                    <section className='body'>
                        <form onSubmit={e => this.handleUpdate(e, this.state)}>
                            <h2>Mother:</h2>
                            <p>
                                <label htmlFor='motherFirstName'>First name:</label>
                                <input
                                    type='text'
                                    name='motherFirstName'
                                    value={this.state.motherFirstName}
                                    onChange={this.handleChange}
                                />
                                {this.state.motherFirstNameError && <span className='form-error-message'>{this.state.motherFirstNameError}</span>}
                            </p>
                            <p>
                                <label htmlFor='lastName'>Last name:</label>
                                <input
                                    type='text'
                                    name='motherLastName'
                                    value={this.state.motherLastName}
                                    onChange={this.handleChange}
                                />
                                {this.state.motherLastNameError && <span className='form-error-message'>{this.state.motherLastNameError}</span>}
                            </p>

                            <hr />

                            <h2>Father:</h2>
                            <p>
                                <label htmlFor='fatherFirstName'>First name:</label>
                                <input
                                    type='text'
                                    name='fatherFirstName'
                                    value={this.state.fatherFirstName}
                                    onChange={this.handleChange}
                                />
                                {this.state.fatherFirstNameError && <span className='form-error-message'>{this.state.fatherFirstNameError}</span>}
                            </p>
                            <p>
                                <label htmlFor='fatherLastName'>Last name:</label>
                                <input
                                    type='text'
                                    name='fatherLastName'
                                    value={this.state.fatherLastName}
                                    onChange={this.handleChange}
                                />
                                {this.state.fatherLastNameError && <span className='form-error-message'>{this.state.fatherLastNameError}</span>}
                            </p>
                                {this.state.nonFieldError && <span className='form-error-message'>{this.state.nonFieldError}</span>}
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
        );
    }
}

export default ParentsEdit;