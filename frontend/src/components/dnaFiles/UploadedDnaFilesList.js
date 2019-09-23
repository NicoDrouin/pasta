import React, { Fragment } from 'react'
import PropTypes from 'prop-types'


const UploadedDnaFilesList = ({ dnaFilesCount, dnaFiles, currentPage, itemsPerPage, formatUploadDate }) => {

    return (
        <Fragment>
            <h2>Uploaded DNA file{dnaFilesCount > 1 && 's (' + dnaFilesCount + ' files)'}:</h2>
            <table className='uploaded-files'>
                <thead>
                    <tr>
                        <th>File name</th>
                        <th>Status</th>
                        <th>Upload date</th>
                    </tr>
                </thead>
                <tbody className='listToPaginate'>
                    {dnaFiles.map((dnaFile, i) =>
                        ((i + 1) > ((currentPage - 1) * itemsPerPage) && (i) < (currentPage * itemsPerPage))
                        &&
                        <tr key={'dnaFile' + i}>
                            <td className='dna-file'>{dnaFile.name}</td>
                            <td className={'status '+ dnaFile.status}>{dnaFile.status}</td>
                            <td className='date'>{formatUploadDate(dnaFile.upload_date)}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </Fragment>
    )
}


UploadedDnaFilesList.propTypes = {
    dnaFilesCount: PropTypes.number.isRequired,
    dnaFiles: PropTypes.array.isRequired,
    currentPage: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    formatUploadDate: PropTypes.func.isRequired
}


export default UploadedDnaFilesList