import { Router } from "express";
import veriftJWT from "../middlewares/auth.middleware.js";
import upload from "../middlewares/multer.middleware.js"
import { createBlog, upadateBlog } from "../controllers/blog.controller.js";
const router =  Router()


router.route("/create").post(veriftJWT , upload.single("image"),createBlog)
router.route("/update").post(veriftJWT , upload.single("image"), upadateBlog)


export default router