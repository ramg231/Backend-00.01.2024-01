require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 3000;

app.use(express.static("public"));

io.on("connection", (socket) => {
    console.log("NEW SUSSER AMONG");
    
    socket.on("disconnect", (socket) => {
        console.log("NO SUS SUASDAUHDUASHD")
    })    
});

server.listen(port, () => {
    console.log(`AMONG PORT ${port}`);
})