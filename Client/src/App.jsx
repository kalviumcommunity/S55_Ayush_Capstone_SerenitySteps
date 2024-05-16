import './App.css'
import Landing from './Pages/Landing'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Signup from './Components/Signup'
import Login from './Components/Login'
import AboutUs from './Components/AboutUs'
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/About' element={<AboutUs/>}/>
      </Routes>
      
  
    </BrowserRouter>
      
      
    </>
  )
}

export default App
