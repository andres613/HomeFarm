export async function get(email, pass){
    return await fetch("/fake_api.json")
        .then(apiResponse => apiResponse.json())
        .then(response => {
            for(let i=0; i<response.length; i++) {
                if(email === response[i].email && pass === response[i].password) {
                    return response[i];
                }
            }
            return false;
        });
}
