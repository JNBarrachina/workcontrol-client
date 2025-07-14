import { createContext, useState, useEffect } from "react";

export const ProjectsManagerContext = createContext();

export const ProjectsManagerProvider = ({ children }) => {
    const [projectsManager, setProjectsManager] = useState([]);

    const fetchProjects = async () => {
        try {
            const res = await fetch("http://localhost:3000/projects");
            const data = await res.json();
            setProjectsManager(data);
        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const addProject = async ({ name, isEuropean }) => {
        try {
            const res = await fetch("http://localhost:3000/projects", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, isEuropean }),
            });
            if (!res.ok) throw new Error("Failed to create project");
            await fetchProjects();
        } catch (error) {
            console.error("Error creating project:", error);
        }
    };

    const addSubproject = async (projectId, subprojectName) => {
        try {
            const res = await fetch("http://localhost:3000/projects/subproject", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: subprojectName, ProjectId: projectId }),
            });
            if (!res.ok) throw new Error("Failed to create subproject");
            await fetchProjects();
        } catch (error) {
            console.error("Error creating subproject:", error);
        }
    };

    const editSubproject = async (subprojectId, newName) => {
        try {
            const res = await fetch(`http://localhost:3000/projects/subproject/${subprojectId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: newName }),
            });
            if (!res.ok) throw new Error("Failed to update subproject");
            await fetchProjects();
        } catch (error) {
            console.error("Error updating subproject:", error);
        }
    };

    const deleteSubproject = async (subprojectId) => {
        try {
            const res = await fetch(`http://localhost:3000/projects/subproject/${subprojectId}`, {
                method: "DELETE",
            });
            if (!res.ok) throw new Error("Failed to delete subproject");
            await fetchProjects();
        } catch (error) {
            console.error("Error deleting subproject:", error);
        }
    };

    return (
        <ProjectsManagerContext.Provider
            value={{
                projectsManager,
                setProjectsManager,
                addProject,
                addSubproject,
                editSubproject,
                deleteSubproject,
                fetchProjects,
            }}
        >
            {children}
        </ProjectsManagerContext.Provider>
    );
};


