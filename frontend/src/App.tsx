
import Auth from './components/auth.tsx'
import Home from './components/home.tsx'
import Login from './components/login.tsx'
import Cart from './components/cart.tsx'
import Post from './components/post.tsx'
import Reg from './components/reg.tsx'
import Gen from "./components/genpage.tsx"
import "./style.css"


import { Route,Routes,BrowserRouter } from 'react-router-dom'
import Profile from './components/profile.tsx'



function App() {


  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/login" element={<Login />} ></Route>
      <Route path='/reg' element={<Reg />} ></Route>
      <Route path="/" index element={<Gen />}></Route>
      <Route element={<Auth />}>
       <Route path="/home" element={<Home />}></Route>
       <Route path='/post' element={<Post />} ></Route>
       <Route path="/cart" element={<Cart />} ></Route>
       <Route path="/profile" element={<Profile />}></Route>
       
      </Route>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
