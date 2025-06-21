import { useState } from 'react'
import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router"
import { Login } from "./Components/Login/Login"
import {SubProject} from "./Components/SubProject/SubProject"
import {EmployeeWorkEntry} from "./Components/EmployeeWorkEntry/EmployeeWorkEntry"
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
          <Route path="/EmployeeWorkEntry" element={<EmployeeWorkEntry />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App