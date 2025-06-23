import { useEffect, useState } from 'react'

import { DashboardHeader } from '../../organisms/DashboardHeader/DashboardHeader.jsx'
import { DashboardNav } from '../../organisms/DashboardNav/DashboardNav.jsx'



import { DashboargetEmplooyeedsbyProjects } from '../../molecules/DashboardFetch/DashdoargetemployeesdbyProjects/DashboargetEmplooyeedsbyProjects.jsx';
import { DashboardbyEmplooyeedbyProjets } from '../../molecules/DashboardFetch/DashboardbyEmployeedProjects/DashboardbyEmployeedProjects.jsx';


import '../../organisms/DashboardContent/DashboardContent.scss'

const Userprofile = () => {


    return(
        <>
            <DashboardHeader />
            <main className="dashboardContent">
                <DashboardNav />
                <section id="main_userprofile">
                    { /*Admin*/}
                    { false && < DashboargetEmplooyeedsbyProjects />}
                    { /*User*/}
                    { true && < DashboardbyEmplooyeedbyProjets/> }
                </section>
            </main>
        </>
    )
}

export {
    Userprofile,
}