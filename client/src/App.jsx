import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, Login, Signup } from './pages'
import { Header , Footer } from './components'

function App() {
  return (
   <>
    <Header/>
   <BrowserRouter>
   <Routes>
    <Route path='/user/signup' element={<Signup/>} />
    <Route path='/user/login' element={<Login/>}/>
    <Route path='/' element={<Home/>} />
   </Routes>
   </BrowserRouter>
    <Footer/>
   </>
  )
}

export default App