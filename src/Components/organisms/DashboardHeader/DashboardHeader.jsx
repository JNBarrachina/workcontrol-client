import { useContext, useRef } from "react";

import { UserLogout } from "../../molecules/UserLogout/UserLogout";
import { UserDataContext } from "../../../contexts/UserDataContext";

import "./DashboardHeader.scss";

export const DashboardHeader = () => {
    const { userData } = useContext(UserDataContext);
    const modalRef = useRef(null);

    const openModal = () => {
        modalRef.current?.showModal();
    };

    return (
        <>
            <header className="dashboardHeaderContainer">
                <img src=" /src/assets/workflow.png" className="dashboardLogo" alt="" />
                <div className="userProfileBox">
                    <p className="userProfileEmail">{userData.email}</p>
                    <img
                        className="userProfileImg"
                        src="/src/assets/avatar.png"
                        alt=""
                    />
                    <button className="headerBtns notifyBtn">
                        <img
                            className="logoutImg"
                            src="/src/assets/notifications.svg"
                            alt=""
                        />
                    </button>
                    <button className="headerBtns logoutBtn" onClick={openModal}>
                        <img
                            className="logoutImg"
                            src="/src/assets/logout.svg"
                            alt=""
                        />
                    </button>
                </div>
                <UserLogout modalRef={modalRef} />
            </header>
        </>
    );
};