import express from "express";
import cors from "cors";
import 'dotenv/config';
import configurePassport from './utils/passport.js';

import { initialize } from './database/connection.js';

import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import chatRouter from "./routes/chat.route.js";
import messageRouter from "./routes/message.route.js";

// import swaggerRouter from './swagger.js';
import startSocket from './utils/socket.js'; 
import {errorHandling} from './middlewares/error.middleware.js'

  await initialize()

  const app = express()

  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({limit:"50mb"}))
  app.use(express.urlencoded({limit:"50mb",extended:true}))

  configurePassport(app)

  app.use(
    userRouter,
    authRouter,
    chatRouter,
    messageRouter
    )
  // app.use('/swagger', swaggerRouter); 
  app.use(errorHandling)

  const port = process.env.PORT || 5000 ;
  const server = app.listen(port , ()=>{
   console.log(`server listening at http://localhost:${port}`);
  })

  startSocket(server)


// import { Server } from "socket.io";
// const io = new Server(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: "http://localhost:3000",
//     // credentials: true,
//   },
// });

// io.on("connection", (socket) => {
//   console.log("Connected to socket.io");
//   socket.on("setup", (userData) => {
//     socket.join(userData._id);
//     socket.emit("connected");
//   });

//   socket.on("join chat", (room) => {
//     socket.join(room);
//     console.log("User Joined Room: " + room);
//   });
//   socket.on("typing", (room) => socket.in(room).emit("typing"));
//   socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

//   socket.on("new message", (newMessageRecieved) => {
//     var chat = newMessageRecieved.chat;

//     if (!chat.users) return console.log("chat.users not defined");

//     chat.users.forEach((user) => {
//       if (user._id == newMessageRecieved.sender._id) return;

//       socket.in(user._id).emit("message recieved", newMessageRecieved);
//     });
//   });

//   socket.off("setup", () => {
//     console.log("USER DISCONNECTED");
//     socket.leave(userData._id);
//   });
// });




// const io = require("socket.io")(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: "http://localhost:3000",
//     // credentials: true,
//   },
// });