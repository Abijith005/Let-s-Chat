import express from "express";
import "dotenv/config";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import cors from "cors";
import socketConnect from "./socket/socket";
import authRouter from "./routes/userAuthRoutes";
import dbConnect from "./config/mongoConnect";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:4200"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});
dbConnect();
socketConnect(io);

const port = process.env.PORT || 5000;
app.use(
  cors({
    origin: ["http://localhost:4200"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/auth", authRouter);

httpServer.listen(port, () => {
  console.log(`server running on port ${port}`);
});
