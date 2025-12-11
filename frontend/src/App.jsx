import { Route, Routes, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./page/home"
import Signup from "./page/Signup"
import Login from "./page/Login"
import Blog from "./page/Blog"
import BlogId from "./page/BlogId"


function App() {

  const location = useLocation();

  const hideNavbarPaths = ["/login", "/signup"]
  return (
    <div className="min-h-screen bg-background text-foreground">
         {
          !hideNavbarPaths.includes(location.pathname) &&  <Navbar />
         }

         <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/signup" element={<Signup/>}></Route>
            <Route path="/login" element={<Login/>} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogId />} />
         </Routes>
    </div>
  )
}

export default App
