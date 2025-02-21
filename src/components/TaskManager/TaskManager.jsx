



// import React, { useContext, useState } from 'react';
// import Swal from 'sweetalert2';
// import { AuthContext } from '../../providers/Authprovider';

// const TaskManager = () => {
//     const { user } = useContext(AuthContext);
//     const [newTask, setNewTask] = useState({
//         title: '',
//         description: '',
//         category: 'To-Do',
//     });

//     const handleInputChange = (e) => {
//         setNewTask({ ...newTask, [e.target.name]: e.target.value });
//     };

//     const handleAddTask = async () => {
//         if (newTask.title.trim() === '') {
//             Swal.fire('Error', 'Title is required!', 'error');
//             return;
//         }

//         if (newTask.title.length > 50) {
//             Swal.fire('Error', 'Title must be less than 50 characters', 'error');
//             return;
//         }

//         if (newTask.description.length > 200) {
//             Swal.fire('Error', 'Description must be less than 200 characters', 'error');
//             return;
//         }

//         if (!user) {
//             Swal.fire('Error', 'You must be logged in to add a task.', 'error');
//             return;
//         }

//         try {
//             const taskWithUser = { ...newTask, userEmail: user.email };
//             const response = await fetch('https://task-server-side-eta.vercel.app/task', { // Make sure this is the correct URL
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(taskWithUser),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json(); // Try to parse error response
//                 throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//             }

//             setNewTask({ title: '', description: '', category: 'To-Do' });
//             Swal.fire('Success', 'Task added!', 'success');

//         } catch (error) {
//             console.error("Error adding task:", error);
//             Swal.fire('Error', error.message || 'Failed to add task.', 'error');
//         }
//     };


//     return (
//         <div className="container mx-auto p-4 bg-gray-100 min-h-screen flex flex-col items-center">
//             <h1 className="text-3xl font-bold mb-4">Task Manager</h1>

//             <div className="add-task-form bg-white p-6 rounded-lg shadow-md mb-4 w-2/5">
//                 <input
//                     type="text"
//                     name="title"
//                     placeholder="Title (Max 50 characters)"
//                     value={newTask.title}
//                     onChange={handleInputChange}
//                     maxLength="50"
//                     className="w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <textarea
//                     name="description"
//                     placeholder="Description (Max 200 characters)"
//                     value={newTask.description}
//                     onChange={handleInputChange}
//                     maxLength="200"
//                     className="w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//                 <select
//                     name="category"
//                     value={newTask.category}
//                     onChange={handleInputChange}
//                     className="w-full border border-gray-300 rounded-md p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                     <option value="To-Do">To-Do</option>
//                     <option value="In Progress">In Progress</option>
//                     <option value="Done">Done</option>
//                 </select>
//                 <button
//                     onClick={handleAddTask}
//                     className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
//                 >
//                     Add Task
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default TaskManager;


import React, { useContext, useState } from 'react';
import Swal from 'sweetalert2';
import { AuthContext } from '../../providers/Authprovider';

const TaskManager = () => {
    const { user } = useContext(AuthContext);
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        category: 'To-Do',
    });

    const handleInputChange = (e) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };

    const handleAddTask = async () => {
        if (newTask.title.trim() === '') {
            Swal.fire('Error', 'Title is required!', 'error');
            return;
        }

        if (newTask.title.length > 50) {
            Swal.fire('Error', 'Title must be less than 50 characters', 'error');
            return;
        }

        if (newTask.description.length > 200) {
            Swal.fire('Error', 'Description must be less than 200 characters', 'error');
            return;
        }

        if (!user) {
            Swal.fire('Error', 'You must be logged in to add a task.', 'error');
            return;
        }

        try {
            const taskWithUser = { ...newTask, userEmail: user.email };
            const response = await fetch('https://task-server-side-eta.vercel.app/task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskWithUser),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            setNewTask({ title: '', description: '', category: 'To-Do' });
            Swal.fire('Success', 'Task added!', 'success');

        } catch (error) {
            console.error("Error adding task:", error);
            Swal.fire('Error', error.message || 'Failed to add task.', 'error');
        }
    };

    return (
        <div className="container mx-auto p-4 min-h-screen flex flex-col items-center bg-base-200">
            <h1 className="text-3xl font-bold mb-4 text-primary">Task Manager</h1>
            
            <div className="bg-white p-6 rounded-lg shadow-md mb-4 w-full max-w-lg">
                <input
                    type="text"
                    name="title"
                    placeholder="Title (Max 50 characters)"
                    value={newTask.title}
                    onChange={handleInputChange}
                    maxLength="50"
                    className="input input-bordered w-full mb-2"
                />
                <textarea
                    name="description"
                    placeholder="Description (Max 200 characters)"
                    value={newTask.description}
                    onChange={handleInputChange}
                    maxLength="200"
                    className="textarea textarea-bordered w-full mb-2"
                />
                <select
                    name="category"
                    value={newTask.category}
                    onChange={handleInputChange}
                    className="select select-bordered w-full mb-2"
                >
                    <option value="To-Do">To-Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                </select>
                <button
                    onClick={handleAddTask}
                    className="btn btn-success w-full"
                >
                    Add Task
                </button>
            </div>
        </div>
    );
};

export default TaskManager;
