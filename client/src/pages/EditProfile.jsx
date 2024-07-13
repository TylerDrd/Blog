import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { UserContext } from '../UserContext';

export const EditProfile = () => {
    const { userinfo } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (userinfo.username) {
            fetch(`http://localhost:5000/user/${userinfo.username}`, {
                headers: {
                    "Authorization": Cookies.get("token") || ""
                }
            })
                .then(response => response.json())
                .then(user => {
                    if (user.email) {
                        setEmail(user.email);
                    }
                })
                .catch(error => console.error('Error fetching user details:', error));
        }
    }, [userinfo]);

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/update-profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': Cookies.get('token') || ''
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Profile updated successfully!');
                    navigate(`/user/${userinfo.username}`);
                } else {
                    alert('Error updating profile');
                }
            })
            .catch(error => console.error('Error updating profile:', error));
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        className="w-full px-3 py-2 border rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">New Password</label>
                    <input
                        type="password"
                        className="w-full px-3 py-2 border rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="mt-4 bg-[#333] text-white px-4 py-2 rounded"
                >
                    Update Profile
                </button>
            </form>
        </div>
    );
};
