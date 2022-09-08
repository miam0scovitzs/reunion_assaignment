const express= require("express")
const router= express.Router()

const createRoute= require("../controller/user")

router.post("/create",createRoute.createUser)
router.post("/logIn",createRoute.userLogIn)
router.put("/update",createRoute.updateUser)
router.get("/get",createRoute.getData)
router.delete("/delete",createRoute.deleteUser)

module.exports=router