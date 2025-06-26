import { useState, useContext } from "react";
import { UserDataContext } from "../../../contexts/UserDataContext";
import { UserProjectsContext } from "../../../contexts/UserProjectsContext";

import "./NewWorkEntry.scss";

export const NewWorkEntry = ({ modalRef, day, onNewWorkEntry }) => {
    const { userData } = useContext(UserDataContext);
    const { userProjects } = useContext(UserProjectsContext);

    const selectProjects = userProjects.data || [];

    const [selectedProjectId, setSelectedProjectId] = useState("");
    const [selectedSubprojectId, setSelectedSubprojectId] = useState("");
    const [time, setTime] = useState("");
    const [msg, setMsg] = useState("");

    const closeModal = () => {
        modalRef.current?.close();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (time <= 0 || time > 7.5) {
            setMsg("Time must be between 0 and 7.5h");
            return;
        }

        addNewWorkEntry();
    };

    const addNewWorkEntry = () => {
        const newWorkEntry = {
            EmployeeId: userData.id,
            SubprojectId: selectedSubprojectId,
            date: day.date,
            hours: parseFloat(time),
        };

        fetch(`http://localhost:3000/users/newworkentry`, {
            headers: { "Content-type": "application/json" },
            method: "POST",
            body: JSON.stringify(newWorkEntry),
        })
            .then(async (res) => {
                const data = await res.json();
                if (res.status >= 400 && data.msg) {
                    setMsg(data.msg);
                } else {
                    const newWorkEntry = data.checkedNewWorkEntry
                    onNewWorkEntry(newWorkEntry);
                }
            })
            .catch((err) => console.error(err));

        closeModal();
    };

    const selectedProject = selectProjects.find(p => p.id === parseInt(selectedProjectId));
    const filteredSubprojects = selectedProject?.Subprojects || [];

    return (
        <dialog ref={modalRef} className="newWorkEntryDialog">
            <div className="newWorkEntryDialogContainer">
                <h2 className="dialogTitle">New Work Entry ({day.date})</h2>
                <form className="newWorkEntryForm" onSubmit={handleSubmit}>
                    <div className="selectProject">
                        <label htmlFor="project" className="modalLabel">Project</label>
                        <select
                            className="newWorkEntryProjectSelect"
                            name="project"
                            id="project"
                            value={selectedProjectId}
                            onChange={(e) => {
                                setSelectedProjectId(e.target.value);
                                setSelectedSubprojectId(""); // reset subproyecto
                            }}
                            required
                        >
                            <option value="">Select a project</option>
                            {selectProjects.map((project) => (
                                <option key={project.id} value={project.id}>
                                    {project.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {filteredSubprojects.length > 0 && (
                        <div className="selectSubproject">
                            <label htmlFor="subproject" className="modalLabel">Subproject</label>
                            <select
                                className="newWorkEntrySubprojectSelect"
                                name="subproject"
                                id="subproject"
                                value={selectedSubprojectId}
                                onChange={(e) => setSelectedSubprojectId(e.target.value)}
                                required
                            >
                                <option value="">Select a subproject</option>
                                {filteredSubprojects.map((sub) => (
                                    <option key={sub.id} value={sub.id}>
                                        {sub.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="selectTime">
                        <label htmlFor="time" className="modalLabel">Time</label>
                        <input
                            type="number"
                            name="time"
                            id="time"
                            placeholder="Insert time in hours"
                            className="newWorkEntryTime"
                            onChange={(e) => setTime(e.target.value)}
                            value={time}
                            required
                        />
                    </div>

                    {msg && <p className="msgError">{msg}</p>}

                    <div className="newWorkEntryBtns">
                        <button className="modalBtn backBtn" onClick={closeModal} type="button">
                            Back
                        </button>
                        <button className="modalBtn addBtn" type="submit">Add Work Entry</button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

