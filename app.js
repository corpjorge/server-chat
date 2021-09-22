const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: { origin: "*" }
});

app.get('/', (req, res) => {
    res.send('<h1>😪 🤤</h1>');
});

io.on('connection', (socket) => {
    socket.on('chat', (data) => {
        let room = data.room;
        socket.join(room);
        io.sockets.in(room).emit('chat', data);
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
