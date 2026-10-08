const HOST = location.origin.replace(/^http/, 'ws');
const ws = new WebSocket(HOST);

const lamp = document.getElementById('lamp');
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');
const powerBtn = document.getElementById('powerBtn');
const brightnessVal = document.getElementById('brightnessVal');
const slider = document.getElementById('brightnessSlider');

const lampCommand = {};
let isOn = false;

function setLampOnUI(brightness = 255) {
    isOn = true;
    lamp.classList.add('lamp-on');
    lamp.style.filter = `drop-shadow(0 0 ${brightness / 20}px #ffd43b)`;

    powerBtn.textContent = 'ON';
    powerBtn.className = 'btn btn-on';

    brightnessVal.textContent = brightness;
    slider.value = brightness;
}

function setLampOffUI() {
    isOn = false;
    lamp.classList.remove('lamp-on');
    lamp.style.filter = 'none';

    powerBtn.textContent = 'OFF';
    powerBtn.className = 'btn btn-off';

    brightnessVal.textContent = 0;
    slider.value = 0;
}

function setConnectionConnected() {
    statusDot.style.backgroundColor = 'green';
    statusText.textContent = 'Connected';
}

function setConnectionDisconnected() {
    statusDot.style.backgroundColor = 'red';
    statusText.textContent = 'Disconnected';
}

function turnLampOn(brightness) {
    setLampOnUI(brightness);
    lampCommand['action'] = 'on';
    lampCommand['brightness'] = 255;
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(lampCommand));
    }
}

function turnLampOff() {
    setLampOffUI();
    lampCommand['action'] = 'off';
    lampCommand['brightness'] = 0;
    if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(lampCommand));
    }
}

ws.onopen = function() {
    console.log("Connected to WebSocket server");
    setConnectionConnected();
    turnLampOn(255);
};



ws.onerror = function() {
    setConnectionDisconnected();
};

powerBtn.onclick = () => {
    if (isOn) {
        turnLampOff();
    } else {
        turnLampOn(255);
    }
};

slider.addEventListener('input', () => {
    brightnessVal.textContent = slider.value;
});

slider.addEventListener('change', () => {
    const brightness = Number(slider.value);

    if (brightness === 0) {
        turnLampOff();
    } else {
        setLampOnUI(brightness);

        lampCommand['action'] = "change_brightness";
        lampCommand['brightness'] = brightness;
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(lampCommand));
        }
    }
});

ws.onmessage = function(event) {
    console.log("Message from server:", event.data);
};
ws.onclose = function() {
    console.log("WebSocket connection closed");
    setConnectionDisconnected();
    setLampOffUI();
};