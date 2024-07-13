import { Link, Navigate } from "react-router-dom";
import { useState, useContext } from 'react';
import { UserContext } from "../UserContext";
import Cookies from "js-cookie"

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setuserinfo } = useContext(UserContext);

  const validateForm = () => {
    let isValid = true;

    if (username.length < 4) {
      setUsernameError("Username must be at least 4 characters long");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (password.length < 4) {
      setPasswordError("Password must be at least 4 characters long");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const loginPage = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    });

    
    if (response.ok) {
      response.json().then(data => {
        console.log(data.token)
        Cookies.set("token", data.token, {expires : 7});
        setuserinfo(data);
        setRedirect(true);
      });
    } else {
      alert('Wrong Credentials');
    }
  };

  if (redirect) {
    return <Navigate to="/home" /> //Redirect to home page if login successful
  }

  return (
    <form className="mx-auto max-w-lg" onSubmit={loginPage}>
      <h1 className="text-2xl font-bold mb-5">Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={event => setUsername(event.target.value)}
        className="block mb-2 w-full p-2 border-2 border-gray-300 rounded-md bg-white"
      />
      {usernameError && <div className="text-red-500 mb-4">{usernameError}</div>}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={event => setPassword(event.target.value)}
        className="block mb-2 w-full p-2 border-2 border-gray-300 rounded-md bg-white"
      />
      {passwordError && <div className="text-red-500 mb-4">{passwordError}</div>}
      <button
        type="submit"
        className="block w-full bg-gray-700 border-0 text-white rounded-md py-2"
      >
        Login
      </button>
      <Link to="/register" className="block mt-4 text-center text-blue-500">
        Do not have an account?
      </Link>
    </form>
  );
};
