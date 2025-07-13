import { useContext } from "react"

import { ProjectsManagerContext } from "../../../contexts/ProjectsManagerContext"

export const ProjectsManager = () => {

    const { projectsManager, setProjectsManager } = useContext(ProjectsManagerContext)

    return (
        <>
            <h1>Projects Manager</h1>
            <div className="projectSearchCreate">
                <input type="text" placeholder="Search projects" />
                <button onClick={() => setProjectsManager(!projectsManager)}>Create a new project</button>
            </div>
            <section>
                {projectsManager.map((project) => (
                    <details key={project.id}>
                        <summary>{project.name}</summary>
                        <p>{project.description}</p>
                    </details>
                ))}
            </section>
        </>


    )
}
