const express = require('express');
const app = express();
const path = require('node:path')

app.use(express.static(path.join(__dirname, '..', 'views')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

// Testing endpoint

app.get('/api/test', (req, res) => {
    res.json({
        status: 'ok',
        message: "Backend is runnig"
    });
});

module.exports = app;