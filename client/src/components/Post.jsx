/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import {formatISO9075} from "date-fns";

export const Post = ({title, summary, cover, content, createdAt,author}) => {
    return (
        <div className="mb-9 grid grid-cols-[0.9fr_1.1fr] gap-10">
        <div>
          <img src={'http://localhost:5000/'+cover} className="max-w-full w-4/5 mx-auto"></img>
        </div>
        <div>
          <h1 className='m-0 text-2xl font-bold'>
            {title}
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