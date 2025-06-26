import { useContext, useEffect, useState } from 'react'

import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router"

import { Login } from "./Components/pages/Login/Login"
import { Dashboard } from './Components/pages/Dashboard/Dashboard'
import { AdminArea } from './Components/pages/AdminArea/AdminArea'
import { NotFound } from './Components/pages/NotFound/NotFound'
import { Userprofile } from './Components/pages/Userprofile/Userprofile.jsx'

import { UserDataContext } from './contexts/UserDataContext'
import { UserProjectsContext } from './contexts/UserProjectsContext'
import { MonthlyEntriesContext } from './contexts/MonthlyEntriesContext'

function App() {

  const [userData, setUserData] = useState(() => {
    const stored = localStorage.getItem("login");
    return stored ? JSON.parse(stored) : {};
  });

  const [userProjects, setUserProjects] = useState(() => {
    const stored = localStorage.getItem("userprojects");
    return stored ? JSON.parse(stored) : [];
  });

  const [entries, setEntries] = useState([]);

  const [getlogeaded, setlogeaded] = useState(() => {
    try {
      const stored = localStorage.getItem("logead");
      return stored !== null ? JSON.parse(stored) : false;
    } catch (e) {
      console.error("Error parsing logead from localStorage:", e);
      return false;
    }
  });

  useEffect(() => {
    localStorage.setItem('logead', JSON.stringify(getlogeaded));
  }, [getlogeaded]);

  return (
    <>
      <UserDataContext.Provider
        value={{ userData, setUserData, getlogeaded, setlogeaded }}
      >
        <UserProjectsContext.Provider value={{ userProjects, setUserProjects }}>
          <MonthlyEntriesContext.Provider value={{ entries, setEntries }}>
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={getlogeaded ? <Dashboard /> : <Login />} />
                <Route path="/adminarea" element={getlogeaded ? <AdminArea /> : <Login />} />
                <Route path='/userprofile' element={getlogeaded ? <Userprofile /> : <Login />} />
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </MonthlyEntriesContext.Provider>
        </UserProjectsContext.Provider>
      </UserDataContext.Provider>
    </>
  )
}

export default App