import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, fetchTask, editTask } from "../store";
import { MdDeleteForever, MdEdit } from "react-icons/md";

export const Todo = () => {
  const [task, setTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const tasks = useSelector((state) => state.task);
  const dispatch = useDispatch();

  // Add or update task
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (task.trim() === "" && editValue.trim() === "") return;

    if (editIndex !== null) {
      dispatch(editTask(editIndex, editValue));
      setEditIndex(null);
      setEditValue("");
    } else {
      dispatch(addTask(task));
    }
    setTask("");
  };

  // Delete task
  const handleTaskDelete = (index) => {
    dispatch(deleteTask(index));
  };

  // Fetch tasks
  const handleFetchTasks = () => {
    dispatch(fetchTask());
  };

  // Start editing
  const startEdit = (index, value) => {
    setEditIndex(index);
    setEditValue(value);
  };

  return (
    <div className="container">
      <div className="todo-app">
        <h1>
          <i className="fa-regular fa-pen-to-square"></i> To-do List:
        </h1>
        <div className="row">
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              id="input-box"
              placeholder="Add a new task"
              value={editIndex !== null ? editValue : task}
              onChange={(e) =>
                editIndex !== null
                  ? setEditValue(e.target.value)
                  : setTask(e.target.value)
              }
            />
            <br />
            <button type="submit">
              {editIndex !== null ? "Update Task" : "Add Task"}
            </button>
          </form>
        </div>

        <button onClick={handleFetchTasks}>Fetch Tasks</button>

        <ul id="list-container">
          {tasks.map((curTask, index) => (
            <li key={index}>
              <p>
                {index}: {curTask}
              </p>
              <div>
                <MdEdit
                  className="icon-style"
                  onClick={() => startEdit(index, curTask)}
                />
                <MdDeleteForever
                  className="icon-style"
                  onClick={() => handleTaskDelete(index)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
