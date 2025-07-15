import { useState, useContext, useEffect } from 'react';
import { MonthlyEntriesContext } from '../../../contexts/MonthlyEntriesContext';
import { ProjectsManagerContext } from "../../../contexts/ProjectsManagerContext";
import {SimplePieChart} from './SimplePieChart';

import './GraphSummary.scss';

export const GraphSummary = ({ isOpen, onClose, date }) => {

    const { entries } = useContext(MonthlyEntriesContext);
    const { projectsManager } = useContext(ProjectsManagerContext);
    const [pieData, setPieData] = useState(null);

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

    console.log ("Works: ",works)
    const rep = [0, 0];
    works.forEach(work => {
        work.isEuropean
            ? (rep[0] += Number(work.hours))
            : (rep[1] += Number(work.hours));
    });
    
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
            const projectName = entry.Subproject.Project.name;
            const subprojectName = entry.Subproject.name;
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

    const summaryData = summarizeEntriesByProject(entries);
    return (
        <>
        { pieData && (
            <div className={`sideGraphModal ${isOpen ? 'open' : ''}`}>
                <div className="modalHeader">
                    <h3>{formatDateHeader(date)}</h3>
                    <button className="closeBtn" onClick={onClose}>✕</button>
                </div>
                <div className="modalContent">
                {pieData && (
                    <div style={{ margin: '2em auto', width: 'fit-content' }}>
                        <SimplePieChart data={pieData} />
                    </div>
                )}
                {summaryData.map(project => (
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
                {entries.length === 0 && (
                    <p className="noData">No work entries this month</p>
                )}
                </div>
            </div>
        )}
        </>
    );
};


