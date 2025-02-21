

import { Link } from 'react-router-dom';
import { Tooltip as ReactTooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../providers/Authprovider';

const Navbar = () => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleToggle = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const authInfo = useContext(AuthContext);
    const { signOutUser, user } = authInfo;

    const handleSignOut = () => {
        signOutUser().catch((error) => console.error(error));
    };

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/task', label: 'Task Manager' },
        { path: '/item', label: 'You added task' },
    ];

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost normal-case text-xl">
                    <img
                        className="w-10 h-10 rounded-full mr-2"
                        src="https://img.freepik.com/free-vector/charity-logo-hands-supporting-heart-icon-flat-design-vector-illustration_53876-136266.jpg"
                        alt="Logo"
                    />
                    My Task Manager
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link to={link.path}>{link.label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="navbar-end">
             
                <input
                    onChange={handleToggle}
                    type="checkbox"
                    className="toggle theme-controller cursor-pointer mr-4"
                    checked={theme === 'dark'}
                />

                {user ? (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={user?.photoURL || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt="User Avatar" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-2 p-2 shadow bg-base-100 rounded-box w-52">
                            <li><button onClick={handleSignOut} className="text-red-500 hover:underline">Sign Out</button></li>
                        </ul>
                        <ReactTooltip id="user-tooltip" place="bottom" />
                    </div>
                ) : (
                    <Link to="/login" className="btn">
                        Login
                    </Link>
                )}

                <div className="drawer drawer-end">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        <label htmlFor="my-drawer" className="btn btn-square btn-ghost lg:hidden mr-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </label>
                    </div>
                    <div className="drawer-side">
                        <label htmlFor="my-drawer" className="drawer-overlay"></label>
                        <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                            {navLinks.map((link) => (
                                <li key={link.path}>
                                    <Link to={link.path}>{link.label}</Link>
                                </li>
                            ))}
                            {user ? (
                                <>
                                    <li><button onClick={handleSignOut} className="text-red-500 hover:underline">Sign Out</button></li>
                                </>
                            ) : (
                                <li><Link to="/login">Login</Link></li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
