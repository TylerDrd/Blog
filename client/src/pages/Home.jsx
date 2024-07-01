import { Post } from "../components/Post";
import { useEffect, useState } from "react";

export const Home = () => {

    const [posts, setposts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/post').then(response => {
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
