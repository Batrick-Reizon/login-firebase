import React from "react"
import { useNavigate } from "react-router-dom"
import auth from "./Config"

function Home() {
    const navigate = useNavigate()

    const handlelogout = () => {
        auth.signOut().then(() => {
            console.log("Logout successfully!")
            navigate("/login")
        }).catch((error) => {
            console.log("Failed to logout", error)
        })
    }

    return(<div className="flex w-full h-screen justify-center items-center">
        <div className="bg-green-800 p-3 lg:p-5 rounded w-[80%] sm:w-[60%] md:w-[40%] lg:w-1/4 text-white text-center">
            <h1 className="text-base md:text-xl font-black">Login Successfull 🎉</h1>
            <p className="my-3">Welcome to Home page. Please continue 😊.</p>
            <button onClick={handlelogout} className="bg-black px-3 py-1">Logout</button>
        </div>
    </div>)
}

export default Home