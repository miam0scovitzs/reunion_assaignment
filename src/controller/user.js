const userSchema = require("../model/userSchema")
const validator= require("../validator")
const jwt = require("jsonwebtoken")


const createUser=async(req,res)=>{
   try{ let data = req.body
//     let {fullname,email,mobile,password}= data

//    if(!validator.isValidName(fullname)) return res.status(400).send("write a proper name")

//    if(!validator.isValidPhone(mobile)) return res.status(400).send("write a proper mobile number")
//    if(!validator.isValidEmail(email)) return res.status(400).send("write a proper email")
//    if(password.length<=8 && password.length>=15) return res.status(400).send("write password in between 8-15 letters")

    let createData = await userSchema.create(data)
    res.status(201).send({msg:createData})
   }
   catch(err){
    res.status(500).send(err.message)
   }
}
//................................................

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
       "abc")


       
       res.status(200).send({status:true,data:{mobile,password,token}})
    }
    catch(err){
        res.status(500).send(err.msg)
    }
}
//...................................................................................
const getData=async(req,res)=>{
  try{
      let userId= req.params.userId
    let findId= await userSchema.findOne({_id:userId})
    if(!findId) return res.status(404).send({msg:"invalid userId"})

    let {fullName,number,following,follower}=findId
    res.status(200).send({msg:fullName,number,following,follower})
}
catch(err){res.status(500).send(err.message)}
}
//...........................................................................................
const updateUser = async(req,res)=>{
   try{ 
    let userId = req.params.userId
    let findId= await userSchema.findOne({_id:userId})
    if(!findId) return res.status(404).send({msg:"invalid userId"})

   let data = req.body
   if(!validator.isValidValue(data)){
    return res.status(404).send({msg:"enter the valid data"})
   }
   
   let updateData = await userSchema.findByIdAndUpdate({_id:userId},{$set:data},{new:true})
   res.status(200).send({data:updateData})
   }
   catch(err){res.ststus(500).send(err.message)}
}

//.....................................................................
deleteUser=async(req,res)=>{
  try{
      let userId= req.params.userId
    let findId= await userSchema.findOne({_id:userId})
    if(!findId) return res.status(404).send({msg:"invalid userId"})
    let deletedata= await userSchema.findByIdAndDelete({userId})
    res.status(200).send({msg:"account has been deleted"})
}

catch(err){res.status.send(err.message)}
}


module.exports={ createUser ,userLogIn,getData, updateUser,deleteUser}


