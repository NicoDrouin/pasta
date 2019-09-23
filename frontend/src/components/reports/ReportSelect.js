import React from 'react'
import PropTypes from 'prop-types'


const ReportSelect = ({ displayedReportName, onChangeEmbryo, reports }) => {

    return (
        <div className='report-input'>
            <div className='container'>
                <label>Select an embryo:</label>
                <select value={displayedReportName} onChange={onChangeEmbryo}>
                    {
                        reports.map((report, i) =>
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
    )
}


ReportSelect.propTypes = {
    displayedReportName: PropTypes.string.isRequired,
    onChangeEmbryo: PropTypes.func.isRequired,
    reports: PropTypes.array.isRequired,
}


export default ReportSelect