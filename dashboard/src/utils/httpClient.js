const baseUrl = 'http://localhost:8080';
let data = "";

export async function login(email, pass) {
    data = `{"id":"id", "name":"name", "phone": "phone", "email":"${email}", "pass":"${pass}"}`; 

    return await fetch(baseUrl + "/login", {
        method: 'POST',
        body: data,
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(apiResponse => apiResponse.json())
        .catch(error => false)
}

export function apiResponse(arg) {
    switch (arg) {
        case "AverageOfMeasurementsDuringTheDay":
            return fetch("/FakeAverageOfMeasurementsDuringTheDay.json")
                .then(apiResponse => apiResponse.json())
                .then(response => {
                    return response;
                })
        case "AverageOfMeasurementsDuringTheMonth":
            return fetch("/FakeAverageOfMeasurementsDuringTheMonth.json")
                .then(apiResponse => apiResponse.json())
                .then(response => {
                    return response;
                })
        default:
            return fetch("/FakeApiMonitor.json")
                .then(apiResponse => apiResponse.json())
                .then(response => {
                    return response;
                })
    }
}
