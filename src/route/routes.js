const express= require("express")
const router= express.Router()

const createRoute= require("../controller/user")
const postController= require("../controller/postController")
//const commentcontroller = require("../controller/commentController")
const authorisation = require("../auth")

router.post("/create",createRoute.createUser)
router.post("/logIn",createRoute.userLogIn)
router.put("/update/:userId",authorisation.userAuthorization,createRoute.updateUser)
router.get("/user/:userId",authorisation.userAuthorization,createRoute.getData)
router.delete("/delete/:userId",authorisation.userAuthorization,createRoute.deleteUser)
router.post("/follow/:userId",createRoute.followers)
router.post("/unfollow/:userId",createRoute.unfollowUser)

router.post("/posts",postController.createPost)
router.get("/posts/:postId",postController.getPost)
router.get("/all_posts/:userId",authorisation.userAuthorization,postController.getAllData)
router.delete("/posts/:postId",postController.deletePost)
router.post("/like/:postId",postController.likePost)
router.post("/unlike/:postId",postController.dislikePost)
router.post("/comment/:postId",postController.commentPost)

module.exports=router