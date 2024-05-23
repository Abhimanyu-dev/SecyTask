const express = require("express")
const router = express.Router()
const {getUser, getUsers, createUser, update, markAttendance, findFace} = require("../controller/user")


router.get("/", (req, res) => getUsers(req, res))

router.post("/user", (req, res) => getUser(req, res, req.body.rollno, req.body.password)) 

router.post("/", (req, res) => createUser(req, res))

router.put("/:rollno", (req, res) => update(req, res, req.params.rollno))

router.post("/markAttendance", (req, res) => markAttendance(req, res, req.body.rollno, req.body.subject, req.body.date, req.body.status))

router.post("/match", (req, res) => findFace(req, res))

module.exports = router