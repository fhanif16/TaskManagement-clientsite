



import React, { useContext } from 'react';
import './home.css';
import { motion } from 'framer-motion';
import { AuthContext } from '../../providers/Authprovider'; 
import { useNavigate } from 'react-router-dom'; 

const Home = () => {
    const { user } = useContext(AuthContext); 
    const navigate = useNavigate(); 

    const handleNavigation = () => {
        if (user) {
            navigate('/task'); 
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="home-container">
            <motion.header
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="home-header"
            >
                <h1>Welcome to My Task Management Test</h1>
                <p className="home-subtitle">Where you can keep your tasks and stay updated.</p>
            </motion.header>

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeInOut" }}
                className="home-content"
            >
                {/* <img src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=1939&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Task Management Image" />  */}
                <button onClick={handleNavigation} className="home-button">
                    {user ? "Go to Manage Tasks" : "Go to Login"}
                </button>
            </motion.div>
        </div>
    );
};

export default Home;