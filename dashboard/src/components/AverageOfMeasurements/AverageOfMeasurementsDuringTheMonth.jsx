import { useState, useEffect } from 'react';
import { apiResponse } from "../../utils/httpClient.js"
import { ChartComponent } from "../ChartComponent/ChartComponent.jsx"

export const AverageOfMeasurementsDuringTheMonth = ({ measurementsReport }) => {
    let data = {};

    let categoriesAverageOfMeasurements = [];
    let temperature = [];
    let lightIntensity = [];
    let ph = [];
    let transparency = [];
    let oxygenation = [];
    let alkalinity = [];

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
        for (var c in averageResponse.data) {
            categoriesAverageOfMeasurements.push(c);
            temperature.push(averageResponse.data[c].temperature);
            lightIntensity.push(averageResponse.data[c].lightIntensity);
            ph.push(averageResponse.data[c].ph);
            transparency.push(averageResponse.data[c].transparency);
            oxygenation.push(averageResponse.data[c].oxygenation);
            alkalinity.push(averageResponse.data[c].alkalinity);
        }

        data["temperature"] = temperature;
        data["lightIntensity"] = lightIntensity;
        data["ph"] = ph;
        data["transparency"] = transparency;
        data["oxygenation"] = oxygenation;
        data["alkalinity"] = alkalinity;

        let numberOfVariables = averageResponse.variables.length;
        for (let i = 0; i < numberOfVariables; i++) {
            let item = {};
            item["name"] = averageResponse.variables[i];
            item["data"] = data[Object.keys(data)[i]];

            series.push(item);
        }

        return (
            <>
                <ChartComponent
                    title="Promedio por medición últimos 15 días"
                    categories={categoriesAverageOfMeasurements}
                    showCategories={true}
                    dataLabelsAreEnabled={false}
                    isDistributed={false}
                    series={series}
                    type="bar"
                />
            </>
        );
    }
}
