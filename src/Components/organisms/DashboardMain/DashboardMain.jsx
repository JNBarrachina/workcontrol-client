import { useState, useEffect, useContext } from 'react'

import { UserDataContext } from '../../../contexts/UserDataContext';

import { MonthDaysList } from '../MonthDaysList/MonthDaysList';
import './DashboardMain.scss'

export const DashboardMain = () => {
    const { userData } = useContext(UserDataContext);

    console.log(userData);

    const [date, setDate] = useState(new Date().toISOString().slice(0, 7));
    const [days, setDays] = useState([]);
    const [entries, setEntries] = useState([]);

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
        fetch(`http://localhost:3000/api/workentries/${userData.id}/${year}-${month}`, {
            headers: { "Content-type": "application/json" },
            method: "GET",
        })
            .then(res => res.json())
            .then(data => setEntries(data.data || []));
    }, [date]);

    const handleMonthChange = (e) => {
        setDate(e.target.value);
    };

    // 🔢 Total de horas trabajadas en el mes
    const totalHorasMes = entries.reduce((acc, e) => acc + e.hours, 0);

    // 📆 Calcular días laborables y horas esperadas
    const diasLaborables = days.filter(d => d.isWorkingDay).length;
    const horasEsperadasMes = diasLaborables * 7.5;
    const horasRestantes = Math.max(horasEsperadasMes - totalHorasMes, 0);

    // 📅 Agrupar entradas por día
    const entradasPorDia = {};
    entries.forEach(e => {
        if (!entradasPorDia[e.date]) entradasPorDia[e.date] = [];
        entradasPorDia[e.date].push(e);
    });

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

            {/* ✅ Resumen mensual */}
            <div className="monthlySummary">
                <h2>Resumen del mes</h2>
                <p>Horas trabajadas: <strong>{totalHorasMes.toFixed(2)} h</strong></p>
                <p>Horas que debes trabajar: <strong>{horasEsperadasMes.toFixed(2)} h</strong></p>
                <p>Horas restantes por imputar: <strong>{horasRestantes.toFixed(2)} h</strong></p>
            </div>
            <div>
                {entries.length === 0 && (
                    <p style={{ marginTop: "2em" }}>No hay entradas para este mes.</p>
                )}
            </div>

            {/* Lista previa de días */}
            <MonthDaysList days={days} entries={entries} />
        </article>
    );
};

