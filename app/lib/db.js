import mongoose from "mongoose";
const MONGO_URL = process.env.MONGO_URL; //mongo db url
 const connectDB = async () => {
    const connectionstate = mongoose.connection.readyState;
    if (connectionstate === 1) {
        console.log("already connected");
        return;
    }
    if (connectionstate === 2) {
        console.log("already connecting");
        return;
    }
    try{
        await mongoose.connect(MONGO_URL,{
            dbName : "savepulse_db",
            bufferCommands : true,

        });
    } catch(err){
        console.log("Error in connecting to DB",err);
        throw new Error("Error in connecting to DB",err);
    }

};
export default connectDB;