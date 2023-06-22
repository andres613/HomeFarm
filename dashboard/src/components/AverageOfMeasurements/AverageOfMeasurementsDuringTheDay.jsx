import { useState, useEffect } from 'react';
import { apiResponse } from "../../utils/httpClient.js"
import { ChartComponent } from "../ChartComponent/ChartComponent.jsx"

export const AverageOfMeasurementsDuringTheDay = ({ measurementsReport }) => {
    let data = [];

    let categoriesAverageOfMeasurements = [];
    let series = [];

    const [averageResponse, setAverageResponse] = useState("");

    useEffect(() => {
        apiResponse(measurementsReport)
            .then(data => {
                setAverageResponse(data);
            })
            .catch(console.error);
    }, [])

    if (averageResponse) {
        categoriesAverageOfMeasurements = averageResponse.variables;

        for (var c in averageResponse.data) {
            data.push(averageResponse.data[c]);
        }

        let item = {};
        item["name"] = "Promedio";
        item["data"] = data;

        series.push(item);

        return (
            <>
                <ChartComponent
                    title="Promedio dia"
                    categories={categoriesAverageOfMeasurements}
                    showCategories={false}
                    dataLabelsAreEnabled={true}
                    isDistributed={true}
                    series={series}
                    type="bar"
                />
            </>
        );
    }
}