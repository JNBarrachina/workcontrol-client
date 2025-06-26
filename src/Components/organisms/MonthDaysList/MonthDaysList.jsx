import { useContext } from "react";

import { MonthDay } from '../../molecules/MonthDay/MonthDay';
import { MonthlyEntriesContext } from "../../../contexts/MonthlyEntriesContext";

import './MonthDaysList.scss';

export const MonthDaysList = ({ days, setDays }) => {
    const { entries } = useContext(MonthlyEntriesContext);

    const handleDayCodeChange = (dayId, newDayCodeId) => {
        const updatedDays = days.map(day =>
            day.id === dayId ? { ...day, DayCodeId: newDayCodeId } : day
        );
        setDays(updatedDays);
    };

    return (
        <section className='monthDaysList'>
            {days.map(day => {
                const dayEntries = entries.filter(e => e.date === day.date);
                return (
                    <MonthDay
                        key={day.id}
                        day={day}
                        dayEntries={dayEntries}
                        onChangeDayCode={handleDayCodeChange}
                    />
                );
            })}
        </section>
    );
};

