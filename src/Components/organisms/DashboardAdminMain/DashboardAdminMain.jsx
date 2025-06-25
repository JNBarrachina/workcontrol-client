import React from 'react'

import { DashboargetEmplooyeedsbyProjects } from '../../molecules/DashboardFetch/DashdoargetemployeesdbyProjects/DashboargetEmplooyeedsbyProjects.jsx';

import "./DashboardAdminMain.scss"

export const DashboardAdminMain = () => {
    return (
        <article className="dashboardAdminMainContent">
            <h1>Admin Area</h1>
            { /*Admin*/}
            { true && < DashboargetEmplooyeedsbyProjects />}
        </article>
    )
}
