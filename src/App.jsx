import { useState } from 'react'

import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router"

import { Login } from "./Components/Login/Login"
import { Dashboard } from './Components/pages/Dashboard/Dashboard'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App