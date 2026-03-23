import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./component/Login"
import Signup from "./component/Signup"
import Home from "./component/Home"

function App() {
  return (<BrowserRouter>
  <Routes>
    <Route path="/" element={<Login></Login>}></Route>
    <Route path="/login" element={<Login></Login>}></Route>
    <Route path="/signup" element={<Signup></Signup>}></Route>
    <Route path="/home" element={<Home></Home>}></Route>
  </Routes>
  </BrowserRouter>)
}

export default App