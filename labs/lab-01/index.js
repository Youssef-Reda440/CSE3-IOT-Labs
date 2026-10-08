const app = require('./server/server.js');
const http = require('node:http');
const createWebSocketServer = require('./websocket/websocket.js');

const server = http.createServer(app);
createWebSocketServer(server);

const PORT = 2000;

server.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
