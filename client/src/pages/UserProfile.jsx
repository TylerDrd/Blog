import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Post } from "../components/Post";
import Cookies from "js-cookie";
import { FaUserCircle } from "react-icons/fa";
import { UserContext } from "../UserContext";

export const UserProfile = () => {
  const { username } = useParams();
  const [posts, setPosts] = useState([]);
  const [email, setEmail] = useState("");
  const { userinfo } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch posts by username
    fetch(`http://localhost:5000/posts/${username}`, {
      headers: {
        Authorization: Cookies.get("token") || "",
      },
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/login");
        } else {
          return response.json();
        }
      })
      .then((posts) => setPosts(posts))
      .catch((error) => console.error("Error fetching posts:", error));

    // Fetch user details by username to get email
    fetch(`http://localhost:5000/user/${username}`, {
      headers: {
        Authorization: Cookies.get("token") || "",
      },
    })
      .then((response) => {
        if (response.status === 401) {
          navigate("/login");
        } else {
          return response.json();
        }
      })
      .then((user) => setEmail(user.email))
      .catch((error) => console.error("Error fetching user details:", error));
  }, [username, navigate]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col items-center mb-8">
        <FaUserCircle className="text-9xl text-gray-400 mb-4" />
        <h1 className="text-3xl font-bold mb-2">{username}</h1>
        <h2 className="text-xl text-gray-500">{email}</h2>
        {userinfo && userinfo.username === username && (
          <Link
            to="/edit-profile"
            className="mt-4 bg-[#333] text-white px-4 py-2 rounded"
          >
            Edit Profile
          </Link>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-semibold mb-4">Posts by {username}</h3>
        <div className="grid gap-4">
          {posts.map((post) => (
            <Post key={post._id} {...post} />
          ))}
        </div>
      </div>
    </div>
  );
};
