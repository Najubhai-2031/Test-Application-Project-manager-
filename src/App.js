import React, { useState } from 'react';
import ProjectList from './ProjectList';
import AddProjectForm from './AddProjectForm';

function App() {
  const [projects, setProjects] = useState([]);

  const addProject = (newProject) => {
    setProjects([...projects, newProject]);
  }

  return (
    <div>
      <h1>Project Manager</h1>
      <AddProjectForm addProject={addProject} />
      <ProjectList projects={projects} />
    </div>
  );
}

export default App;
