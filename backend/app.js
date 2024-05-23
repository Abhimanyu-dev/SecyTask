const express = require("express")
const app = express()
const fileUpload = require("express-fileupload")
const bodyParser = require("body-parser")

app.use(express.json())
// app.use(express.urlencoded({extended: false}))
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(fileUpload({useTempFiles: true}))
app.use((req, res, next) => {
    console.log(req.url)
    console.log(req.body)
    next()
})
app.use("/api/users", require("./routes/routes"))

app.listen(3000, (error) => {
    if(error){
        console.log(error)
    }else{
        console.log("Server successfully started on port 3000")
    }
})
