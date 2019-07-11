import React, { Component } from 'react';
import axios from 'axios';
import Pagination from '../../services/paginationJS';
// import Pagination from '../paginationDRF'; // <-- if pagination DRF
import { getTokenCookie } from '../../services/tokenCookie';
import urlApi from '../../services/httpService';


class DnaFilesLists extends Component {
    state = {
        dnaFiles: [],
        dnaFilesToUpload: [],
        itemsPerPage: 10,
        currentPage: 1,
        totalItems: 0,
    }

    // Get DNA files list:
    componentDidMount() {
        axios.defaults.headers.common['Authorization'] = 'Token ' + getTokenCookie();
        axios.get(urlApi + 'dnaFileForUniqueParents/' + this.props.parentsId + '/')
            .then(response => {
                console.log('getDnaFilesList: /dnaFileForUniqueParents/', response);
                this.setState({
                    dnaFiles: response.data,
                    totalItems: response.data.length,
                })
            })
            .catch(error => {
                console.log('getDnaFilesList-error: /dnaFileForUniqueParents/', error.response);
            });
    }

    formatUploadDate(date) {
        const uploadDate = new Date(date);
        const months = ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const formatted_date = uploadDate.getDate() + ' ' + months[uploadDate.getMonth()] + ' ' + uploadDate.getFullYear();
        return formatted_date;
    }

    addDnaFileToUpload = e => {
        console.log(e.target.files[0]);
        if (e.target.files[0] !== undefined) {
            const dnaFilesToUpload =  this.state.dnaFilesToUpload.concat(e.target.files[0]);
            console.log('addDnaFileToUpload', dnaFilesToUpload);
            this.setState({ dnaFilesToUpload });
        }
    }

    removeDnaFileToUpload = e => {
        console.log('removeDnaFileToUpload', e.target.id);
        const dnaFilesToUpload = this.state.dnaFilesToUpload.filter(function(dnaFile) { return dnaFile.name !== e.target.id });
        console.log('dnaFilesToUpload', dnaFilesToUpload);
        this.setState({ dnaFilesToUpload });
    }

    uploadDnaFiles = () => {
        const dnaFilesToUpload = this.state.dnaFilesToUpload;
        const url = urlApi + 'uploadDnaFiles/';
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        dnaFilesToUpload.map(async dnaFile => {
            const formData = new FormData();
            formData.append('dna_file', dnaFile);
            formData.append('parents_id', this.props.parentsId);
            formData.append('name', dnaFile.name);

            axios.post(url, formData, config)
                .then(() => {
                    const addedDnaFile = {
                        dna_file: dnaFile.name,
                        status: 'uploaded',
                        upload_date: this.formatUploadDate(Date.now())
                    };
                    this.setState(previousState => ({
                        dnaFiles: [addedDnaFile, ...previousState.dnaFiles]
                    }));
                    const newDnaFilesToUpload = this.state.dnaFilesToUpload.filter(function(dnaFile) {
                        return dnaFile.name !== addedDnaFile.dna_file
                    });
                    this.setState({ dnaFilesToUpload: newDnaFilesToUpload });
                    console.log('Done',);
                })
                .catch(error => {
                    console.log('error: ', error);
                    console.log('error.response: ', error.response);
                });
        });
    }

    changeListPage = newPage => {
        this.setState({ currentPage: newPage });
        console.log(newPage);
    }


    render() {
        const dnaFilesCount = this.state.dnaFiles.length;
        const dnaFilesToUploadCount = this.state.dnaFilesToUpload.length;

        return (

            <section className='list-dna-files'>

                <hr />

                {
                    dnaFilesCount > 0
                    &&
                    <React.Fragment>
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
                                {this.state.dnaFiles.map((dnaFile, i) =>
                                    ((i + 1) > ((this.state.currentPage - 1) * this.state.itemsPerPage) && (i) < (this.state.currentPage * this.state.itemsPerPage))
                                    &&
                                    <tr key={'dnaFile' + i}>
                                        <td className='dna-file'>{dnaFile.name}</td>
                                        <td className={'status '+ dnaFile.status}>{dnaFile.status}</td>
                                        <td className='date'>{this.formatUploadDate(dnaFile.upload_date)}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        {/* <Pagination // <-- if pagination DRF
                            urlApiList={urlApi + 'dnaFileForUniqueParents/' + this.props.parentsId + '/'}
                            urlGui={'http://localhost:3000/parents/detail/' + this.props.parentsId + '/'}
                            elementsPerPage={10}
                        /> */}

                        <Pagination // <-- if pagination via javascript
                            itemsPerPage={this.state.itemsPerPage}
                            currentPage={this.state.currentPage}
                            totalItems={this.state.totalItems}
                            changeListPage={this.changeListPage}
                        />

                        <hr />
                    </React.Fragment>
                }

                <h2>Upload {dnaFilesCount > 0 && 'additional '}DNA files:</h2>

                <h3>New DNA file{dnaFilesToUploadCount > 1 && 's (' + dnaFilesToUploadCount + ' files)'}:</h3>
                <ul className='to-upload-files'>
                    {
                        dnaFilesToUploadCount > 0
                        ?
                            this.state.dnaFilesToUpload.map((dnaFile, i) =>
                                <li key={'newDnaFile' + i}>
                                    <div>
                                        <label>File name:</label>
                                        <span>{dnaFile.name}</span>
                                        <div
                                            className='btn btn-x-small btn-danger no-margin'
                                            id={dnaFile.name}
                                            onClick={e => this.removeDnaFileToUpload(e)}
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
                        onChange={this.addDnaFileToUpload}
                        accept='.dna'
                        id='input-dna-file'
                        className='d-none'
                    />
                </label>

                {
                    dnaFilesToUploadCount > 0
                    &&
                    <div className='btn btn-primary w-100' onClick={this.uploadDnaFiles}>
                        Upload & Analyze DNA file{dnaFilesToUploadCount > 1 && 's'}
                    </div>
                }

            </section>

        );
    }
}
 
export default DnaFilesLists;