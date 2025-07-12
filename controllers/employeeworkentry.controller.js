const { Op } = require("sequelize");

const Employee = require("../models/Employee");
const Project = require("../models/Project");
const SubProject = require("../models/Subproject");
const EmployeeWorkEntry = require("../models/EmployeeWorkEntry");

const getEmployeeId = async(req, res) => {
    console.log(req.id);
    const employees = await Employee.findAll({});
    const parsedEmployees = employees.map((employee) => {
        return {
            id: employee.id,
            name: employee.name,
            password: employee.password,
        };
    });
    res.send(parsedEmployees);
}

//GET DE LOS PROYECTOS Y SUBPROYECTOS DE UN EMPLEADO
const getUserProjects = async(req, res) => {
    const id = Number(req.params.id);

    try {
        const employee = await Employee.findByPk(id, {
            include: {
                model: Project,
            through: { attributes: [] },
                include: {
                model: SubProject,
                },
            },
        });

        if (!employee) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }

        res.status(200).json({ data: employee.Projects });

    } catch (error) {
        console.error("Error al obtener subproyectos:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

const createWorkEntry = async (req, res) => {
    
    const EmployeeId = req.body.EmployeeId;
    const SubprojectId = req.body.SubprojectId;

    try {
        const foundEmployee = await Employee.findByPk(EmployeeId);
        if (!foundEmployee) {
            return res.status(404).send({ msg: "Employee not found" });
        }

        const foundSubproject = await SubProject.findByPk(SubprojectId);
        if (!foundSubproject) {
            return res.status(404).send({ msg: "SubProject not found" });
        }

        const dateworkentry = req.body.date;
        const hoursworkentry = req.body.hours;

        const createdWorkEntry = await EmployeeWorkEntry.create({
            date: dateworkentry,
            hours: hoursworkentry,
            SubprojectId: SubprojectId,
            EmployeeId: EmployeeId,
        });

        const checkedNewWorkEntry = await EmployeeWorkEntry.findByPk(createdWorkEntry.id, {
            include: [
            {
                model: SubProject,
                attributes: ["name"],
                include: [
                    {
                        model: Project,
                        attributes: ["name"]
                    }
            ]
            }
        ]
        });

        
        return res.status(201).json({ checkedNewWorkEntry });
    } catch (error) {
        console.error("Error al crear la entrada de trabajo:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
};


const deleteEmployeeWorkEntry = async(req, res) => {
    try {
        const employees = await EmployeeWorkEntry.destroy({where: {id: req.body.id}});
        return res.status(201).json({msg: "Borrado exitoso"});
    } catch (error) {
        return res.status(500).send({msg: "Borrado fallida"}, error);
    }
}

const getWorkEntriesByMonth = async (req, res) => {
    const employeeId = parseInt(req.params.employeeId);
    const [year, monthRaw] = req.params.yearMonth.split("-");

    // ✅ Aseguramos mes con dos dígitos
    const month = String(monthRaw).padStart(2, "0");

    try {
        // ✅ Fecha de inicio en formato ISO
        const startDate = `${year}-${month}-01`;

        // ✅ Último día del mes (JS cuenta meses desde 0)
        const endDateObj = new Date(Number(year), Number(month), 0);
        const endDate = endDateObj.toISOString().slice(0, 10); // 'YYYY-MM-DD'

        const entries = await EmployeeWorkEntry.findAll({
            where: {
                EmployeeId: employeeId,
                date: {
                    [Op.between]: [startDate, endDate],
                },
            },
            include: [
                { model: SubProject, attributes: ["name"],
                    include: [
                    {
                    model: Project,
                    attributes: ["name"]
                    }
                    ]
                },
                
            ],
            order: [["date", "ASC"]],
        });

        res.status(200).json({ data: entries });
    } catch (error) {
        console.error("Error en getWorkEntriesByMonth:", error);
        res.status(500).json({ message: "Error al obtener las entradas de trabajo" });
    }
};


exports.getEmployeeId = getEmployeeId
exports.getUserProjects = getUserProjects
exports.createWorkEntry = createWorkEntry
exports.deleteEmployeeWorkEntry = deleteEmployeeWorkEntry
exports.getWorkEntriesByMonth = getWorkEntriesByMonth;
