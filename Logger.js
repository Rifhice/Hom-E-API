const chalk = require("chalk");
const fs = require("fs");

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return `${s4()}-${s4()}-${s4()}-${s4()}-${s4()}-${s4()}-${s4()}-${s4()}-${s4()}`;
}

const path = `./logs/${guid()}.log`;

const colors = {
  error: chalk.keyword("red"),
  warning: chalk.keyword("orange"),
  device: chalk.keyword("blue"),
  rest: chalk.keyword("magenta"),
  ui: chalk.keyword("green"),
  general: chalk.white
};

saveLog = message => {
  fs.appendFile(path, message + "\n", err => {
    if (err) console.log(err);
  });
};

getDate = () => {
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  return `${h}:${m}`;
};

log = function(message, { time = true, channel = "general" } = {}) {
  let mess = time ? `${getDate()} --> ${message}` : `${message}`;
  if (colors[channel]) {
    console.log(colors[channel](mess));
  } else {
    console.log(colors.general(mess));
  }
  saveLog(mess);
};
module.exports = log;
