import "./RemoveWorkEntry.scss";

export const RemoveWorkEntry = ({ modalRef, onConfirm }) => {
  const closeModal = () => modalRef.current?.close();

  const handleDelete = () => {
    if (onConfirm) onConfirm(); // Ejecuta lógica del padre
    closeModal();
  };

  return (
    <dialog ref={modalRef} className="removeTransactionTooltip">
      <div className="removeTransactionTooltipContainer">
        <p>¿Do you want to permanently delete this entry?</p>
        <div className="removeTransactionBtnsContainer">
          <button className="removeTransactionBtns backBtn" onClick={closeModal}>
            Back
          </button>
          <button className="removeTransactionBtns removeConfirmBtn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </dialog>
  );
};


