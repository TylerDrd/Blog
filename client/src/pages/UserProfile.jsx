import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../components/Post';

export const UserProfile = () => {
    const { username } = useParams();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/posts/${username}`)
            .then(response => response.json())
            .then(posts => setPosts(posts))
            .catch(error => console.error('Error fetching posts:', error));
    }, [username]);

    return (
        <div>
            <h1 className='mb-4 font-bold underline-offset-2'>Posts by {username}</h1>
            {posts.map(post => (
                <Post key={post._id} {...post} />
            ))}
        </div>
    );
};
