const express = require("express");
const { checkDataBaseConnection } = require("./DatabaseConnection/db.js")
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")

app.use(cors({
    origin: ["https://pizdec-list.onrender.com"],
    methods: ["GET" , "POST" , "OPTIONS"],
    allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'Accept'
    ],
    credentials: true,
    exposedHeaders: ["Set-Cookie"]  
}))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', 'true')
    res.header('Access-Control-Allow-Origin', req.headers.origin)
    next()
});

app.use(express.json())
app.use(cookieParser())

const SERVER_PORT = 8080

const MainRouters = require("./route/api")
app.use("/api" , MainRouters)

const startServer = async () => {
    const result = await checkDataBaseConnection()
    if(result){
        app.listen(SERVER_PORT , () => {
            console.log(`Server started on port ${SERVER_PORT}`)
        })
    }
    else{
        process.exit(1)
    }
}

startServer()