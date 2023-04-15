import React from "react";

function ProjectList(props) {
    return (
      <ul>
        {props.projects.map((project, index) => (
          <li key={index}>{project.name}</li>
        ))}
      </ul>
    );
  }
  
  export default ProjectList;
  