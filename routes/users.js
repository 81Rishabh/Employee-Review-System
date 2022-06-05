const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const feedController = require("../controller/feedController");
const passport = require("passport");

router.get('/'  , userController.getEmployee);
router.get("/signIn", userController.signIn);
router.get("/signUp", userController.signUp);

// @post requests
// sending post request to create user
router.post("/create", userController.create);

// seding post request to creating session (while signing in)
// use passport as a middleware to authenticate the user
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/employee/signIn" }),
  userController.createSession
);

// loggin out (destroing session)
router.get('/sign-out' , userController.destroySession);

// feedback routes
//  @post
router.post('/createFeed/:employe_id' , feedController.createFeed);

module.exports = router;
