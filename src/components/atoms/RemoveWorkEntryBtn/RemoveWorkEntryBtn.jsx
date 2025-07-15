import "./RemoveWorkEntryBtn.scss";

export const RemoveWorkEntryBtn = ({ action }) => {
  return (
    <button className="btnRemove" onClick={action}>
      <img className="imgRemove" src="/src/assets/deletecross.svg" alt="Delete" />
    </button>
  );
};
