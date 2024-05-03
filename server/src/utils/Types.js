import zod from "zod"

// user types ----

const registerUserType = zod.object({
    firstName:zod.string().max(20),
    lastName:zod.string().max(20).optional(),
    password:zod.string().min(8),
    email:zod.string().email(),
    username:zod.string().toLowerCase()
})


const loginUserType = zod.object({
    email:zod.string().email(),
    password:zod.string()
})


const updateProfileType = zod.object({
    firstName:zod.string().max(20).optional(),
    lastName:zod.string().max(20).optional(),
    phone:zod.string().length(10).optional(),
    email:zod.string().email().optional()

})


const updatePasswordType = zod.object({
    oldPassword:zod.string(),
    newPassword:zod.string().min(8),
    confirmPassword:zod.string().min(8)
})


const forgetUserType = zod.object({
    email:zod.string().email()
})


// blog types -------------


const createBlogType = zod.object({
    title:zod.string(),
    content:zod.string(),
})


const updateBlogType = zod.object({
    title:zod.string(),
    content:zod.string()
})


export {
    registerUserType,
    createBlogType,
    updateBlogType,
    loginUserType,
    updateProfileType,
    updatePasswordType,
    forgetUserType
}