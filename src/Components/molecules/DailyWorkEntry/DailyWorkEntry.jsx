import { RemoveWorkEntryBtn } from "../../atoms/RemoveWorkEntryBtn/RemoveWorkEntryBtn";
import "./DailyWorkEntry.scss";

const DailyWorkEntry = ({ entries }) => {
    if (!Array.isArray(entries)) return null;

    return (
        <>
            {entries.map((entry, index) => (
                <article className="dailyWorkEntryCard" key={index}>
                    <h3 className="entryName">{entry?.Subproject?.name || "Sin subproyecto"}</h3>
                    <p className="entryTime">{entry?.hours || 0}H</p>
                    <RemoveWorkEntryBtn action={() => { }} />
                </article>
            ))}
        </>
    );
};

export { DailyWorkEntry };


