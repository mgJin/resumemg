import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title : {type:String,required:true,},
    description : String,
    startDate : Date,
    endDate : Date,
    headCount:Number,
    imagefileUrl:[{type:String}],
    videofileUrl:{type:String},
    owner:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
})

const Project = mongoose.model("Project",projectSchema);
export default Project;