import { useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router"
import { Login } from "./Components/Login/Login"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App