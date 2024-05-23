const dataPath = "./data/data.json"
const subject_path = "./data/subjects.json"

const { error } = require("console")
const fs = require("fs")
const {create_token, role} = require("./token")
const { saveImage, LoadModels, detector } = require("../face-detection/detector")

const subject_data = JSON.parse(fs.readFileSync(subject_path))

const saveUser = (data) =>{
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}

const getUserData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)
}

const getUsers = (req, res) => {
    const token = req.headers.authorization.split(" ")[1]
    if(role(token) === "admin")
        res.json(getUserData())
    else
        res.json({message: "Permission Denied"})
}

const getUser = (req, res, rollno, password) => {
    const user = getUserData()[rollno]
    if(user){
        if(user.password === password){
            const token = create_token(user)
            res.json({data: {
                token: token,
                user: user
            }})
        }
        else
            res.status(400).json({message: "Wrong Credentials"})
    }else{
        res.status(400).json({error: "User not found"})
    }
}

const createUser = async (req, res) => {
    if(role(req.headers.authorization.split(" ")[1]) === "admin"){
        const data = getUserData()
        if(data[req.body.rollno]){
            res.status(400).json({message: "User already exists"})
        } else {
            if(!req.body.username | !req.body.password | !req.body.rollno){
                res.status(400).json({message: "Details Incomplete"})
            }else{
                
                const subjects = {}
                for(var subject in subject_data){
                    subjects[subject] = {}
                }

                data[req.body.rollno] = {
                    "username": req.body.username,
                    "password": req.body.password,
                    "role": "user",
                    "subjects": subjects
                }
                saveUser(data)
                LoadModels()
                const img1 = req.files.img.tempFilePath
                const label = req.body.label
                await saveImage(img1, label)
                res.status(200).json({message: "User successfully registered"})
            }
        }
    }else
        res.json({message: "Invalid Token"})
}

const update = (req, res, rollno) => {
    if(role(req.headers.authorization.split(" ")[1]) === "admin"){
        const users = getUserData()
        if(users[req.params.rollno]){
            users[req.params.rollno]['username'] = req.body.username
            users[req.params.rollno]['password'] = req.body.password
            saveUser(users)
            res.json({message: "Updated Successfully"})
        }else{
            res.status(400).json({message: "User not found"})
        }
    }else
        res.json({message: "Invalid Token"})
}

const updateAttendance = (date, subject, rollno, status) => {
    if(status){
        if(subject_data[subject][date]){
            subject_data[subject][date].push(rollno)
        }else{
            subject_data[subject][date] = [rollno]
        }
    }else{
        if(subject_data[subject][date]){
            subject_data[subject][date].splice(subject_data[subject][date].indexOf(rollno), 1)
        }
    }
    fs.writeFileSync(subject_path, JSON.stringify(subject_data))
}

const markAttendance = (req, res, rollno, subject, date, status) => {

    if(role(req.headers.authorization.split(" ")[1]) === "admin"){
        const users = getUserData()

        if(!users[rollno]){
            res.status(400).json({error: "User not found"})
        }else{

            if(status)
                users[rollno]["subjects"][subject][date] = "P"
            else
                delete users[rollno]["subjects"][subject][date]
            updateAttendance(date, subject, rollno, status)
            saveUser(users)
            res.json({message: "Attendance marked"})
        }
    }else   
        res.json({message: "Invalid Token"})
}

const findFace = async (req, res) => {
    const img = req.files.img.tempFilePath
    let result = await detector(img)
    res.json({result})
}


module.exports = {
    getUser,
    getUsers,
    createUser, 
    update,
    markAttendance,
    findFace
}