import mongoose from "mongoose"
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_url);
        console.log(`connected To Database`);
    } catch (error) {
        console.log(`Error in MongoDb ${error}`)
    }
};
export default connectDB;

