import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getTokenCookie } from '../../services/tokenCookie'
import urlApi from '../../services/httpService'
import Pagination from '../../services/paginationJS'


const ParentsList = () => {

    const [parents, setParents] = useState([])
    const [itemsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)

    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = 'Token ' + getTokenCookie()
        axios.get(urlApi + 'parents/all/')
            .then(response => {
                // console.log('ParentsList', response.data.results); // <-- if pagination DRF
                // this.setState({ parents: response.data.results }); // <-- if pagination DRF
                setParents(response.data)
                setTotalItems(response.data.length)
            })
            .catch(error => {
                console.log(error.response)
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] )


    return (
        <main className='container parent'>
            <div className='card list'>

                <section className='top'>
                    <h1>Parents list</h1>
                    <Link to={'/parents/create/'} className='btn btn-success'>Create new parents</Link>
                </section>

                <section className='body'>
                    {
                        !parents.length
                        &&
                        <Link to='/parents/create/'>
                            <div>
                                <p>There is no parents in this list.</p>
                                <p>Create new ones.</p>    
                            </div>
                        </Link>
                    }
                    {
                        parents.map((parent, i) =>
                            ((i + 1) > ((currentPage - 1) * itemsPerPage) && (i) < (currentPage * itemsPerPage))
                            &&
                            <Link to={'/parents/detail/' + parent.id + '/'} key={parent.id} className='table-row-odd-grey'>
                                <div>
                                    {
                                        parent.mother_last_name === parent.father_last_name
                                        ?
                                            <p>{parent.mother_first_name} & {parent.father_first_name} <b>{parent.mother_last_name}</b></p>
                                        :
                                            parent.father_last_name !== ''
                                            ?
                                                <p>{parent.mother_first_name} <b>{parent.mother_last_name}</b> & {parent.father_first_name} <b>{parent.father_last_name}</b></p>
                                            :
                                                <p><label>Mother:</label> {parent.mother_first_name} <b>{parent.mother_last_name}</b></p>
                                    }
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

export default ParentsList