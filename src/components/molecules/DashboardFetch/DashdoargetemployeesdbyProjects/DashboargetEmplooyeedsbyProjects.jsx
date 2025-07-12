import { useEffect, useState } from 'react';
import './DashboargetEmplooyeedsbyProjects.scss';

const DashboargetEmplooyeedsbyProjects = () => {
  // Estado para guardar los datos crudos desde la API
  const [rawData, setRawData] = useState([]);

  // Estado para guardar los datos organizados por empleado y proyecto
  const [groupedData, setGroupedData] = useState(null);

  // Estados para manejar los modales
  const [showProjects, setShowProjects] = useState(false);
  const [showSubprojects, setShowSubprojects] = useState(false);

  // Datos del empleado/proyecto actual
  const [currentEmployee, setCurrentEmployee] = useState('');
  const [currentProjects, setCurrentProjects] = useState(null);
  const [currentProjectName, setCurrentProjectName] = useState('');
  const [currentSubprojects, setCurrentSubprojects] = useState(null);

  // 1. Obtener datos desde el backend al cargar el componente
  useEffect(() => {
    fetch('http://localhost:3000/fetchs/employeeds_projects')
      .then(res => res.json())
      .then(data => setRawData(data[1])) // Usamos el segundo elemento del array
      .catch(err => console.error(err));
  }, []);

  // 2. Formatar datos -> empleado > proyecto > subproyecto
  useEffect(() => {
    const grouped = {};

    rawData.forEach(item => {
    //Los valores bienen asi de la bbdd
      const emp = item.Employeed;
      const proj = item["Assigned Project"];
      const sub = item["Assigned SubProject"];
      const date = item["Date Assigned"];

        // Si no existe el empleado
        if (!grouped[emp]) {
            grouped[emp] = {};
        }

        // Si no existe el proyecto para ese empleado
        if (!grouped[emp][proj]) {
            grouped[emp][proj] = [];
        }

        // Arry recorrido si ya existe ese subproyecto
        const subAlreadyExists = grouped[emp][proj].some(([existingSub]) => existingSub === sub);

        // Si no existe, lo añadimos
        if (!subAlreadyExists) {
        grouped[emp][proj].push([sub, date]);
        }

    });

    setGroupedData(grouped);
  }, [rawData]);

  // Abrir popup de proyectos
  const handleOpenProjects = (employee, projects) => {
    setCurrentEmployee(employee);
    setCurrentProjects(projects);
    setShowProjects(true);
  };

  // Abrir popup de subproyectos
  const handleOpenSubprojects = (projectName, subprojects) => {
    setCurrentProjectName(projectName);
    setCurrentSubprojects(subprojects);
    setShowSubprojects(true);
  };

  return (
    <article id="main-DashboargetEmplooyeedsbyProjects" style={{padding:'10px', height:'40rem', overflowY:'auto' }}>
      {/* Tabla Principal: empleados y botón para ver proyectos */}
      <table className="main-table" >
        <thead>
          <tr>
            <th>Employees</th>
            <th>Projects</th>
          </tr>
        </thead>
        <tbody>
          {groupedData &&
            Object.entries(groupedData).map(([employee, projects]) => (
              <tr key={employee}>
                <td>{employee}</td>
                <td>
                  <button onClick={() => handleOpenProjects(employee, projects)} style={{fontWeight:'bold', backgroundColor: '#e262ff', color:'#fff'}}>
                    View Projects ({Object.keys(projects).length})
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Modal de proyectos */}
      {showProjects && (
        <div className="modal">
          <div className="modal-content">
            <section style={{ display:'flex', flexDirection:'row', justifyContent:'space-around', with:'100%'}}>
                <h2>{currentEmployee}'s Projects</h2>
                <button onClick={() => setShowProjects(false)} style={{fontWeight:'bold'}}>Close</button>
            </section>
            

            <table className="projects-table" style={{fontWeight:'bold'}}>
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
                      <button onClick={() => handleOpenSubprojects(projectName, subprojects)} style={{fontWeight:'bold'}}>
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

      {/* Modal de subproyectos */}
      {showSubprojects && (
        <div className="modal" >
          <div className="modal-content">
            <section style={{ display:'flex', flexDirection:'row', justifyContent:'space-around', with:'100%'}}>
                <h2>{currentProjectName} Subprojects</h2>
                <button onClick={() => setShowSubprojects(false)} style={{fontWeight:'bold'}}>Close</button>
            </section>

            <table className="subprojects-table" style={{fontWeight:'bold'}}>
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

export { DashboargetEmplooyeedsbyProjects };