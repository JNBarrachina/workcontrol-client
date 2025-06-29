import React from 'react'

import { DashboardHeader } from '../../organisms/DashboardHeader/DashboardHeader'
import { DashboardNav } from '../../organisms/DashboardNav/DashboardNav'

import './UserDocs.scss';

export const UserDocs = () => {
    return (
        <>
            <DashboardHeader />
            <main className="dashboardContent">
                <DashboardNav />
                <article className='userDocsContainer'>
                    <h1>Your documents</h1>
                </article>
            </main>
        </>
    )
}