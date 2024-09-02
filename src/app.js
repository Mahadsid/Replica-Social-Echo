import express from "express" 
import cors from "cors"
import cookieParser from "cookie-parser";

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credntials: true
}))

/* SETTINGS */
//configing I am accepting json data upto 30kb
app.use(express.json({limit: "30kb"}))
//configing express to accept data from url
app.use(express.urlencoded({ extended: true, limit: "30kb" }))
//configing for public assets
app.use(express.static("public"))
//configing cookie parser so that i can acess cookie from use sys and can be able to perform CRUD operations
app.use(cookieParser())


export { app };