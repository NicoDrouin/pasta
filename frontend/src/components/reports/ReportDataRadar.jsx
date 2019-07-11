import React from 'react';


const ReportDataRadar = ({ displayedReportName, report }) => {

    const radarRadix = 6;
    const radarChartSize = 500;
    const radarChartBorderHorizontal = 75;
    const radarChartBorderVertical = 50;

    const radarChartTotalWidth = radarChartSize + (radarChartBorderHorizontal * 2);
    const radarChartTotalHeight = radarChartSize + (radarChartBorderVertical * 2);
    const radarChartCenterHorizontal = radarChartTotalWidth / 2;
    const radarChartCenterVertical = radarChartTotalHeight / 2;

    const radarChartRadix = radarRadix + 1;
    const radarChartRadiusRadix = radarChartSize / 2 / radarChartRadix;

    const elementsCount = report.length;
    const degreeRotation = 360 / elementsCount;
    let degree = 180;

    const pgs = (report.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0) / elementsCount).toFixed(2).replace(/[.,]00$/, '');

    const radarPathsFrames = () => {
        let pathsFrames = report.map((pathFrameCoordinates, i) =>
            <path
                key={i + 'frame'}
                d={
                    'M' + radarChartCenterHorizontal + ' ' + radarChartCenterVertical + ' ' +
                    (radarChartTotalWidth - Math.floor(radarChartCenterHorizontal + ((radarChartSize / 2) * Math.sin( (degree + i * degreeRotation) / (180 / Math.PI))))) + ' ' +
                    (Math.floor(radarChartCenterVertical + ((radarChartSize / 2) * Math.cos( (degree + i * degreeRotation) / (180 / Math.PI))))) +
                    'z'
                }
            >
            </path>
        )
        return pathsFrames;
    }

    const radarPathRadius = () => {
        const radarPathsRadius = [];
        if (report.length > 0) {
            for (let radiusUnit = 1; radiusUnit < radarChartRadix + 1; radiusUnit++) {

                let radarPathRadius = '';
                let radarPathRadiusCoordinates = [];

                // eslint-disable-next-line no-loop-func
                radarPathRadiusCoordinates = report.map((radarPathRadius, i) =>
                    (radarChartTotalWidth - Math.floor((radarChartCenterHorizontal + ( radiusUnit * radarChartRadiusRadix * Math.sin( (degree + (degreeRotation * i)) / (180 / Math.PI)))) * 100000 ) / 100000) + ' ' +
                    Math.floor((radarChartCenterVertical + ( radiusUnit * radarChartRadiusRadix * Math.cos( (degree + (degreeRotation * i)) / (180 / Math.PI)))) * 100000 ) / 100000 +
                    (i + 1 === elementsCount ? 'z' : ' ')
                );
                radarPathRadius =
                    <path
                        key={radiusUnit + 'radiusUnit'}
                        d={'M' + radarPathRadiusCoordinates}
                    >
                    </path>;
                radarPathsRadius.push(radarPathRadius);
            }
            return radarPathsRadius;
        }
    }

    const radarPaths = () => {
        let pathCoordinates = '';
        if (report.length > 0) {
            for(let i = 0; i < elementsCount; i++) {
                pathCoordinates +=
                    (degree === 180 ? 'M' : ' ') +
                    (radarChartTotalWidth - Math.floor((radarChartCenterHorizontal + ( (radarChartRadiusRadix * (report[i].value + 1)) * Math.sin( degree / (180 / Math.PI)))) * 100000 ) / 100000) + ' ' +
                    Math.floor((radarChartCenterVertical + ( (radarChartRadiusRadix * (report[i].value + 1)) * Math.cos( degree / (180 / Math.PI)))) * 100000 ) / 100000;
                    degree += degreeRotation;
            }
        } else {
            pathCoordinates = 'M0 0z';
        }
        return pathCoordinates;
    }

    const radarLegends = () => {
        let degree = 180;
        let radarLegends = report.map((radarElement, i) =>
            <div
                key={i + 'radarLegends'}
                style={{
                    left: (radarChartTotalWidth - Math.floor(radarChartCenterHorizontal + ((radarChartSize / 2) * Math.sin( (degree + i * degreeRotation) / (180 / Math.PI))))),
                    top: (Math.floor(radarChartCenterVertical + ((radarChartSize / 2) * Math.cos( (degree + i * degreeRotation) / (180 / Math.PI))))),
                    transform: `translate(${radarLegendDisplacement(degree + (i * degreeRotation))}%)`
                }}
            >
                {radarElement.lib === '' ? 'Unsetted' : radarElement.lib}
            </div>
        )
        return radarLegends;
    }

    const radarLegendDisplacement = (degreeLegend) => {
        let degree = degreeLegend - 180;
        let radarHorizontalLegendDisplacement, radarVerticalLegendDisplacement = 0;
        if (degree === 0) {
            radarHorizontalLegendDisplacement = -50;
            radarVerticalLegendDisplacement = -100;
        } else if (degree < 90) {
            radarHorizontalLegendDisplacement = 0;
            radarVerticalLegendDisplacement = -100 + ((50 / 90) * degree);
        } else if (degree < 180) {
            radarHorizontalLegendDisplacement = 0;
            radarVerticalLegendDisplacement = -50 + ((50 / 90) * (degree - 90));
        } else if (degree === 180) {
            radarHorizontalLegendDisplacement = -50;
            radarVerticalLegendDisplacement = 0;
        } else if (degree < 270) {
            radarHorizontalLegendDisplacement = -100;
            radarVerticalLegendDisplacement = ((-50 / 90) * (degree - 180));
        } else {
            radarHorizontalLegendDisplacement = -100;
            radarVerticalLegendDisplacement = -50 - ((50 / 90) * (degree - 270));
        }
        return radarHorizontalLegendDisplacement + '%,' + radarVerticalLegendDisplacement;
    }

    return (
        <div className='report-data'>
            <div className='container'>

                <h2 className='text-center'>{displayedReportName.replace(/.dna$/, '')}</h2>

                <div className='report-visual-table'>
                    <div className='report-visual radar-container' style={{display: elementsCount < 3 && 'none'}}>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width={radarChartTotalWidth}
                            height={radarChartTotalHeight}
                            viewBox={'0 0 ' + radarChartTotalWidth + ' ' + radarChartTotalHeight}
                            id='radar-chart'
                        >
                            <g id='radar-paths-frames' stroke='white' strokeOpacity='0.2' strokeWidth='1' strokeDasharray='3'>
                                {radarPathsFrames()}
                            </g>
                            <g id='radar-paths-radius' fill='none' stroke='white' strokeOpacity='0.6' strokeWidth='1.7'>
                                {radarPathRadius()}
                            </g>
                            <path id='radar-path' fill='#bbe7f1' fillOpacity='0.85' stroke='white' strokeWidth='2' strokeLinejoin='round' d={radarPaths() + 'z'}/>
                        </svg>
                        {radarLegends()}
                    </div>

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
                </div>

            </div>
        </div>
    );
}
 
export default ReportDataRadar;