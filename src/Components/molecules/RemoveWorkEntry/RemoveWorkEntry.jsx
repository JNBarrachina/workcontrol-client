import { useState, useContext, useRef } from "react";


import "./RemoveWorkEntry.scss";

export const RemoveWorkEntry = ({ modalRef, entry }) => {

  const closeModal = () => {
    modalRef.current?.close();
  };

  const removeWorkEntry = () => {
    console.log(entry);

    fetch(`http://localhost:3000/users/rmworkentry`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "DELETE",
      body: JSON.stringify({
        id: entry.id,
      }),
    }).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })

    closeModal();
  };

  return (
    <dialog ref={modalRef} className="removeTransactionTooltip">
      <div className="removeTransactionTooltipContainer">
        <p>¿Do you want to permanently delete this entry?</p>
        <div className="removeTransactionBtnsContainer">
          <button
            className="removeTransactionBtns backBtn"
            onClick={closeModal}
          >
            Back
          </button>
          <button
            className="removeTransactionBtns removeConfirmBtn"
            onClick={removeWorkEntry}
          >
            Delete
          </button>
        </div>
      </div>
    </dialog>
  );
};
