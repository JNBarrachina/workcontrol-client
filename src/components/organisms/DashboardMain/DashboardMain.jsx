import { useState, useEffect, useContext, useRef } from 'react'

import { UserDataContext } from '../../../contexts/UserDataContext';
import { MonthlyEntriesContext } from '../../../contexts/MonthlyEntriesContext';

import { MonthDaysList } from '../MonthDaysList/MonthDaysList';
import { MonthSummary } from '../../molecules/MonthSummary/MonthSummary';
import './DashboardMain.scss'

export const DashboardMain = () => {
    const { userData } = useContext(UserDataContext);

    const [modalOpen, setModalOpen] = useState(false);
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    const [date, setDate] = useState(new Date().toISOString().slice(0, 7));
    const [days, setDays] = useState([]);
    const { entries, setEntries } = useContext(MonthlyEntriesContext);

    const diasLaborables = days.filter(day => day.DayCodeId === 6).length;
    const totalHorasMes = entries.reduce((acc, e) => acc + e.hours, 0);
    const horasEsperadasMes = diasLaborables * 7.5;
    const horasRestantes = Math.max(horasEsperadasMes - totalHorasMes, 0);

    useEffect(() => {
        fetch(`http://localhost:3000/calendar/${userData.id}/${date}`, {
            headers: { "Content-type": "application/json" },
            method: "GET",
        })
            .then(res => {
                if (!res.ok) throw new Error(`Error ${res.status} en /calendar`);
                return res.json();
            })
            .then(data => setDays(data))
            .catch(err => {
                console.error("Error en fetch de /calendar:", err);
                setDays([]);
            });
    }, [date]);

    useEffect(() => {
        const [year, month] = date.split('-');
        fetch(`http://localhost:3000/employeework/workentries/${userData.id}/${year}-${month}`, {
            headers: { "Content-type": "application/json" },
            method: "GET",
        })
            .then(res => res.json())
            .then(data => {
                setEntries(data.data || [])
                console.log(entries);
            })
            .catch(() => setEntries([]));
    }, [date, userData.id, setEntries]);


    const handleMonthChange = (e) => {
        setDate(e.target.value);
    };

    const generateMonthlyTimesheet = () => {
        console.log(entries);
    };

    const entradasPorDia = {};
    entries.forEach(e => {
        if (!entradasPorDia[e.date]) entradasPorDia[e.date] = [];
        entradasPorDia[e.date].push(e);
    });

    return (
        <article className="dashboardMainContent">
            <section className='dashboardMainHeader'>
                <h1 className="dashboardMainTitle">Welcome, {userData.name}</h1>
                <div className="monthInfoContainer">
                    <div className="monthSelector">
                        <input
                            type="month"
                            min={"2015-01"}
                            max={new Date().toISOString().slice(0, 7)}
                            value={date}
                            onChange={handleMonthChange} />
                    </div>
                    <div className="monthlySummary">
                        <p className="summaryp">Expected: <strong>{horasEsperadasMes.toFixed(2)} h</strong></p>
                        <p className='summaryp'>Logged: <strong>{totalHorasMes.toFixed(2)} h</strong></p>
                        <p className='summaryp'>Remaining: <strong>{horasRestantes.toFixed(2)} h</strong></p>
                    </div>
                    <div className="monthlySummaryBtns">
                        <button className='monthBtns timesheetBtn' onClick={generateMonthlyTimesheet} disabled={horasEsperadasMes !== totalHorasMes}
                        >Generate timesheet</button>
                        <button className='monthBtns monthlySummaryBtn' onClick={handleOpen}>Month summary</button>
                    </div>
                </div>
            </section>
            <div>
                {entries.length === 0 && (
                    <p style={{ marginTop: "2em" }}>No entries for this month</p>
                )}
            </div>
            <MonthDaysList days={days} setDays={setDays} />
            <MonthSummary isOpen={modalOpen} onClose={handleClose} date={date} />
        </article>
    );
};

