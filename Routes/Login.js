var express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");

router.post("/", function(req, res) {
  let token = req.body.token;
  console.log(req.body.token);
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
    console.log(payload);
    // If request specified a G Suite domain:
    //const domain = payload['hd'];
  }
  verify()
    .then(res => console.log(res))
    .catch(console.error);
  res.send("login");
});

module.exports = router;
