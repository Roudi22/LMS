import  connectDB from "./utils/db";
import { app } from "./app";
require("dotenv").config();
import cloudinary from "cloudinary";
// cloudinary config
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY
    
});
// create our server
app.listen(process.env.PORT, ()=> {
    console.log(`Server is connected with port ${process.env.PORT}`)
    connectDB();
})
