const express= require("express")
const router= express.Router()

const createRoute= require("../controller/user")

router.post("/create",createRoute.createUser)
router.post("/logIn",createRoute.userLogIn)

module.exports=router