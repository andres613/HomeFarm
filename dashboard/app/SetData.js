const lightBulbContainer = document.querySelector(".light-bulb-container");
const ligthClass = document.querySelector(".ligth");
const checkboxLigth = document.querySelector('#checkboxLigth');
const slider = document.getElementById("dimmer");

const baseUrl = 'http://localhost:8080';


slider.value = 0;
slider.oninput = function() {
    send(getControlValue(slider.value));
}

const getControlValue = value => {
    if(value == 0)
        return 'a';

    if(value == 1)
        return 'b';

    if(value == 2)
        return 'c';

    if(value == 3)
        return 'd';

    if(value == 4)
        return 'e';

    if(value == 5)
        return 'f';

    if(value == 6)
        return 'g';

    if(value == 7)
        return 'h';

    if(value == 8)
        return 'i';

    if(value == 9)
        return 'j';

}



let ligthValue;
let isLigthOn = false;

const ligth = () => {
    isLigthOn = !isLigthOn;
    ligthValue = isLigthOn ? 'q' : 'w';

    send(ligthValue);
}

const send = value => {
    let fetchOptions = {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json'
        }
    }
    fetch(baseUrl + '?value=' + value, fetchOptions)
        .then(res => { return res.text() })
        .then(response => {
            console.log(response);
            if(response == 'q'){
                ligthClass.classList.add('is-ligth');
                lightBulbContainer.classList.add('light-bulb-on');
            }
            if(response == 'w'){
                ligthClass.classList.remove('is-ligth');
                lightBulbContainer.classList.remove('light-bulb-on');
            }
        })
        .catch(error => {
            // console.error('Error:', error)
            slider.value = 0;
            checkboxLigth.checked = false;
            ligthClass.classList.remove('is-ligth');
            lightBulbContainer.classList.remove('light-bulb-on');
        });
}

checkboxLigth.addEventListener('change', ligth);

