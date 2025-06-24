import { useState, useEffect } from 'react'

import { MonthDaysList } from '../MonthDaysList/MonthDaysList';

import './DashboardMain.scss'

export const DashboardMain = () => {
    const [date, setDate] = useState(new Date().toISOString().slice(0, 7));
    const [days, setDays] = useState([]);
    const [entries, setEntries] = useState([]);
    console.log("Valor inicial de date:", date);

    useEffect(() => {
        console.log("Llamando a /calendar con fecha:", date);

        fetch(`http://localhost:3000/calendar/${date}`, {
            headers: {
                "Content-type": "application/json"
            },
            method: "GET",
        })
            .then(res => {
                if (!res.ok) {
                    // Si el backend devuelve error (404, 500), lanza
                    throw new Error(`Error ${res.status} en /calendar`);
                }
                return res.json(); // solo si es respuesta válida
            })
            .then(data => {
                setDays(data);
            })
            .catch(err => {
                console.error("Error en fetch de /calendar:", err);
                setDays([]); // evita que quede mal cargado
            });
    }, [date]);

    useEffect(() => {
        const [year, month] = date.split('-');

        fetch(`http://localhost:3000/api/workentries/1/${year}-${month}`, {
            headers: {
                "Content-type": "application/json"
            },
            method: "GET",
        })
            .then(res => res.json())
            .then(data => {
                // En caso de que tu backend devuelva { data: [...], message: "..." }
                setEntries(data.data || []);
            });
    }, [date]);
    console.log(entries)

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
            <MonthDaysList days={days} entries={entries} />
        </article>
    )
};



