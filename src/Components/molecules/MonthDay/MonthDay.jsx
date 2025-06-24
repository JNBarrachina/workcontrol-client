import { useState, useRef } from "react";

import './MonthDay.scss'

import { NewWorkEntry } from "../NewWorkEntry/NewWorkEntry";
import { DailyWorkEntry } from "../DailyWorkEntry/DailyWorkEntry";

export const MonthDay = ({ day }) => {
    const modalRef = useRef(null);

    const openNewWorkEntryModal = () => {
        modalRef.current?.showModal();
    };

    const [dayType, setDayType] = useState(day.DayCodeId);

    const formatFecha = (fechaString) => {
        const fecha = new Date(fechaString);
        const texto = fecha.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        return texto.charAt(0).toUpperCase() + texto.slice(1);
    };

    const changeDayType = (e) => {
        const newDayType = parseInt(e.target.value);
        setDayType(newDayType);

        console.log(day.id, newDayType);

        fetch(`http://localhost:3000/calendar/${day.id}`, {
            headers: {
                "Content-type": "application/json"
            },
            method: "PATCH",
            body: JSON.stringify({
                DayCodeId: newDayType
            })
        });
    };

    return (
        <div className='dayContainer'>
            <div className='dayHeaderContainer'>
                <section className='dayTitleType'>
                    <h4>{formatFecha(day.date)}</h4>
                    <select name="dayType" id="dayType" value={dayType} onChange={(e) => changeDayType(e)}>
                        <option value="6">Laborable (WD)</option>
                        <option value="5">Fin de semana (WE)</option>
                        <option value="1">Vacaciones (AH)</option>
                        <option value="2">Festivo (PH)</option>
                        <option value="3">Otras ausencias (OA)</option>
                        <option value="4">Baja médica (SL)</option>
                    </select>
                </section>
                <div className='dayHoursAdd'>
                    <p className='dayHours'>Time</p>
                    <button className='addEntryBtn' disabled={dayType !== 6 && true}><img src="/src/assets/addentryitem.svg" alt="" onClick={openNewWorkEntryModal} /></button>
                </div>
            </div>
            <div className='dayWorkEntriesContainer'>
                <DailyWorkEntry />
            </div>
            <NewWorkEntry modalRef={modalRef} day={day} />
        </div>
    )
}
