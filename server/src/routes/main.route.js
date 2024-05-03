import { Router } from "express";
import userRoute from "./user.route.js"
import blogRoute from "./blog.route.js"
const router =  Router()


// by pass user route 
router.use("/user" , userRoute)

// by pass blog route
router.use("/blog" , blogRoute)

export default router