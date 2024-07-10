import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {logoutKeycloak} from '../services/keycloak';

const Navbar: React.FC = () => {

    const navigate = useNavigate();

    const handleLogout = () => {
        logoutKeycloak();
        navigate('/login');
    };

    return (
        <nav className="bg-white p-4 border-b border-gray-200 h-18">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <img src="https://www.vodafone.es/c/statics/maestro/logo_vodafone.png?v=20230614045454" alt="Vodafone Logo" className="h-10 mr-4"/>
                    <Link to="/" className="mr-4 text-black hover:text-red-600">Home</Link>
                    <Link to="/devices" className="mr-4 text-black hover:text-red-600">Devices</Link>
                </div>
                <div>
                    <button
                        onClick={handleLogout}
                        className="text-black border border-black px-4 py-2 rounded hover:bg-gray-800 hover:text-white"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
