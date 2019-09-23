import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getTokenCookie } from '../../services/tokenCookie'
import Pagination from '../../services/paginationJS'
import urlApi from '../../services/httpService'
import PropTypes from 'prop-types'


const ParentsPerUserList = props => {

    const [parents, setParents] = useState([])
    const [itemsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)
    const [userTitleFirstLastName, setUserTitleFirstLastName] = useState('')

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = 'Token ' + getTokenCookie()
        axios.get(urlApi + 'parents/' + props.match.params.id + '/')
            .then(response => {
                // console.log('ParentsList', response.data.results); // <-- if pagination DRF
                // this.setState({ parents: response.data.results }); // <-- if pagination DRF
                setParents(response.data)
                setTotalItems(response.data.length)
                getUserName()
            })
            .catch(error => {
                console.log('/parents/id/ - error:', error.response)
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] )

    function getUserName() {
        axios.get(urlApi + 'user/' + props.match.params.id + '/')
            .then(response => {
                setUserTitleFirstLastName(response.data.title + ' ' + response.data.first_name + ' ' + response.data.last_name)
            })
            .catch(error => {
                console.log('/user/id/', error)
            })
    }


    return (
        <main className='container parent'>
            <div className='card list'>

                <section className='top'>
                    <h1>Parents for {userTitleFirstLastName}</h1>
                    <Link to={'/parents/all/'} className='btn btn-primary'>All parents list</Link>
                </section>

                <section className='body'>
                    {parents.map((parent, i) =>
                        ((i + 1) > ((currentPage - 1) * itemsPerPage) && (i) < (currentPage * itemsPerPage))
                        &&
                            <Link to={'/parents/detail/' + parent.id + '/'} key={parent.id}>
                                <div>
                                    {
                                        parent.mother_last_name === parent.father_last_name
                                        ?
                                            <p>{parent.mother_first_name} and {parent.father_first_name} <b>{parent.mother_last_name}</b></p>
                                        :
                                            parent.father_last_name !== ''
                                            ?
                                                <React.Fragment>
                                                    <p>{parent.mother_first_name} <b>{parent.mother_last_name}</b> & {parent.father_first_name} <b>{parent.father_last_name}</b></p>
                                                </React.Fragment>
                                            :
                                                <p><label>Mother:</label> {parent.mother_first_name} <b>{parent.mother_last_name}</b></p>
                                    }
                                </div>
                            </Link>
                    )}

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


ParentsPerUserList.propTypes = {
    parents: PropTypes.array.isRequired,
    setParents: PropTypes.func.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    setCurrentPage: PropTypes.func.isRequired,
    totalItems: PropTypes.number.isRequired,
    setTotalItems: PropTypes.func.isRequired,
    userTitleFirstLastName: PropTypes.string.isRequired,
    setUserTitleFirstLastName: PropTypes.func.isRequired
}

 
export default ParentsPerUserList