// import React, { Component } from 'react';
// import axios from 'axios';
// import urlApi from '../../services/httpService';



// class PaginationDRF extends Component {
//     state = {
//         paginationCountElements: 0,
//         paginationCountPages: 15,
//         paginationCurrentPage: 1,
//         paginationNext: null,
//         paginationPrevious: null
//     }

//     componentDidMount() {
//         axios.get(this.props.urlApiList)
//             .then(response => {
//                 console.log('Pagination: ', response);
//                 const paginationCountPages = Math.floor(response.data.count / this.props.elementsPerPage);
//                 this.setState({
//                     paginationCountElements: response.data.count,
//                     paginationCountPages,
//                     paginationCurrentPage: 1,
//                     paginationNext: response.data.next,
//                     paginationPrevious: response.data.previous
//                 })
//             })
//             .catch(error => {
//                 console.log('Pagination: ', error.response);
//             });
//     }


//     render() {

//         const pageCount = this.state.paginationCountPages;
//         const currentPage = this.state.paginationCurrentPage;
//         const urlGui = this.props.urlGui;

//         return (
//             <React.Fragment>
//                 {
//                     pageCount > 1
//                     &&
//                     <ul className='pagination'>

//                         <li className={currentPage === 1 && 'disabled'}>
//                             <a href={urlGui} aria-label='Previous'>
//                                 <span aria-hidden='true'>«</span>
//                             </a>
//                         </li>

//                         <li className={currentPage === 1 && 'active'}>
//                             <a href={urlGui + (currentPage > 1 ? '?page=' + currentPage - 1 : 1)}>
//                                 {currentPage === 1 ? '1' : currentPage - 1}
//                             </a>
//                         </li>

//                         {/* <li className={currentPage !== 1 ? currentPage !== pageCount && 'active' : ''>
//                             <a href=urlApi + 'user/?page=2'>2</a>
//                         </li> */}

//                         <li className={currentPage === pageCount && 'disabled'}>
//                             <a href={urlGui +  '/?page=' + currentPage + 1} aria-label='Next'>
//                                 <span aria-hidden='true'>»</span>
//                             </a>
//                         </li>

//                     </ul>
//                 }
//             </React.Fragment>
//         );
//     }
// }

// export default PaginationDRF;