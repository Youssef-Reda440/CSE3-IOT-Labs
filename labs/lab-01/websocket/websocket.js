const lampService = require('../services/lampService.js');
const SocketServer = require('ws').Server;

function createWebSocketServer(server) {
    const wss = new SocketServer({ server });

    wss.on("connection", (ws) => {
        console.log('Client connected');

        ws.on('message', (msg) => {
            const lampStatus = msg.toString();
            const lampCommand = JSON.parse(lampStatus);

            if (lampCommand.action === "on") {
                lampService.turnOn();
            } else if (lampCommand.action === "off") {
                lampService.turnOff();
            } else if (lampCommand.action === "change_brightness") {
                lampService.setBrightness(lampCommand.brightness);
            }

            const lampState = lampService.getStatus();

            broadcast(wss, lampState);

            console.log("Message form client: ", lampStatus);
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });

    return wss;
};

function broadcast(wss, lampState) {
    const message = JSON.stringify(lampState);

    wss.clients.forEach(function (client) {
        if (client.readyState === client.OPEN) {
            client.send(message);
        } else {
            console.log("Clinet off");
        }
    });
}

module.exports = createWebSocketServer;