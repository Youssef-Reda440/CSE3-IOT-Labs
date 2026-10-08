const lamp = {
    status: "off",
    brightness: 0
};

function turnOn() {
    lamp.status = "on";
    lamp.brightness = 255;
};

function turnOff() {
    lamp.status = "off";
    lamp.brightness = 0;
};

function setBrightness(value) {
    lamp.status = "on";
    lamp.brightness = value;
};

function getStatus() {
    return lamp;
};

module.exports = {
    turnOn,
    turnOff,
    setBrightness,
    getStatus
};