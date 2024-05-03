import mongoose from "mongoose"
const url = `${process.env.CONNECTION_URL}/${process.env.DATABASE_NAME}`

const connectDB = async()=>{
    await mongoose.connect(url).then((response)=>{
        console.log(`Database is connecting on host ${response.connection.host}`)
    }).catch((error)=>{
        console.log(`Error connecting database ${error.message}`)
    })
}

export default connectDB