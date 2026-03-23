import { Link, useNavigate } from "react-router-dom"
import auth from "./Config"
import { useEffect, useState } from "react"
import { createUserWithEmailAndPassword, signOut } from "firebase/auth"

function Signup() {
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
                navigate("/signup")
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
            const res = await createUserWithEmailAndPassword(auth, email.trim(), password)
            console.log("Account created successfully!", res.user.email)
            alert("Account created successfully!")
            auth.signOut().then(() => {
                navigate("/login")
            }).catch((error) => {
                console.log(error)
            })
            setEmail("")
            setPassword("")
        } catch (error) {
            if (error.code === "auth/invalid-email") {
                alert("Invalid email format. Please check your email.")
            } else if (error.code === "auth/weak-password") {
                alert("Password should be atlease 6 characters.")
            } else if (error.code === "auth/email-already-in-use") {
                alert("This email is already register. Please use another email to signup.")
            } else {
                alert("Error in creating account. Please try again")
            }
            console.log("Error in creating account", error.code, error.message)
        }
    }

    return (<div className="flex h-screen justify-center items-center">
        <form onSubmit={handleSubmit} className="w-1/3 p-10 bg-yellow-700 rounded">
            <h1 className="text-white font-black text-3xl text-center">Signup Page</h1>
            <input type="email" value={email} onChange={handleChangeEmail} className="border-2 border-black p-1 bg-white w-full my-3 outline-none" placeholder="Enter email" required />
            <input type="password" value={password} onChange={handleChangePassword} className="border-2 border-black p-1 bg-white w-full outline-none" placeholder="Enter password" required />
            <div className="text-center my-3">
                <button type="submit" className="text-white font-medium bg-black rounded p-2">Signup</button>
            </div>
            <h3 className="text-white text-lg text-center">Already have a account? <Link to={"/login"} className="text-yellow-300 animate-pulse font-semibold">Login</Link></h3>
        </form>
    </div>)
}

export default Signup