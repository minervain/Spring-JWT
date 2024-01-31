// Register.tsx

import React, { useState } from 'react';
import axios from 'axios';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/users', { username, password, email });
            console.log(response.data);
        } catch (error) {
            console.error('Kayıt işlemi başarısız:', error);
        }
    };

    return (
        <div>
            <h2>Kayıt Ol</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Kullanıcı Adı:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Şifre:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label>E-posta:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button type="submit">Kayıt Ol</button>
            </form>
        </div>
    );
};

export default Register;
