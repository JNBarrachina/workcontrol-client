import React from 'react'

import { DashboardHeader } from '../../organisms/DashboardHeader/DashboardHeader.jsx'
import { DashboardNav } from '../../organisms/DashboardNav/DashboardNav.jsx'

import './NotFound.scss';

export const NotFound = () => {
    return (
        <>

            {
                JSON.parse(localStorage.getItem('logead')) == true ?

                    <>
                        <DashboardHeader />
                        <main className="dashboardContent">
                            <DashboardNav />
                            <section id='main-notfound'>
                                <h1>404</h1>
                                <p>Page not found</p>
                            </section>
                        </main>
                    </>

                    :

                    <>
                        <main id='main-notfound'>
                            <section>
                                <h1>404</h1>
                                <p>Page not found</p>
                            </section>
                        </main>
                    </>

            }

        </>
    )
}
