const postModel= require("../model/postModel")
const userSchema= require("../model/userSchema")
const validator = require("../validator")

const createPost = async(req,res)=>{
    let data = req.body
    if(!validator.isValidValue(data.title))  {return res.status(400).send({msg:"enter the title"})}
    if(!validator.isValidValue(data.description)) {return res.status(400).send({msg:"enter the description"})}

    const saveData =await postModel.create(data)

    res.status(201).send({data:saveData})
}

//...........................getPost...........................
const getPost=async(req,res)=>{
   try{
     let postId= req.params.postId
     
    let findId= await postModel.findOne({_id:postId})
    //console.log(findId)
    if(!findId) return res.status(404).send({msg:"invalid userId"})
      
   
    res.status(200).send({data:findId})
}
catch(err){res.status(500).send(err.message)}

}
 //................................get all posts...........................
const getAllData=async(req,res)=>{
   try{let userId= req.params.userId
 
   let getUser= await userSchema.findOne({_id:userId})
   if(!getUser) return res.status(400).send("incorrect userId")

   let getPost= await postModel.find({userId:getUser})
   res.status(200).send(getPost)
}
catch(err){res.status(500).send(err.message)}
}
//................................delete post...............................
const deletePost = async(req,res)=>{
    try{
        let postId= req.params.postId
        
      let findId= await postModel.findOne({_id:postId})
      if(!findId) return res.status(404).send({msg:"invalid postId"})
      let deletedata= await postModel.findOneAndUpdate({_id:postId},{$set:{isDeleted:true}},{new:true})
      res.status(200).send({msg:"account has been deleted",deletedata})
  }
  
  catch(err){res.status(500).send(err.message)}
  }
//...............................likePost.....................................
  const likePost = async(req,res)=>{
   try{ let postId= req.params.postId
   
    let userId= req.body.userId
    let getPost = await postModel.findOne({_id:postId})
    console.log(getPost)
    if(!getPost){return res.status(400).send({msg:"enter a valid id"})}
    if(!getPost.likes.includes(userId)){
        await getPost.updateOne({$push:{likes:userId}})
    }
    res.status(200).send({msg:`your post has been liked by ${userId}`,data:getPost})
  }
  catch(err){res.status(500).send(err.message)}
}
  //...........................dislikepost............................
  const dislikePost = async(req,res)=>{
  try{  let postId= req.params.postId
    let userId= req.body.userId
    let getPost = await postModel.findOne({_id:postId})
    if(!getPost){return res.status(400).send({msg:"enter a valid id"})}
    if(getPost.likes.includes(userId)){
        await getPost.updateOne({$pull:{likes:userId}})
    }
    res.status(200).send({msg:`your post has been disliked from ${userId}`,data:getPost})
    }
     catch(err){res.status(500).send(err.message)}
  }

//..............................comment .........................................
  const commentPost=async(req,res)=>{
    try{  let postId= req.params.postId
      let {userId,comment}= req.body
      let getPost = await postModel.findOne({postId:postId})
      if(!getPost){return res.status(400).send({msg:"enter a valid id"})}
          await getPost.updateOne({$push:{comments:`${comment} by ${userId}`}})
      
      res.status(200).send({msg:`your post has been commented from ${userId}`,data:getPost})
      }
       catch(err){res.status(500).send(err.message)}
  }


module.exports={createPost,getPost,getAllData,deletePost,likePost,dislikePost,commentPost}