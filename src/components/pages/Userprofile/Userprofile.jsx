import { useEffect, useState } from 'react';

import { DashboardHeader } from '../../organisms/DashboardHeader/DashboardHeader.jsx';
import { DashboardNav } from '../../organisms/DashboardNav/DashboardNav.jsx';

import '../../organisms/DashboardContent/DashboardContent.scss';
import { Assignments } from '../../pages/Assignments/Assignments.jsx';
import { Profile } from './Profile.jsx';

import './Profile.css';
import './Userprofile.css';

const Userprofile = () => {
    return (
        <>
            <DashboardHeader />
            <article className="dashboardContent">
                <DashboardNav />
                <section id="main_userprofile">
                    <section className="container-sections">
                        <article className="section-card">
                            <h2>User Profile</h2>
                            <Profile />
                        </article>

                        <article className="section-card section-card2">
                            <h2>Projects Assigned</h2>
                            <Assignments />
                        </article>

                        <article className="section-card section-card2">
                            {/* Hueco para poner cosas */}
                        </article>
                    </section>
                </section>
            </article>
        </>
    );
};

export { Userprofile };
