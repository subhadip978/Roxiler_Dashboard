import { useState } from 'react'
import {BrowserRouter  ,Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Transection from './pages/Transection'

function App() {


  return (
    <div >
     
     
<BrowserRouter>
<Routes>
  <Route path="/" element={<Home/>}/>
  <Route path="/transection" element={<Transection/>}/>
</Routes>
</BrowserRouter>


    </div>
  )
}

export default App
