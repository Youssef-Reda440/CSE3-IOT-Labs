const HOST = location.origin.replace(/^http/, 'ws');
const ws = new WebSocket(HOST);

const lamp = document.getElementById('lamp');
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');
const onBtn = document.getElementsByClassName('btn-on')[0];
const offBtn = document.getElementsByClassName('btn-off')[0];
const brightnessVal = document.getElementById('brightnessVal');
const slider = document.getElementById('brightnessSlider');

const lampCommand = {};

function setLampOnUI() {
    lamp.classList.add('lamp-on');
    lamp.style.filter = '';
    statusDot.style.backgroundColor = 'green';
    statusText.textContent = 'Connected';
    brightnessVal.textContent = 255;
    slider.value = 255;
}

function setLampOffUI() {
    lamp.classList.remove('lamp-on');
    lamp.style.filter = 'none';
    statusDot.style.backgroundColor = 'red';
    statusText.textContent = 'Disconnected';
    brightnessVal.textContent = 0;
    slider.value = 0;
}

function turnLampOn() {
    setLampOnUI();
    lampCommand['action'] = 'on';
    lampCommand['brightness'] = 255;
    ws.send(JSON.stringify(lampCommand));
}

function turnLampOff() {
    setLampOffUI();
    lampCommand['action'] = 'off';
    lampCommand['brightness'] = 0;
    ws.send(JSON.stringify(lampCommand));
}

ws.onopen = function () {
    console.log("Connected to WebSocket server");
    turnLampOn();
};

onBtn.onclick = turnLampOn;

offBtn.onclick = turnLampOff;

slider.addEventListener('input', () => {
    const brightness = Number(slider.value);
    brightnessVal.textContent = brightness;

    if (brightness === 0){
        turnLampOff();
    } else {
        statusDot.style.backgroundColor = 'green';
        statusText.textContent = 'Connected';
        lamp.classList.add('lamp-on');
        lamp.style.filter = `drop-shadow(0 0 ${brightness / 20}px #ffd43b)`;

        lampCommand['action'] = "change_brightness";
        lampCommand['brightness'] = brightness;
        ws.send(JSON.stringify(lampCommand));
    }
});

ws.onmessage = function (event) {
    console.log("Message from server:", event.data);
};

ws.onclose = function () {
    console.log("WebSocket connection closed");
    setLampOffUI();
};