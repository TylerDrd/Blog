import { Link } from "react-router-dom";
import { useState } from "react";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateForm = () => {
    let isValid = true;

    if (username.length < 4) {
      setUsernameError("Username must be at least 4 characters long");
      isValid = false;
    } else {
      setUsernameError("");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setEmailError("Email is not valid");
      isValid = false;
    } else {
      setEmailError("");
    }

    const passwordPattern = /^(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
    if (!passwordPattern.test(password)) {
      setPasswordError("Password must be at least 6 characters long, include a number and a special character");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };

  const registerPage = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.status === 200) {
      alert("Registered Successfully");
    } else {
      alert("Registration Failed");
    }
  };

  return (
    <form onSubmit={registerPage} className="mx-auto max-w-lg">
      <h1 className="text-2xl font-bold mb-5">Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={event => setUsername(event.target.value)}
        className="block mb-2 w-full p-2 border-2 border-gray-300 rounded-md bg-white"
      />
      {usernameError && <div className="text-red-500 mb-4">{usernameError}</div>}
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={event => setEmail(event.target.value)}
        className="block mb-2 w-full p-2 border-2 border-gray-300 rounded-md bg-white"
      />
      {emailError && <div className="text-red-500 mb-4">{emailError}</div>}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={event => setPassword(event.target.value)}
        className="block mb-2 w-full p-2 border-2 border-gray-300 rounded-md bg-white"
      />
      {passwordError && <div className="text-red-500 mb-4">{passwordError}</div>}
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={event => setConfirmPassword(event.target.value)}
        className="block mb-2 w-full p-2 border-2 border-gray-300 rounded-md bg-white"
      />
      {confirmPasswordError && <div className="text-red-500 mb-4">{confirmPasswordError}</div>}
      <button
        type="submit"
        className="block w-full bg-gray-700 border-0 text-white rounded-md py-2"
      >
        Register
      </button>
      <Link to="/login" className="block mt-4 text-center text-blue-500">
        Already have an account?
      </Link>
    </form>
  );
};
