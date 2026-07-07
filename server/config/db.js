import mongoose from "mongoose"

const CONNECTDB= async()=>{
try {
    await mongoose.connect(process.env.MONGODB_URL)
    console.log("db connected")
} catch (error) {
         console.error("❌ MongoDB Error:");
        console.error(error);  
}
}

export default CONNECTDB
