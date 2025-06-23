import { useEffect, useState } from 'react'

import { DashboardNav } from '../DashboardNav/DashboardNav'
import { DashboardMain } from '../DashboardMain/DashboardMain'
import { DashboardbyEmplooyeedProjets } from '../DashboardFetch/DashboardbyEmployeedProjects/DashboardbyEmployeedProjects.jsx';
import { DashboargetEmplooyeedsbyProjects } from '../DashboardFetch/DashdoargetemployeesdbyProjects/DashboargetEmplooyeedsbyProjects.jsx';

import "./DashboardContent.scss"

export const DashboardContent = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <main className="dashboardContent">
            <DashboardNav />

            { false && < DashboardbyEmplooyeedProjets/> }
            { true && < DashboargetEmplooyeedsbyProjects />}

            <DashboardMain />
        </main>
    )
}
g