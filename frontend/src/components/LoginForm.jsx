import React, { Component } from 'react';
import axios from 'axios';
import { setTokenCookie } from '../services/tokenCookie';
import urlApi from '../services/httpService';


class LoginForm extends Component {
    state = {
        username: '',
        password: '',
        usernameError: '',
        passwordError: '',
        nonFieldError: '',
    };

    handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState(prevstate => {
            const newState = { ...prevstate };
            newState[name] = value;
            return newState;
        });
    };

    handleLogin = (event, formData) => {
        event.preventDefault();
        console.log('handleLogin');
        axios.defaults.headers.common['Authorization'] = ''; // TODO <-- can do better ?
        axios.post(urlApi + 'rest-auth/login/', {
            username: formData.username,
            password: formData.password
        })
            .then((response) => {
                console.log('Login response');
                this.setLoginUserData(response.data.key);
            })
            .catch((error) => {
                if (error.response !== undefined) {
                    console.log('Login error: ',error.response);
                    const usernameError = typeof error.response.data.username !== undefined ? error.response.data.username : '';
                    const passwordError = typeof error.response.data.password !== undefined ? error.response.data.password : '';
                    const nonFieldError =  typeof error.response.data.non_field_errors !== undefined ? error.response.data.non_field_errors : '';
                    this.setState({
                        usernameError,
                        passwordError,
                        nonFieldError
                    })
                }
            });
    };

    setLoginUserData = token => {
        console.log('setLoginUserData', token)
        axios.defaults.headers.common['Authorization'] = 'Token ' + token;
        axios.get(urlApi + 'rest-auth/user/')
        .then(response => {
            console.log('Login response : ', response);
            setTokenCookie(token);
            localStorage.setItem('loggedUserUsername', response.data.username);
            localStorage.setItem('loggedUserId', response.data.pk);
            this.checkIfIsStaff(response.data.pk)
        })
        .catch(error => {
            console.log('Login error: ', error.response);
        });
   };

   checkIfIsStaff = userId => {
     console.log('checkIfIsStaff', userId);
     axios.get(urlApi + 'user/' + userId)
       .then(response => {
         console.log('checkIfIsStaff', response);
         localStorage.setItem('loggedUserIsStaff', response.data.is_staff);
         if (response.data.is_staff) {
           this.props.history.push('/user/')
         } else {
           this.props.history.push('/parents/all/')
         }
       })
       .catch(error => {
         console.log('checkIfIsStaff', error.response);
       });
   }


    render() {
        return (
            <div id='hero'>
                <div className='container'>
                    <form onSubmit={e => this.handleLogin(e, this.state)}>
                        <h2>Log In</h2>
                        <label htmlFor='username'>Username</label>
                        <input
                            type='text'
                            name='username'
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                        {this.state.usernameError && <div className='form-error-message'>{this.state.usernameError}</div>}
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            name='password'
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        {this.state.passwordError && <div className='form-error-message'>{this.state.passwordError}</div>}
                        {this.state.nonFieldError && <div className='form-error-message'>{this.state.nonFieldError}</div>}
                        <input
                            type='submit'
                            className='btn btn-big btn-secondary w-100 no-radius'
                            value='Login'
                        />
                    </form>
                </div>
            </div>
        );
    }
}
 
export default LoginForm;