import { useContext } from "react";

import { MonthDay } from '../../molecules/MonthDay/MonthDay';
import { MonthlyEntriesContext } from "../../../contexts/MonthlyEntriesContext";

import './MonthDaysList.scss';

export const MonthDaysList = ({ days }) => {
    const { entries } = useContext(MonthlyEntriesContext);

    return (
        <section className='monthDaysList'>
            {days.map(day => {
                const dayEntries = entries.filter(e => e.date === day.date);
                return (
                    <MonthDay
                        key={day.id}
                        day={day}
                        dayEntries={dayEntries}
                    />
                );
            })}
        </section>
    );
};

