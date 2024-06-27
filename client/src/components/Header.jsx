import {Link} from "react-router-dom";
import { useEffect, useState } from "react";

export const Header = () => {
  const [username, setusername] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/profile',{
      credentials: 'include',
    })
    .then(res => res.json())
    .then(data => {
      setusername(data.username);
    })
  }, [] );

  const logout = () => {
    //implementing logout on the backend
    fetch('http://localhost:5000/logout',{
      method: 'POST',
      credentials: 'include',
    });
    setusername(null);
  };

  return (
    <header className="flex justify-between mb-12 mt-5 items-center">
        <Link to="/" className="no-underline text-[#222] font-bold text-2xl">My Blog</Link>
        <nav className="flex gap-4 text-lg">
          {username && (
            <>
              <Link to="/create">Create New Post</Link>
              <a onClick={logout}>Logout</a>
            </>
          )}
          {!username && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
  )
}
