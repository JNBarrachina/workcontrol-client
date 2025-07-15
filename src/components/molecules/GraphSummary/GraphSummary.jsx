import {useNavigate} from 'react-router-dom'
import { useState, useContext, useEffect } from 'react';
import { MonthlyEntriesContext } from '../../../contexts/MonthlyEntriesContext';
import { ProjectsManagerContext } from "../../../contexts/ProjectsManagerContext";
import {SimplePieChart} from './SimplePieChart';

import './GraphSummary.scss';

export const GraphSummary = ({ isOpen, onClose, date }) => {

    const { entries } = useContext(MonthlyEntriesContext);
    const { projectsManager } = useContext(ProjectsManagerContext);
    const [worksaux, setWorksaux] = useState (null)
    const [pieData, setPieData] = useState(null);
    const [european, setEuropean] = useState (null)
    const [noteuropean, setNoteuropean] = useState (null)

    const [getboolsignature, setboolsignature] = useState(false);
    const [getsignature, setsignature] = useState();
    const navigate = useNavigate();



    useEffect(() => {
    const works = entries.map(element => ({
        project: element.Subproject?.Project.name,
        subproject: element.Subproject?.name || "",
        hours: element.hours || 0,
        isEuropean: element.Subproject?.isEuropean || false
    }));
    works.forEach(element => {
        const match = projectsManager.find(p => p.name === element.project);
        if (match) element.isEuropean = match.isEuropean;
    });
    
    const rep = [0, 0];
    works.forEach(work => {
        work.isEuropean
            ? (rep[0] += Number(work.hours))
            : (rep[1] += Number(work.hours));
    });
    setWorksaux (works)
    setEuropean (works.filter(work => work.isEuropean))
    setNoteuropean (works.filter(work => !work.isEuropean))
    setPieData([
        { name: "Europeo", value: rep[0] },
        { name: "No Europeo", value: rep[1] }
    ]);

}, [entries]);

    const formatDateHeader = (date) => {
        const [year, month] = date.split("-");
        const monthName = new Date(date + "-01").toLocaleString("en-US", { month: "long" });
            return `Timesheet of ${monthName} ${year}`;
    };

    const summarizeEntriesByProject = (entries) => {
        const projectMap = new Map();

        entries.forEach(entry => {
            const projectName = entry.project;
            const subprojectName = entry.subproject;
            const hours = entry.hours;

            if (!projectMap.has(projectName)) {
                projectMap.set(projectName, {
                    projectName,
                    totalHours: 0,
                    subprojects: new Map(),
                });
            }

            const project = projectMap.get(projectName);
            project.totalHours += hours;

            if (!project.subprojects.has(subprojectName)) {
                project.subprojects.set(subprojectName, 0);
            }

            const currentSubHours = project.subprojects.get(subprojectName);
            project.subprojects.set(subprojectName, currentSubHours + hours);
        });

        const summaryData = Array.from(projectMap.values()).map(project => ({
            projectName: project.projectName,
            totalHours: project.totalHours,
            subprojects: Array.from(project.subprojects.entries()).map(([name, hours]) => ({
                name,
                hours
            })),
        }));

        // Ordenamos de mayor a menor por horas del proyecto
        summaryData.sort((a, b) => b.totalHours - a.totalHours);

        return summaryData;
    };

    const cargarFirmados = async () => {
        try {

        const nombre = JSON.parse(localStorage.getItem('login'))?.name;
        const email = JSON.parse(localStorage.getItem('login'))?.email;

            const response = await fetch(
                `http://localhost:3000/uploads/firma/${email}/${nombre}`
            );

            console.log(response);
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const blob = await response.blob();
            if (blob.type === 'text/html') {
                throw new Error('No se encontró la firma');
            }

            const imageUrl = URL.createObjectURL(blob);
            setsignature(imageUrl);
            setboolsignature(true);
            
        } catch (err) {
            console.error("Error al obtener la firma:", err);
            setsignature(null);
        }
    };

    const creteTimesheet = async () => {
        const [año, mes] = date.split("-");
        const id_employee = JSON.parse( localStorage.getItem('login') )?.id;

        const fetch1 = await fetch(`http://localhost:3000/fetchs/monthlyworkvalidations/${año}/${mes}/${id_employee}`,{
            method:'POST',
        })

        const data1 = await fetch1.json()
        console.log(data1)
    };
  
    return (
        <>

        { pieData &&(
            <div className={`sideGraphModal ${isOpen ? 'open' : ''}`}>

                

                <div className="modalHeader">
                    <h3>{formatDateHeader(date)}</h3>
                    <button className="closeBtn" onClick={
                        ()=>{
                            onClose();
                            setboolsignature(null);
                            setsignature(null);
                            navigate('/dashboard');
                        }
                        
                        }>✕</button>
                </div>
                <div className="modalContent">
                {pieData && (
                    <div style={{ margin: '2em auto', width: 'fit-content' }}>
                        <SimplePieChart data={pieData} />
                    </div>
                )}
                <p><h3>European Projects:</h3></p>
                {summarizeEntriesByProject(european || []).map(project => (
                    <div key={project.projectName} className="projectSummary">
                        <h4>{project.projectName} – {project.totalHours.toFixed(2)} h</h4>
                        <ul>
                            {project.subprojects.map(sub => (
                                <li key={sub.name}>
                                    {sub.name}: {sub.hours.toFixed(2)} h
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                {european.length === 0 && (
                    <p className="noData">No work entries this month</p>
                )}
                <p><h3>Not european Projects:</h3></p>
                {summarizeEntriesByProject(noteuropean || []).map(project => (
                    <div key={project.projectName} className="projectSummary">
                        <h4>{project.projectName} – {project.totalHours.toFixed(2)} h</h4>
                        <ul>
                            {project.subprojects.map(sub => (
                                <li key={sub.name}>
                                    {sub.name}: {sub.hours.toFixed(2)} h
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                {noteuropean.length === 0 && (
                    <p className="noData">No work entries this month</p>
                )}
                {
                    true
                    &&
                    <>

                    {
                        (!getboolsignature) && <>
                            <section style={{width:'100%',display:'flex', justifyContent:"center"}}>
                                <button onClick={ ()=> { cargarFirmados(); '' } }> Assign Signature </button>
                            </section>
                        </>
                    }
                    {
                        getboolsignature && <>
                            <section style={{
                                width:'100%',
                                display:'flex',
                                flexDirection:'column',
                                justifyContent:"center",
                                alignItems:'center',
                                padding:'5px'
                                }}>
                                <img src={getsignature} alt="signature"
                                style={{
                                    background:'#fff',
                                    border:'1px solid #000',
                                    width:'90%',
                                    borderRadius:'12px',
                                }}/>
                                <button onClick={()=>{ creteTimesheet()}}>Create Timesheet</button>
                            </section>
                        </>
                    }
                    </>
                }

                </div>
            </div>
        )
        }
        </>
    );
};