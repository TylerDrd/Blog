import { useState, useEffect } from "react";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
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

export const EditPost = () => {
  const { id } = useParams();
  const [title, settitle] = useState("");
  const [summary, setsummary] = useState("");
  const [content, setcontent] = useState("");
  const [files, setfiles] = useState("");
  const [redirect, setredirect] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/posts/" + id, {
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
      .then((info) => {
        settitle(info.title);
        setsummary(info.summary);
        setcontent(info.content);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const updatePost = async (event) => {
    event.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]);
    }

    const response = await fetch("http://localhost:5000/api/posts", {
      method: "PUT",
      body: data,
      credentials: "include",
      headers: {
        Authorization: Cookies.get("token") || "",
      },
    });

    if (response.status === 401) {
      navigate("/login");
    } else if (response.ok) {
      setredirect(true);
    }
    //setredirect(true);
  };

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }
  return (
    <div>
      <form onSubmit={updatePost}>
        <h1 className="text-2xl font-bold mb-5">Update Post</h1>
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
          Update Post
        </button>
      </form>
    </div>
  );
};
