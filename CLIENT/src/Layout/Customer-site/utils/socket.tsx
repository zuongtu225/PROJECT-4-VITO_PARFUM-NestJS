import { io } from "socket.io-client";
const socket = io("http://localhost:9000");

socket.emit("notify", "Bạn có đơn hàng mới");
