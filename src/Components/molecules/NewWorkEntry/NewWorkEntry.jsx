import { useState, useContext } from "react";

import { UserDataContext } from "../../../contexts/UserDataContext";

import "./NewWorkEntry.scss";

export const NewWorkEntry = ({ modalRef, day }) => {

    console.log(day);

    const [project, setProject] = useState("");
    const [time, setTime] = useState("");
    const [msg, setMsg] = useState("");

    const closeModal = () => {
        modalRef.current?.close();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (time <= 0 || time == 7.5) {
            setMsg("Amount must be greater than zero");
            return;
        }

        addNewWorkEntry();
    }
    const addNewWorkEntry = () => {
        const today = new Date();

        closeModal();
    };


    return (
        <>
            <dialog ref={modalRef} className="newWorkEntryDialog">
                <div className="newWorkEntryDialogContainer">
                    <h2 className="dialogTitle">New Work Entry</h2>
                    <form action="" className="newWorkEntryForm" onSubmit={handleSubmit}>
                        <div className="selectProject">
                            <label htmlFor="project" className="modalLabel">Project</label>
                            <select
                                className="newWorkEntryProject"
                                name="project"
                                id="project"
                                onChange={(e) => setNewCategory(e.target.value)}
                            >
                                <option value="proyecto1">Proyecto 1</option>
                                <option value="proyecto2">Proyecto 2</option>
                                <option value="proyecto3">Proyecto 3</option>
                                <option value="proyecto4">Proyecto 4</option>
                            </select>
                        </div>
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
        </>
    );
};
