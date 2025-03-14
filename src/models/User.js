import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId:{type:String,required:true,unique:true},
    password:{type:String},
    name:{type:String},
    age:{type:String},
    address:{type:String},
    email:{type:String},
    phoneNumber:{type:String},
    sex:String,
    avatarUrl:{type:String},
    careers:[{type:mongoose.Schema.Types.ObjectId,ref:"Career"}],
    projects:[{type:mongoose.Schema.Types.ObjectId,ref:"Project"}],

})

const User = mongoose.model("User",userSchema);

export default User;