import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import Pagination from '../../services/paginationJS'
// import Pagination from '../paginationDRF' // <-- if pagination DRF
import { getTokenCookie } from '../../services/tokenCookie'
import urlApi from '../../services/httpService'
import PropTypes from 'prop-types'

import NewDnaFilesList from './NewDnaFilesList'
import UploadedDnaFilesList from './UploadedDnaFilesList'


const DnaFilesLists = props => {

    const [dnaFiles, setDnaFiles] = useState([])
    const [dnaFilesToUpload, setDnaFilesToUpload] = useState([])
    const [itemsPerPage] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalItems, setTotalItems] = useState(0)

    // Get DNA files list:
    useEffect(() => {
        axios.defaults.headers.common['Authorization'] = 'Token ' + getTokenCookie()
        axios.get(urlApi + 'dnaFileForUniqueParents/' + props.parentsId + '/')
            .then(response => {
                setDnaFiles(response.data)
                setTotalItems(response.data.length)
            })
            .catch(error => {
                console.log('getDnaFilesList-error: /dnaFileForUniqueParents/', error.response)
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] )

    function formatUploadDate(date) {
        const uploadDate = new Date(date)
        const months = ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const formatted_date = uploadDate.getDate() + ' ' + months[uploadDate.getMonth()] + ' ' + uploadDate.getFullYear()
        return formatted_date
    }

    const dnaFilesCount = dnaFiles.length


    return (
        <section className='list-dna-files'>
            <hr />
            {
                dnaFilesCount > 0
                &&
                <Fragment>
                    <UploadedDnaFilesList
                        dnaFilesCount={dnaFilesCount}
                        dnaFiles={dnaFiles}
                        currentPage={currentPage}
                        itemsPerPage={itemsPerPage}
                        formatUploadDate={formatUploadDate}
                    />
                    {/* <Pagination // <-- if pagination DRF
                        urlApiList={urlApi + 'dnaFileForUniqueParents/' + props.parentsId + '/'}
                        urlGui={'http://localhost:3000/parents/detail/' + props.parentsId + '/'}
                        elementsPerPage={10}
                    /> */}
                    <Pagination // <-- if pagination via javascript
                        itemsPerPage={itemsPerPage}
                        currentPage={currentPage}
                        totalItems={totalItems}
                        changeListPage={setCurrentPage}
                    />
                    <hr />
                </Fragment>
            }
            <NewDnaFilesList
                dnaFilesCount={dnaFilesCount}
                dnaFilesToUpload={dnaFilesToUpload}
                setDnaFilesToUpload={setDnaFilesToUpload}
                dnaFiles={dnaFiles}
                setDnaFiles={setDnaFiles}
                formatUploadDate={formatUploadDate}
                parentsId={props.parentsId}
            />
         </section>
    )
}


DnaFilesLists.propTypes = {
    dnaFiles: PropTypes.array,
    dnaFilesToUpload: PropTypes.array,
    itemsPerPage: PropTypes.number,
    currentPage: PropTypes.number,
    totalItems: PropTypes.number,
    formatUploadDate: PropTypes.func
}


export default DnaFilesLists