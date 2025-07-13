import "./EmployeeProjectItem.scss";

export const EmployeeProjectItem = ({ project, employeeId, fetchEmployees }) => {
    const handleRemove = async () => {
        const confirm = window.confirm(`¿Eliminar al empleado de "${project.name}"?`);
        if (!confirm) return;

        try {
            const response = await fetch("http://localhost:3000/employees/removeassignment", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    EmployeeId: employeeId,
                    ProjectId: project.id,
                }),
            });

            if (response.ok) {
                await fetchEmployees(); // Refrescar empleados
            } else {
                console.error("Error al eliminar asignación");
                alert("Error al eliminar la asignación");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <li className="employeeProjectItem">
            <span>{project.name}</span>
            <button onClick={handleRemove}>Quitar</button>
        </li>
    );
};


