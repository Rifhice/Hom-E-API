const io = require("socket.io-client");

const socket = io("http://localhost:1336");
socket.on("connect", () => {
  socket.emit("register", {
    userId: "6a50-3ce8-4797-4bcb-0213-bfe6-06cc-5504",
    deviceId: "mysuperdevice"
  });

  socket.on("register", msg => {
    console.log("Register");
    if (msg.code == 200) {
      console.log("Registration successful !");
    } else if (msg.code == 400) {
      console.log("Registration failed !");
    }
  });

  socket.on("Actuator", (msg, response) => {
    console.log(msg);
    response("Maybe not !");
  });
});
