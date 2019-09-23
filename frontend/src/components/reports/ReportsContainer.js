import React, { useState, useEffect } from 'react'
import axios from 'axios'
import urlApi from '../../services/httpService'

import ReportRadar from './ReportRadar'
import ReportSelect from './ReportSelect'
import ReportTable from './ReportTable'


const ReportsContainer = props => {
    const [reports, setReports] = useState([])
    const [displayedReport, setDisplayedReport] = useState([])
    const [displayedReportName, setDisplayedReportName] = useState('')

    useEffect(() => {
        const parentsPrivateURL = props.match.params.private_url
        console.log('Report-cdm - parents UUID: ', parentsPrivateURL)
        axios.get(urlApi + 'report/' + parentsPrivateURL + '/')
            .then(response => {
                console.log('response.data.file_for_parent: ', response.data.file_for_parent)
                const defaultReport = response.data.file_for_parent[0]
                printReport(defaultReport)
                setReports(response.data.file_for_parent)
            })
            .catch(error => {
                console.log('report: parentsPrivateURL', error.response)
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] )

    function onChangeEmbryo(e) {
        const reportToDisplay = reports.find(function(report) {
            return report.name === e.target.value })
        printReport(reportToDisplay)
    }

    function printReport(reportToDisplay) {
        const displayedReportArray = Object.keys(reportToDisplay)
            .map(key => ({ 'lib': key, 'value': reportToDisplay[key] }))
        console.log('displayedReportArray', displayedReportArray)
        const displayedReportName = displayedReportArray.shift().value // <-- isolate name in the report
        console.log('displayedReportName', displayedReportName)
        setDisplayedReport(displayedReportArray)
        setDisplayedReportName(displayedReportName)
    }


    return (
        <main className='report'>
            <ReportSelect
                displayedReportName={displayedReportName}
                onChangeEmbryo={onChangeEmbryo}
                reports={reports}
            />
            <div className='report-data'>
                <div className='container'>
                    <h2 className='text-center'>{displayedReportName.replace(/.dna$/, '')}</h2>
                    <div className='report-visual-table'>
                        <ReportRadar report={displayedReport} />
                        <ReportTable report={displayedReport} />
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ReportsContainer