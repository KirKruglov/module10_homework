const wsServer = "wss://echo-ws-service.herokuapp.com";
const inputMessage = document.getElementById('message');
const btnSend = document.querySelector('.btn-submit');
const btnGeo = document.querySelector('.btn-geo');
const showResult = document.querySelector('.get-box')
let inputMember;

let socket = new WebSocket(wsServer);

socket.onerror = function (event) {
    displayGetMessage (event.data);
}


socket.onmessage = function (event) {
    if (event.data != inputMessage.value) {
        console.log("No message");
    } else {
        displayGetMessage (event.data);
    }
}

function  displaySendMessage(message) {
    let showMessage = `
        <div class="send-message">Запрос: ${message}</div>
    `;

    showResult.insertAdjacentHTML('beforeend', showMessage);
}

function displayGetMessage (message) {
    let showMessage = `
        <div class="get-message">Сервер: ${message}</div>
    `;

    showResult.insertAdjacentHTML('beforeend', showMessage);
}

function displayGetGeo (positionOne, positionTwo) {
    let showMessage = `
        <div class="geo-message">
            Гео-локация:<br> 
            Широта: ${positionOne}°<br>
            Долгота: ${positionTwo}°<br>
            <a href="https://www.openstreetmap.org/#map=18/${positionOne}/${positionTwo}">Ссылка на карту</a>
        </div>
    `;

    showResult.insertAdjacentHTML('beforeend', showMessage);
}

btnSend.addEventListener('click', () => {
    
    socket.send(inputMessage.value);

    displaySendMessage (inputMessage.value);
})

btnGeo.addEventListener('click', () => {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            const {coords} = position;
            socket.send(coords.latitude, coords.longitude);
            displayGetGeo (coords.latitude, coords.longitude);
        })
    } else {
        let showMessage = `
            <div class="geo-message">
                Гео-локация не поддерживается вашим браузером
            </div>
        `;

        showResult.insertAdjacentHTML('beforeend', showMessage);
    }
})