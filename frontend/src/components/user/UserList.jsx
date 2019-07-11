import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getTokenCookie } from '../../services/tokenCookie';
import urlApi from '../../services/httpService';
import Pagination from '../../services/paginationJS';


class UserList extends Component {
    state = {
        users: [],
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: 0,
    }

    componentDidMount() {
        console.log('UserList', getTokenCookie())
        axios.defaults.headers.common['Authorization'] = 'Token ' + getTokenCookie();
        axios.get(urlApi + 'user/')
            .then(response => {
                // console.log('UserList', response.data.results); // <-- if pagination DRF
                // this.setState({ users: response.data.results }); // <-- if pagination DRF
                console.log('UserList', response.data);
                this.setState({
                    users: response.data,
                    totalItems: response.data.length,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    changeListPage = newPage => {
        this.setState({ currentPage: newPage });
        console.log(newPage);
    }


    render() {
        return (
            <main className='container user'>
                <div className='card list'>

                    <section className='top'>
                        <h1>Users list</h1>
                        <Link to={'/user/create/'} className='btn btn-success'>Create a new user</Link>
                    </section>

                    <section className='body'>
                        {
                            this.state.users.map((user, i) =>
                                ((i + 1) > ((this.state.currentPage - 1) * this.state.itemsPerPage) && (i) < (this.state.currentPage * this.state.itemsPerPage) && !user.is_staff)
                                &&
                                <Link to={'/user/' + user.id + '/'} key={user.id}>
                                    <div>
                                        <p>{user.entity}</p>
                                        <p>{user.title} {user.first_name} {user.last_name}</p>
                                    </div>
                                </Link>
                            )
                        }

                        <Pagination // <-- if pagination via javascript
                            itemsPerPage={this.state.itemsPerPage}
                            currentPage={this.state.currentPage}
                            totalItems={this.state.totalItems}
                            changeListPage={this.changeListPage}
                        />

                    </section>

                </div>
            </main>
        );
    }
}
 
export default UserList;