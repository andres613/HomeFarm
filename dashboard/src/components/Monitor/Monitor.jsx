import { useState, useEffect } from 'react';
import { apiResponse } from "../../utils/httpClient.js"
import { HalfCircleMonitor } from '../HalfCircleMonitor/HalfCircleMonitor.jsx';
import styles from './Monitor.module.css'

export const Monitor = () => {
    const [response, setResponse] = useState("");

    useEffect(() => {
        apiResponse()
            .then(data => {
                setResponse(data);
            })
            .catch(console.error);;
    }, [])

    if (response[0]) {
        return (
            <>
                {
                    response.map(
                        m => (
                            <div key={Object.keys(m.lecture)[0]} className={styles.monitor}>
                                <span className={styles.monitorTitle}>{m.englishTitle}</span>
                                <HalfCircleMonitor
                                    sensorMeasurementValue={Object.values(m.lecture)[0]}
                                    unitOfMeasurement={Object.values(m.lecture)[1]}
                                    environmentVariableName={Object.keys(m.lecture)[0]}
                                />
                            </div>
                        )
                    )
                }
            </>
        );
    }
}