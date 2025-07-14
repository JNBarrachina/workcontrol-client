  import { useState, useEffect } from 'react';

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { Register } from './components/pages/Register/Register'
import { Login } from "./components/pages/Login/Login";
import { Dashboard } from './components/pages/Dashboard/Dashboard';
import { UserDocs } from './components/pages/UserDocs/UserDocs';
import { AdminArea } from './components/pages/AdminArea/AdminArea';
import { DashboargetEmplooyeedsbyProjects } from './components/molecules/DashboardFetch/DashdoargetemployeesdbyProjects/DashboargetEmplooyeedsbyProjects.jsx';
import { ProjectsManager } from './components/pages/ProjectsManager/ProjectsManager';
import { EmployeesManager } from './components/pages/EmployeesManager/EmployeesManager';
import { NotFound } from './components/pages/NotFound/NotFound';
import { Userprofile } from './components/pages/Userprofile/Userprofile';


import { UserDataContext } from './contexts/UserDataContext';
import { UserProjectsContext } from './contexts/UserProjectsContext';
import { ProjectsManagerProvider } from './contexts/ProjectsManagerContext'; // <--- Aquí
import { MonthlyEntriesContext } from './contexts/MonthlyEntriesContext';
import { NavContext } from './contexts/NavContext';

function App() {
  // estados y lógica local para UserData, UserProjects, entries, navOpen, etc.

  const [userData, setUserData] = useState(() => {
    const stored = localStorage.getItem("login");
    return stored ? JSON.parse(stored) : {};
  });

  const [userProjects, setUserProjects] = useState(() => {
    const stored = localStorage.getItem("userprojects");
    return stored ? JSON.parse(stored) : [];
  });

  const [entries, setEntries] = useState([]);
  const [navOpen, setNavOpen] = useState(false);

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
    <NavContext.Provider value={{ navOpen, setNavOpen }}>
      <UserDataContext.Provider value={{ userData, setUserData, getlogeaded, setlogeaded }}>
        <ProjectsManagerProvider>
          <UserProjectsContext.Provider value={{ userProjects, setUserProjects }}>
            <MonthlyEntriesContext.Provider value={{ entries, setEntries }}>
              <BrowserRouter>
                <Routes>
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/dashboard" element={getlogeaded ? <Dashboard /> : <Login />} />
                  <Route path="/userdocs" element={getlogeaded ? <UserDocs /> : <Login />} />
                  <Route path='/userprofile' element={getlogeaded ? <Userprofile /> : <Login />} />
                  <Route path="/adminarea" element={getlogeaded ? <AdminArea mainContent={<DashboargetEmplooyeedsbyProjects />} /> : <Login />} />
                  <Route path="/adminarea/projectsmanager" element={getlogeaded ? <AdminArea mainContent={<ProjectsManager />} /> : <Login />} />
                  <Route path="/adminarea/employeesmanager" element={getlogeaded ? <AdminArea mainContent={<EmployeesManager />} /> : <Login />} />
                  <Route path="/" element={<Navigate to="/login" />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </MonthlyEntriesContext.Provider>
          </UserProjectsContext.Provider>
        </ProjectsManagerProvider>
      </UserDataContext.Provider>
    </NavContext.Provider>
  );
}

export default App;
