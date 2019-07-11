import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getTokenCookie } from '../../services/tokenCookie';
import urlApi from '../../services/httpService';

import DnaFilesLists from '../dnaFiles/DnaFilesLists';


class ParentsDetail extends Component {
    state = {
        parent: {},
        popIsClose: true,
        userTitleFirstLastName: '',
    }

    componentDidMount() {
        const parentsId = this.props.match.params.id;
        console.log('ParentsDetail-cdm - parents ID: ', parentsId);
        axios.defaults.headers.common['Authorization'] = 'Token ' + getTokenCookie();
        this.getParentsDetails(parentsId);
    }

    getParentsDetails(parentsId) {
        axios.get(urlApi + 'parents/detail/' + parentsId + '/')
            .then(response => {
                console.log('getParentsDetails: /parents/id/', response);
                this.setState({ parent: response.data });
                this.getUserName(response.data.user_id, parentsId);
            })
            .catch(error => {
                console.log('getParentsDetails: /parents/id/', error);
            });
    }

    getUserName(userId, parentsId) {
        axios.get(urlApi + 'user/' + userId + '/')
            .then(response => {
                console.log('getUserName: /user/id/', response);
                this.setState({ userTitleFirstLastName: response.data.title + ' ' + response.data.first_name + ' ' + response.data.last_name });
            })
            .catch(error => {
                console.log('getUserName: /user/id/', error);
            });
    }

    deleteUser(action) {
        if (action === 'delete') {
            axios.delete(urlApi + 'parents/delete/' + this.props.match.params.id + '/')
                .then((response) => {
                    console.log('ParentsDetail-deleteUser', response);
                    this.props.history.push('/parents/' + this.state.parent.user_id + '/');
                })
                .catch((error) => {
                    console.log('ParentsDetail-deleteUser', error);
                });
        } else {
            this.setState({ popIsClose: true });
        }
    }

    openDeletePopin = () => {
        this.setState({ popIsClose: false });
    }


    render() {
        const parentsNames = (
            this.state.parent.mother_last_name === this.state.parent.father_last_name
            ?
                <p>{this.state.parent.mother_first_name} and {this.state.parent.father_first_name} <b>{this.state.parent.mother_last_name}</b></p>
            :
                this.state.parent.father_last_name !== ''
                ?
                    <p>{this.state.parent.mother_first_name} <b>{this.state.parent.mother_last_name}</b> & {this.state.parent.father_first_name} <b>{this.state.parent.father_last_name}</b></p>
                :
                    <p><label>Mother:</label> {this.state.parent.mother_first_name} <b>{this.state.parent.mother_last_name}</b></p>
        );

        return (
            <main className='container parent'>
                <div className='card detail'>

                    <section className='top'>
                        <h1>{this.state.userTitleFirstLastName} Parents</h1>
                        <div>
                            <div onClick={this.openDeletePopin} className='btn btn-danger'>Delete</div>
                            <Link to={'/parents/edit/' + this.props.match.params.id} className='btn btn-success'>Edit</Link>
                            <Link to={'/parents/all/'} className='btn btn-primary'>All parents list</Link>
                        </div>
                    </section>

                    <section className='body'>
                        {parentsNames}
                        {
                            localStorage.getItem('loggedUserIsStaff') === true
                            &&
                            <p><Link to={'../../../parents/' + this.state.parent.user_id + '/'} className='btn btn-primary'>
                                PARENTS LIST FOR <span className='uppercase'>{this.state.userTitleFirstLastName}</span>
                            </Link></p>
                        }
                        <DnaFilesLists parentsId={this.props.match.params.id} />
                    </section>
                </div>

                <section className={`pop ${this.state.popIsClose && ' d-none'}`}>
                    <div className='pop-box'>
                        <p>Are you sure you want to delete these parents?</p>
                        <div className='btn-container'>
                            <div onClick={e => this.deleteUser('delete')} className='btn btn-danger'>Yes delete</div>
                            <div onClick={e => this.deleteUser('keep')} className='btn btn-primary'>No keep it</div>
                        </div>
                    </div>
                </section>

            </main>
        );
    }
}
 
export default ParentsDetail;