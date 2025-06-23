import { useEffect, useState } from 'react'

import { DashboardNav } from '../DashboardNav/DashboardNav'
import { DashboardMain } from '../DashboardMain/DashboardMain'


import "./DashboardContent.scss"

export const DashboardContent = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <main className="dashboardContent">
            <DashboardNav />
            <DashboardMain />
        </main>
    )
}