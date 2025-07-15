import { useContext, useRef } from "react";

import { UserLogout } from "../../molecules/UserLogout/UserLogout";

import { UserDataContext } from "../../../contexts/UserDataContext";
import { NavContext } from "../../../contexts/NavContext";

import "./DashboardHeader.scss";

export const DashboardHeader = () => {
    const { userData } = useContext(UserDataContext);
    const { setNavOpen } = useContext(NavContext);

    const modalRef = useRef(null);

    const openModal = () => {
        modalRef.current?.showModal();
    };

    return (
        <>
            <header className="dashboardHeaderContainer">
                <button className="navOpenBtn"><img src="/src/assets/menuicon.svg" alt="" onClick={() => setNavOpen(true)} /></button>
                <div className="userProfileBox">
                    <p className="userProfileEmail">{userData.email} ({userData.role})</p>
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