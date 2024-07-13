import { Link, useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "../UserContext";
import Cookies from "js-cookie"

export const Header = () => {
  const { setuserinfo, userinfo } = useContext(UserContext);
  const navigate = useNavigate();
  console.log(Cookies.get("token"));
  useEffect(() => {
    fetch('http://localhost:5000/profile', {
      credentials: 'include',
      headers : {
        "authorization" : Cookies.get("token") || ""
      }
    })
      .then(res => res.json())
      .then(data => {
        setuserinfo(data);
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    Cookies.remove("token");
    navigate("/");
    setuserinfo(null);
  };

  const username = userinfo?.username;

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link to="/home" className="text-2xl font-bold">
        My Blog
      </Link>
      <nav className="flex gap-4">
        {username ? (
          <>
            <Link
              to="/create"
              className="bg-gray-700 py-2 px-4 rounded"
            >
              Create New Post
            </Link>
            <a className="bg-gray-700 py-2 px-4 rounded cursor-pointer" onClick={logout}>
              Logout
            </a>
            <Link
              to={`/user/${username}`}
              className="bg-gray-700 py-2 px-4 rounded-full flex items-center justify-center"
            >
              <div className="h-10 w-10 bg-gray-700 text-white rounded-full flex items-center justify-center">
                {username.charAt(0).toUpperCase()}
              </div>
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="bg-gray-700 py-2 px-4 rounded"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-gray-700 py-2 px-4 rounded"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
