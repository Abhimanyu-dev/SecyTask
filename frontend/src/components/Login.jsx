
const Login = ({rollno, setRollno, password, setPassword, setToken, setUser}) => {
    
    const handleSubmit = async() => {
        let body = {
            "rollno": rollno,
            "password": password
        }
        const response = await fetch("api/user", {
            // mode: "cors",
            body: JSON.stringify(body),
            method: "POST",
            headers: {
                'content-type': 'application/json'
            }
        })
        const data = await response.json()
        setToken(data["data"]["token"])
        setUser(data["data"]["user"])
    }

    return (
        <div className="w-screen h-screen flex items-center justify-center">   
            <div className="w-[80%] h-[50%] border flex flex-row items-center justify-evenly rounded-xl">
                <div className="w-full text-center font-bold text-5xl">Login</div>
                <div className="form w-full h-full flex flex-col items-center justify-evenly">
                    <input type="text" className="w-[80%] p-2 border rounded-xl" placeholder="Roll No." value={rollno} onChange={(e) => setRollno(e.target.value)}/>
                    <input type="password" className="w-[80%] p-2 border rounded-xl" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button className="bg-blue-600 rounded-lg px-5 py-3 text-white" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default Login