import React, { useContext, useState, useEffect } from 'react'
import { LoginContext } from '../../contexts/LoginContext'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { getTokenCookie } from '../../services/tokenCookie'
import urlApi from '../../services/httpService'

import DnaFilesLists from '../dnaFiles/DnaFilesLists'


const ParentsDetail = props => {

    const { login } = useContext(LoginContext)

    const [parent, setParent] = useState({})
    const [popIsClose, setPopIsClose] = useState(true)
    const [userTitleFirstLastName, setUserTitleFirstLastName] = useState('')

    useEffect(() => {
        const parentsId = props.match.params.id
        console.log('ParentsDetail-cdm - parents ID: ', parentsId)
        axios.defaults.headers.common['Authorization'] = 'Token ' + getTokenCookie()
        getParentsDetails(parentsId)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] )

    function getParentsDetails(parentsId) {
        axios.get(urlApi + 'parents/detail/' + parentsId + '/')
            .then(response => {
                console.log('getParentsDetails: /parents/id/', response)
                setParent( response.data )
                getUserName(response.data.user_id)
            })
            .catch(error => {
                console.log('getParentsDetails: /parents/id/', error)
            })
    }

    function getUserName(userId,) {
        axios.get(urlApi + 'user/' + userId + '/')
            .then(response => {
                console.log('getUserName: /user/id/', response);
                setUserTitleFirstLastName( response.data.title + ' ' + response.data.first_name + ' ' + response.data.last_name )
            })
            .catch(error => {
                console.log('getUserName: /user/id/', error)
            })
    }

    function deleteUser(action) {
        if (action === 'delete') {
            axios.delete(urlApi + 'parents/delete/' + props.match.params.id + '/')
                .then((response) => {
                    console.log('ParentsDetail-deleteUser', response);
                    props.history.push('/parents/' + parent.user_id + '/')
                })
                .catch((error) => {
                    console.log('ParentsDetail-deleteUser', error)
                })
        } else {
            setPopIsClose( true )
        }
    }

    const parentsNames = (
        parent.mother_last_name === parent.father_last_name
        ?
            <p>{parent.mother_first_name} and {parent.father_first_name} <b>{parent.mother_last_name}</b></p>
        :
            parent.father_last_name !== ''
            ?
                <p>{parent.mother_first_name} <b>{parent.mother_last_name}</b> & {parent.father_first_name} <b>{parent.father_last_name}</b></p>
            :
                <p><label>Mother:</label> {parent.mother_first_name} <b>{parent.mother_last_name}</b></p>
    )


    return (
        <main className='container parent'>
            <div className='card detail'>

                <section className='top'>
                    <h1>{userTitleFirstLastName} Parents</h1>
                    <div>
                        <div onClick={() => setPopIsClose( false )} className='btn btn-danger'>Delete</div>
                        <Link to={'/parents/edit/' + props.match.params.id} className='btn btn-success'>Edit</Link>
                        <Link to={'/parents/all/'} className='btn btn-primary'>All parents list</Link>
                    </div>
                </section>

                <section className='body'>
                    {parentsNames}
                    {
                        login.loggedUserIsStaff === true
                        &&
                        <p><Link to={'../../../parents/' + parent.user_id + '/'} className='btn btn-primary'>
                            PARENTS LIST FOR <span className='uppercase'>{userTitleFirstLastName}</span>
                        </Link></p>
                    }
                    <DnaFilesLists parentsId={props.match.params.id} />
                </section>
            </div>

            <section className={`pop ${popIsClose && ' d-none'}`}>
                <div className='pop-box'>
                    <p>Are you sure you want to delete these parents?</p>
                    <div className='btn-container'>
                        <div onClick={() => deleteUser('delete')} className='btn btn-danger'>Yes delete</div>
                        <div onClick={() => deleteUser('keep')} className='btn btn-primary'>No keep it</div>
                    </div>
                </div>
            </section>

        </main>
    )
}

export default ParentsDetail