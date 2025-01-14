const express = require("express")
const usercontroller = require("../Controller/UserController")
const router = express.Router();

router.post("/register",usercontroller.register);
router.post("/login",usercontroller.login);
router.post("/forgetpassword",usercontroller.forgetpassword);
router.post("/expirytime",usercontroller.calculateDaysLeft)
router.post("/username",usercontroller.usernameupdate)
router.post("/setbgurl",usercontroller.setbgurl)
router.post("/getbgurl",usercontroller.getbgurl)
module.exports = router;