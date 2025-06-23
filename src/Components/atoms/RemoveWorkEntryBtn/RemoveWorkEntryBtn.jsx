import "./RemoveWorkEntryBtn.css";

export const RemoveWorkEntryBtn = ({ action }) => {
  return (
    <button className="removeBtn btnRemove" onClick={action}>
      <img className="removeImg imgRemove" src="/src/assets/delete.svg" alt="Delete" />
    </button>
  );
};
