import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaUndoAlt } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";

const Main = () => {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [filterCompleted, setFilterCompleted] = useState(false);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users/1/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTodos([
        ...todos,
        { id: Date.now(), title: newTask, completed: false },
      ]);
      setNewTask("");
    }
  };

  const toggleCompletion = (taskId) => {
    setTodos(
      todos.map((todo) =>
        todo.id === taskId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTask = (taskId, newTitle) => {
    setTodos(
      todos.map((todo) =>
        todo.id === taskId ? { ...todo, title: newTitle } : todo
      )
    );
  };

  const deleteTask = (taskId) => {
    setTodos(todos.filter((todo) => todo.id !== taskId));
  };

  const filteredTodos = filterCompleted
    ? todos.filter((todo) => todo.completed)
    : todos;

  return (
    <>
      <div className="bg-gradient-to-b from-slate-300 to-cyan-500">
        <div className="container mx-auto p-6  w-3/4 ">
          <h1 className="text-center text-4xl font-bold text-red-400 mb-11 text-shadow-lg ">
            Todo App
          </h1>
          <div className="mb-11">
            <input
              className="border p-2 w-[650px] ml-56"
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter a new task"
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
              onClick={addTask}
            >
              Add Task
            </button>
          </div>

          <div className="mb-4">
            <label className="flex items-center  text-2xl">
              <input
                type="checkbox"
                checked={filterCompleted}
                onChange={() => setFilterCompleted(!filterCompleted)}
                className="mr-2 w-4 h-4 accent-red-400"
              />
              Show Completed Tasks
            </label>
          </div>

          <ul className="border-2 border-grey-600 rounded-md">
            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center justify-between border-b py-2 "
                style={{ padding: "20px 20px" }}
              >
                <span
                  className={`flex-1 text-xl ${
                    todo.completed ? "line-through text-red-600" : ""
                  }`}
                >
                  {todo.title}
                </span>
                <div>
                  <button
                    className={`mr-2 ${
                      todo.completed ? "bg-yellow-500" : "bg-green-500"
                    } text-white px-2 py-1 rounded`}
                    onClick={() => toggleCompletion(todo.id)}
                  >
                    {todo.completed ? <FaUndoAlt /> : <FaRegCheckCircle />}
                  </button>
                  <button
                    className=" text-black text-2xl  px-2 py-1 rounded mr-2"
                    onClick={() =>
                      editTask(todo.id, prompt("Edit task:", todo.title))
                    }
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-800 text-2xl   px-2 py-1 rounded"
                    onClick={() => deleteTask(todo.id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Main;
