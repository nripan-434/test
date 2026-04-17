import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import ProtectedRoutes from './pages/ProtectedRoutes'

const App = () => {
  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<ProtectedRoutes><Home/></ProtectedRoutes>}/>
      </Routes>
    </div>
  )
}

export default App
