const userSchema = require("../model/userSchema")

const createUser=async(req,res)=>{
   try{ let data = req.body
    let createData = await userSchema.create(data)
    res.send(createData)
   }
   catch(err){
    res.send(err.message)
   }
}



module.exports.createUser= createUser

