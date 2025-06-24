import { useEffect, useState } from 'react'

import { DashboardHeader } from '../../organisms/DashboardHeader/DashboardHeader.jsx'
import { DashboardNav } from '../../organisms/DashboardNav/DashboardNav.jsx'

import { DashboardbyEmployeedProjects } from '../../molecules/DashboardFetch/DashboardbyEmployeedProjects/DashboardbyEmployeedProjects';
import { DashboardEmployeedProjects } from '../../molecules/DashboardFetch/DashboardEmployeedProjects/DashboardEmployeedProjects';

import '../../organisms/DashboardContent/DashboardContent.scss'

const Userprofile = () => {


    return(
        <>
            <DashboardHeader />
            <main className="dashboardContent">
                <DashboardNav />
                <section id="main_userprofile">
                    { false && < DashboardEmployeedProjects/> }
                    { true && < DashboardbyEmployeedProjects/> }
                </section>
            </main>
        </>
    )
}

export {
    Userprofile,
}