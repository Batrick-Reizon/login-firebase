import { signOut } from "firebase/auth"
import auth from "./Config"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

function Home() {
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

    const handleLogout = () => {
        auth.signOut().then(() => {
            console.log("Logged out")
            navigate("/login")
        }).catch((error) => {
            console.log("Failed to logged out")
        })
    }

    return (<div className="flex h-screen justify-center items-center">
        <div className="w-1/3 p-10 bg-green-700 rounded text-center">
            <h1 className="text-white font-black text-3xl">Login Successfull 🎉</h1>
            <h4 className="my-3 text-lg text-white">Welcome to home page, Please continue 😊</h4>
            <button onClick={handleLogout} className="text-white font-medium bg-black rounded p-2">logout</button>
        </div>
    </div>)
}

export default Home