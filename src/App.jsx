import { useContext, useState } from 'react'

import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router"

import { Login } from "./Components/Login/Login"
import { Dashboard } from './Components/pages/Dashboard/Dashboard'
import { NotFound } from './Components/pages/NotFound/NotFound'

import { UserDataContext } from './contexts/UserDataContext'



function App() {

  const [userData, setUserData] = useState(() => {
    const stored = localStorage.getItem("login");
    return stored ? JSON.parse(stored) : {};
  });

  return (
    <>
      <UserDataContext.Provider
        value={{ userData, setUserData }}
      >

        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </UserDataContext.Provider>
    </>
  )
}

export default App