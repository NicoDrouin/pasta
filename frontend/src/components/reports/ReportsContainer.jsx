import React, { Component } from 'react';
import axios from 'axios';
import urlApi from '../../services/httpService';

import ReportDataRadar from './ReportDataRadar'


class ReportsContainer extends Component {
    state = {
        reports: [],
        displayedReport: [],
        displayedReportName: '',
    }

    componentDidMount() {
        const parentsPrivateURL = this.props.match.params.private_url;
        console.log('Report-cdm - parents UUID: ', parentsPrivateURL);
        axios.get(urlApi + 'report/' + parentsPrivateURL + '/')
            .then(response => {
                console.log('report: parentsPrivateURL', response);
                const displayedReport = response.data.file_for_parent[0];
                console.log('displayedReport', displayedReport);
                this.updateReport(displayedReport);
                this.setState({
                    reports: response.data.file_for_parent,
                });
            })
            .catch(error => {
                console.log('report: parentsPrivateURL', error.response);
            });
    }

    onChangeEmbryo = e => {
        console.log('this.state.displayedReport', this.state.displayedReport);
        const displayedReport = this.state.reports.find(function(report) { return report.name === e.target.value });
        this.updateReport(displayedReport);
    }

    updateReport(displayedReport) {
        const displayedReportArray = Object.keys(displayedReport).map(key => ({ 'lib': key, 'value': displayedReport[key] }));
        console.log('displayedReportArray', displayedReportArray);
        const displayedReportName = displayedReportArray.shift().value; // <-- isolate name in the report
        console.log('displayedReportName', displayedReportName);
        this.setState({
            displayedReport: displayedReportArray,
            displayedReportName,
        });
    }


    render() { 
        return (
            <main className='report'>
                <div className='report-input'>
                    <div className='container'>
                        <label>Select an embryo:</label>
                        <select value={this.state.displayedReportName} onChange={this.onChangeEmbryo}>
                            {
                                this.state.reports.map((report, i) =>
                                    <option
                                        key={i + 'report'}
                                        value={report.name}
                                    >
                                        {report.name.replace(/.dna$/, '')}
                                    </option>
                                )
                            }
                        </select>
                    </div>
                </div>
                    <ReportDataRadar
                        displayedReportName={this.state.displayedReportName}
                        report={this.state.displayedReport}
                    />
            </main>
        );
    }
}
 
export default ReportsContainer;