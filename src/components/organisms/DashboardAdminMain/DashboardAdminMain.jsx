import React from 'react'

import "./DashboardAdminMain.scss"

export const DashboardAdminMain = ({ mainContent }) => {
    return (
        <article className="dashboardAdminMainContent">
            {true && mainContent}
        </article>
    )
}
