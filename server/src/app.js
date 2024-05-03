import express from "express"
import dotenv from "dotenv"
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from "cookie-parser"
import mainRoute from "./routes/main.route.js"
import nodemailer from "nodemailer"

import cors from 'cors'
const app =  express()

dotenv.config({})
app.use(cookieParser())

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: false, }))
app.use(cors())


// cloudinart conf --------

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// mail transporter
export const Transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    host: process.env.HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.FROM,
      pass: process.env.PASSWORD,
    },
  });

  
// main routes
app.use("/api/v1" , mainRoute)

export default app