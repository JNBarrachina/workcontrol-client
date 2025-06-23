import { useNavigate } from "react-router-dom";
import "./UserLogout.scss";

export const UserLogout = ({ modalRef }) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("userLogged");
    navigate("/login");
  };

  const closeModal = () => {
    modalRef.current?.close();
  };

  return (
    <dialog ref={modalRef} className="logoutTooltip">
      <div className="logoutTooltipContainer">
        <h3>Are you sure you want to log out?</h3>
        <div className="logoutBtnsContainer">
          <button className="logoutBtns backBtn" onClick={closeModal}>
            Back
          </button>
          <button className="logoutBtns exitBtn" onClick={logout}>
            Log out
          </button>
        </div>
      </div>
    </dialog>
  );
};
