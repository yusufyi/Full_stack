import React, { useEffect, useState } from 'react';

const TaskForm = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [newProjectName, setNewProjectName] = useState("");

  // Fetch existing projects
  useEffect(() => {
    fetch("http://localhost:8000/api/projects/")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Failed to load projects:", err));
  }, []);

  const createProject = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/api/projects/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newProjectName }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProjects([...projects, data]);
        setNewProjectName("");
      })
      .catch((err) => console.error("Project creation failed:", err));
  };

  const createTask = (e) => {
    e.preventDefault();
    fetch("http://localhost:8000/api/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        completed: false,
        project: projectId,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to create task");
        }
        setTitle("");
        setProjectId("");
      })
      .catch((err) => console.error("Task creation failed:", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create a New Project</h2>
      <form onSubmit={createProject}>
        <input
          type="text"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          placeholder="Project name"
        />
        <button type="submit">Add Project</button>
      </form>

      <h2 style={{ marginTop: "30px" }}>Create a New Task</h2>
      <form onSubmit={createTask}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />
        <select value={projectId} onChange={(e) => setProjectId(e.target.value)}>
          <option value="">-- Select Project --</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;