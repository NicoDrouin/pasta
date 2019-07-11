import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import urlApi from '../../services/httpService';


class UserEdit extends Component {
    state = {
        username: '',
        usernameError: '',
        password: '',
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

    componentDidMount() {
        axios.get(urlApi + 'user/' + this.props.match.params.id + '/')
            .then(response => {
                this.setState({
                    username: response.data.username,
                    password: response.data.password,
                    entity: response.data.entity,
                    title: response.data.title,
                    firstName: response.data.first_name,
                    lastName: response.data.last_name,
                    email: response.data.email,
                    address: response.data.address,
                    zipCode: response.data.zip_code,
                    town: response.data.town,
                    phone: response.data.phone,
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    };

    handleUpdate(event, formData) {
        event.preventDefault();

        axios.put(urlApi + 'user/' + this.props.match.params.id + '/', {
            username: formData.username,
            password: this.state.password,
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
                this.props.history.push('/user/' + this.props.match.params.id + '/')
            })
            .catch((error) => {
                const usernameError = typeof error.response.data.username !== undefined ? error.response.data.username : '';
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
                        <h1>Edit user</h1>
                        <Link to={'/user/'} className='btn btn-primary'>Users list</Link>
                    </section>

                    <section className='body'>
                        <form onSubmit={e => this.handleUpdate(e, this.state)}>
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
                                />
                                {this.state.usernameError && <span className='form-error-message'>{this.state.usernameError}</span>}
                            </p>
                                {this.state.nonFieldError && <span className='form-error-message'>{this.state.nonFieldError}</span>}
                            <p>
                                <input
                                    type='submit'
                                    className='btn btn-big btn-primary w-100 uppercase'
                                    value='Save changes'
                                />
                            </p>
                        </form>
                    </section>

                </div>
            </main>
        );
    }
}
 
export default UserEdit;