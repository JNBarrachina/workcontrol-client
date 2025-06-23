import { useContext, useState } from 'react'

import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router"

import { Login } from "./Components/Login/Login"
import { Dashboard } from './Components/pages/Dashboard/Dashboard'
import { NotFound } from './Components/pages/NotFound/NotFound'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={ <Login /> } />
          <Route path="/dashboard" element={ <Dashboard /> } />
          <Route path='/userprofile' element={ <></>} />
          <Route path="/" element={ <Login /> } />
          <Route path="*" element={ <NotFound /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App