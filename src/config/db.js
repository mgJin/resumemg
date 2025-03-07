import mongoose from "mongoose";

const DB_NAME = "resumemg";

mongoose.connect(`mongodb://127.0.0.1:27017/${DB_NAME}`);

const db = mongoose.connection;

const handleOpen=()=>console.log("Connected to DB");

db.on("error",()=>console.log("db error occur: ",error));
db.once("open",handleOpen);