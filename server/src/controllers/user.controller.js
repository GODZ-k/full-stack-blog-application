import { Transporter } from "../app.js"
import User from "../models/user.model.js"
import uploadOnCloudinary from "../utils/cloudinary.js"
import { forgetUserType, loginUserType, registerUserType, updatePasswordType, updateProfileType } from "../utils/Types.js"



const generateAccessAndRefreshToken = async (id) => {
    try {
        const user = await User.findById(id)
        if (!user) {
            return res.status(400).json({
                msg: "Invalid user"
            })
        }

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error"
        })
    }
}

const registerUser = async (req, res) => {
    try {
        const inputData = req.body

        if (!inputData) {
            return res.status(406).json(
                { msg: "All field must be require" }
            )
        }

        const payloadData = registerUserType.safeParse(inputData)

        if (!payloadData.success) {
            return res.status(400).json({
                msg: "Please enter valid input"
            })
        }

        const { username, firstName, lastName, email, password } = payloadData.data

        const exitedUser = await User.findOne({ $or: [{ username }, { email }] })

        if (exitedUser) {
            return res.status(400).json({
                msg: "User already exists"
            })
        }

        const user = await User.create({
            username,
            email,
            firstName,
            lastName,
            password
        })

        if (!user) {
            return res.status(500).json({
                msg: "Internal server error"
            })
        }

        return res.status(200).json({
            msg: "User created successfully"
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error"
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const inputData = req.body

        if (!inputData) {
            return res.status(400).json({
                msg: "All fields must be require"
            })
        }

        const payloadData = loginUserType.safeParse(inputData)

        if (!payloadData.success) {
            return res.status(406).json({
                msg: "Please enter valid input"
            })
        }

        const { email, password } = payloadData.data

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            })
        }

        const checkPassword = await user.isPasswordCorrect(password)

        if (!checkPassword) {
            return res.status(422).json({
                msg: "Invalid password"
            })
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)


        const options = {
            httpOnly: true,
            secure: true
        }

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json({
                user: { id: user._id, name: user.firstName, username: user.username, accessToken, email },
                msg: "User loggedin successfully"
            })

    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error"
        })
    }
}

const logOutUser = async (req, res) => {
    try {
        const { _id } = req.user

        const user = await User.findById(_id)

        if (!user) {
            return res.status(422).json({
                msg: "Invalid user"
            })
        }

        await user.updateOne({
            $unset:{
                refreshToken:1
            }
        },{new:true})

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({
            msg:"User logged out successfully"
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error"
        })
    }
}

const updateProfile =  async(req,res)=>{
    try {
        
        const {_id} =  req.user
        const inputData =  req.body

        if(!inputData){
            return res.status(400).json({
                msg:"All field must be required"
            })
        }

        const payloadData = updateProfileType.safeParse(inputData)

        if(!payloadData.success){
            return res.status(406).json({
                msg:"Please enter valid input"
            })
        }

        const { email , firstName , lastName , phone } =  payloadData.data

        const user = await User.findById(_id)

        if(!user){
            return res.status(422).json({
                msg:"Invalid user"
            })
        }

        let updatableData = {}

        if(firstName){
            updatableData.firstName =  firstName
        }
        
        if(lastName){
            updatableData.lastName = lastName
        }
        
        if(phone){
            updatableData.phone = phone
        }
        
        if(email){
            updatableData.email = email
        }

        const response = await user.updateOne(updatableData)

        if(!response){
            return res.status(500).json({
                msg:"Filed to update profile"
            })
        }

        return res.status(200).json({
            msg:"User updated successfully"
        })

        
    } catch (error) {
        return res.status(200).json({
            msg:"User profile updated successfully"
        })
    }
}

const updateProfileImage = async(req,res)=>{
    try {
        const {_id} = req.user
        const filePath = req.file ? req.file.path : null

        if(!filePath){
            return res.status(404).json({
                msg:"File not found"
            })
        }

        const user = await User.findById(_id)

        if(!user){
            return res.status(422).json({
                msg:"Invalid user"
            })
        }

        const avatar = await uploadOnCloudinary(filePath)

        if(!avatar){
            return res.status(500).json({
                msg:"Internal server error"
            })
        }

        const response = await user.updateOne({
            avatar:avatar.url
        })

        if(!response){
            return res.status(500).json({
                msg:"Image updatation failed"
            })
        }

        return res.status(200).json({
            msg:"Profile image updated sucessfully"
        })

    } catch (error) {
        return res.status(500).json({
            msg:"Internal server error"
        })
    }
}

const updateUserPassword = async(req,res)=>{
    try {
        const {_id} = req.user
        const inputData = req.body

        if(!inputData){
            return res.status(400).json({
                msg:"All field must be required"
            })
        }

        const payloadData = updatePasswordType.safeParse(inputData)

        if(!payloadData.success){
            return res.status(406).json({
                msg:"Please enter valid input"
            })
        }

        const user = await User.findById(_id)

        if(!user){
            return res.status(422).json({
                msg:"Invalid user"
            })
        }

        const {oldPassword , newPassword , confirmPassword} =  payloadData.data

        const currentPassword = await user.isPasswordCorrect(oldPassword)

        if(!currentPassword){
            return res.status(400).json({
                msg:"Current password does not match"
            })
        }

        if(oldPassword === newPassword){
            return res.status(406).json({
                msg:"Can not use old password as new password"
            })
        }

        if(newPassword !== confirmPassword){
            return res.status(406).json({
                msg:"Confirm password does not match"
            })
        }

        user.password = newPassword
        user.refreshToken = null
        await user.save({validateBeforeSave:false})

        const options = {
            httpOnly:true,
            secure:true
        }

        return res
        .clearCookie("accessToken" , options)
        .clearCookie("refreshToken" , options)
        .status(200)
        .json({
            msg:"Password updated successfully"
        })

    } catch (error) {
        return res.status(500).json({
            msg:"Internal server error"
        })
    }
}

const forgetPassword =  async(req,res)=>{
    try {
        const inputData = req.body

        if(!inputData){
            return res.status(400).json({
                msg:"All field must be required"
            })
        }

        const payloadData = forgetUserType.safeParse(inputData)

        if(!payloadData.success){
            return res.status(406).json({
                msg:"Please enter valid input"
            })
        }

        const mailOptions = {
            from: "tdm.katts1@gmail.com",
            to: emailOrPhone,
            subject: "Please verify your email",
            text: `To verify your email, click the link ${verificationLink}`,
          };


          const response  =  await Transporter.sendMail(mailOptions)

          if(response.rejected){
            return res.status(500).json({
                msg:"Failed to send mail"
            })
          }
          
    } catch (error) {
        return res.status(500).json({
            msg:"Internal server error"
        })
    }
}

export {
    registerUser,
    loginUser,
    logOutUser,
    updateProfile,
    updateProfileImage,
    updateUserPassword,
    forgetPassword

}