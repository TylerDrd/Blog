/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import {formatISO9075} from "date-fns";
import {Link} from 'react-router-dom';

export const Post = ({_id,title, summary, cover, content, createdAt,author}) => {
    return (
        <div className="mb-9 grid grid-cols-[1.1fr_0.9fr] gap-10">
        <div>
          <Link to={`/post/${_id}`}>
            <img src={'http://localhost:5000/'+cover} className="max-w-full w-5/5 mx-auto"></img>
          </Link>
        </div>
        <div>
          <h1 className='m-0 text-2xl font-bold'>
          <Link to={`/post/${_id}`}>
             {title}
          </Link>
          </h1>
          <p className='mx-0 my-1.5 text-[#888] text-sm font-bold flex gap-2.5'>
            <a className='text-[#333]'>{author.username}</a>
            <time>{formatISO9075(new Date(createdAt))}</time>
          </p>
          <p className='my-2.5 mx-0 leading-6'>{summary}</p>
        </div>
      </div>
    )
}