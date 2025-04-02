import mongoose from "mongoose";

const userSchema =new mongoose.Schema({
    name :{type:String,require:true},
    email:{type:String,require:true,unique :true},
    password:{type:String,require:true},
   

},{minimize:false})

const User=mongoose.models.product || mongoose.model('user',userSchema);

export default User;