import app from "./app.js";
import dotenv from "dotenv"
import connectDB from "./connection/connectDB.js";

const port = process.env.PORT

connectDB().then(()=>{
  app.listen(port , ()=>{
    console.log(`Server listning on port ${port}`)
  })
}).catch((error)=>{
    console.log(`Error listning on port ${port} : error:${error}`)
})