import { io } from "socket.io-client";

import React from "react";

export const socket = io("https://kc-chat-app-api.herokuapp.com/");
socket.on("connect", () => {
  console.log("connected to server");
});
export const SocketContext = React.createContext();
