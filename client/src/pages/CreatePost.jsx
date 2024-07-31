import ReactQuill from "react-quill";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "react-quill/dist/quill.snow.css";
import Cookies from "js-cookie";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export const CreatePost = () => {
  const [title, settitle] = useState("");
  const [summary, setsummary] = useState("");
  const [content, setcontent] = useState("");
  const [files, setfiles] = useState("");
  const [redirect, setredirect] = useState(false);

  const navigate = useNavigate();

  const CreateNewPost = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    // Send post data to server

    // eslint-disable-next-line no-unused-vars

    try {
      console.log(Cookies.get("token"));
      const token = Cookies.get("token") || "";
      const response = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        body: data,
        credentials: "include",
        headers: {
          authorization: token,
        },
      });

      if (response.status === 401) {
        navigate("/login");
      } else if (response.ok) {
        alert("Post created successfully!");
        setredirect(true);
      } else {
        alert("Failed to create post");
      }
    } catch (error) {
      console.error("Error creating the post", error);
      alert("Failed to create post due to network error");
    }
  };

  if (redirect) {
    return <Navigate to={"/home"} />;
  }
  return (
    <div>
      <form onSubmit={CreateNewPost}>
        <h1 className="text-2xl font-bold mb-5">New Post</h1>
        <input
          type="title"
          placeholder="Title"
          value={title}
          onChange={(event) => settitle(event.target.value)}
          className="block mb-5 w-full p-2 border-2 border-gray-300 rounded-md bg-white"
        />
        <input
          type="summary"
          placeholder="Summary"
          value={summary}
          onChange={(event) => setsummary(event.target.value)}
          className="block mb-5 w-full p-2 border-2 border-gray-300 rounded-md bg-white"
        />
        <input
          type="file"
          //value={files}
          onChange={(event) => setfiles(event.target.files)}
          className="block mb-5 w-full p-2 border-2 border-gray-300 rounded-md bg-white"
        />
        <ReactQuill
          placeholder="Write your post here..."
          value={content}
          onChange={(newvalue) => setcontent(newvalue)}
          modules={modules}
          formats={formats}
          className="block mb-5 w-full p-2 border-2 border-gray-300 rounded-md bg-white"
        />
        <button
          type="submit"
          className="block w-full bg-gray-700 border-0 text-white rounded-md py-2"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};
