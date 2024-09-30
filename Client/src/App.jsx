
import Landing from './Pages/Landing'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Signup from './Components/Signup'
import Login from './Components/Login'
import AboutUs from './Components/AboutUs'
import Home from './Pages/Home'
import Meditation from './Pages/Meditation'
import Workout from './Pages/Workout'
import ExerciseDetail from './Pages/ExerciseDetail'
import Games from './Pages/Games'

// import Chess from './Pages/Chess'

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/About' element={<AboutUs/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/meditate' element={<Meditation/>}/>
        <Route path='/workout' element={<Workout/>}/>
        <Route path='/exercise/:id' element={<ExerciseDetail/>}/>
        <Route path='/games' element={<Games/>}/>
        
      </Routes>
      
  
    </BrowserRouter>
      
      
    </>
  )
}

export default App
