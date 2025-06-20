import { useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router"
import { Login } from "./Components/Login/Login"
import {SubProject} from "./Components/SubProject/SubProject"
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/SubProject" element={<SubProject />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App