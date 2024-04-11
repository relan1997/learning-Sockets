import express from "express";
import http from "http"
import path from "path"

import {Server} from "socket.io"

const app=express();


// app.listen(3000,()=>{
//     console.log("Listening On Post 3000");
// })

const server = http.createServer(app);
const io=new Server(server);

io.on('connection',(socket)=>{ // the socket obj conatins information about the client upon the connection of the server with the client
    console.log("A new user has connected ",socket.id)
    socket.on("user_message",message=>{
        console.log(message); //jab bhi user_message ke naam se koi bhi message aaye from the frontend toh tum uss message ko console.log kardo
        io.emit("server_message",message) // whenever a server recieves a message then send it to all thr clients
    })
})


app.use(express.static(path.resolve('./public')))  // tells express to serve static html and css files from the public folder

app.get('/',(req,res)=>{
    return res.sendFile("/public/index.html")
})

server.listen(9000,()=>{
    console.log("Listening on Port 9000");
})