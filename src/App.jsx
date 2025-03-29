
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {Category, ErrorPage, Home, Login, Profile, Roots} from './pages';
import { ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import './App.scss'
import NotFound from "./components/NotFound";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token_EmployWise');
    if (!token) {
        return <Navigate to="/login" />;
    }
    return children;
};


function App() {
    const router = createBrowserRouter([
     
        {
            path: "/login",
            element: <Login/>
        },
        {
            path:'/*',
            element:<ErrorPage/>
        },
        {
            path: "/category",
            element: <ProtectedRoute children={<Category/>}/>
        },
       
        
    ]);
    return (
    <> 
     <RouterProvider router={router}/>
     <ToastContainer /> 
    </>)
}

export default App
