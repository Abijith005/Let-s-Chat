function socketConnect(io: any) {
  const activeUsers = new Map();
  io.on("connection", (socket: any) => {
    console.log("new connection created");

    socket.on("online", (userId: string) => {});
  });
}
