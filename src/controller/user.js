const userSchema = require("../model/userSchema")
const validator= require("../validator")
const jwt = require("jsonwebtoken")
const postModel = require("../model/postModel")


const createUser=async(req,res)=>{
   try{ let data = req.body
    if(!validator.isValidValue(data)) return res. status(400).send("fill the data")
    let {fullname,email,mobile,password}= data

   if(!validator.isValidName(fullname)) return res.status(400).send("write a proper name")

   if(!validator.isValidPhone(mobile)) return res.status(400).send("write a proper mobile number")
   if(!validator.isValidEmail(email)) return res.status(400).send("write a proper email")
   if(password.length<=8 && password.length>=15) return res.status(400).send("write password in between 8-15 letters")

    let createData = await userSchema.create(data)
    res.status(201).send({msg:createData})
   }
   catch(err){
    res.status(500).send(err.message)
   }
}
//................................................userLogin

const userLogIn=async(req,res)=>{
    try{
        const logInData= req.body
        let {mobile,password}= logInData
        if(!validator.isValidValue(mobile )){
           return  res.status(400).send("enter the mobile no")
        }
        if(!validator.isValidValue(password )){
            return  res.status(400).send("enter the password")
         }

        let userDetails= await userSchema.findOne({mobile})
       if(!userDetails){
       return res.status(404).send("incorrect mobile")
       }
       let findPassword= await userSchema.findOne({password})
       if(!findPassword){return res.status(404).send("incorrect password")}
      // const userId= userDetails._id
       let token = jwt.sign(
        {
        userId:userDetails._id,
        
        exp: Math.floor(Date.now()/1000)+24*60*60
       },
       "reUnion")

       res.setHeader("my-api-key", token)
       
       res.status(200).send({status:true,data:{mobile,password,token}})
    }
    catch(err){
        res.status(500).send(err.msg)
    }
}
//...............................getUser.....................................................
const getData=async(req,res)=>{
  try{
      let userId= req.query.userId
    let findId= await userSchema.findOne({_id:userId})
    console.log(findId)
    if(!findId) return res.status(404).send({msg:"invalid userId"})
      
    let {fullName,mobile,following,followers}=findId
    res.status(200).send({data:fullName,mobile,following,followers})
}
catch(err){res.status(500).send(err.message)}
}
//.....................................update......................................................
const updateUser = async(req,res)=>{
   try{ 
    let userId = req.query.userId
    let findId= await userSchema.findOne({_id:userId})
    if(!findId) return res.status(404).send({msg:"invalid userId"})

   let data = req.body
   if(!validator.isValidValue(data)){
    return res.status(404).send({msg:"enter the valid data"})
   }
   
   let updateData = await userSchema.findOneAndUpdate({_id:userId},{$set:data},{new:true}) 
   res.status(200).send({data:updateData})
   }
   catch(err){res.ststus(500).send(err.message)}
}

//.................................deleteUser....................................
deleteUser=async(req,res)=>{
  try{
      let userId= req.query.userId
    let findId= await userSchema.findOne({_id:userId})
    
    if(!findId) return res.status(404).send({msg:"invalid userId"})
    let deletedata= await userSchema.findOneAndUpdate({_id:userId},{$set:{isDeleted:true}},{new:true})
    res.status(200).send({msg:"account has been deleted",deletedata})
}

catch(err){res.status(500).send(err.message)}
}
//...........................folllow.....................................................
const followers=async(req,res)=>{
    let mainUser= req.params.userId
    let followUser= req.body.userId
   try{
          if(mainUser!=followUser){   
          let main= await userSchema.findOne({_id:mainUser})
          if(!main) return res.status(404).send("invalid userId")
          let currUser= await userSchema.findOne({_id:followUser})
  

          if(!main.followers.includes(followUser)){
            let finalUser= await main.updateOne({$push:{followers:followUser}})
            let followingUser= await currUser.updateOne({$push:{following:mainUser}})
            res.status(200).send({data:"successfull"})
          } else
            res.status(403).send("already followed")
      }
 }
       catch(err){res.status(500).send(err.message)}
}

//..........................................unfollow...............................................
const unfollowUser= async(req,res)=>{
  let mainUser= req.params.userId
  let followUser= req.body.userId
 try{
        if(mainUser!=followUser){   
        let main= await userSchema.findOne({_id:mainUser})
        if(!main) return res.status(404).send("invalid userId")
        let currUser= await userSchema.findOne({_id:followUser})

        if(main.followers.includes(followUser)){
          let finalUser= await main.updateOne({$pull:{followers:followUser}})
          let followingUser= await currUser.updateOne({$pull:{following:mainUser}})
          res.status(200).send({data:"successfull"})
        } else
          res.status(403).send("u never follow this account")
    }
}
     catch(err){res.status(500).send(err.message)}
}



module.exports={ createUser ,userLogIn, getData,updateUser,deleteUser,followers,unfollowUser}



