import { useRef } from "react";

import { UserLogout } from "../../molecules/UserLogout/UserLogout";

import "./DashboardHeader.scss";

export const DashboardHeader = () => {
    const modalRef = useRef(null);

    const openModal = () => {
        modalRef.current?.showModal();
    };

    return (
        <>
            <header className="dashboardHeaderContainer">
                <img src=" /src/assets/workflow.png" className="dashboardLogo" alt="" />
                <div className="userProfileBox">
                    <p className="userProfileName">John Doe</p>
                    <img
                        className="userProfileImg"
                        src="/src/assets/avatar.png"
                        alt=""
                    />
                    <button className="logoutBtn" onClick={openModal}>
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