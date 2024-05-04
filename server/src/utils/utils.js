import User from "../models/user.model.js"

// genearte access and refresh token
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

// otp geneartor 
function otpGenerator(n){
    let otp = ""
    let number  = "1234567890"
    for(let i=0; i<n; i++){
        otp += number.charAt(Math.floor(Math.random()* number.length))
    }
    return otp
}



export {
    generateAccessAndRefreshToken,
    otpGenerator
}