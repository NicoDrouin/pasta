import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import urlApi from '../../services/httpService';


class UserCreate extends Component {
    state = {
        username: '',
        usernameError: '',
        password: '',
        passwordError: '',
        entity: '',
        entityError: '',
        title: '',
        titleError: '',
        firstName: '',
        firstNameError: '',
        lastName: '',
        lastNameError: '',
        email: '',
        emailError: '',
        address: '',
        addressError: '',
        zipCode: '',
        zipCodeError: '',
        town: '',
        townError: '',
        phone: '',
        phoneError: '',
        nonFieldError: '',
    };

    handleChange = e => {
        const username = this.state.username;
        const email = this.state.email;
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
        if (name === 'email' && email === username) {
            this.setState({ username: value });
        }
    };

    handleCreate(event, formData) {
        event.preventDefault();

        axios.post(urlApi + 'user/', {
            username: formData.username,
            password: formData.password,
            entity: formData.entity,
            title: formData.title,
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            address: formData.address,
            zip_code: formData.zipCode,
            town: formData.town,
            phone: formData.phone
        })
            .then((response) => {
                this.props.history.push('/user/')
            })
            .catch((error) => {
                const usernameError = typeof error.response.data.username !== undefined ? error.response.data.username : '';
                const passwordError = typeof error.response.data.password !== undefined ? error.response.data.password : '';
                const entityError = typeof error.response.data.entity !== undefined ? error.response.data.entity : '';
                const titleError = typeof error.response.data.title !== undefined ? error.response.data.title : '';
                const firstNameError = typeof error.response.data.firstName !== undefined ? error.response.data.firstName : '';
                const lastNameError = typeof error.response.data.lastName !== undefined ? error.response.data.lastName : '';
                const emailError = typeof error.response.data.email !== undefined ? error.response.data.email : '';
                const addressError = typeof error.response.data.address !== undefined ? error.response.data.address : '';
                const zipCodeError = typeof error.response.data.zipCode !== undefined ? error.response.data.zipCode : '';
                const townError = typeof error.response.data.town !== undefined ? error.response.data.town : '';
                const phoneError = typeof error.response.data.phone !== undefined ? error.response.data.phone : '';
                const nonFieldError =  typeof error.response.data.non_field_errors !== undefined ? error.response.data.non_field_errors : '';
                this.setState({
                    usernameError,
                    passwordError,
                    entityError,
                    titleError,
                    firstNameError,
                    lastNameError,
                    emailError,
                    addressError,
                    zipCodeError,
                    townError,
                    phoneError,
                    nonFieldError
                })
            });
    };


    render() {
        return (
            <main className='user'>
                <div className='card create-edit'>
                    <section className='top'>
                        <h1>Create a new user</h1>
                        <Link to={'/user/'} className='btn btn-primary'>Users list</Link>
                    </section>
                    <section className='body'>
                        <form onSubmit={e => this.handleCreate(e, this.state)}>
                            <p>
                                <label htmlFor='title'>Title:</label>
                                <select
                                    name='title'
                                    value={this.state.title}
                                    onChange={this.handleChange}
                                >
                                    <option value=''>---</option>
                                    <option value='Dr'>Dr</option>
                                    <option value='Ms'>Ms</option>
                                    <option value='Mr'>Mr</option>
                                    <option value='Professor'>Professor</option>
                                </select>
                                {this.state.titleError && <span className='form-error-message'>{this.state.titleError}</span>}
                            </p>
                            <p>
                                <label htmlFor='firstName'>First name:</label>
                                <input
                                    type='text'
                                    name='firstName'
                                    value={this.state.firstName}
                                    onChange={this.handleChange}
                                    className={this.state.firstNameError && 'error'}
                                />
                                {this.state.firstNameError && <span className='form-error-message'>{this.state.firstNameError}</span>}
                            </p>
                            <p>
                                <label htmlFor='lastName'>Last name:</label>
                                <input
                                    type='text'
                                    name='lastName'
                                    value={this.state.lastName}
                                    onChange={this.handleChange}
                                    className={this.state.lastNameError && 'error'}
                                />
                                {this.state.lastNameError && <span className='form-error-message'>{this.state.lastNameError}</span>}
                            </p>
                            <p>
                                <label htmlFor='email'>eMail:</label>
                                <input
                                    type='text'
                                    name='email'
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    className={this.state.emailError && 'error'}
                                />
                                {this.state.emailError && <span className='form-error-message'>{this.state.emailError}</span>}
                            </p>

                            <hr />

                            <p>
                                <label htmlFor='entity'>Entity:</label>
                                <input
                                    type='text'
                                    name='entity'
                                    value={this.state.entity}
                                    onChange={this.handleChange}
                                    className={this.state.entityError && 'error'}
                                />
                                {this.state.entityError && <span className='form-error-message'>{this.state.entityError}</span>}
                            </p>
                            <p>
                                <label htmlFor='address'>Address:</label>
                                <input
                                    type='text'
                                    name='address'
                                    value={this.state.address}
                                    onChange={this.handleChange}
                                    className={this.state.addressError && 'error'}
                                />
                                {this.state.addressError && <span className='form-error-message'>{this.state.addressError}</span>}
                            </p>
                            <p>
                                <label htmlFor='zipCode'>ZIP Code:</label>
                                <input
                                    type='text'
                                    name='zipCode'
                                    value={this.state.zipCode}
                                    onChange={this.handleChange}
                                    className={this.state.zipCodeError && 'error'}
                                />
                                {this.state.zipCodeError && <span className='form-error-message'>{this.state.zipCodeError}</span>}
                            </p>
                            <p>
                                <label htmlFor='town'>Town:</label>
                                <input
                                    type='text'
                                    name='town'
                                    value={this.state.town}
                                    onChange={this.handleChange}
                                    className={this.state.townError && 'error'}
                                />
                                {this.state.townError && <span className='form-error-message'>{this.state.townError}</span>}
                            </p>
                            <p>
                                <label htmlFor='phone'>Phone:</label>
                                <input
                                    type='text'
                                    name='phone'
                                    value={this.state.phone}
                                    onChange={this.handleChange}
                                    className={this.state.phoneError && 'error'}
                                />
                                {this.state.phoneError && <span className='form-error-message'>{this.state.phoneError}</span>}
                            </p>

                            <hr />

                            <p>
                                <label>Username:</label>
                                <input
                                    type='text'
                                    name='username'
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                    className={this.state.usernameError && 'error'}
                                />
                                {this.state.usernameError && <span className='form-error-message'>{this.state.usernameError}</span>}
                            </p>
                            <p>
                                <label htmlFor='password'>Password:</label>
                                <input
                                    type='text'
                                    name='password'
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    className={this.state.passwordError && 'error'}
                                />
                                {this.state.passwordError && <span className='form-error-message'>{this.state.passwordError}</span>}
                            </p>
                                {this.state.nonFieldError && <span className='form-error-message'>{this.state.nonFieldError}</span>}
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
        );
    }
}
 
export default UserCreate;