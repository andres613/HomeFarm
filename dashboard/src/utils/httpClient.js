const baseUrl = 'http://localhost:8080';
let requestData = "";

export const userHandler = async (isAdmin, option, temporalUser, oldUser) => {
    let response;

    if(!isAdmin) {
        response = await login(temporalUser.email, temporalUser.password);
        return response;
    }

    switch (option) {
        case 'send':
            return signin(temporalUser);

        case 'search':
            response = await getUser(temporalUser.document);
            return response;

        case 'update':
            if (!window.confirm(`Desea ACTUALIZAR el usuario identificado como ${temporalUser.document}`))
                return {data: 'Procedimiento cancelado por el usuario'};

            response = await updateUser(temporalUser);

            return {
                data: 
                "User: " + JSON.stringify(oldUser) + 
                " updated to " + JSON.stringify(temporalUser)
            };

        case 'delete':
            if (!window.confirm(`Realmente desea ELIMINAR el usuario identificado como ${temporalUser.document}`))
                return {data: 'Procedimiento cancelado por el usuario'};

            return deleteUser(temporalUser);
    }    
}


const signin = async temporalUser => {
    return await fetch(baseUrl + "/user/create", {
        method: 'POST',
        body: JSON.stringify(temporalUser),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(apiResponse => apiResponse.json())
        .then(apiResponse => {
            return {data: apiResponse}
        })
        .catch(error => {
            console.error(error)
            return false;
        })
}


export const login = async (email, pass) => {
    requestData = `{"document":"000000", "name":"name", "phone":"0000000000", "email":"${email}", "password":"${pass}"}`; 

    return await fetch(baseUrl + "/user/login", {
        method: 'POST',
        body: requestData,
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(apiResponse => apiResponse.json())
        .then(apiResponse => {
            return {data: apiResponse}
        })
        .catch(error => {
            console.error(error)
            return false;
        })
}


export const getUser = async userId => {
    requestData = `{"id":0, "document":"${userId}", "name":"name", "phone":"0000000000", "email":"a@a.com", "password":"0000"}`;

    return await fetch(baseUrl + "/user/read", {
        method: 'POST',
        body: requestData,
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(apiResponse => apiResponse.json())
        .then(apiResponse => {
            return {data: apiResponse}
        })
        .catch(error => {
            console.error(error)
            return false;
        })
}


export const updateUser = async temporalUser => {
    return await fetch(baseUrl + `/user/update?id=${temporalUser.id}`, {
        method: 'PUT',
        body: JSON.stringify(temporalUser),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(apiResponse => apiResponse.json())
        .then(apiResponse => {
            return {data: apiResponse}
        })
        .catch(error => {
            console.error(error)
            return false;
        })
}


export const deleteUser = async temporalUser => {
    temporalUser.password = '....';
    return await fetch(baseUrl + '/user/delete', {
        method: 'DELETE',
        body: JSON.stringify(temporalUser),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(apiResponse => apiResponse.json())
        .then(apiResponse => {
            return {data: apiResponse}
        })
        .catch(error => {
            console.error(error)
            return false;
        })
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

