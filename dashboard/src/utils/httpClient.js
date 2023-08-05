const baseUrl = 'http://localhost:8080';
let data = "";
let get_api_response = [];

export async function login(email, pass) {
    return await fetch("./FakeApiLogin.json")
        .then(apiResponse => apiResponse.json())
        .then(response => {
            for (let i = 0; i < response.length; i++) {
                if (email === response[i].email && pass === response[i].password) {
                    return {data: response[i]};
                }
            }
            return {data: false};
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


export async function reports(request) {
    let initialDateParsed = Date.parse(request.initialDate);
    let finalDateParsed = Date.parse(request.finalDate);
    let response = {};
    let dataResponse = await getDataResponse();
    dataResponse.data = getDataDependingRequest(initialDateParsed, finalDateParsed, dataResponse.data);

    response["items"] = Object.keys(dataResponse.data).length;
    response["itemsPerPage"] = request.itemsPerPage;
    response["pages"] = getNumberPages(response["items"], request.itemsPerPage);
    response["pageNumber"] = request.currentPage;
    response["variables"] = [dataResponse.variables];
    response["data"] = getDataToTable(dataResponse.data, request.itemsPerPage, request.currentPage);

    return response;
}

const getDataResponse = async () => {
    return await fetch("/FakeAPIResponseToRetort.json")
        .then(apiResponse => apiResponse.json())
        .then(response => response);
}

const getDataDependingRequest = (initialDate, finalDate, data) => {
    let temporalData = [];
    let temporalDate = '';

    Object.keys(data).map(d => {
        temporalDate = Date.parse(data[d].date);
        
        if(temporalDate >= initialDate && temporalDate <= finalDate)
            temporalData.push(data[d]);
    })

    return temporalData;
}

const getNumberPages = (dataLength, itemsPerPage) => {
    let pages = []
    if(dataLength % itemsPerPage === 0){
        if(dataLength / itemsPerPage > 0) {
            for(let i=1; i < Math.trunc(dataLength/itemsPerPage)+1; i++){
                pages.push(i)
            }
        } else {
            pages.push(1)
        }
    } else {
        for(let i=1; i <= Math.trunc(dataLength/itemsPerPage)+1; i++){
            pages.push(i)
        }
    }

    return pages
}

const getDataToTable = (dataResponse, itemsPerPage, numberPageToShow) => {
    itemsPerPage = parseInt(itemsPerPage);
    numberPageToShow = parseInt(numberPageToShow);

    let data = {};
    let i = itemsPerPage * (numberPageToShow - 1);
    let j = i + itemsPerPage;

    for (i; i < j; i++) {
        if(dataResponse[Object.keys(dataResponse)[i]])
            data[Object.keys(dataResponse)[i]] = dataResponse[Object.keys(dataResponse)[i]];
    }

    return data;
}


export const userHandler = async (isAdmin, option, user, oldUser) => {
    let response;

    if(!isAdmin) {
        response = await login(user.email, user.password);
        return response;
    }

    switch (option) {
        case 'send':
            return {data: "newUser: " + JSON.stringify(user) + " saved!"};

        case 'search':
            response = await getUser(user.id);
            return response;

        case 'update':
            if (!window.confirm(`Desea ACTUALIZAR el usuario identificado como ${oldUser.id}`))
                return {data: 'Procedimiento cancelado por el usuario'};

            return {
                data: 
                "User: " + JSON.stringify(oldUser) + 
                " updated to " + JSON.stringify(user)
            };

        case 'delete':
            if (!window.confirm(`Realmente desea ELIMINAR el usuario identificado como ${user.id}`))
                return {data: 'Procedimiento cancelado por el usuario'};

            return {data: "User: " + JSON.stringify(user) + " deleted!"};
    }    
}

export async function getUser(id) {
    return await fetch("./FakeApiLogin.json")
        .then(apiResponse => apiResponse.json())
        .then(response => {
            for (let i = 0; i < response.length; i++) {
                if (id === response[i].id.toString()) {
                    return {data: response[i]};
                }
            }

            return {data: false};
        });
}
