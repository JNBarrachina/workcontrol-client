const express = require("express");

const db = require('../db.js');
const router = express.Router();

//ADMIN
    router.get('/employeeds_projects', async (req, res)=>{
        try{
            const results = await db.sequelize.query(`
                SELECT 
                e.name AS Employeed, 
                p.name AS 'Assigned Project', 
                su.name AS 'Assigned SubProject', 
                ea.assignedAT AS 'Date Assigned'
                FROM 
                workcontroldb.employees e,
                workcontroldb.projects p, 
                workcontroldb.subprojects su,
                workcontroldb.employeeprojectassignments ea
                WHERE 
                ea.EmployeeId = e.id AND 
                ea.ProjectId = p.id AND 
                su.ProjectId = p.id;
            `);

            if (!results) {
                res.status(400).send("EMPLOYEEDS_DON'T_HAVE_ASSIGNED_PROJECTS");
                return;
            }

            res.status(201).json( results );

        } catch (err){
            res.status(500).send(err);
        }
    });

    //USER
    router.post('/employeed_assigned', async (req, res)=>{
        console.log(req.body);

        try{
            const {rol, id} = req?.body;

            const results = await db.sequelize.query(`
            SELECT 
            e.name AS Employeed, 
            p.name AS 'Assigned Project', 
            su.name AS 'Assigned SubProject', 
            ea.assignedAT AS 'Date Assigned'
            FROM 
            workcontroldb.employees e, 
            workcontroldb.employeeprojectassignments ea, 
            workcontroldb.projects p, 
            workcontroldb.subprojects su
            WHERE 
            ea.EmployeeId = e.id AND 
            ea.ProjectId = p.id AND 
            su.ProjectId = p.id AND
            e.id = :id;
            `, {
                replacements: { id },  
                type: db.sequelize.QueryTypes.SELECT 
            });

            if (!results) {
                res.status(400).send("THE_EMPLOYEED_DON'T_HAVE_ASSIGNED_PROJECTS");
                return;
            }

            res.status(201).json( results );

        } catch (err){
            res.status(500).send(err);
        }
    });


    router.post('/employeed_subprojects_assignedbyId', async (req, res)=>{
    try{
            const {rol, name, id} = req?.body;

            const results = await db.sequelize.query(`
            SELECT su.name AS 'SubProyectos'
            FROM 
            workcontroldb.employees e, 
            workcontroldb.employeeprojectassignments ea, 
            workcontroldb.projects p, 
            workcontroldb.subprojects su
            WHERE 
            ea.EmployeeId = e.id AND 
            ea.ProjectId = p.id AND 
            su.ProjectId = p.id AND
            e.id = :id;
            `, {
                replacements: { id },  
                type: db.sequelize.QueryTypes.SELECT 
            });

            if (!results) {
                res.status(400).send("THE_EMPLOYEED_DON'T_HAVE_ASSIGNED_SUBPROJECTS");
                return;
            }

            res.status(201).json( results );

        } catch (err){
            res.status(500).send(err);
        }
    });

module.exports = router;