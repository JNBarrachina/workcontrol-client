import { useState, useContext } from "react";
import avatarImg from "../../../assets/avatar.png";
import "./EmployeeCard.scss";
import { EmployeeProjectItem } from "../../molecules/EmployeeProjectItem/EmployeeProjetItem";
import { ProjectsManagerContext } from "../../../contexts/ProjectsManagerContext";

export const EmployeeCard = ({ employee, fetchEmployees }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState("");
    const { projectsManager } = useContext(ProjectsManagerContext);

    const toggleOpen = () => setIsOpen((prev) => !prev);

    const handleAssign = async () => {
        if (!selectedProjectId) return;

        try {
            const res = await fetch("http://localhost:3000/employees/addassignment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    EmployeeId: employee.id,
                    ProjectId: selectedProjectId,
                }),
            });

            if (res.ok) {
                await fetchEmployees(); // Refrescar empleados
                setSelectedProjectId(""); // Reset selector
            } else {
                const data = await res.json();
                alert(data.message || "Error al asignar proyecto.");
            }
        } catch (error) {
            console.error("Error al asignar proyecto:", error);
        }
    };

    const assignedProjectIds = employee.Projects.map((p) => p.id);

    return (
        <div className="employeeItem">
            <div className="employeeHeader" onClick={toggleOpen}>
                <div className="employeeInfo">
                    <img src={avatarImg} alt="avatar" className="employeeAvatar" />
                    <div className="employeeText">
                        <span className="employeeName">{employee.name} {employee.surname}</span>
                        <span className="employeeEmail">{employee.email}</span>
                        <span className="employeeRole">{employee.role}</span>
                    </div>
                </div>

                <div className="employeeStats">
                    <span className="projectCount">{employee.Projects.length} proyectos</span>
                    <button
                        className="toggleButton"
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleOpen();
                        }}
                        aria-label={isOpen ? "Cerrar detalles" : "Abrir detalles"}
                    >
                        {isOpen ? "▲" : "▼"}
                    </button>
                </div>
            </div>

            <div className={`employeeDetailsWrapper ${isOpen ? "open" : ""}`}>
                <div className="employeeDetails">
                    <ul className="assignedProjectsList">
                        {employee.Projects.map((project) => (
                            <EmployeeProjectItem
                                key={project.id}
                                project={project}
                                employeeId={employee.id}
                                fetchEmployees={fetchEmployees}
                            />
                        ))}
                    </ul>

                    <div className="assignProjectForm">
                        <select
                            value={selectedProjectId}
                            onChange={(e) => setSelectedProjectId(e.target.value)}
                        >
                            <option value="">-- Asignar nuevo proyecto --</option>
                            {projectsManager
                                .filter((proj) => !assignedProjectIds.includes(proj.id))
                                .map((proj) => (
                                    <option key={proj.id} value={proj.id}>
                                        {proj.name}
                                    </option>
                                ))}
                        </select>
                        <button onClick={handleAssign} disabled={!selectedProjectId}>
                            Asignar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};





