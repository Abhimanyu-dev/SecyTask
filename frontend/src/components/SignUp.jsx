import { useState } from "react"
import { useParams, Link } from "react-router-dom"


const SignUp = () => {
    const token = useParams()["token"]
    const [rollno, setRollno] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [img, setImg] = useState(null)
    const handleSubmit = async() => {
        const data = new FormData()
        data.append('img', img)
        data.append("rollno", rollno)
        data.append("username", username)
        data.append("password", password)
        data.append("label", rollno)

        const response = await fetch("/api", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                // 'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Bearer ${token}`
            },
            body: data
        })
        const json = await response.json()
        alert(json["message"])

    }
    return (
        <div className="w-screen h-screen flex items-center justify-center">   
            <div className="home border p-2 bg-red-400 absolute left-1 bottom-1 width-auto">
                <Link to="/">HOME</Link>
            </div>
            <div className="w-[80%] h-[50%] border flex flex-row items-center justify-evenly rounded-xl">
                <div className="w-full text-center font-bold text-5xl">Sign Up</div>
                <div className="form w-full h-full flex flex-col items-center justify-evenly">
                    <input type="text" className="w-[80%] p-2 border rounded-xl" placeholder="Roll No." value={rollno} onChange={(e) => setRollno(e.target.value)}/>
                    <input type="text" className="w-[80%] p-2 border rounded-xl" placeholder="UserName" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <input type="password" className="w-[80%] p-2 border rounded-xl" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="file" name="" id="" onChange={(e) => setImg(e.target.files[0])}/>
                    <button className="bg-blue-600 rounded-lg px-5 py-3 text-white" onClick={handleSubmit} >Submit</button>
                </div>
            </div>
        </div>
    )
}

export default SignUp