import mongoose from "mongoose"
import Blog from "../models/blog.model.js"
import User from "../models/user.model.js"
import uploadOnCloudinary from "../utils/cloudinary.js"
import { createBlogType, updateBlogType } from "../utils/Types.js"



const createBlog = async (req, res) => {
    try {
        const {_id} = req.user

        const user = await User.findById(_id)

        if(!user){
            return res.status(422).json({
                msg:"Unauthorized access"
            })
        }
        
        const inputData = req.body
        
        if (!(inputData || filePath)) {
            return res.status(400).json({
                msg: "All fields must be require"
            })
        }

        console.log("start" , inputData)

        const filePath = req.file ? req.file.path : null


        const payloadData = createBlogType.safeParse(inputData)

        if (!payloadData.success) {
            return res.status(406).json({
                msg: "Please enter valid input"
            })
        }

        const { title, content } = payloadData.data

        const image = await uploadOnCloudinary(filePath)

        if (!image) {
            return res.status({
                msg: "Internal server error"
            })
        }

        await Blog.create({
            title,
            content,
            image: image.url,
            owner:user._id
        })

        return res.status(200).json({
            msg: "Blog created successfully"
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error"
        })
    }
}

    
const upadateBlog = async (req, res) => {
    try {
        const inputData = req.body
        const slug = req.params.slug
        const {_id} = req.user
        const filePath = req.file ? req.file.path : null

        if(!slug){
            return res.status(400).json({
                msg:"Slug not define Bad request"
            })
        }

        if (!inputData) {
            return res.status(400).json({
                msg: "All field must be require"
            })
        }

        const blog = await Blog.findOne({slug})

        if (!blog) {
            return res.status(400).json({
                msg: "Blog not found"
            })
        }
        
        if(_id !== blog.owner){
            return res.status(422).json({
                msg:"You are not authorized to do this task"
            })
        }

        const payloadData = updateBlogType.safeParse(inputData)

        if (!payloadData.success) {
            return res.status(406).json({
                msg: "Plese enter valid input"
            })
        }

        const { title, content } = payloadData.data


        let image
        if (filePath) {
            image = await uploadOnCloudinary(filePath)
        }

        const updatableData = {}

        if (title) {
            updatableData.title = title
        }
        if (content) {
            updatableData.content = content
        }
        if (image) {
            updatableData.image = image.url
        }

        await blog.updateOne(updatableData)

        return res.status(200).json({
            msg: "Blog updated successfully"
        })

    } catch (error) {
        return res.status(500).json({
            mag: "Internal server error"
        })
    }
}


const deleteBlog = async(req,res)=>{
try {

    const slug = req.params.slug
    const {_id} = req.user

    if(!slug){
        return res.status(400).json({
            msg:"Invalid request slug not define"
        })
    }

    const blog = await Blog.findOne({slug})

    if(!blog){
        return res.status(404).json({
            msg:"Blog not found"
        })
    }

    if(blog.owner !== _id){
        return res.status(422).json({
            msg:"You are not authorized to this task"
        })
    }

    const response = await blog.deleteOne({slug})

    if(!response){
        return res.status(500).json({
            msg:"Failed to delete blog"
        })
    }

    return res.status(200).json({
        msg:"Blog deleted successfully"
    })


} catch (error) {
    return res.status(500).json({
        msg:"Internal server error"
    })
}
}


const getAllBlog =  async(req,res)=>{
try {

    const blogs = await Blog.find({})

    if(!blogs.length){
        return res.status(200).json({
            blogs,
            msg:"No data found"
        })
    }

    return res.status(200).json({
        blogs,
        msg:"Blogs data found"
    })

} catch (error) {
    return res.status(500).json({
        msg:"Internal server error"
    })
}
}

// PENDING
const getBlogs = async(req,res)=>{
    try {
        const {_id} = req.user

        const userBlogs = await Blog.aggregate([
            {
                $match: {
                owner: new mongoose.Types.ObjectId(_id)
                }
        },
                {
                  $lookup: {
                    from: "blogs",
                    localField: "owner",
                    foreignField: "_id",
                    as: "blogs"
                  }
                },
                {
                  $project: {
                    firstName:1,
                    avatar:1,
                    blogs:1,
                  }
                }
        ])

        console.log(userBlogs)

        if(!userBlogs.length){
            return res.status(200).json({
                userBlogs,
                msg:"No data found"
            })
        }

        return res.status(200).json({
            userBlogs,
            msg:"Blogs data found"
        })

    } catch (error) {
        return res.status(500).json({
            msg:"Internal server error"
        })
    }
}

export {
    createBlog,
    upadateBlog,
    deleteBlog,
    getAllBlog,
    getBlogs
}