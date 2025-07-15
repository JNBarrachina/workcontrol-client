import { useContext } from "react";
import { Link } from "react-router-dom";

import "./DashboardNav.scss";

import { UserDataContext } from "../../../contexts/UserDataContext";
import { NavContext } from "../../../contexts/NavContext";

export const DashboardNav = () => {
    const { navOpen, setNavOpen } = useContext(NavContext);

    const { userData } = useContext(UserDataContext);

    return (
        <>
            <nav className={navOpen == true ? "dashboardNavContainer navOpen" : "dashboardNavContainer"}>
                <img src=" /src/assets/workflow.png" className="mainLogo" alt="" />
                <button className="navCloseBtn" onClick={() => setNavOpen(false)}><img src=" /src/assets/arrowmenuicon.svg" alt="" /></button>
                <Link to="/dashboard" className="dashboardNavLink">
                    <img
                        className="dashboardNavImg"
                        src="/src/assets/calendaricon.svg"
                        alt=""
                    />
                    <p className="linkText">My workflow</p>
                </Link>
                <Link to="/userdocs" className="dashboardNavLink">
                    <img
                        className="dashboardNavImg"
                        src="/src/assets/documentsicon.svg"
                        alt=""
                    />
                    <p className="linkText">My documents</p>
                </Link>
                <Link to="/reports" className="dashboardNavLink">
                    <img
                        className="dashboardNavImg"
                        src="/src/assets/charicon.svg"
                        alt=""
                    />
                    <p className="linkText">Reports</p>
                </Link>
                <Link to="/userprofile" className="dashboardNavLink">
                    <img
                        className="dashboardNavImg"
                        src="/src/assets/profileicon.svg"
                        alt=""
                    />
                    <p className="linkText">Profile</p>
                </Link>
                {userData.role === "admin" &&
                    <>
                        <Link to="/adminarea" className="dashboardNavLink">
                            <img
                                className="dashboardNavImg"
                                src="/src/assets/admin.svg"
                                alt=""
                            />
                            <p className="linkText">Admin Area</p>
                        </Link>
                        <ul className="adminSubmenu">
                            <Link to="/adminarea/projectsmanager" className="dashboardNavLink adminNavLink">
                                <p className="linkText">Projects</p>
                            </Link>
                            <Link to="/adminarea/employeesmanager" className="dashboardNavLink adminNavLink">
                                <p className="linkText">Employees</p>
                            </Link>
                            <Link to="/adminarea/timesheetsmanager" className="dashboardNavLink adminNavLink">
                                <p className="linkText">Timesheets</p>
                            </Link>
                        </ul>
                    </>
                }
            </nav >
        </>
    );
};