import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {getTokenDirectly} from '../services/keycloak'

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const authenticated = await getTokenDirectly(username, password);
        if (authenticated) {
            navigate('/');
        } else {
            alert('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-red-600">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <div className="mb-4">
                    <label className="block text-gray-700">Your username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>

                <button type="submit" className="w-full bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                    Sign In
                </button>

            </form>
        </div>
    );
};

export default LoginPage;
