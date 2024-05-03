import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

console.log(process.env.CLOUD_NAME)



async function uploadOnCloudinary(filePath) {
    try {

        if(!filePath) return null

        const response = await cloudinary.uploader.upload(filePath , {
            resource_type:"auto"
        })

        console.log("file uploaded successfully " , response)

        fs.unlinkSync(filePath)  // delete file when done uploading

        return response

    } catch (error) {
        fs.unlinkSync(filePath)  // delete file when fail to upload 
        console.log("failed to upload file on cloudinay server" , error)
        return null
    }
}


export default uploadOnCloudinary