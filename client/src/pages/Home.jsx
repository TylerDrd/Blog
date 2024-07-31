import { Post } from "../components/Post";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [posts, setposts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://localhost:5000/api/posts", {
      headers: {
        Authorization: Cookies.get("token") || "",
      },
    }).then((response) => {
      if (response.status === 401) {
        navigate("/login");
      } else {
        response.json().then((posts) => {
          setposts(posts);
        });
      }
    });
  }, [navigate]);

  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => (
          // eslint-disable-next-line react/jsx-key
          <Post key={post.id} {...post} />
        ))}
    </>
  );
};
