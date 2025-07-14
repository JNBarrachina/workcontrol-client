import { useState } from "react";

import avatarIcon from "../../../assets/avatar.png";
import "./BulkProjectAssignmentModal.scss";

export const BulkProjectAssignmentModal = ({ projects, employees, onClose, refreshEmployees }) => {
    const [selectedProjectId, setSelectedProjectId] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedEmployees, setSelectedEmployees] = useState([]);
    const [toast, setToast] = useState({ message: "", type: "" });
    const [isAssigning, setIsAssigning] = useState(false);

    const filteredEmployees = employees.filter((emp) =>
        `${emp.name} ${emp.surname}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const employeeHasProject = (employee, projectId) => {
        return employee.Projects?.some((p) => p.id === parseInt(projectId));
    };

    const toggleEmployeeSelection = (employee) => {
        if (!selectedProjectId) return;

        const alreadyAssigned = employeeHasProject(employee, selectedProjectId);
        const isSelected = selectedEmployees.some((e) => e.id === employee.id);

        if (alreadyAssigned) return;

        if (isSelected) {
            setSelectedEmployees(selectedEmployees.filter((e) => e.id !== employee.id));
        } else {
            setSelectedEmployees([...selectedEmployees, employee]);
        }
    };

    const showToast = (message, type = "success") => {
        setToast({ message, type });
        setTimeout(() => {
            setToast({ message: "", type: "" });
        }, 3000);
    };

    const handleAssignClick = async () => {
        if (!selectedProjectId || selectedEmployees.length === 0) return;

        setIsAssigning(true);

        try {
            const res = await fetch("http://localhost:3000/employees/bulkassign", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ProjectId: parseInt(selectedProjectId),
                    EmployeeIds: selectedEmployees.map((e) => e.id),
                }),
            });

            const data = await res.json();

            if (res.ok) {
                showToast(data.message || "Proyecto asignado con éxito", "success");
                setSelectedEmployees([]);
                refreshEmployees();
                onClose();
            } else {
                showToast(data.message || "Error al asignar proyecto", "error");
            }
        } catch (error) {
            showToast("Error de red al asignar proyecto", "error");
        } finally {
            setIsAssigning(false);
        }
    };

    return (
        <div className="modalBackdrop">
            <div className="bulkModalContent">
                <h3 className="bulkModalTitle">Asignación de proyecto en bloque</h3>
                <button className="closeButton" onClick={onClose}>X</button>

                <label className="projectSelectorLabel">
                    Selecciona un proyecto:
                    <select
                        value={selectedProjectId}
                        onChange={(e) => {
                            setSelectedProjectId(e.target.value);
                            setSelectedEmployees([]);
                        }}
                    >
                        <option value="">-- Selecciona un proyecto --</option>
                        {projects.map((project) => (
                            <option key={project.id} value={project.id}>
                                {project.name}
                            </option>
                        ))}
                    </select>
                </label>

                <input
                    type="text"
                    placeholder="Buscar empleados..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="employeeSearchInput"
                />

                <div className="employeeList">
                    {filteredEmployees.map((emp) => {
                        const isSelected = selectedEmployees.some((e) => e.id === emp.id);
                        const alreadyAssigned = employeeHasProject(emp, selectedProjectId);

                        return (
                            <div
                                key={emp.id}
                                className={`employeeListItem ${isSelected ? "selected" : ""} ${alreadyAssigned ? "disabled" : ""}`}
                                onClick={() => toggleEmployeeSelection(emp)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") toggleEmployeeSelection(emp);
                                }}
                                title={alreadyAssigned ? "Ya tiene este proyecto asignado" : ""}
                            >
                                <img src={avatarIcon} alt={`${emp.name} avatar`} className="avatarSmall" />
                                <span>{emp.name} {emp.surname}</span>
                                {alreadyAssigned && <span className="alreadyAssignedTag">Ya asignado</span>}
                            </div>
                        );
                    })}
                </div>

                <div className="selectedEmployeesContainer">
                    {selectedEmployees.map((emp) => (
                        <div key={emp.id} className="selectedEmployeeCard">
                            <img src={avatarIcon} alt={`${emp.name} avatar`} className="avatarSmall" />
                            <span>{emp.name} {emp.surname}</span>
                            <button onClick={() => toggleEmployeeSelection(emp)} className="removeButton">×</button>
                        </div>
                    ))}
                </div>

                <button
                    className="assignButton"
                    onClick={handleAssignClick}
                    disabled={!selectedProjectId || selectedEmployees.length === 0 || isAssigning}
                >
                    {isAssigning ? "Asignando..." : "Asignar proyecto"}
                </button>

                {toast.message && (
                    <div className={`toast ${toast.type}`}>
                        {toast.message}
                    </div>
                )}
            </div>
        </div>
    );
};


