import { useContext, useRef } from "react";

import { MonthlyEntriesContext } from "../../../contexts/MonthlyEntriesContext";

import { RemoveWorkEntryBtn } from "../../atoms/RemoveWorkEntryBtn/RemoveWorkEntryBtn";
import { RemoveWorkEntry } from "../../molecules/RemoveWorkEntry/RemoveWorkEntry";

import "./DailyWorkEntry.scss";

const DailyWorkEntry = ({ entry }) => {
    const { setEntries } = useContext(MonthlyEntriesContext);

    const modalRef = useRef(null);

    const openDeleteModal = () => {
        modalRef.current?.showModal();
    };

    const handleConfirmedDelete = async () => {
        try {
            const res = await fetch(`http://localhost:3000/users/rmworkentry`, {
                headers: { "Content-type": "application/json" },
                method: "DELETE",
                body: JSON.stringify({ id: entry.id }),
            });

            if (res.ok) {
                // ✅ Actualiza el contexto global
                setEntries(prevEntries => prevEntries.filter(e => e.id !== entry.id));

                // ✅ Informa al padre (MonthDay) para que actualice su propia lista
                if (onDelete) onDelete(entry.id);
            } else {
                alert("Error al eliminar la entrada.");
            }
        } catch (err) {
            console.error(err);
        }
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
                onConfirm={handleConfirmedDelete}
            />
        </article>
    );
};

export { DailyWorkEntry };

