
const mongoose= require("mongoose")

const userSchema= new mongoose.Schema({

   fullName:{type:String,required:true,unique:true},

    mobile:{type:Number,required:true,unique:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    gender:{type:String,required:true,enum:["male","female","others"]},
    followers:{type:Number,required:true,default:0},
    following:{type:Number,required:true, default:0}
    

},{ timestamps: true }
)
module.exports = mongoose.model('user', userSchema)
