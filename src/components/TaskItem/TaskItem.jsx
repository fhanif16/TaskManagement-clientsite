


// import React, { useEffect, useState, useRef } from "react";

// const TaskItem = () => {
//   const [tasks, setTasks] = useState([]);
//   const categories = ["To-Do", "In Progress", "Done"];
//   const taskRefs = useRef({});

//   useEffect(() => {
//     fetch("http://localhost:5000/task")
//       .then((response) => response.json())
//       .then((data) => setTasks(data));
//   }, []);

//   const handleCategoryChange = async (id, newCategory) => {
//     const updatedTasks = tasks.map((task) =>
//       task._id === id ? { ...task, category: newCategory } : task
//     );
//     setTasks(updatedTasks);

//     await fetch(`http://localhost:5000/task/${id}/category`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ category: newCategory }),
//     });
//   };

//   const handleDelete = async (id) => {
//     setTasks(tasks.filter((task) => task._id !== id));
//     await fetch(`http://localhost:5000/task/${id}`, {
//       method: "DELETE",
//     });
//   };

//   const handleDragStart = (e, task) => {
//     e.dataTransfer.setData("taskId", task._id);
//     taskRefs.current[task._id] = e.target;
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   const handleDrop = async (e, category) => {
//     e.preventDefault();
//     const taskId = e.dataTransfer.getData("taskId");
//     const draggedTask = tasks.find((task) => task._id === taskId);

//     if (draggedTask.category !== category) {
//       await handleCategoryChange(taskId, category);
//       const updatedTasks = tasks.map((task) =>
//         task._id === taskId ? { ...task, category: category } : task
//       );
//       setTasks(updatedTasks);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold text-center mb-6">Task Manager</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {categories.map((category) => (
//           <div
//             key={category}
//             className="bg-base-200 p-4 rounded-lg shadow-lg"
//             onDragOver={(e) => handleDragOver(e)}
//             onDrop={(e) => handleDrop(e, category)}
//           >
//             <h2 className="text-xl font-bold mb-2 text-center">{category}</h2>
//             <div className="space-y-3">
//               {tasks
//                 .filter((task) => task.category === category)
//                 .map((task) => (
//                   <div
//                     key={task._id}
//                     className="bg-white p-3 rounded-lg shadow-md flex flex-col items-center"
//                     draggable
//                     onDragStart={(e) => handleDragStart(e, task)}
//                     ref={(el) => (taskRefs.current[task._id] = el)}
//                   >
//                     <h3 className="font-bold text-center">{task.title}</h3>
//                     <p className="text-center">{task.description}</p>
//                     <button
//                       onClick={() => handleDelete(task._id)}
//                       className="btn btn-error btn-sm mt-2"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default TaskItem;


import React, { useEffect, useState, useRef } from "react";

const TaskItem = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const categories = ["To-Do", "In Progress", "Done"];
  const dragTask = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/task")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  const handleCategoryChange = async (id, newCategory) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === id ? { ...task, category: newCategory } : task
      )
    );

    await fetch(`http://localhost:5000/task/${id}/category`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: newCategory }),
    });
  };

  const handleDelete = async (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
    await fetch(`http://localhost:5000/task/${id}`, {
      method: "DELETE",
    });
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
  };

  // Start Editing
  const handleEdit = (task) => {
    setEditingTask(task._id);
    setEditTitle(task.title);
    setEditDescription(task.description);
  };

  // Save Edit
  const handleSave = async (id) => {
    const updatedTask = { title: editTitle, description: editDescription };

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === id ? { ...task, ...updatedTask } : task
      )
    );

    await fetch(`http://localhost:5000/task/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });

    setEditingTask(null);
  };

  // Cancel Edit
  const handleCancel = () => {
    setEditingTask(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Task Manager</h1>
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
                    onDragOver={(e) => handleDragOver(e)}
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
                          <button
                            onClick={handleCancel}
                            className="btn btn-error btn-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h3 className="font-bold text-center">{task.title}</h3>
                        <p className="text-center">{task.description}</p>
                        <div className="flex space-x-2 mt-2">
                          <button
                            onClick={() => handleEdit(task)}
                            className="btn btn-primary btn-sm"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(task._id)}
                            className="btn btn-error btn-sm"
                          >
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
