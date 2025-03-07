import "dotenv/config";
import "./db";
import "../models/Project";
import app from "./server";

const PORT = 8000;

const handleListening = ()=>{
    console.log(`RESUME SERVER RUNNING ON PORT${PORT}`);
}

app.listen(PORT,handleListening);