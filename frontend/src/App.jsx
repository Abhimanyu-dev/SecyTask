import { useEffect, useState } from 'react'
import './App.css'
import Login from './components/Login'
import Admin from './components/Admin'
import User from './components/User'
import { useParams } from 'react-router-dom'

function App() {
  const [rollno, setRollno] = useState("")
  const [password, setPassword] = useState("")
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {

  }, [token])

  return (
    <>
      {
        token ? 
        user["role"] === "admin" ?
        <Admin user={user} token={token}/>:
        <User />:
        <Login rollno={rollno} setRollno={setRollno} password={password} setPassword={setPassword} setToken={setToken} setUser={setUser}/>  
      }
      
    </>
  )
}

export default App
