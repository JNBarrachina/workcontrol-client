import { useState } from 'react'

import { DashboardNav } from '../DashboardNav/DashboardNav'
import { DashboardAdminMain } from '../DashboardAdminMain/DashboardAdminMain'

import "./DashboardAdminContent.scss"

export const DashboardAdminContent = () => {


    return (
        <main className="dashboardContent">
            <DashboardNav />
            <DashboardAdminMain />
        </main>
    )
}
