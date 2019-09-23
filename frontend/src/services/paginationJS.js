import React, { Fragment } from 'react'

// ==============================
// === PAGINATION JS - HOW TO ===
// ==============================
// Everything You Always Wanted to Know About pagination*
// (*But Were Afraid to Ask)

// ==============================
// 1. Add these states in the component:
// ==============================

// With hooks:
// const [itemsPerPage] = useState(10)
// const [currentPage, setCurrentPage] = useState(1)
// const [totalItems, setTotalItems] = useState(0)

// Or like a caveman:
// state = {
//     itemsPerPage: 10, // <-- Total items visible per page
//     currentPage: 1,   // <-- Start to the first page
//     totalItems: 0,    // <-- Total items in the list (updated with cdm)
// }

// ==============================
// 2. Set the totalItems in a cdm:
// ==============================

// With hooks:
// useEffect(() => {
//     setTotalItems(response.data.length)
// }, [] )

// Or like a caveman:
// this.setState({
//     totalItems: response.data.length,
// })

// ==============================
// 3. Adapt the .map so it print only the revelant part of the list:
// ==============================

// With hooks:
// {this.state.itemList.map((item, i) =>
//     ((i + 1) > ((currentPage - 1) * itemsPerPage) && (i) < (currentPage * itemsPerPage))
//     &&
//     <div>This is an item from the list</div>

// Or like a caveman:
// {this.state.itemList.map((item, i) =>
//     ((i + 1) > ((this.state.currentPage - 1) * this.state.itemsPerPage) && (i) < (this.state.currentPage * this.state.itemsPerPage))
//     &&
//     <div>This is an item from the list</div>
// )}

// ==============================
// 4. Add the pagination component:
// ==============================

// With hooks:
// <Pagination
//     itemsPerPage={itemsPerPage}
//     currentPage={currentPage}
//     totalItems={totalItems}
//     changeListPage={setCurrentPage}
// />

// Or like a caveman:
// <Pagination
//     itemsPerPage={this.state.itemsPerPage}
//     currentPage={this.state.currentPage}
//     totalItems={this.state.totalItems}
//     changeListPage={this.changeListPage}
// />

// FREE TIP: do it with hooks.

const Pagination = props => {

    const { itemsPerPage, currentPage, totalItems, changeListPage } = props
    const totalPage = Math.ceil(totalItems / itemsPerPage)

    return (
        <Fragment>
            {
                totalPage > 1
                &&
                <div className='pagination-container'>
                    <ul className='pagination'>

                        <li
                            /* === Previous page === */
                            className={currentPage === 1 ? 'disabled' : undefined}
                            onClick={currentPage > 1 ? () => changeListPage(currentPage - 1) : undefined}
                        >
                            <span aria-label='Previous'>«</span>
                        </li>

                        <li
                            /* === First page === */
                            className={currentPage === 1 ? 'active' : undefined}
                            onClick={() => changeListPage(1)}
                        >
                            <span>1</span>
                        </li>

                        <li
                            /* === Bloc 3 === */
                            className={currentPage === 2 ? 'active' : undefined}
                            onClick={currentPage < 5 || totalPage < 8 ? () => changeListPage(2) : undefined}
                        >
                            <span>
                                {currentPage > 4 && totalPage > 7 ? '...' : '2'}
                            </span>
                        </li>

                        {
                            totalPage > 2
                            &&
                            <li
                                /* === Bloc 4 === */
                                className={currentPage === 3 ? 'active' : undefined}
                                onClick={(currentPage < 5 || totalPage < 8) ? () => changeListPage(3) : (totalPage > 7 && totalPage - currentPage < 4) ? () => changeListPage(totalPage - 4) : () => changeListPage(currentPage - 1)}
                            >
                                <span>
                                    {(currentPage < 5 || totalPage < 8) ? '3' : totalPage - currentPage < 4 ? totalPage - 4 : currentPage - 1}
                                </span>
                            </li>
                        }

                        {
                            totalPage > 3
                            &&
                            <li
                                /* === Bloc 5 === */
                                className={currentPage === 4 || (totalPage > 7 && currentPage > 3 && totalPage - currentPage > 2) ? 'active' : undefined}
                                onClick={(currentPage < 5 || totalPage < 8) ? () => changeListPage(4) : (totalPage > 7 && totalPage - currentPage < 4) ? () => changeListPage(totalPage - 3) : () => changeListPage(currentPage)}
                            >
                                <span>
                                    {(currentPage < 5 || totalPage < 8) ? '4' : totalPage - currentPage < 4 ? totalPage - 3 : currentPage}
                                </span>
                            </li>
                        }

                        {
                            totalPage > 4
                            &&
                            <li
                                /* === Bloc 6 === */
                                className={(currentPage === 5 && totalPage < 8) || (totalPage > 7 && currentPage === totalPage - 2) ? 'active' : undefined}
                                onClick={currentPage < 5 || totalPage < 8 ? () => changeListPage(5) : (totalPage > 7 && totalPage - currentPage < 3) ? () => changeListPage(totalPage - 2) : () => changeListPage(currentPage + 1)}
                            >
                                <span>
                                    {(totalPage < 8 || currentPage < 5) ? '5' : totalPage - currentPage < 4 ? totalPage - 2 : currentPage + 1 }
                                </span>
                            </li>
                        }

                        {
                            totalPage > 5
                            &&
                            <li
                                /* === Bloc 7 === */
                                className={(currentPage === 6 && totalPage < 8) || (totalPage > 7 && currentPage === totalPage - 1) ? 'active' : undefined}
                                onClick={totalPage < 8 ? () => changeListPage(6) : totalPage - currentPage < 4 ? () => changeListPage(totalPage - 1) : undefined}
                            >
                                <span>
                                    { totalPage > 7 ? totalPage - currentPage < 4 ? totalPage - 1 : '...' : '6' }
                                </span>
                            </li>
                        }

                        {
                            totalPage > 6
                            &&
                            /* === Last page === */
                            <li
                                className={currentPage === totalPage ? 'active' : undefined}
                                onClick={() => changeListPage(totalPage)}
                            >
                                <span>{totalPage}</span>
                            </li>
                        }

                        <li
                            /* === Next page === */
                            className={currentPage === totalPage ? 'disabled' : undefined}
                            onClick={currentPage < totalPage ? () => changeListPage(currentPage + 1) : undefined}
                        >
                            <span aria-label='Next'>»</span>
                        </li>

                    </ul>
                </div>
            }
        </Fragment>
    )
}

export default Pagination