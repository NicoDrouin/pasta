import React from 'react'
import PropTypes from 'prop-types'


const ReportTable = ({ report }) => {

    const pgs = (report.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0) / report.length).toFixed(2).replace(/[.,]00$/, '')

    return (
        <div className='report-table text-center'>
            <div>Polygenic Score: {pgs}</div>
            {report.map((reportCharacteristic, i) =>
                <div key={i + 'reportCharacteristic'}>
                    <div>
                        {reportCharacteristic.lib}
                    </div>
                    <div className={'note-' + reportCharacteristic.value}>
                        {reportCharacteristic.value}
                    </div>
                </div>
            )}
        </div>
    )
}


ReportTable.propTypes = {
    report: PropTypes.array.isRequired,
}


export default ReportTable