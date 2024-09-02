// require('dotenv').config({path: './env'}) one way to do .env to access anywhere
import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})


connectDB()
    .then(() => {
        //always check for error before listen good practice
        app.on("error", (error) => {
            console.log("ERRORR: before listen in index.js", error);
            throw error;
        })
        //then listen
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port : ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("MONGODB connection failed (in index.js) !!!", err);
    })


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