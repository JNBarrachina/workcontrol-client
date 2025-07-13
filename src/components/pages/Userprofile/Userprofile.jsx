import { useEffect, useState } from 'react'

import { DashboardHeader } from '../../organisms/DashboardHeader/DashboardHeader.jsx'
import { DashboardNav } from '../../organisms/DashboardNav/DashboardNav.jsx'

import '../../organisms/DashboardContent/DashboardContent.scss';
import { Assignments } from '../../pages/Assignments/Assignments.jsx'
import { Profile } from './Profile.jsx'
import './Profile.css'
const Userprofile = () => {
    return (
        <>
            <DashboardHeader />
            <article className="dashboardContent" >
                <DashboardNav />
                <section id="main_userprofile" style={{ marginTop:'4.05rem', height:'100%', overflow: 'hidden', overflowY: 'auto' }}>
                    {/* { false && < DashboardbyProjets/> } */}
                    <section style={{
                            display:'flex',
                            flexDirection:'row',
                            justifyContent:'center',
                            alignItems: 'center',
                            padding: '30px',

                            height: '100%'
                        }}>

                            <article style={{
                                display:'flex',
                                flexDirection:'column',
                                padding: '10px',
                                height:'80rem',
                                width:'32rem',
                                border: '1px solid #000',
                                borderRadius:'12px',
                                overflow:'hidden',
                                overflowY:'auto',
                            }}>
                            <h2>Projects Assigned</h2>
                            <Assignments />
                            </article>

                            <article style={{
                                    display:'flex',
                                    flexDirection:'column',
                                    margin:' 0 0 0 2rem',
                                    padding: '10px',
                                    height:'80rem',
                                    width:'33rem',
                                    border: '1px solid #000',
                                    borderRadius:'12px',
                                    overflow:'hidden',
                                    overflowY:'auto',
                                    
                            }}>
                                <h2> User Profile </h2>
                                < Profile />
                            </article>

                            <article style={{
                                    display:'flex',
                                    flexDirection:'column',
                                    margin:' 0 0 0 2rem',
                                    padding: '10px',
                                    height:'80rem',
                                    width:'32rem',
                                    border: '1px solid #000',
                                    borderRadius:'12px',
                                    overflow:'hidden',
                                    overflowY:'auto',
                                    
                            }}>

                            </article>
                        
                    </section>
                </section>
            </article>
        </>
    )
}

export {
    Userprofile,
}