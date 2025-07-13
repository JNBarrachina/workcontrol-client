import { useEffect, useState } from "react";
import { EmployeeCard } from "../../molecules/EmployeeCard/EmployeeCard";
import "./EmployeesManager.scss";

export const EmployeesManager = () => {
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchEmployees = async () => {
        try {
            const res = await fetch("http://localhost:3000/employees");
            const data = await res.json();
            setEmployees(data);
        } catch (error) {
            console.error("Error al obtener empleados:", error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const filteredEmployees = employees.filter((emp) =>
        `${emp.name} ${emp.surname}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="employeesManagerContainer">
                <div className="employeesManagerHeader">
                    <h1>Employees Manager</h1>
                    <input
                        type="text"
                        placeholder="Buscar empleado..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="employeesList">
                    {filteredEmployees.map((employee) => (
                        <EmployeeCard
                            key={employee.id}
                            employee={employee}
                            fetchEmployees={fetchEmployees} // Pasamos función de refresco
                        />
                    ))}
                </div>
            </div>
        </>
    );
};




