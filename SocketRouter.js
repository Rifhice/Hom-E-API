const route = {
  Actuator: {
    GET() {
      return new Promise((resolve, reject) => {
        resolve({ code: 200, message: "All actuators !" });
      });
    }
  },
  Behavior: {
    GET() {
      return new Promise((resolve, reject) => {
        resolve({ code: 200, message: "All behaviors !" });
      });
    },
    POST() {
      return new Promise((resolve, reject) => {
        resolve({ code: 201, message: "Behavior created !" });
      });
    },
    DELETE() {
      return new Promise((resolve, reject) => {
        resolve({ code: 200, message: "Behavior deleted !" });
      });
    },
    PUT() {
      return new Promise((resolve, reject) => {
        resolve({ code: 200, message: "Behavior updated !" });
      });
    }
  },
  Order: {
    POST() {
      return new Promise((resolve, reject) => {
        resolve({ code: 200, message: "Order executed !" });
      });
    }
  },
  Sensor: {
    GET() {
      return new Promise((resolve, reject) => {
        resolve({ code: 200, message: "All sensors !" });
      });
    }
  },
  EnvironmentVariable: {
    GET() {
      return new Promise((resolve, reject) => {
        resolve({ code: 200, message: "All environment variables !" });
      });
    }
  }
};
module.exports = {
  transfer(origin, msg, response, token) {
    if (route[origin])
      if (route[origin][msg.method])
        route[origin][msg.method]()
          .then(data => {
            data.token = token;
            response(data);
          })
          .catch(err => {
            response(err);
          });
      else response({ token, code: 405, data: "Method unknown !" });
    else response({ token, code: 405, data: "Origin unknown !" });
  }
};
