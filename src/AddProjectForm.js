import React, { useState } from 'react';

function AddProjectForm() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newSubtask, setNewSubtask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), title: newTask, subtasks: [] }]);
      setNewTask('');
    }
  };

  const handleEditTask = (taskId) => {
    setEditingTaskId(taskId);
  };

  const handleSaveTask = (taskId, newTitle) => {
    setTasks(tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, title: newTitle };
      }
      return task;
    }));
    setEditingTaskId(null);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleAddSubtask = (taskId) => {
    if (newSubtask.trim()) {
      setTasks(tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, subtasks: [...task.subtasks, { id: Date.now(), title: newSubtask }] };
        }
        return task;
      }));
      setNewSubtask('');
    }
  };

  return (
    <div>
      <h1>Tasks:</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {editingTaskId === task.id ? (
              <input
                type="text"
                value={task.title}
                onChange={(e) => handleSaveTask(task.id, e.target.value)}
              />
            ) : (
              <>
                {task.title}
                <button onClick={() => handleEditTask(task.id)}>Edit</button>
              </>
            )}
            <ul>
              {task.subtasks.map((subtask) => (
                <li key={subtask.id}>{subtask.title}</li>
              ))}
              <li>
                <input
                  type="text"
                  placeholder="Add subtask"
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                />
                <button onClick={() => handleAddSubtask(task.id)}>Add</button>
              </li>
            </ul>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Add task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add</button>
      </div>
    </div>
  );
}

export default AddProjectForm;

