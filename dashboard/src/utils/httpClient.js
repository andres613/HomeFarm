export async function login(email, pass) {
    return await fetch("./FakeApiLogin.json")
        .then(apiResponse => apiResponse.json())
        .then(response => {
            for (let i = 0; i < response.length; i++) {
                if (email === response[i].email && pass === response[i].password) {
                    return response[i];
                }
            }
            return false;
        });
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
            return fetch("/fake_api_monitor.json")
                .then(apiResponse => apiResponse.json())
                .then(response => {
                    return response;
                })
    }
}