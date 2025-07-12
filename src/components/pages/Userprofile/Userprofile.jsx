import { useEffect, useState } from 'react'

import { DashboardHeader } from '../../organisms/DashboardHeader/DashboardHeader.jsx'
import { DashboardNav } from '../../organisms/DashboardNav/DashboardNav.jsx'

import '../../organisms/DashboardContent/DashboardContent.scss';
import { Profile } from './Profile.jsx'
import './Profile.css'
const Userprofile = () => {
    return (
        <>
            <DashboardHeader />
            <main className="dashboardContent">
                <DashboardNav />
                <section id="main_userprofile" style={{ marginTop:'4.05rem', height:'91%', overflow: 'hidden', overflowY: 'auto' }}>
                    {/* { false && < DashboardbyProjets/> } */}
                    <section style={{
                        display:'flex',
                        flexDirection:'column',
                        justifyContent:'center',
                        alignItems: 'center',
                        padding: '10px'
                        }}>
                        < Profile />
                    </section>

                </section>
            </main>
        </>
    )
}

export {
    Userprofile,
}