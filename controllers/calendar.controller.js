const { Op } = require("sequelize");

const EmployeeDailyCalendar = require("../models/EmployeeDailyCalendar");
const DayCodes = require("../models/DayCode");

const getMonthUserCalendar = async (req, res) => {
    const userId = req.params.userId;
    const year = parseInt(req.params.date.split("-")[0]);
    const month = parseInt(req.params.date.split("-")[1]);

    const startDate = new Date(Date.UTC(year, month - 1, 1)).toISOString().slice(0, 10);
    const endDate = new Date(Date.UTC(year, month, 0)).toISOString().slice(0, 10);

    console.log(year, month);
    console.log(startDate, endDate);

    try {
        const userMonthCalendar = await EmployeeDailyCalendar.findAll({ 
            where: {
                EmployeeId: userId,
                date: {
                    [Op.between]: [startDate, endDate]
                }
            }, 
            include: {
                model: DayCodes,
                attributes: ["code", "label"]
            },
            order: [["date", "ASC"]]
        });

        // if (userMonthCalendar.length === 0) {
        //     const { generateMonthlyCalendar } = require("../utils/calendarUtils");
        //     await generateMonthlyCalendar(userId, month, year);

        //     // volver a hacer la consulta después de insertar
        //     const freshMonthData = await EmployeeDailyCalendar.findAll({ 
        //         where: {
        //         EmployeeId: userId,
        //         date: {
        //             [Op.like]: `${year}-${String(month).padStart(2, '0')}%`,
        //         }
        //         }
        //     });

        // return res.status(200).json(freshMonthData);
        // }

        res.status(200).json(userMonthCalendar);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const patchUserDayType = async (req, res) => {
    const dayId = req.params.day;
    const dayType = parseInt(req.body.DayCodeId);

    console.log(dayId, dayType);

    try {
        const updatedDay = await EmployeeDailyCalendar.update(
            { DayCodeId: dayType },
            { where: { id: dayId } }
        );

        console.log(updatedDay);
        res.sendStatus(200)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getMonthUserCalendar,
    patchUserDayType
};