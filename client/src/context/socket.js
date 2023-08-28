import { io } from "socket.io-client";

import React from "react";
export const socket = io(process.env.REACT_APP_API_URL);
socket.on("connect", () => {
	console.log("connected to server");
});
export const SocketContext = React.createContext();
