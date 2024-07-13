import { Post } from "../components/Post";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const Home = () => {

    const [posts, setposts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/post',{
          headers : {
            "Authorization" : Cookies.get("token") || ""
          }
        }).then(response => {
          response.json().then(posts => {
            setposts(posts);
          });
        });
      }, []);

  return (
    <>
           {posts.length > 0 && posts.map(post => (
            // eslint-disable-next-line react/jsx-key
            <Post key={post.id} {...post} />
           ))}
    </>
  )
}
