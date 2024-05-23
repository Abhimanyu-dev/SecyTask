const faceapi = require("face-api.js")
const canvas = require("canvas")
const {Canvas, Image} = require("canvas")
const fileUpload = require("express-fileupload")
const fs = require("fs")
const { head } = require("../routes/routes")
faceapi.env.monkeyPatch({Canvas, Image})
const img_path = "./data/image_data.json"


async function LoadModels() {
    await faceapi.nets.faceRecognitionNet.loadFromDisk(__dirname + "/../models")
    await faceapi.nets.faceLandmark68Net.loadFromDisk(__dirname + "/../models")
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(__dirname + "/../models")
    
}

async function saveImage(image, label){
    try{
        await LoadModels()
        const img = await canvas.loadImage(image)
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
        const img_data = JSON.parse(fs.readFileSync(img_path))
        img_data[label] = detections.descriptor
        fs.writeFileSync(img_path, JSON.stringify(img_data))
    }catch(error){
        console.log(error)
    }
}

const detector = async(image) => {
    await LoadModels()
    let faces = JSON.parse(fs.readFileSync(img_path))
    const face_array = []
    var i = 0
    for(label in faces){ 
        faces[label] = new Float32Array(Object.values(faces[label]))
        face_array[i] = new faceapi.LabeledFaceDescriptors(label, [faces[label]])
        i++
    }
    const faceMatcher = new faceapi.FaceMatcher(face_array, 0.6)

    const img = await canvas.loadImage(image)
    let temp = faceapi.createCanvasFromMedia(img)

    const displaySize = { width: img.width, height: img.height}

    faceapi.matchDimensions(temp, displaySize)

    const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    const results = faceMatcher.findBestMatch(resizedDetections.descriptor)
    return results
}

module.exports = {
    saveImage,
    LoadModels,
    detector
}