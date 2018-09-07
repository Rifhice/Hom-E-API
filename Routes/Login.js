var express = require("express");
const jwt = require("../node_modules/jsonwebtoken");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const DB = require("./DB.js");

const SECRET_HASH = "M3rC13STTr0pfUn";

router.post("/Google", function(req, res) {
  let token = req.body.token;
  const client = new OAuth2Client(
    "466608887201-cs254tau34sd5k7s0kisafitb6boptek.apps.googleusercontent.com"
  );
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience:
        "466608887201-cs254tau34sd5k7s0kisafitb6boptek.apps.googleusercontent.com"
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];
    DB.getUserWithGoogleID(userid)
      .then(result => {
        console.log(result);
        var token = jwt.sign({ userId: result.userId }, SECRET_HASH);
        res.send({ code: 202, message: "Connection succeeded !", token });
      })
      .catch(err => {
        console.log(err);
        res.send({ code: 402 });
        //User not in the database
      });
  }
  verify().catch(err => {
    res.send({ code: 401, message: "Google token not valid !" });
  });
});

module.exports = router;
