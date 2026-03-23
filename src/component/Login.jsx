import { signInWithEmailAndPassword } from "firebase/auth"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import auth from "./Config"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        auth.onAuthStateChanged((email) => {
            if (email) {
                console.log("Logged in")
                navigate("/home")
            } else {
                console.log("Logged out")
                navigate("/login")
            }
        })
    }, [])

    const handleChangeEmail = (event) => {
        setEmail(event.target.value)
    }
    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const res = await signInWithEmailAndPassword(auth, email.trim(), password)
            console.log("Login successfull", res.user.email)
            alert("Login successfully!")
            navigate("/home")
            setEmail("")
            setPassword("")
        } catch (error) {
            if (error.code === "auth/invalid-credential") {
                alert("Incorrect email or password. Please try again.")
            } else {
                alert("Logged in failed. Please try again.")
            }
            console.log("Failed to Logged in", error.code, error.message)
        }
    }

    return (<div className="flex h-screen justify-center items-center">
        <form onSubmit={handleSubmit} className="w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 p-10 bg-blue-700 rounded">
            <h1 className="text-white font-black text-3xl text-center">Login Page</h1>
            <input type="email" value={email} onChange={handleChangeEmail} className="border-2 border-black p-1 bg-white w-full my-3 outline-none" placeholder="Enter email" required />
            <input type="password" value={password} onChange={handleChangePassword} className="border-2 border-black p-1 bg-white w-full outline-none" placeholder="Enter password" required />
            <div className="text-center my-3">
                <button type="submit" className="text-white font-medium bg-black rounded p-2">Login</button>
            </div>
            <h3 className="text-white text-lg text-center">New user? <Link to={"/signup"} className="text-yellow-300 animate-pulse font-semibold">Signup</Link></h3>
        </form>
    </div>)
}

export default Login