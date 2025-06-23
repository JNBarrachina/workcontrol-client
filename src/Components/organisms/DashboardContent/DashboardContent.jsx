import { useEffect, useState } from 'react'

import { DashboardNav } from '../DashboardNav/DashboardNav'
import { DashboardMain } from '../DashboardMain/DashboardMain'
import { DashboardbyEmplooyeedbyProjets } from '../../molecules/DashboardFetch/DashboardbyEmployeedProjects/DashboardbyEmployeedProjects.jsx';
import { DashboargetEmplooyeedsbyProjects } from '../../molecules/DashboardFetch/DashdoargetemployeesdbyProjects/DashboargetEmplooyeedsbyProjects.jsx';

import "./DashboardContent.scss"

export const DashboardContent = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <main className="dashboardContent">
            <DashboardNav />

            { /*Admin*/}
            { false && < DashboargetEmplooyeedsbyProjects />}
            { /*User*/}
            { true && < DashboardbyEmplooyeedbyProjets/> }

            

            <DashboardMain />
        </main>
    )
}