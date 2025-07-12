const express = require("express");

const {loginUser} = require("../controllers/users.controller")
const {createSubproject} = require("../controllers/subproject.controller")
const {createWorkEntry} = require("../controllers/employeeworkentry.controller")
const {getEmployeeId} = require("../controllers/employeeworkentry.controller")
const {deleteEmployeeWorkEntry} = require("../controllers/employeeworkentry.controller");
const {getUserProjects} = require("../controllers/employeeworkentry.controller");
const router = express.Router();

router.post("/login", loginUser);
router.get("/userprojects/:id", getUserProjects)
router.get("/employee", getEmployeeId)
router.post("/newworkentry", createWorkEntry)
router.delete("/rmworkentry", deleteEmployeeWorkEntry)

router.post("/subproject", createSubproject)
module.exports = router;