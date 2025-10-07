import React, { useState } from "react"
import auth from "./Config"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { Link, useNavigate } from "react-router-dom"

function Signup() {
    const [email,setemail] = useState("")
    const [password,setpassword] = useState("")
    const navigate = useNavigate()

    const handlemailchange = (event) => {
        setemail(event.target.value)
    }
    const handlepasswordchange = (event) => {
        setpassword(event.target.value)
    }
    const handlesubmit = async (event) => {
        event.preventDefault()
        try {
            const res = await createUserWithEmailAndPassword(auth,email.trim(),password)
            console.log("Account created successfully:", res.user.email)
            alert("Account created successfully!")
            auth.signOut().then(() => {
                navigate("/login")
            })
            setemail("")
            setpassword("")
        } catch(error) {
            if(error.code === "auth/email-already-in-use") {
                alert("This email is already registered. Please use another email to signin.")
            } else if(error.code === "auth/weak-password") {
                alert("Password should be at least 6 characters.")
            } else if(error.code === "auth/invalid-email") {
                alert("Invaild email format. Please check your email.")
            } else {
                alert("Failed to create account. Please try again.")
            }
            console.log("Error in creating account", error.code, error.message)
        }
    }

    return (<div className="w-full h-screen flex justify-center items-center">
        <form onSubmit={handlesubmit} className="flex flex-col gap-3 w-[80%] sm:w-[60%] md:w-[40%] lg:w-1/4 bg-yellow-800 text-white p-5 lg:p-10 rounded text-center">
            <h1 className="text-xl md:text-3xl font-black">Signup Page</h1>
            <input type="email" value={email} onChange={handlemailchange} placeholder="Enter Email" className="border-2 border-black outline-none p-1 text-black" required></input>
            <input type="password" value={password} onChange={handlepasswordchange} placeholder="Enter Password" className="border-2 border-black outline-none p-1 text-black" required></input>
            <div className="flex justify-center items-center">
                <button type="submit" className="bg-black text-xl px-3 py-1">Signup</button>
            </div>
            <p>Already have an account? <Link to={"/login"} className="text-yellow-300 font-black underline underline-offset-2 animate-pulse">Login</Link></p>
        </form>
    </div>)
}

export default Signup