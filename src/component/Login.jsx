import React, { useEffect, useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import auth from "./Config"
import { Link, useNavigate } from "react-router-dom"

function Login() {
    const [email,setemail] = useState("")
    const [password,setpassword] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        auth.onAuthStateChanged(function(email) {
            if(email) {
                console.log("Logged In")
                navigate("/home")
            } else {
                console.log("Logged Out")
                navigate("/login")
            }
        })
    },[navigate])

    const handlemailchange = (event) => {
        setemail(event.target.value)
    }
    const handlepasswordchange = (event) => {
        setpassword(event.target.value)
    }
    const handlesubmit = async (event) => {
        event.preventDefault()

        try {
            const res = await signInWithEmailAndPassword(auth,email.trim(),password)
            console.log("Login Successfully:", res.user.email)
            alert("Login Successfully.")
            navigate("/home")
            setemail("")
            setpassword("")
        } catch(error) {
            if(error.code === "auth/invalid-credential") {
                alert("Incorrect email or password. Please try again.")
            } else {
                alert("Login failed. Please try again")
            }
            console.log("Failed to login", error.code, error.message)
        }
    }

    return (<div className="w-full h-screen flex justify-center items-center">
        <form onSubmit={handlesubmit} className="flex flex-col gap-3 w-[80%] sm:w-[60%] md:w-[40%] lg:w-1/4 bg-blue-800 text-white p-5 lg:p-10 rounded text-center">
            <h1 className="text-xl md:text-3xl font-black">Login Page</h1>
            <input type="email" value={email} onChange={handlemailchange} placeholder="Enter Email" className="border-2 border-black outline-none p-1 text-black" required></input>
            <input type="password" value={password} onChange={handlepasswordchange} placeholder="Enter Password" className="border-2 border-black outline-none p-1 text-black" required></input>
            <div className="flex justify-center items-center">
                <button type="submit" className="bg-black text-xl px-3 py-1">Login</button>
            </div>
            <p>New user? <Link to={"/signin"} className="text-orange-300 font-black underline underline-offset-2 animate-pulse">Signup</Link></p>
        </form>
    </div>)
}

export default Login