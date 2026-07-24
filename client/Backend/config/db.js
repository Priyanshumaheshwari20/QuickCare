import mongoose from "mongoose"

const connectDB = async() => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/QuickCare");
        console.log("MongoDB Connected")
    } catch (erorr) {
        console.log(error)
    }
}

export default connectDB