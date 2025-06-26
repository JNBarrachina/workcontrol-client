import { useRef } from "react";
import { RemoveWorkEntryBtn } from "../../atoms/RemoveWorkEntryBtn/RemoveWorkEntryBtn";
import { RemoveWorkEntry } from "../../molecules/RemoveWorkEntry/RemoveWorkEntry";

import "./DailyWorkEntry.scss";

const DailyWorkEntry = ({ entry, onDelete }) => {
    const modalRef = useRef(null);

    const openDeleteModal = () => {
        modalRef.current?.showModal();
    };

    const handleConfirmedDelete = async () => {
        try {
            const res = await fetch(`http://localhost:3000/users/rmworkentry`, {
                headers: { "Content-type": "application/json" },
                method: "DELETE",
                body: JSON.stringify({ id: entry.id })
            });

            if (res.ok) {
                onDelete(entry.id); // 🔥 Actualiza el estado en MonthDay
            } else {
                alert("Error al eliminar la entrada.");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <article className="dailyWorkEntryCard">
            <h3 className="entryName">{entry.Subproject.name}</h3>
            <div className="timeremoveContainer">
                <p className="entryTime">{entry.hours}h</p>
                <RemoveWorkEntryBtn action={openDeleteModal} />
            </div>
            <RemoveWorkEntry
                modalRef={modalRef}
                entry={entry}
                onConfirm={handleConfirmedDelete}
            />
        </article>
    );
};

export { DailyWorkEntry };
