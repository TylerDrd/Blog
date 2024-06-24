import { Link } from "react-router-dom";
import { useState } from "react";

export const Register = () => {

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");

  const registerpage = async(event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:5000/register',{
      method: 'POST',
      body: JSON.stringify({username, email, password}),
      headers: {'Content-Type': 'application/json'}
    })
    
    if(response.status === 200){
      alert("Registered Successfully");
    }
    else{
      alert("Registration Failed");
    }
  }

  return (
    <form onSubmit={registerpage} className="mx-auto max-w-lg">
      <h1 className="text-2xl font-bold mb-5">Register</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={event => setusername(event.target.value)}
        className="block mb-5 w-full p-2 border-2 border-gray-300 rounded-md bg-white"
      />
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={event => setemail(event.target.value)}
        className="block mb-5 w-full p-2 border-2 border-gray-300 rounded-md bg-white"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={event => setpassword(event.target.value)}
        className="block mb-5 w-full p-2 border-2 border-gray-300 rounded-md bg-white"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmpassword}
        onChange={event => setconfirmpassword(event.target.value)}
        className="block mb-5 w-full p-2 border-2 border-gray-300 rounded-md bg-white"
      />
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
