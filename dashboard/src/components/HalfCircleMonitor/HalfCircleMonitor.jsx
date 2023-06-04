import styles from './HalfCircleMonitor.module.css'

let value = 0;

export const HalfCircleMonitor = ({ sensorMeasurementValue, unitOfMeasurement, environmentVariableName }) => {
    let clockSetting = 1;

    const monitorStyle = {
        transform: (function () {
            if(environmentVariableName == 'lightIntensity') clockSetting = 10;
            if(environmentVariableName == 'ph') clockSetting = (1/5);

            value = sensorMeasurementValue / clockSetting * 2 + 135;
            return `rotate(${value}deg)`
        })()
    };

    let colorClasses = {
        'temperature': styles.blue,
        'lightIntensity': styles.yellow,
        'ph': styles.purple,
        'oxygenation': styles.green,
        'transparency': styles.lightblue,
        'alkalinity': styles.red
    };

    const colorClass = colorClasses[environmentVariableName];

    return (
        <>
            <div className={styles.circle}>
                <p>
                    <span style={monitorStyle} className={`${styles.span} ${colorClass}`}></span>
                    <small id='small' className={styles.small}>
                        <span className={styles.sensorMeasurementValue}>{sensorMeasurementValue}</span>
                        <br />
                        <span className={styles.unitOfMeasurement}>{unitOfMeasurement}</span>
                    </small>
                </p>
            </div>
        </>
    );
}