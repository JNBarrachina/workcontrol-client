import { useState, useEffect } from "react";

import { RemoveWorkEntryBtn } from "../../atoms/RemoveWorkEntryBtn/RemoveWorkEntryBtn"
import "./DailyWorkEntry.scss"
const DailyWorkEntry = () => {


    return (
        <article className="dailyWorkEntryCard">
            <h3 className="entryName">Nombre del subproyecto</h3>
            <p className="entryTime">Tiempo</p>
            <RemoveWorkEntryBtn action={() => { }} />
        </article>
    )
};

export { DailyWorkEntry }