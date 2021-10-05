import { useState, useEffect } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [id, setId] = useState(1);

  function handleCreateNewTask() {
    if (!newTaskTitle) return;

    setId(id + 1);

    let task = {
      id: id,
      title: newTaskTitle,
      isComplete: false,
    };

    setTasks((oldState) => [...oldState, task]);
    setNewTaskTitle("");
  }

  function handleToggleTaskCompletion(id: number) {
    let update = tasks.map((element) =>
      element.id === id
        ? {
            ...element,
            isComplete: !element.isComplete,
          }
        : element
    );

    setTasks(update);
  }

  function handleRemoveTask(id: number) {
    setTasks(tasks.filter((element) => element.id !== id));
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
