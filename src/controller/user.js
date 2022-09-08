const userSchema = require("../model/userSchema")
const jwt = require("jsonwebtoken")

const createUser=async(req,res)=>{
   try{ let data = req.body
    let createData = await userSchema.create(data)
    res.send(createData)
   }
   catch(err){
    res.send(err.message)
   }
}

const userLogIn=async(req,res)=>{
    try{
        let {mobile,password}= req.body
        let userId= mobile
       if(userId && password){
        let user= await userSchema.findOne({userId:mobile,password:password})
       }
       if(!user){
        res.status(404).send("incorrect credential")
       }
       let token = jwt.sign({
        userId:user._id.toString(),
        organisation:"reunion"
       },"reunion_assaignment")

       res.status(200).send({ status: true, msg: "login successful", userId, password, token })
    }
    catch(err){
        res.status(500).send(err.msg)
    }
}



module.exports.createUser= createUser
module.exports.userLogIn=userLogIn

