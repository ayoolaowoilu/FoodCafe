
import Auth from './components/auth.tsx'
import Home from './components/home.tsx'
import Login from './components/login.tsx'
import Cart from './components/cart.tsx'
import Post from './components/post.tsx'
import Reg from './components/reg.tsx'
import "./style.css"


import { Route,Routes,BrowserRouter } from 'react-router-dom'



function App() {


  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/login" element={<Login />} ></Route>
      <Route path='/reg' element={<Reg />} ></Route>
      <Route element={<Auth />}>
       <Route path="/home" element={<Home />}></Route>
       <Route path='/post' element={<Post />} ></Route>
       <Route path="/cart" element={<Cart />} ></Route>
      </Route>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
