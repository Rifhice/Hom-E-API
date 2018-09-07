var express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const DB = require("./DB.js");

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
    console.log(userid);
    DB.getUserWithGoogleID(userid)
      .then(result => {
        console.log(result);
        res.send({ code: 202 });
      })
      .catch(err => {
        res.send({ code: 402 });
        //User not in the database
      });
  }
  verify().catch(err => {
    res.send({ code: 401 });
  });
});

module.exports = router;
