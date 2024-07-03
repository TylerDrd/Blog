/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
//useParams is for using paramters in the url string
import { useEffect, useState } from "react";
import {formatISO9075} from "date-fns";

export const PostPage = () => {
    const { id } = useParams();
    const [postinfo, setpostinfo] = useState(null);
  useEffect(() => {
    fetch( `http://localhost:5000/post/${id}`)
    .then(response => {
        response.json().then(info => {
            setpostinfo(info);
        });
    });
  }, []);

  if(!postinfo) return '';
  return (
    <div>
        <h1 className='m-2 text-2xl font-bold text-center'>{postinfo.title}</h1>
        <time className="block text-center text-[0.8rem] text-gray-600">{formatISO9075(new Date(postinfo.createdAt))}</time>
        <div className="text-center mb-2 text-[1rem] font-bold">by @{postinfo.author.username}</div>
        <div className="max-h-[350px] flex overflow-scroll">
            <img src={`http://localhost:5000/${postinfo.cover}`} alt=""  className="object-cover object-center w-full h-full"/>
        </div>
        <div dangerouslySetInnerHTML={{__html:postinfo.content}} className='my-4 mx-0 leading-6 text-lg'></div>
    </div>
  )
}
