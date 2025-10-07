import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./component/Login"
import Signin from "./component/Signup"
import Home from "./component/Home"

function App() {
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login></Login>}></Route>  
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/signin" element={<Signin></Signin>}></Route>  
            <Route path="/home" element={<Home></Home>}></Route>
        </Routes>       
        </BrowserRouter>
    )
}

export default App