import React from 'react'

import "./DashboardAdminMain.scss"

export const DashboardAdminMain = ({ mainContent }) => {
    return (
        <article className="dashboardAdminMainContent" style={{ marginTop: '4.05rem', height: '91%' }}>
            {true && mainContent}
        </article>
    )
}
