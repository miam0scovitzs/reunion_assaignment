
const mongoose= require("mongoose")

const userSchema= new mongoose.Schema({

   fullName:{type:String,required:true,unique:true},

    mobile:{type:Number,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    gender:{type:String,required:true,enum:["male","female","others"]},
    followers:{type:Array,default:[]},
    following:{type:Array,default:[]},
    isDeleted:{type:String,default:false}
    

},{ timestamps: true }
)
module.exports = mongoose.model('user', userSchema)
