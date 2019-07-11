import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import urlApi from '../../services/httpService';


class UserDetail extends Component {
    state = {
        user: {},
        popIsClose: true,
    };

    componentDidMount() {
        const urlId = this.props.match.params.id;
        const userId = urlId !== 'undefined' ? urlId : '';
        axios.get(urlApi + 'user/' + userId + '/')
            .then(response => {
                this.setState({ user: response.data });
            })
            .catch(error => {
                console.log(error);
            });
    };

    handlePopDelete = () => {
        this.setState({ popIsClose: false })
    };

    handleDelete(action) {
        if (action === 'delete') {
            axios.delete(urlApi + 'user/' + this.props.match.params.id + '/')
                .then((response) => {
                    this.props.history.push('/user/')
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            this.setState({ popIsClose: true })
        }
    };


    render() {
        return (
            <main className='container user'>
                <div className='card detail'>

                    <section className='top'>
                        <h1>User Detail</h1>
                        <div>
                            <div onClick={this.handlePopDelete} className='btn btn-danger'>Delete</div>
                            <Link to={'/user/edit/' + this.props.match.params.id} className='btn btn-success'>Edit</Link>
                            <Link to={'/user/'} className='btn btn-primary'>Users list</Link>
                        </div>
                    </section>

                    <section className='body'>
                        <p><b>{this.state.user.entity}</b></p>
                        <p>{this.state.user.address}</p>
                        <p>{this.state.user.zip_code} - {this.state.user.town}</p>
                        <p>{this.state.user.phone}</p>
                        <hr />
                        <p><b>{this.state.user.title} {this.state.user.first_name} {this.state.user.last_name}</b></p>
                        <p><label>eMail:</label> <a href={'mailto:' + this.state.user.email} className='email'>{this.state.user.email}</a></p>
                        <p><label>Username:</label> {this.state.user.username}</p>
                        <p><Link to={'../../parents/' + this.props.match.params.id + '/'} className='btn btn-primary'>PARENTS LIST</Link></p>
                    </section>
                </div>

                <section className={`pop ${this.state.popIsClose && ' d-none'}`}>
                    <div className='pop-box'>
                        <p>Are you sure you want to delete this user?</p>
                        <div className='btn-container'>
                            <div onClick={e => this.handleDelete('delete')} className='btn btn-danger'>Yes delete</div>
                            <div onClick={e => this.handleDelete('keep')} className='btn btn-primary'>No keep it</div>
                        </div>
                    </div>
                </section>

            </main>
        );
    }
}
 
export default UserDetail;