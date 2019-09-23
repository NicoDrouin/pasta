import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getTokenCookie } from '../../services/tokenCookie'
import urlApi from '../../services/httpService'
import PropTypes from 'prop-types'
import Pagination from '../../services/paginationJS'


const UserList = () => {

    const [users, setUsers] = useState([])
    const [itemsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = 'Token ' + getTokenCookie()
        axios.get(urlApi + 'user/')
            .then(response => {
                // console.log('UserList', response.data.results); // <-- if pagination DRF
                // setState({ users: response.data.results }); // <-- if pagination DRF
                setUsers(response.data)
                setTotalItems(response.data.length)
            })
            .catch(error => {
                console.log(error)
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] )


    return (
        <main className='container user'>
            <div className='card list'>

                <section className='top'>
                    <h1>Users list</h1>
                    <Link to={'/user/create/'} className='btn btn-success'>Create a new user</Link>
                </section>

                <section className='body'>
                    {
                        users.map((user, i) =>
                            ((i + 1) > ((currentPage - 1) * itemsPerPage) && (i) < (currentPage * itemsPerPage) && !user.is_staff)
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
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        totalItems={totalItems}
                        changeListPage={setCurrentPage}
                    />

                </section>

            </div>
        </main>
    )
}


UserList.propTypes = {
    users: PropTypes.array,
    setUsers: PropTypes.object,
    itemsPerPage: PropTypes.number,
    currentPage: PropTypes.number,
    setCurrentPage: PropTypes.func,
    totalItems: PropTypes.number,
    setTotalItems: PropTypes.func
}


export default UserList