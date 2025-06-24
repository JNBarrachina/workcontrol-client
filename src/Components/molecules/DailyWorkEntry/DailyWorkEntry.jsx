import { useState, useEffect } from "react";

import { RemoveWorkEntryBtn } from "../../atoms/RemoveWorkEntryBtn/RemoveWorkEntryBtn"
import "./DailyWorkEntry.scss"
const DailyWorkEntry = ({entry}) => {
    console.log(entry);

    return (
        <article className="dailyWorkEntryCard">
            <h3 className="entryName">{entry.Subproject.name}</h3>
            <p className="entryTime">{entry.hours}H</p>
            <RemoveWorkEntryBtn action={() => { }} />
        </article>
    )
};

export { DailyWorkEntry }