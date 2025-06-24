import { useState, useEffect } from 'react';
import { MonthDaysList } from '../MonthDaysList/MonthDaysList';
import './DashboardMain.scss';

export const DashboardMain = () => {
    const [date, setDate] = useState(new Date().toISOString().slice(0, 7));
    const [days, setDays] = useState([]);
    const [entries, setEntries] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:3000/calendar/${date}`, {
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
        fetch(`http://localhost:3000/api/workentries/1/${year}-${month}`, {
            headers: { "Content-type": "application/json" },
            method: "GET",
        })
            .then(res => res.json())
            .then(data => setEntries(data.data || []));
    }, [date]);

    const handleMonthChange = (e) => {
        setDate(e.target.value);
    };

    // ✅ CALCULAMOS LOS VALORES
    const totalHorasMes = entries.reduce((acc, e) => acc + e.hours, 0);
    const diasLaborables = days.filter(d => d.DayCodeId === 6).length; // <- basado en tus datos reales
    const horasEsperadasMes = diasLaborables * 7.5;
    const horasRestantes = Math.max(horasEsperadasMes - totalHorasMes, 0);

    console.log("\u2705 Entradas:", entries);
    console.log("\u2705 Días:", days);
    console.log("\u2705 Días laborables:", diasLaborables);
    console.log("\u2705 Horas trabajadas:", totalHorasMes);
    console.log("\u2705 Horas esperadas:", horasEsperadasMes);
    console.log("\u2705 Horas restantes:", horasRestantes);

    const entradasPorDia = {};
    entries.forEach(e => {
        if (!entradasPorDia[e.date]) entradasPorDia[e.date] = [];
        entradasPorDia[e.date].push(e);
    });

    return (
        <article className="dashboardMainContent">
            <h1 className="dashboardMainTitle">Resumen del Mes</h1>
            <div>
                <label>Mes:</label>
                <input type="month" value={date} onChange={handleMonthChange} />
            </div>
            <p><strong>Días laborables:</strong> {diasLaborables}</p>
            <p><strong>Horas esperadas:</strong> {horasEsperadasMes.toFixed(2)} h</p>
            <p><strong>Horas imputadas:</strong> {totalHorasMes.toFixed(2)} h</p>
            <p><strong>Horas restantes:</strong> {horasRestantes.toFixed(2)} h</p>
            <MonthDaysList days={days} entries={entries} />
        </article>
    );
};