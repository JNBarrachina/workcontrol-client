import { useState, useEffect, useRef } from "react";

import { RemoveWorkEntryBtn } from "../../atoms/RemoveWorkEntryBtn/RemoveWorkEntryBtn"
import { RemoveWorkEntry } from "../../molecules/RemoveWorkEntry/RemoveWorkEntry"

import "./DailyWorkEntry.scss"
const DailyWorkEntry = ({ entry }) => {
    const modalRef = useRef(null);

    const openNewWorkEntryModal = () => {
        dialogRef.current?.showModal();
    };

    console.log(entry);

    return (
        <article className="dailyWorkEntryCard">
            <h3 className="entryName">{entry.Subproject.name}</h3>
            <div className="timeremoveContainer">
                <p className="entryTime">{entry.hours}h</p>
                <RemoveWorkEntryBtn action={openNewWorkEntryModal} />
            </div>
            <RemoveWorkEntry modalRef={modalRef} entry={entry} />
        </article>
    )
};

export { DailyWorkEntry };


