import jwt from "jsonwebtoken"
import { verifyOtpType } from "../utils/Types"
import User from "../models/user.model"


const veriftJWT = async (req, res, next) => {
    try {
        let token
        if (req.cookies) {
            token = req.cookies.accessToken
        } else {
            token = req.headers.authorization.split(" ")[1]
        }

        if (!token) {
            return res.status(422).json({
                msg: "Unauthorized access"
            })
        }

        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
        if (!user) {
            return res.status(422).json({
                msg: "Unauthorized access"
            })
        }

        req.user = user
        next()

    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error"
        })
    }
}


const refreshJWT = async (req, res, next) => {

    const incomingToken = req.cookies ? req.cookies.refreshToken : req.body.refreshToken

    if (!incomingToken) {
        return res.status(401).json({
            msg: "Unauthorized access"
        })
    }

    try {

        const decodedToken = jwt.verify(incomingToken , process.env.ACCESS_TOKEN_SECRET_KEY )

        if(!decodedToken){
            return res.status(401).json({
                msg:"Invalid token"
            })
        }

        const user = {
            id: decodedToken._id,
            token:incomingToken
        }

        req.user = user

        next()

    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error"
        })
    }
}


const verifyOTP = async(req,res,next)=>{
    const inputData = req.body

    if(!inputData){
        return res.status(400).json({
            msg:"All fields must be required"
        })
    }
    try {
        const token = req.cookies ? req.cookies.accessToken : req.headers.authorization.split(" ")[1]
    
        if(!token){
            return res.status(422).json({
                msg:"Unauthorized access"
            })
        }
        
        const payloadData = verifyOtpType.safeParse(inputData)

        if(!payloadData.success){
            return res.status(406).json({
                msg:"Please enter valid input"
            })
        }

        const decodedToken = jwt.verify(token , process.env.ACCESS_TOKEN_SECRET_KEY)
        
        if(!decodedToken){
            return res.status(401).json({
                msg:"Invalid user"
            })
        }

        const user = await User.findById(decodedToken ? decodedToken._id : null)

        if(!user){
            return res.status(404).json({
                msg:"Invalid user"
            })
        }

        const {otp} =  payloadData.data


        if(user.verificationToken !== otp){
            return res.status(400).json({
                msg:"Invalid otp"
            })
        }

        req.user = user._id

        next()
        

    } catch (error) {
        return res.status(500).json({
            msg:"Internal server error"
        })
    }
}

export {
    veriftJWT,
    refreshJWT,
    verifyOTP
}