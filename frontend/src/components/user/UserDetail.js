import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getTokenCookie } from '../../services/tokenCookie'
import { Link } from 'react-router-dom'
import urlApi from '../../services/httpService'
import PropTypes from 'prop-types'


const UserDetail = props => {

    const [user, setUser] = useState({})
    const [popIsClose, setPopIsClose] = useState(true)

    useEffect(() => {
        const urlId = props.match.params.id;
        const userId = urlId !== 'undefined' ? urlId : ''
        axios.defaults.headers.common['Authorization'] = 'Token ' + getTokenCookie()
        axios.get(urlApi + 'user/' + userId + '/')
            .then(response => {
                setUser(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] )

    function handlePopDelete() {
        setPopIsClose(false)
    }

    function handleDelete(action) {
        if (action === 'delete') {
            axios.delete(urlApi + 'user/' + props.match.params.id + '/')
                .then((response) => {
                    props.history.push('/user/')
                })
                .catch((error) => {
                    console.log(error)
                })
        } else {
            setPopIsClose(true)
        }
    }


    return (
        <main className='container user'>
            <div className='card detail'>

                <section className='top'>
                    <h1>User Detail</h1>
                    <div>
                        <div onClick={handlePopDelete} className='btn btn-danger'>Delete</div>
                        <Link to={'/user/edit/' + props.match.params.id} className='btn btn-success'>Edit</Link>
                        <Link to={'/user/'} className='btn btn-primary'>Users list</Link>
                    </div>
                </section>

                <section className='body'>
                    <p><b>{user.entity}</b></p>
                    <p>{user.address}</p>
                    <p>{user.zip_code} - {user.town}</p>
                    <p>{user.phone}</p>
                    <hr />
                    <p><b>{user.title} {user.first_name} {user.last_name}</b></p>
                    <p><label>eMail:</label> <a href={'mailto:' + user.email} className='email'>{user.email}</a></p>
                    <p><label>Username:</label> {user.username}</p>
                    <p><Link to={'../../parents/' + props.match.params.id + '/'} className='btn btn-primary'>PARENTS LIST</Link></p>
                </section>
            </div>

            <section className={`pop ${popIsClose && ' d-none'}`}>
                <div className='pop-box'>
                    <p>Are you sure you want to delete this user?</p>
                    <div className='btn-container'>
                        <div onClick={() => handleDelete('delete')} className='btn btn-danger'>Yes delete</div>
                        <div onClick={() => handleDelete('keep')} className='btn btn-primary'>No keep it</div>
                    </div>
                </div>
            </section>

        </main>
    )
}


UserDetail.propTypes = {
    user: PropTypes.object,
    setUser: PropTypes.func,
    popIsClose: PropTypes.bool,
    setPopIsClose: PropTypes.func
}

 
export default UserDetail