
import { MonthDay } from '../../molecules/MonthDay/MonthDay';
import './MonthDaysList.scss'

export const MonthDaysList = ({ days }) => {
    console.log(days);

    return (
        <section className='monthDaysList'>
            {days.map(day =>
                <MonthDay day={day} key={day.id} />
            )}
        </section>
    )
}
