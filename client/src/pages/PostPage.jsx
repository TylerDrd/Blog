/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useParams, Link } from "react-router-dom";
//useParams is for using paramters in the url string
import { useEffect, useState, useContext } from "react";
import {formatISO9075} from "date-fns";
import { UserContext } from "../UserContext";
import Cookies from "js-cookie";

export const PostPage = () => {
    const { id } = useParams();
    const {userinfo} = useContext(UserContext);
    const [postinfo, setpostinfo] = useState(null);
  useEffect(() => {
    fetch( `http://localhost:5000/post/${id}`,{
        headers : {
            "Authorization" : Cookies.get("token") || ""
          }
    })
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
        <div className="text-center mb-2 text-[1rem] font-bold">
                by <Link to={`/user/${postinfo.author.username}`} className='text-[#333]'>{`@${postinfo.author.username}`}</Link>
        </div>
        {userinfo.id === postinfo.author._id && (
            <div className="mb-2">
                <Link 
                    to = {`/edit/${postinfo._id}`}
                    className="bg-[#333] text-white py-[10px] px-[20px] inline-flex no-underline rounded-[5px] items-center gap-1"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931ZM16.862 4.487L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                         Edit Post
                </Link>
            </div>
        )}
        <div className="max-h-[350px] flex overflow-scroll">
            <img src={`http://localhost:5000/${postinfo.cover}`} alt=""  className="object-cover object-center w-full h-full"/>
        </div>
        <div dangerouslySetInnerHTML={{__html:postinfo.content}} className='my-4 mx-0 leading-6 text-lg'></div>
    </div>
  )
}
