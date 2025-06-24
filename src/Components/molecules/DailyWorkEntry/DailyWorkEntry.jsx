import { useState, useEffect } from "react";

import { RemoveWorkEntryBtn } from "../../atoms/RemoveWorkEntryBtn/RemoveWorkEntryBtn"
import "./DailyWorkEntry.scss"
const DailyWorkEntry = ({ entry }) => {
    console.log(entry);

    return (
        <article className="dailyWorkEntryCard">
            <h3 className="entryName">{entry.Subproject.name}</h3>
            <div className="timeremoveContainer">
                <p className="entryTime">{entry.hours}h</p>
                <RemoveWorkEntryBtn action={() => { }} />
            </div>
        </article>
    )
};

export { DailyWorkEntry }