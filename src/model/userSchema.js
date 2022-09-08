const mongoose= require("mongoose")

const userSchema= new mongoose.Schema({
    firstName: { type: String,required:true },
    lastName: { type: String,required:true},
    mobile:{type:Number,required:true,unique:true},
    email:{type:String},
    password:{type:String,required:true},
    gender:{type:String,required:true,enum:["male","female","others"]}

})
module.exports = mongoose.model('user', userSchema)
