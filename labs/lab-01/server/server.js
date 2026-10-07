const express = require('express');
const app = express();
const path = require('node:path')

app.use(express.static(path.join(__dirname, '..', 'views')));


// Testing endpoints

app.get('/', (req, res) => {
    res.send('<h2>Welcome hacker</h2>');
});

app.get('/api/test', (req, res) => {
    res.json({
        status: 'ok',
        message: "Backend is runnig"
    });
});

app.get('/websocket', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'test.html'));
});

module.exports = app;