import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import urlApi from '../../services/httpService';


class ParentsCreate extends Component {
    state = {
        users: [],
        userId: 'unset',
        userIdError: '',
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
        axios.get(urlApi + 'user/')
            .then(response => {
                this.setState({ users: response.data });
                if (localStorage.getItem('loggedUserIsStaff') !== 'true') {
                    this.setState({ userId: response.data[0].id });
                }
                console.log('ParentsCreate', response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    handleChange = e => {
        const fatherLastName = this.state.fatherLastName;
        const motherLastName = this.state.motherLastName;
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
        if (name === 'motherLastName' && motherLastName === fatherLastName) {
            this.setState({ fatherLastName: value });
        }
    };

    handleCreate(event, formData) {
        event.preventDefault();
        console.log('parents/create', formData)

        // Check form
        let formError = false;
        if (this.state.userId === 'unset') {
            this.setState({ userIdError: 'Please select a user' })
            formError = true;
        }
        if (formData.motherFirstName === '' && formData.motherLastName === '' && formData.fatherFirstName === '' && formData.fatherLastName === '') {
            this.setState({ nonFieldError: 'The form can\'t be empty' })
            formError = true;
        }

        if (!formError) {
            axios.post(urlApi + 'parents/create/', {
                user_id: formData.userId,
                mother_first_name: formData.motherFirstName,
                mother_last_name: formData.motherLastName,
                father_first_name: formData.fatherFirstName,
                father_last_name: formData.fatherLastName,
            })
                .then((response) => {
                    console.log('parents/all')
                    this.props.history.push('/parents/all/')
                    console.log('parents/all')
                })
                .catch((error) => {
                    console.log('parents/create2')
                    console.log(error)
                    const motherFirstNameError = typeof error.response.data.motherFirstName !== undefined ? error.response.data.motherFirstName : '';
                    const motherLastNameError = typeof error.response.data.motherLastName !== undefined ? error.response.data.motherLastName : '';
                    const fatherFirstNameError = typeof error.response.data.fatherFirstName !== undefined ? error.response.data.fatherFirstName : '';
                    const fatherLastNameError = typeof error.response.data.fatherLastName !== undefined ? error.response.data.fatherLastName : '';
                    this.setState({
                        motherFirstNameError,
                        motherLastNameError,
                        fatherFirstNameError,
                        fatherLastNameError,
                    })
                });
        }
    };


    render() {
        return (
            <main className='parent'>
                <div className='card create-edit'>

                    <section className='top'>
                        <h1>Create new parents</h1>
                        <Link to={'/parents/all/'} className='btn btn-primary'>Parents list</Link>
                    </section>

                    <section className='body'>
                        <form onSubmit={e => this.handleCreate(e, this.state)}>
                                {
                                    localStorage.getItem('loggedUserIsStaff') === 'true'
                                    ?
                                        // Select the user for the parent to create (staff only)
                                        <p>
                                            <label htmlFor='userId'>User:</label>
                                            <select
                                                name='userId'
                                                value={this.state.userId}
                                                onChange={this.handleChange}
                                            >
                                                <option value='unset'>---</option>
                                                {this.state.users.map(user =>
                                                    <option key={user.id} value={user.id}>{user.entity}{user.entity.length > 0 & user.last_name.length > 0 ? ' - ' : ''}{user.title + ' '}{user.first_name + ' '}{user.last_name}</option>
                                                )}
                                            </select>
                                            {this.state.userIdError && <span className='form-error-message'>{this.state.userIdError}</span>}
                                        </p>
                                    :
                                        <span className='d-none'>
                                            {this.state.users.map(user => <input key={user.id} name='userId' value={user.id} onChange={this.handleChange}></input> )}
                                        </span>
                                }
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
                                    value='Create new parents'
                                />
                            </p>
                        </form>
                    </section>

                </div>
            </main>
        );
    }
}
 
export default ParentsCreate;