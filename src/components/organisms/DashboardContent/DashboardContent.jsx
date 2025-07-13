import { useEffect, useState } from 'react'

import { DashboardNav } from '../DashboardNav/DashboardNav'
import { DashboardMain } from '../DashboardMain/DashboardMain'


import "./DashboardContent.scss"

export const DashboardContent = () => {
    return (
        <>
            <DashboardNav />
            <article className="dashboardContent">
                <DashboardMain />
            </article>
        </>
    )
}