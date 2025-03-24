
import "dotenv/config";
import "./db";
import "../models/Project";
import app from "./server";
import User from "../models/User";


const PORT = 3000;

const handleListening = async()=>{
    console.log(`RESUME SERVER RUNNING ON PORT${PORT}`);
    
}

app.listen(PORT,handleListening);