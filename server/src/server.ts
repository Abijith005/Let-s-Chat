import express from "express";
import "dotenv/config";
import { createServer } from "http";
import {Server} from "socket.io"

const app = express();
const httpServer=createServer(app)
const io=new Server(httpServer,{cors:{origin:["http://localhost:4200"],methods:['GET','POST']}})

io.on("connection",(socket)=>{
  console.log(socket,'new user connected');
  
})


const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

httpServer.listen(port, () => {
  console.log(`server running on port ${port}`);
});
