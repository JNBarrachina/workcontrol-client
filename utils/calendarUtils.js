const { EmployeeDailyCalendar } = require("../models/EmployeeDailyCalendar");
const { DayCode } = require("../models/DayCode");
async function generateMonthlyCalendar(employeeId, month, year) {
    const daysInMonth = new Date(year, month, 0).getDate(); // último día del mes
    const dayCodeWD = await DayCode.findOne({ where: { code: "WD" } });
    const dayCodeWE = await DayCode.findOne({ where: { code: "WE" } });

  const records = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    records.push({
      date: date.toISOString().slice(0, 10),
      EmployeeId: employeeId,
      DayCodeId: isWeekend ? dayCodeWE.id : dayCodeWD.id,
    });
  }

  await EmployeeDailyCalendar.bulkCreate(records);
}

module.exports = { generateMonthlyCalendar };