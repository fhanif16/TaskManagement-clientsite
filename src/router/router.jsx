import {
    createBrowserRouter,
   
  } from "react-router-dom";
import Home from "../components/Home/Home";
import Error from "../components/Error/Error";
import Main from "../components/Main/Main";
import Register from "../components/Register";
import Login from "../components/Login";
import TaskManager from "../components/TaskManager/TaskManager";
import PrivateRoutes from "./PrivateRoutes";
import TaskItem from "../components/TaskItem/TaskItem";

  const router = createBrowserRouter([
    {
      path: "/",
      element:<Main></Main>,
      errorElement:<Error></Error>,
      children:[{
        path:'/',
        element: <Home></Home>
      }, 

      {
        path:'login',
        element:<Login></Login>
      },
      {
        path:'register',
        element:<Register></Register>
      },

      {
        path:'task',
        element:<PrivateRoutes><TaskManager></TaskManager></PrivateRoutes>
      },

      {
        path:'item',
        element:<PrivateRoutes><TaskItem></TaskItem></PrivateRoutes>
      }



       
    ]
},
]);

export default router;
