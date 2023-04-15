import React, { useState } from 'react';

function AddProjectForm() {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [showDetails, setShowDetails] = useState([]);
    const [editingProjectId, setEditingProjectId] = useState(null);
    const [newProjectName, setNewProjectName] = useState('');

    const handleDeleteProject = (id) => {
        setShowDetails(showDetails?.project?.filter((project) => project.id !== id));
    };

    const handleEditProject = (id) => {
        setEditingProjectId(id);
    };

    const handleSaveProject = (id) => {
        const updatedProjects = projects.map((project) => {
            if (project.id === id) {
                return { ...project, name: newProjectName };
            }
            return project;
        });
        setProjects(updatedProjects);
        setEditingProjectId(null);
        setNewProjectName('');
        setShowDetails({ "project": [...updatedProjects, { name: newProjectName }] })
    };

    const handleCancelEdit = () => {
        setEditingProjectId(null);
        setNewProjectName('');
    };


    const handleTaskChange = (event, index) => {
        const updatedTasks = [...tasks];
        updatedTasks[index] = {
            id: Date.now(),
            name: event.target.value,
            status: 'Active',
            description: 'Task 1 description',
            children: [],
        };
        setTasks(updatedTasks);
    };

    const handleSubtaskChange = (event, taskIndex, subtaskIndex) => {
        const updatedTasks = [...tasks];
        const updatedSubtasks = [...updatedTasks[taskIndex].children]
        updatedSubtasks[subtaskIndex] = event.target.value;
        updatedTasks[taskIndex].children = updatedSubtasks;
        setTasks(updatedTasks);
    };

    const handleAddTask = () => {
        setTasks([...tasks, {
            id: Date.now(), name: '', status: 'Active', description: 'Task 1.1 description', children: []
        }]);
    };

    const handleAddSubtask = (taskIndex) => {
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex].children.push('');
        setTasks(updatedTasks);
    };

    const handleAddProject = (e) => {
        e.preventDefault()
        const newProject = {
            id: Date.now(),
            name: newProjectName,
            tasks: tasks
        };
        setProjects([...projects, newProject]);
        setShowDetails({ "project": [...projects, newProject] })
        setNewProjectName('')
    };

    return (
        <div>
            <form onSubmit={handleAddProject}>
                <label htmlFor="project-name">Project Name</label>
                <input type="text" id="project-name" value={newProjectName} onChange={(e) => setNewProjectName(e.target.value)} />
                <br />
                <label>Tasks</label>
                {tasks?.map((task, taskIndex) => (
                    <div key={taskIndex}>
                        <input type="text" value={task.name} onChange={(event) => handleTaskChange(event, taskIndex)} />
                        {task?.children?.map((children, subtaskIndex) => (
                            <div key={subtaskIndex}>
                                <input type="text" value={children} onChange={(event) => handleSubtaskChange(event, taskIndex, subtaskIndex)} />
                            </div>
                        ))}
                        <button type="button" onClick={() => handleAddSubtask(taskIndex)}>Add Subtask</button>
                    </div>
                ))}
                <button type="button" onClick={handleAddTask}>Add Task</button>

                <button type="submit">Save</button>
            </form>

            {showDetails?.project?.map((project) => (
                <>
                    {editingProjectId === project.id ? (
                        <>
                            <input
                                type="text"
                                value={newProjectName}
                                onChange={(e) => setNewProjectName(e.target.value)}
                            />
                            <button onClick={() => handleSaveProject(project.id)}>Save</button>
                            <button onClick={handleCancelEdit}>Cancel</button>
                        </>
                    ) : (
                        <>
                            <ul>
                                <li>
                                    {project.name}
                                </li>
                                {project?.tasks?.map((tasks) => (
                                    <>
                                        <ul>
                                            <li>
                                                {tasks.name}
                                            </li>
                                            <ul>
                                                <li>
                                                    {tasks?.children}
                                                </li>
                                            </ul>
                                        </ul>
                                    </>
                                ))}
                                <button onClick={() => handleEditProject(project.id)}>Edit</button>
                                <button onClick={() => handleDeleteProject(project.id)}>Delete</button>
                            </ul>

                        </>
                    )}
                </>
            ))}
        </div>
    );
}

export default AddProjectForm;

