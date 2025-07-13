import { useEffect, useState } from 'react'

import { DashboardHeader } from '../../organisms/DashboardHeader/DashboardHeader.jsx'
import { DashboardNav } from '../../organisms/DashboardNav/DashboardNav.jsx'

import { DashboardbyEmplooyeedbyProjets } from '../../molecules/DashboardFetch/DashboardbyEmployeedProjects/DashboardbyEmployeedProjects.jsx';

import '../../organisms/DashboardContent/DashboardContent.scss';
const Assignments = () => {
    return (
            < DashboardbyEmplooyeedbyProjets />
    )
}

export {
    Assignments,
}