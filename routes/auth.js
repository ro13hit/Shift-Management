var express = require("express")
var router = express.Router();
const {check, validationResult} = require("express-validator");
const {signout, signin, signup, isSignedIn} = require("../controllers/auth")

router.post("/signin",
    [
        check("email", "Email is required").isEmail(),
        check("password","Password is required").isLength({min:1})
    ],
    signin)

router.post("/signup",
    [
      check("name", "Name is required ").isLength({min: 1}),
      check("email", "Invalid Email").isEmail(),
      check("password","Password should be of minimum 6 characters").isLength(6)  
    ],
    signup)

router.get("/signout", signout);

module.exports = router;