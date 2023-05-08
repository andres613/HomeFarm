const temperatureProgress = document.querySelector('.temperature-circular-progress');
const temperatureProgressValue = document.querySelector('.temperature-progress-value');
const ligthProgress = document.querySelector('.ligth-circular-progress');
const ligthProgressValue = document.querySelector('.ligth-progress-value');

const temperatureIndicator = value => {
    temperatureProgressValue.textContent = `${value}°C`
    temperatureProgress.style.background = `conic-gradient(#7d2ae8 ${value * 3.6}deg, #ededed 0deg)`
}

const ligthIndicator = value => {
    ligthProgressValue.textContent = `${value}lum`
    ligthProgress.style.background = `conic-gradient(green ${value * 3.6}deg, #ededed 0deg)`
}

const get = () => {
    let fetchOptions = {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    }
    fetch(baseUrl + '/read', fetchOptions)
        .then(res => { return res.json() })
        .then(data => {
            console.log(data.temperature);
            console.log(data.ilumination);
            temperatureIndicator(data.temperature);
            ligthIndicator(data.ilumination);
        })
        .catch(error => {
            temperatureIndicator(0);
            ligthIndicator(0);
            // console.error('Error:', error)
        });
}

setInterval('get()',2000);

