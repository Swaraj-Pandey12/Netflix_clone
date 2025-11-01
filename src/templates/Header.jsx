import React from 'react'
import { Link } from 'react-router-dom';
function Header({data}) {
  console.log(data);
  return (
    <div 
      style={{
        background:`linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5), rgba(0,0,0,.8)),url(https://image.tmdb.org/t/p/original/${
        data.backdrop_path || data.profile_path
 })`,
 backgroundPosition:'top 10%',
 backgroundSize:'cover',
 backgroundRepeat:'no-repeat'

      }}
      className='w-full h-[50vh] flex flex-col justify-end p-[5%] items-start'
      >
   <h1 className='w-[70%] text-5xl font-black text-white'>  {data.name||
          data.original_title||
          data.title||
          data.original_name}
  </h1>
  <p className='w-[70%] mb-3 mt-3 text-white'>
    {data.overview.slice(0,200)}...
    <Link to={`/${data.media_type}/details/${data.id}`} className='text-blue-400'>more</Link>
    </p>
    <p className='text-white '>
      <i className="text-yellow-500 ri-megaphone-fill"></i>{data.release_date || "No information"}
      <i className="ml-5 text-yellow-500 ri-album-fill"></i>{data.media_type.toUpperCase()}
      
    </p>
    <Link   to={`/${data.media_type}/details/${data.id}/trailer`}  className='bg-[#6556CD] p-4 text-white '>Watch Trailer</Link>
    </div>
  )
}

export default Header