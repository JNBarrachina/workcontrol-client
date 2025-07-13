import { useEffect, useState } from 'react';
import './DashboardbyEmplooyeedProjets.scss';

const DashboardbyEmplooyeedbyProjets = () => {
  const [rawData, setRawData] = useState([]);
  const [groupedData, setGroupedData] = useState(null);

  const [showProjects, setShowProjects] = useState(false);
  const [showSubprojects, setShowSubprojects] = useState(false);

  const [currentEmployee, setCurrentEmployee] = useState('');
  const [currentProjects, setCurrentProjects] = useState(null);
  const [currentProjectName, setCurrentProjectName] = useState('');
  const [currentSubprojects, setCurrentSubprojects] = useState(null);

  const user = JSON.parse(localStorage.getItem("login"));

  // 1. Fetch desde el backend
  useEffect(() => {
    fetch('http://localhost:3000/fetchs/employeed_assigned', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        rol: user.role,
        id: user.id,
      })
    })
      .then(res => res.json())
      .then(data => {
        setRawData(data);
      })
      .catch(err => console.log(err));
  }, []);

  // 2. Agrupación
  useEffect(() => {
    const grouped = {};

    rawData.forEach(item => {
      const emp = item.Employeed;
      const proj = item["Assigned Project"];
      const sub = item["Assigned SubProject"];
      const date = item["Date Assigned"];

      if (!grouped[emp]) grouped[emp] = {};
      if (!grouped[emp][proj]) grouped[emp][proj] = [];

      const exists = grouped[emp][proj].some(([existingSub]) => existingSub === sub);
      if (!exists) grouped[emp][proj].push([sub, date]);
    });

    setGroupedData(grouped);
  }, [rawData]);

  // 3. Abrir modales
  const handleOpenProjects = (employee, projects) => {
    setCurrentEmployee(employee);
    setCurrentProjects(projects);
    setShowProjects(true);
  };

  const handleOpenSubprojects = (projectName, subprojects) => {
    setCurrentProjectName(projectName);
    setCurrentSubprojects(subprojects);
    setShowSubprojects(true);
  };

  return (
    <article id="main-dashboardbyemployeedprojects" style={{ padding: '10px', height: '51.5rem', overflow:'hidden', overflowY: 'auto' }}>
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Projects</th>
          </tr>
        </thead>
        <tbody>
          {groupedData &&
            Object.entries(groupedData).map(([employee, projects]) => (
              <tr key={employee}>
                <td>{employee}</td>
                <td>
                  <button onClick={() => handleOpenProjects(employee, projects)} style={{ fontWeight: 'bold', backgroundColor: '#e262ff', color: '#fff' }}>
                    View Projects ({Object.keys(projects).length})
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Modal Projects */}
      {showProjects && (
        <div className="modal">
          <div className="modal-content">
            <section style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem' }}>
              <h2>{currentEmployee}'s Projects</h2>
              <button onClick={() => setShowProjects(false)} style={{ fontWeight: 'bold' }}>Close</button>
            </section>

            <table className="projects-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Subprojects</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(currentProjects).map(([projectName, subprojects]) => (
                  <tr key={projectName}>
                    <td>{projectName}</td>
                    <td>
                      <button onClick={() => handleOpenSubprojects(projectName, subprojects)} style={{ fontWeight: 'bold' }}>
                        View Subprojects ({subprojects.length})
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Subprojects */}
      {showSubprojects && (
        <div className="modal">
          <div className="modal-content">
            <section style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '1rem' }}>
              <h2>{currentProjectName} Subprojects</h2>
              <button onClick={() => setShowSubprojects(false)} style={{ fontWeight: 'bold' }}>Close</button>
            </section>

            <table className="subprojects-table">
              <thead>
                <tr>
                  <th>Subproject</th>
                  <th>Date Assigned</th>
                </tr>
              </thead>
              <tbody>
                {currentSubprojects.map(([sub, date], index) => (
                  <tr key={index}>
                    <td>{sub}</td>
                    <td>{date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </article>
  );
};

export { DashboardbyEmplooyeedbyProjets };