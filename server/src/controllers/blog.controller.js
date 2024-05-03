import Blog from "../models/blog.model.js"
import uploadOnCloudinary from "../utils/cloudinary.js"
import { createBlogType, updateBlogType } from "../utils/Types.js"



const createBlog = async (req, res) => {
    try {
        const inputData = req.body
        const filePath = req.file ? req.file.path : null

        if (!inputData || !filePath) {
            return res.status(400).json({
                msg: "All fields must be require"
            })
        }

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
            image: image.url
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
        const id = req.params.id
        const filePath = req.file ? req.file.path : null

        if (!inputData) {
            return res.status(400).json({
                msg: "All field must be require"
            })
        }

        const payloadData = updateBlogType.safeParse(inputData)

        if (!payloadData.success) {
            return res.status(406).json({
                msg: "Plese enter valid input"
            })
        }

        const { title, content } = payloadData.data
        
        const blog =  await Blog.findById(id)
        
        if(!blog){
            return res.status(400).json({
                msg:"Blog not found"
            })
        }

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
            msg:"Blog updated successfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            mag: "Internal server error"
        })
    }
}
export {
    createBlog,
    upadateBlog
}