import mongoose from "mongoose";

const careerSchema = new mongoose.Schema({
    companyName:{type:String,required:true},    
    period:{type:String,},
    role:{type:String},
    owner:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
})

const Career = mongoose.model("Career",careerSchema);

export default Career;