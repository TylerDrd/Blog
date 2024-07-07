import {Link} from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "../UserContext";

export const Header = () => {
  const {setuserinfo, userinfo} = useContext(UserContext);
  useEffect(() => {
    fetch('http://localhost:5000/profile',{
      credentials: 'include',
    })
    .then(res => res.json())
    .then(data => {
      setuserinfo(data);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [] ); 

  const logout = () => {
    //implementing logout on the backend
    fetch('http://localhost:5000/logout',{
      method: 'POST',
      credentials: 'include',
    });
    setuserinfo(null);
    
    //<Navigate to={'/'} />
  };

  const username = userinfo?.username;

  return (
    <header className="flex justify-between mb-12 mt-5 items-center">
        <Link to="/home" className="no-underline text-[#222] font-bold text-2xl">My Blog</Link>
        <nav className="flex gap-4 text-lg">
          {username && (
            <>
              <Link 
                to="/create"
                className="bg-[#333] text-white py-[7px] px-[20px] inline-flex no-underline rounded-[5px] items-center gap-1">
                Create New Post
              </Link>
              <a className="cursor-pointer bg-[#333] text-white py-[7px] px-[20px] inline-flex no-underline rounded-[5px] items-center gap-1" 
                onClick={logout}>
                Logout
                </a>
            </>
          )}
          {!username && (
            <>
              <Link 
                to="/login"
                className="bg-[#333] text-white py-[7px] px-[20px] inline-flex no-underline rounded-[5px] items-center gap-1"
                >
                  Login
              </Link>
              <Link 
                 to="/register" 
                 className="bg-[#333] text-white py-[7px] px-[20px] inline-flex no-underline rounded-[5px] items-center gap-1"
                >
                  Register
              </Link>
            </>
          )}
        </nav>
      </header>
  )
}
