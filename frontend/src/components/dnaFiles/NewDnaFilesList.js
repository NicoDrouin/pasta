import React, { Fragment } from 'react'
import axios from 'axios'
import urlApi from '../../services/httpService'
import PropTypes from 'prop-types'


const NewDnaFilesList = props => {

    const dnaFilesToUploadCount = props.dnaFilesToUpload.length

    function addDnaFileToUpload(e) {
        if (e.target.files[0] !== undefined) {
            const newDnaFilesToUpload =  props.dnaFilesToUpload.concat(e.target.files[0])
            props.setDnaFilesToUpload( newDnaFilesToUpload )
        }
    }

    function removeDnaFileToUpload(e) {
        const newDnaFilesToUpload = props.dnaFilesToUpload.filter(function(dnaFile) {
            return dnaFile.name !== e.target.id })
        props.setDnaFilesToUpload( newDnaFilesToUpload )
    }

    function uploadDnaFiles() {
        const url = urlApi + 'uploadDnaFiles/'
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        props.dnaFilesToUpload.map(async dnaFile => {
            const formData = new FormData()
            formData.append('dna_file', dnaFile)
            formData.append('parents_id', props.parentsId)
            formData.append('name', dnaFile.name)

            axios.post(url, formData, config)
                .then(() => {
                    const addedDnaFile = {
                        dna_file: dnaFile.name,
                        status: 'uploaded',
                        upload_date:  props.formatUploadDate(Date.now())
                    }
                    props.setDnaFiles([addedDnaFile, ...props.dnaFiles])
                    const newDnaFilesToUpload = props.dnaFilesToUpload.filter(function(dnaFile) {
                        return dnaFile.name !== addedDnaFile.dna_file
                    })
                    props.setDnaFilesToUpload(newDnaFilesToUpload)
                })
                .catch(error => {
                    console.log('error.response: ', error.response)
                })
        })
    }

    return (
        <Fragment>
            <h2>Upload {props.dnaFilesCount > 0 && 'additional '}DNA files:</h2>

            <h3>New DNA file{dnaFilesToUploadCount > 1 && 's (' + dnaFilesToUploadCount + ' files)'}:</h3>
            <ul className='to-upload-files'>
                {
                    dnaFilesToUploadCount > 0
                    ?
                    props.dnaFilesToUpload.map((dnaFile, i) =>
                        <li key={'newDnaFile' + i}>
                            <div>
                                <label>File name:</label>
                                <span>{dnaFile.name}</span>
                                <div
                                    className='btn btn-x-small btn-danger no-margin'
                                    id={dnaFile.name}
                                    onClick={e => removeDnaFileToUpload(e)}
                                >
                                    Remove
                                </div>
                            </div>
                        </li>
                    )
                    :
                    <li className='no-before'>
                        This list is empty. It contains the DNA files that you want to upload for analyze.
                    </li>
                }
            </ul> 

            <label className='btn btn-success btn-big' htmlFor='input-dna-file'>
                Add { dnaFilesToUploadCount > 0 && 'more' } DNA files to the upload list
                <input
                    type='file'
                    onChange={addDnaFileToUpload}
                    accept='.dna'
                    id='input-dna-file'
                    className='d-none'
                />
            </label>

            {
                dnaFilesToUploadCount > 0
                &&
                <div className='btn btn-primary w-100' onClick={uploadDnaFiles}>
                    Upload & Analyze DNA file{dnaFilesToUploadCount > 1 && 's'}
                </div>
            }
        </Fragment>
    )
}


NewDnaFilesList.propTypes = {
    dnaFilesCount: PropTypes.number.isRequired,
    dnaFilesToUpload: PropTypes.array.isRequired,
    setDnaFilesToUpload: PropTypes.func.isRequired,
    dnaFiles: PropTypes.array.isRequired,
    setDnaFiles: PropTypes.func.isRequired,
    formatUploadDate: PropTypes.func.isRequired,
    parentsId: PropTypes.string.isRequired,
    addDnaFileToUpload: PropTypes.func,
    removeDnaFileToUpload: PropTypes.func,
    uploadDnaFiles: PropTypes.func
}

 
export default NewDnaFilesList