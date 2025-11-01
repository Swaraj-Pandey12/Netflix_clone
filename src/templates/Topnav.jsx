import axios from '../utils/axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import noimage from "/noimage.jpg"

function Topnav() {
const [query,setquery]=useState("");
const[searches,setsearches]=useState([]);

const GetSearches = async()=>{
  try{
    const {data}=await axios.get(`/search/multi?query=${query}`);
     console.log(data);
     setsearches(data.results);
  }catch(error){
    console.log("Error: ",error);
  }
};

useEffect(()=>{
  GetSearches();
},[query]);

  return (


    <div className='w-[80%] h-[10vh] relative flex m-auto   items-center '>
        <i className="text-3xl text-zinc-400  ri-search-line"></i>
        <input 
        id="search"
        name="search"
        
        onChange={(e)=>setquery(e.target.value)}
        value={query}
        className='w-[50%]  text-zinc-100 mx-10 p-5 text-xl outline-none border-none bg-transparent'
         type="text" 
         placeholder="search anything" 
         />
         {query.length > 0 && (
            <i 
            onClick={()=>setquery("")}
            className=" text-3xl text-zinc-400  ri-close-line right-0">
          </i>
         )}
      
        
       <div className='z-[100] absolute w-[50%] max-h-[50vh] left-[5%] bg-zinc-200 top-[100%] overflow-auto ' >
        {Array.isArray(searches) &&
  searches.map((s, i) => (
    <Link to={`/${s.media_type}/details/${s.id}`}
    key={i} className="hover:text-black hover:bg-zinc-300 font-semibold text-zinc-600 w-[100%] 
    p-10 flex justify-start items-center border-b-2 border-zinc-100">
     <img className='w-[10vh] h-[10vh] object-cover rounded mr-5 shadow-lg'
     src={
      s.backdrop_path ||
       s.profile_path?`https://image.tmdb.org/t/p/original/${
       ( s.backdrop_path || s.profile_path)
      }` :noimage
    } 
     alt=""/>
     <span>
      {s.name||
      s.original_title||
      s.title||
      s.original_name}
      </span>
    
    </Link>
  ))} 

         
{/* 
            { 
            <Link className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-10 flex justify-start items-center border-b-2 border-zinc-100">
             <img  src="" alt="" />
             <span>Hello Everyone</span>
            </Link>

            <Link className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-10 flex justify-start items-center border-b-2 border-zinc-100">
             <img  src="" alt="" />
             <span>Hello Everyone</span>
            </Link>

            <Link className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-10 flex justify-start items-center border-b-2 border-zinc-100">
             <img  src="" alt="" />
             <span>Hello Everyone</span>
            </Link>

            <Link className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-10 flex justify-start items-center border-b-2 border-zinc-100">
             <img  src="" alt="" />
             <span>Hello Everyone</span>
            </Link>

            <Link className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-10 flex justify-start items-center border-b-2 border-zinc-100">
             <img  src="" alt="" />
             <span>Hello Everyone</span>
            </Link>

            <Link className="hover:text-black hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] p-10 flex justify-start items-center border-b-2 border-zinc-100">
             <img  src="" alt="" />
             <span>Hello Everyone</span>
            </Link>  } */}

</div>



    </div>
  )
}

export default Topnav