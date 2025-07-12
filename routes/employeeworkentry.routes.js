const express = require("express");
const router = express.Router();
const { getWorkEntriesByMonth } = require("../controllers/employeeworkentry.controller");

router.get("/workentries/:employeeId/:yearMonth", getWorkEntriesByMonth);

module.exports = router;