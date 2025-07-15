import { useEffect, useState } from "react";

import { EmployeeCard } from "../../molecules/EmployeeCard/EmployeeCard";
import { BulkProjectAssignmentModal } from "../../organisms/BulkProjectAssignmentModal/BulkProjectAssignmentModal";
import "./EmployeesManager.scss";

export const EmployeesManager = () => {
    const [employees, setEmployees] = useState([]);
    const [projects, setProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [showModal, setShowModal] = useState(false);

    const fetchEmployees = async () => {
        try {
            const res = await fetch("http://localhost:3000/employees");
            const data = await res.json();
            setEmployees(data);
        } catch (error) {
            console.error("Error al obtener empleados:", error);
        }
    };

    const fetchProjects = async () => {
        try {
            const res = await fetch("http://localhost:3000/projects");
            const data = await res.json();
            setProjects(data);
        } catch (error) {
            console.error("Error al obtener proyectos:", error);
        }
    };

    useEffect(() => {
        fetchEmployees();
        fetchProjects();
    }, []);

    const filteredEmployees = employees.filter((emp) => {
        const fullName = `${emp.name} ${emp.surname}`.toLowerCase();
        const projectNames = emp.Projects?.map((p) => p.name.toLowerCase()).join(" ") || "";

        return fullName.includes(searchTerm.toLowerCase()) || projectNames.includes(searchTerm.toLowerCase());
    });

    const handleAssign = (projectId, selectedEmployees) => {
        // Aquí se hará el POST a la base de datos (más adelante)
        console.log("Asignar proyecto", projectId, "a empleados:", selectedEmployees);

        setShowModal(false);
    };

    return (
        <>
            <div className="employeesManagerContainer">
                <div className="employeesManagerHeader">
                    <h1>Employees Manager</h1>
                    <div className="employeesManagerControls">
                        <input
                            type="text"
                            placeholder="Búsqueda por empleado o proyecto..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button onClick={() => setShowModal(true)} className="bulkAssignButton">
                            Asignación de proyecto en bloque
                        </button>
                    </div>
                </div>

                <div className="employeesList">
                    {filteredEmployees.map((employee) => (
                        <EmployeeCard
                            key={employee.id}
                            employee={employee}
                            fetchEmployees={fetchEmployees}
                        />
                    ))}
                </div>
            </div>

            {showModal && (
                <BulkProjectAssignmentModal
                    projects={projects}
                    employees={employees}
                    onClose={() => setShowModal(false)}
                    onAssign={handleAssign}
                    refreshEmployees={fetchEmployees}
                />
            )}
        </>
    );
};





