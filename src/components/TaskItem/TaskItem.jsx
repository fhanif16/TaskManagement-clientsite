


import React, { useEffect, useState, useRef, useContext } from "react";
import { AuthContext } from "../../providers/Authprovider";

const TaskItem = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [error, setError] = useState(null); 
  const categories = ["To-Do", "In Progress", "Done"];
  const dragTask = useRef(null);

  useEffect(() => {
    const fetchTasks = async () => {
      if (user?.email) {
        setError(null); 
        try {
          const response = await fetch(`https://task-server-side-eta.vercel.app/task?email=${user.email}`);
          if (!response.ok) {
            const errorData = await response.json(); 
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setTasks(data);
        } catch (err) {
          console.error("Error fetching tasks:", err);
          setError(err.message); 
        }
      } else {
        setTasks([]);
      }
    };

    fetchTasks();
  }, [user?.email]);

  const handleCategoryChange = async (id, newCategory) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task._id === id ? { ...task, category: newCategory } : task))
    );

    try {
      const response = await fetch(`https://task-server-side-eta.vercel.app/task/${id}/category`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: newCategory }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      console.error("Error updating category:", err);
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    try {
      const response = await fetch(`https://task-server-side-eta.vercel.app/task/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
    } catch (err) {
      console.error("Error deleting task:", err);
      setError(err.message);
    }
  };

  const handleDragStart = (e, task) => {
    dragTask.current = task;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, category, targetTask = null) => {
    e.preventDefault();
    const draggedTask = dragTask.current;
    if (!draggedTask) return;

    try {
      if (draggedTask.category !== category) {
        await handleCategoryChange(draggedTask._id, category);
      } else if (targetTask && draggedTask._id !== targetTask._id) {
        const updatedTasks = [...tasks];
        const draggedIndex = updatedTasks.findIndex((t) => t._id === draggedTask._id);
        const targetIndex = updatedTasks.findIndex((t) => t._id === targetTask._id);
        updatedTasks.splice(draggedIndex, 1);
        updatedTasks.splice(targetIndex, 0, draggedTask);
        setTasks(updatedTasks);
      }
    } catch (err) {
      console.error("Error during drag and drop:", err);
      setError(err.message);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  const handleSave = async (id) => {
    const updatedTask = { title: editTitle, description: editDescription };

    setTasks((prevTasks) =>
      prevTasks.map((task) => (task._id === id ? { ...task, ...updatedTask } : task))
    );

    try {
      const response = await fetch(`https://task-server-side-eta.vercel.app/task/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      setEditingTask(null);
    } catch (err) {
      console.error("Error saving task:", err);
      setError(err.message);
    }
  };

  const handleCancel = () => {
    setEditingTask(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Task Manager</h1>
      {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category}
            className="bg-gray-100 p-4 rounded-lg shadow-lg min-h-[200px]"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, category)}
          >
            <h2 className="text-xl font-bold mb-2 text-center">{category}</h2>
            <div className="space-y-3">
              {tasks
                .filter((task) => task.category === category)
                .map((task) => (
                  <div
                    key={task._id}
                    className="bg-white p-3 rounded-lg shadow-md flex flex-col items-center cursor-move"
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, category, task)}
                  >
                    {editingTask === task._id ? (
                      <div className="w-full">
                        <input
                          type="text"
                          className="border rounded p-2 w-full mb-2"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <textarea
                          className="border rounded p-2 w-full mb-2"
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                        />
                        <div className="flex justify-between">
                          <button
                            onClick={() => handleSave(task._id)}
                            className="btn btn-success btn-sm"
                          >
                            Save
                          </button>
                          <button onClick={handleCancel} className="btn btn-error btn-sm">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h3 className="font-bold text-center">{task.title}</h3>
                        <p className="text-center">{task.description}</p>
                        <div className="flex space-x-2 mt-2">
                          <button onClick={() => handleEdit(task)} className="btn btn-primary btn-sm">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(task._id)} className="btn btn-error btn-sm">
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskItem;