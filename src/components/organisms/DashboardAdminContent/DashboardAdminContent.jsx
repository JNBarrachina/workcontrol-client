import { useState } from 'react'

import { DashboardNav } from '../DashboardNav/DashboardNav'
import { DashboardAdminMain } from '../DashboardAdminMain/DashboardAdminMain'

import "./DashboardAdminContent.scss"

export const DashboardAdminContent = ({ mainContent }) => {


    return (
        <main className="dashboardContent">
            <DashboardNav />
            <DashboardAdminMain mainContent={mainContent} />
        </main>
    )
}
