const jwt = require('jsonwebtoken');
//const userSchema=require("../model/userSchema")



   const userAuthorization = async function (req,res,next){
     let token = req.headers['my-api-key']
   
     if(!token) return res.status(400).send({msg:"No token is present in Header file"})
     console.log(token)
      
     let userId =req.body.userId
    
     let decodedToken = jwt.verify(token,"reUnion")
     if(!decodedToken) 
     return res.status(401).send({status:false , msg:"token is invalid"})
    // console.log(decodedToken)
   
     if(userId!=decodedToken.userId)
       return res.status(400).send({status:false , msg:"jwt validation failed"})
     next()
   }
   
   module.exports= {userAuthorization}