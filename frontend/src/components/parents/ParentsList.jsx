import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { getTokenCookie } from '../../services/tokenCookie';
import urlApi from '../../services/httpService';
import Pagination from '../../services/paginationJS';


class ParentsList extends Component {
    state = {
        parents: [],
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: 0,
    };

    componentDidMount() {
        console.log('ParentsList')
        axios.defaults.headers.common['Authorization'] = 'Token ' + getTokenCookie();
        axios.get(urlApi + 'parents/all/')
            .then(response => {
                // console.log('ParentsList', response.data.results); // <-- if pagination DRF
                // this.setState({ parents: response.data.results }); // <-- if pagination DRF
                console.log('ParentsList', response.data);
                this.setState({
                    parents: response.data,
                    totalItems: response.data.length,
                });
            })
            .catch(error => {
                console.log(error);
            });
    };

    changeListPage = newPage => {
        this.setState({ currentPage: newPage });
        console.log(newPage);
    }


    render() {
        return (
            <main className='container parent'>
                <div className='card list'>

                    <section className='top'>
                        <h1>Parents list</h1>
                        <Link to={'/parents/create/'} className='btn btn-success'>Create new parents</Link>
                    </section>

                    <section className='body'>
                        {
                            !this.state.parents.length
                            &&
                            <Link to='/parents/create/'>
                                <div>
                                    <p>There is no parents in this list.</p>
                                    <p>Create new ones.</p>    
                                </div>
                            </Link>
                        }
                        {
                            this.state.parents.map((parent, i) =>
                                ((i + 1) > ((this.state.currentPage - 1) * this.state.itemsPerPage) && (i) < (this.state.currentPage * this.state.itemsPerPage))
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
 
export default ParentsList;