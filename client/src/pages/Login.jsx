import { Link, Navigate } from "react-router-dom";
import {useState, useContext} from 'react';
import { UserContext } from "../UserContext";

export const Login = () => {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const {setuserinfo} = useContext(UserContext);

  const loginpage = async(event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:5000/login',{
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
    });
    if(response.ok)
      {
        response.json().then(data => 
          {
            setuserinfo(data);
            setRedirect(true);
          }
        )
      }
      else{
        alert('Wrong Credentials');
      }
  }
  if(redirect)
    {
      return <Navigate to="/" /> //Redirect to home page if login successful
    }
  return (
    <form className="mx-auto max-w-lg" onSubmit={loginpage}>
      <h1 className="text-2xl font-bold mb-5">Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={event => setusername(event.target.value)}
        className="block mb-5 w-full p-2 border-2 border-gray-300 rounded-md bg-white"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={event => setpassword(event.target.value)}
        className="block mb-5 w-full p-2 border-2 border-gray-300 rounded-md bg-white"
      />
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
