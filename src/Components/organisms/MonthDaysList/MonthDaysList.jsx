import { MonthDay } from '../../molecules/MonthDay/MonthDay';
import './MonthDaysList.scss'

export const MonthDaysList = ({ days, entries, refreshCalendar }) => {
    return (
        <section className='monthDaysList'>
            {days.map(day => {
                const dayEntries = entries.filter(e => e.date === day.date);
                return (
                    <MonthDay key={day.id} day={day} entries={dayEntries} refreshCalendar={refreshCalendar} />
                );
            })}
        </section>
    );
};