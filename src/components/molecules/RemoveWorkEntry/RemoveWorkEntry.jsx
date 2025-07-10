import "./RemoveWorkEntry.scss";

import { useContext } from "react";
import { MonthlyEntriesContext } from "../../../contexts/MonthlyEntriesContext";

export const RemoveWorkEntry = ({ modalRef, entry, handleConfirmedDelete }) => {
  const closeModal = () => modalRef.current?.close();

  const { entries, setEntries } = useContext(MonthlyEntriesContext);

  const handleDestroyWorkEntry = async () => {
    try {
      fetch(`http://localhost:3000/users/rmworkentry`, {
        headers: { "Content-type": "application/json" },
        method: "DELETE",
        body: JSON.stringify({ id: entry.id }),
      })
        .then(async (res) => {
          if (!res.ok) {
            console.error("Error deleting entry");
          } else {
            handleConfirmedDelete(entry);
          }
        });
    } catch (err) {
      console.error(err);
    }

    closeModal();
  };

  return (
    <dialog ref={modalRef} className="removeWorkEntryModal">
      <div className="removeWorkEntryModalContainer">
        <p>¿Do you want to permanently delete this entry?</p>
        <div className="removeWorkEntryBtnsContainer">
          <button className="removeWorkEntryBtns backBtn" onClick={closeModal}>
            Back
          </button>
          <button className="removeWorkEntryBtns removeConfirmBtn" onClick={handleDestroyWorkEntry}>
            Delete
          </button>
        </div>
      </div>
    </dialog>
  );
};


