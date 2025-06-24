import "./RemoveWorkEntryBtn.css";

export const RemoveWorkEntryBtn = ({ action }) => {
  return (
    <button className="btnRemove" onClick={action}>
      <img className="imgRemove" src="/src/assets/delete.svg" alt="Delete" />
    </button>
  );
};
