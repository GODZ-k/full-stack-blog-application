import mongoose, { model, Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const rounds = 10

const userSchema = new Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        index: true,
        unique: true,
        trim: true,
        lowerCase: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowerCase: true,
        required:true
    },
    verificationToken: {
        type: String
    },
    // phone: {
    //     type: String,
    //     required:true
    // },
    avatar: {
        type: String,
    },

    password: {
        type: String,
        required: true
    },
    refreshToken:{
        type:String
    }
}, {
    timestamps: true
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, rounds)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id
    }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id
    }, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY })
}

const User = model("User", userSchema)


export default User