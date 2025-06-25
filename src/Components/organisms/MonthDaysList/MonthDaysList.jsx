
import { MonthDay } from '../../molecules/MonthDay/MonthDay';
import './MonthDaysList.scss'

export const MonthDaysList = ({ days, entries = [] }) => {
    console.log("Datos del mes",days, entries);
    

    return (
        <section className='monthDaysList'>
            {days.map(day => {
                const dayEntries = entries.filter(e => e.date === day.date);
                console.log("Filtro de entradas de dia",dayEntries);
                return (
                    <MonthDay key={day.id} day={day} entries={dayEntries} />
                );
            })}
        </section>
    )
}
