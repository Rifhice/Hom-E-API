const io = require("socket.io-client");
const socket = io("http://localhost:1336");
const router = require("./SocketRouter");

var token;

socket.on("connect", () => {
  socket.emit("register", {
    userId: "6a50-3ce8-4797-4bcb-0213-bfe6-06cc-5505",
    deviceId: "mysuperdevice"
  });

  socket.on("register", msg => {
    console.log("Register");
    if (msg.code == 200) {
      token = msg.token;
      console.log("Registration successful !");
    } else if (msg.code == 400) {
      console.log("Registration failed !");
    }
  });

  socket.on("message", (msg, response) => {
    if (msg && msg.origin) router.transfer(msg.origin, msg, response, token);
    else response({ token, code: 400, data: "No origin !" });
  });
});
