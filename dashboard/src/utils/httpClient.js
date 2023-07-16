const baseUrl = 'http://localhost:8080';
let data = "";

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
    
    // data = `{"id":"id", "name":"name", "phone": "phone", "email":"${email}", "pass":"${pass}"}`; 

    // return await fetch(baseUrl + "/login", {
    //     method: 'POST',
    //     body: data,
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // })
    //     .then(apiResponse => apiResponse.json())
    //     .catch(error => false)
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
