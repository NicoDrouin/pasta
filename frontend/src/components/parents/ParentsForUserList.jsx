import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from '../../services/paginationJS';
import urlApi from '../../services/httpService';


class ParentsPerUserList extends Component {
    state = {
        parents: [],
        userTitleFirstLastName: '',
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: 0,
    };

    componentDidMount() {
        axios.get(urlApi + 'parents/' + this.props.match.params.id + '/')
            .then(response => {
                // console.log('ParentsList', response.data.results); // <-- if pagination DRF
                // this.setState({ parents: response.data.results }); // <-- if pagination DRF
                console.log('ParentsList', response.data);
                this.setState({
                    parents: response.data,
                    totalItems: response.data.length,
                });
                this.getUserName();
            })
            .catch(error => {
                console.log('/parents/id/', error);
            });
    }

    getUserName() {
        axios.get(urlApi + 'user/' + this.props.match.params.id + '/')
            .then(response => {
                this.setState({ userTitleFirstLastName: response.data.title + ' ' + response.data.first_name + ' ' + response.data.last_name });
            })
            .catch(error => {
                console.log('/user/id/', error);
            });
    }

    changeListPage = newPage => {
        this.setState({ currentPage: newPage });
        console.log(newPage);
    }


    render() {
        return (
            <main className='container parent'>
                <div className='card list'>

                    <section className='top'>
                        <h1>Parents for {this.state.userTitleFirstLastName}</h1>
                        <Link to={'/parents/all/'} className='btn btn-primary'>All parents list</Link>
                    </section>

                    <section className='body'>
                        {this.state.parents.map((parent, i) =>
                            ((i + 1) > ((this.state.currentPage - 1) * this.state.itemsPerPage) && (i) < (this.state.currentPage * this.state.itemsPerPage))
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
 
export default ParentsPerUserList;