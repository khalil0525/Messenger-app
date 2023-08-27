import { io } from "socket.io-client";

import React from "react";

export const socket = io("http://ec2-54-224-72-128.compute-1.amazonaws.com");
socket.on("connect", () => {
	console.log("connected to server");
});
export const SocketContext = React.createContext();
