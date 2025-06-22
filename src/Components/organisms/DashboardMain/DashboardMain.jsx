import { useState, useEffect, use } from 'react'

import { MonthDaysList } from '../MonthDaysList/MonthDaysList';

import './DashboardMain.scss'

export const DashboardMain = () => {
    const [date, setDate] = useState(new Date().toISOString().slice(0, 7));
    const [days, setDays] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/calendar/${date}`, {
            headers: {
                "Content-type": "application/json"
            },
            method: "GET",
        })
            .then(res => res.json())
            .then(data => { setDays(data) })
    }, [date])

    const handleMonthChange = (e) => {
        setDate(e.target.value);
    }

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
            <MonthDaysList days={days} />
        </article>
    )
};



