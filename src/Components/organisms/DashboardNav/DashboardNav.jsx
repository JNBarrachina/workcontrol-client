import { Link } from "react-router-dom";

import "./DashboardNav.scss";

export const DashboardNav = () => {


    return (
        <>
            <nav className="dashboardNavContainer">
                <Link to="/dashboard" className="dashboardNavLink">
                    <img
                        className="dashboardNavImg"
                        src="/src/assets/calendaricon.svg"
                        alt=""
                    />
                    <p className="linkText">My calendar</p>
                </Link>
                <Link to="/userprofile" className="dashboardNavLink">
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
                <Link to="/admindashboard" className="dashboardNavLink">
                    <img
                        className="dashboardNavImg"
                        src="/src/assets/admin.svg"
                        alt=""
                    />
                    <p className="linkText">Admin Area</p>
                </Link>
            </nav>
        </>
    );
};