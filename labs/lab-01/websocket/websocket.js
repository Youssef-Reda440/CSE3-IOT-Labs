const SocketServer = require('ws').Server;

function createWebSocketServer(server) {
    const wss = new SocketServer({ server });

    wss.on("connection", (ws) => {
        console.log('Client connected');

        ws.send("Hello Client");

        ws.on('message', (msg) => {
            console.log("Message form client: ", msg.toString());
            ws.send("Message received by server");
        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });

    return wss;
};

module.exports = createWebSocketServer;