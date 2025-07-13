import { useContext, useState } from "react";
import { ProjectsManagerContext } from "../../../contexts/ProjectsManagerContext";
import "./ProjectsManager.scss";

export const ProjectsManager = () => {
    const {
        projectsManager,
        addProject,
        addSubproject,
        editSubproject,
        deleteSubproject,
    } = useContext(ProjectsManagerContext);

    const [expandedProjectIds, setExpandedProjectIds] = useState([]);
    const [editingSubprojectId, setEditingSubprojectId] = useState(null);
    const [editedName, setEditedName] = useState("");
    const [newSubprojectName, setNewSubprojectName] = useState({});
    const [searchTerm, setSearchTerm] = useState("");

    // Estados para añadir nuevo proyecto
    const [newProjectName, setNewProjectName] = useState("");
    const [newProjectIsEuropean, setNewProjectIsEuropean] = useState(false);

    const toggleProject = (id) => {
        setExpandedProjectIds((prev) =>
            prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
        );
    };

    const startEditing = (subproject) => {
        setEditingSubprojectId(subproject.id);
        setEditedName(subproject.name);
    };

    const saveEdit = async (subprojectId) => {
        if (editedName.trim()) {
            await editSubproject(subprojectId, editedName.trim());
            setEditingSubprojectId(null);
            setEditedName("");
        }
    };

    const cancelEdit = () => {
        setEditingSubprojectId(null);
        setEditedName("");
    };

    const handleNewSubprojectChange = (projectId, value) => {
        setNewSubprojectName((prev) => ({ ...prev, [projectId]: value }));
    };

    const handleAddSubproject = async (projectId) => {
        const name = newSubprojectName[projectId];
        if (name && name.trim()) {
            await addSubproject(projectId, name.trim());
            setNewSubprojectName((prev) => ({ ...prev, [projectId]: "" }));
        }
    };

    const handleAddProject = async () => {
        if (!newProjectName.trim()) return;
        await addProject({ name: newProjectName.trim(), isEuropean: newProjectIsEuropean });
        setNewProjectName("");
        setNewProjectIsEuropean(false);
    };

    const filteredProjects = projectsManager.filter((project) =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <h1>Projects Manager</h1>

            <div className="projectSearchCreate">
                <input
                    type="text"
                    placeholder="Search projects"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                {/* Formulario simple para crear nuevo proyecto */}
                <div className="newProjectForm">
                    <input
                        type="text"
                        placeholder="New project name"
                        value={newProjectName}
                        onChange={(e) => setNewProjectName(e.target.value)}
                    />
                    <label>
                        <input
                            type="checkbox"
                            checked={newProjectIsEuropean}
                            onChange={(e) => setNewProjectIsEuropean(e.target.checked)}
                        />
                        European Project
                    </label>
                    <button onClick={handleAddProject}>Create Project</button>
                </div>
            </div>

            <section className="projectsList">
                {filteredProjects.map((project) => {
                    const isOpen = expandedProjectIds.includes(project.id);
                    return (
                        <div key={project.id} className="projectItem">
                            <div
                                className="projectHeader"
                                onClick={() => toggleProject(project.id)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") toggleProject(project.id);
                                }}
                            >
                                <div className="projectInfo">
                                    <strong>{project.name}</strong>
                                    <span className="projectType">
                                        {project.isEuropean ? "European Project" : "Local Project"}
                                    </span>
                                </div>
                                <button
                                    className="toggleButton"
                                    aria-expanded={isOpen}
                                    aria-controls={`details-${project.id}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleProject(project.id);
                                    }}
                                >
                                    {isOpen ? "▲" : "▼"}
                                </button>
                            </div>

                            <div
                                id={`details-${project.id}`}
                                className={`projectDetailsWrapper ${isOpen ? "open" : ""}`}
                            >
                                <div className="projectDetails">
                                    <ul className="subprojectList">
                                        {project.Subprojects.map((sub) => (
                                            <li key={sub.id}>
                                                {editingSubprojectId === sub.id ? (
                                                    <>
                                                        <input
                                                            value={editedName}
                                                            onChange={(e) => setEditedName(e.target.value)}
                                                        />
                                                        <button onClick={() => saveEdit(sub.id)}>Save</button>
                                                        <button onClick={cancelEdit}>Cancel</button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>{sub.name}</span>
                                                        <button
                                                            className="editButton"
                                                            onClick={() => startEditing(sub)}
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="deleteButton"
                                                            onClick={() => deleteSubproject(sub.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </>
                                                )}
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="addSubprojectContainer">
                                        <input
                                            type="text"
                                            placeholder="New subproject name"
                                            value={newSubprojectName[project.id] || ""}
                                            onChange={(e) =>
                                                handleNewSubprojectChange(project.id, e.target.value)
                                            }
                                        />
                                        <button
                                            className="addSubprojectButton"
                                            onClick={() => handleAddSubproject(project.id)}
                                        >
                                            Add Subproject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>
        </>
    );
};

