import './App.css'
import Landing from './Landing'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Signup from './Components/Signup'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
      
  
    </BrowserRouter>
      
      
    </>
  )
}

export default App
