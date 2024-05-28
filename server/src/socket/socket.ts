import { Server, Socket } from "socket.io";

const activeUsers = new Map<string, string>();

function socketConnect(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("new connection created");

    socket.on("online", (userId: string) => {
      activeUsers.set(userId, socket.id);
      
    });

    socket.on('message',(message:string)=>{
      console.log(message);
      
    })
    

    socket.on("disconnect", () => {
      console.log("disconnected");
    });
  });
}

export default socketConnect;
