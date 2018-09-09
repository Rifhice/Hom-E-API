var express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const DB = require("../DB/DB.js");
const jwt = require("../Security/JWT");
const cfg = require("../config.json");

router.post("/Google", function(req, res) {
  //Checking if the google token sent by user is valid
  let token = req.body.token;
  const client = new OAuth2Client(cfg.GOOGLE_APP_ID);
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: cfg.GOOGLE_APP_ID
    });
    const payload = ticket.getPayload();
    const userid = payload["sub"];
    //Look for the user in the database
    DB.getUserWithGoogleID(userid)
      .then(result => {
        jwt
          .code({ userId: result.userId })
          .then(token =>
            res.send({ code: 202, message: "Connection succeeded !", token })
          )
          .catch(err => console.log(err));
      })
      .catch(err => {
        DB.createUser({ googleId: userid })
          .then(id => {
            jwt
              .code({ userId: id })
              .then(token =>
                res.send({
                  code: 201,
                  message: "New user created !",
                  token
                })
              )
              .catch(err => console.log(err));
          })
          .catch(err =>
            res.send({
              code: 500,
              message: "Cannot create the user in the database !"
            })
          );
      });
  }
  verify().catch(err => {
    res.send({ code: 401, message: "Google token not valid !" });
  });
});

module.exports = router;
