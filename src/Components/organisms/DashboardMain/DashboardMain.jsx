import { useState, useEffect } from 'react'

import { MonthDaysGrid } from '../MonthDaysGrid/MonthDaysGrid';

import './DashboardMain.scss'

export const DashboardMain = () => {
    const [date, setDate] = useState(new Date().toISOString().slice(0, 7));

    function getDaysInMonth(monthValue) {
        const [year, month] = monthValue.split('-').map(Number);
        return new Date(year, month, 0).getDate(); // Día 0 del mes siguiente = último día del mes actual
    }


    const days = getDaysInMonth("2025-06");
    console.log(days);

    const handleMonthChange = (e) => {
        setDate(e.target.value);
    };

    return (
        <article className="dashboardMainContent">
            <h1 className="dashboardMainTitle">Your workflow</h1>
            <div className="monthSelector">
                <p>Select a month: </p>
                <input
                    type="month"
                    min={"2015-01"}
                    max={new Date().toISOString().slice(0, 7)}
                    value={date}
                    onChange={handleMonthChange} />
            </div>
            <MonthDaysGrid />
        </article>
    )
}
