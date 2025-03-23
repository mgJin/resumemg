import mongoose from "mongoose";



mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

const handleOpen=()=>console.log("Connected to DB");

db.on("error",()=>console.log("db error occur: ",error));
db.once("open",handleOpen);