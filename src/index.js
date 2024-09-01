// require('dotenv').config({path: './env'}) one way to do .env to access anywhere
import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})


connectDB();


//iife database and express connection example
/*; (async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("ERR: ", error);
            throw error
        })
        app.listen(process.env.PORT, () => {
            console.log(`Appis listening on port ${process.env.PORT}`);
        })
    } catch (error) {
        console.error("Error: ", error)
        throw err
    }
})()*/