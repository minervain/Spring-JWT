
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/users/login', { username, password });
            console.log(response.data);
            navigate("/dashboard");
        } catch (error) {
            console.error('Giriş işlemi başarısız:', error);
            setError('Kullanıcı adı veya şifre hatalı.');
        }
    };

    return (
        <div className='flex justify-center w-full h-lvh items-center bg-black' >

            <form className="max-w-sm mx-auto w-full" onSubmit={handleSubmit}>
                <h1 className="font-bold mb-2">Login Ekranı</h1>
                <div className="mb-2">
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="username" required />
                </div>
                <div className="mb-2">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="şifre" required />
                </div>

                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
            </form>


        </div>
    );
};

export default Login;