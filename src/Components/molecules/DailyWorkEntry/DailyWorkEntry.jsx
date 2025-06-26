import { useContext, useRef } from "react";

import { MonthlyEntriesContext } from "../../../contexts/MonthlyEntriesContext";

import { RemoveWorkEntryBtn } from "../../atoms/RemoveWorkEntryBtn/RemoveWorkEntryBtn";
import { RemoveWorkEntry } from "../../molecules/RemoveWorkEntry/RemoveWorkEntry";

import "./DailyWorkEntry.scss";

const DailyWorkEntry = ({ entry }) => {
    const { entries, setEntries } = useContext(MonthlyEntriesContext);

    const modalRef = useRef(null);

    const openDeleteModal = () => {
        modalRef.current?.showModal();
    };

    const handleDeleteWorkEntry = (removedEntry) => {
        const newEntries = entries.filter((e) => e.id !== removedEntry.id);
        setEntries(newEntries);
    };

    return (
        <article className="dailyWorkEntryCard">
            <div>
                <h3 className="entryProjectName">{entry.Subproject.Project.name}</h3>
                <h3 className="entrySubprojectName">{entry.Subproject.name}</h3>
            </div>
            <div className="timeremoveContainer">
                <p className="entryTime">{entry.hours}h</p>
                <RemoveWorkEntryBtn action={openDeleteModal} />
            </div>
            <RemoveWorkEntry
                modalRef={modalRef}
                entry={entry}
                handleConfirmedDelete={handleDeleteWorkEntry}
            />
        </article>
    );
};

export { DailyWorkEntry };

