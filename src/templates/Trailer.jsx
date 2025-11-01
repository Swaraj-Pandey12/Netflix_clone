  import React from "react";
  import { useSelector } from "react-redux";
  import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
  import ReactPlayer from 'react-player'
import Notfound from "./Notfound";


  function Trailer() {
    const navigate=useNavigate();
    const { pathname } = useLocation();
    const category = pathname.includes("movie") ? "movie" : "tv";
    const ytvideos = useSelector((state) => state[category].info.videos);



    return  (
      <div className="absolute bg-[rgba(0,0,0,0.9)] z-[100] left-0 top-0 w-screen h-screen flex items-center justify-center">
        <Link  
        onClick={() => navigate(-1)} 
        className='absolute hover:text-[#6556CD] ri-close-fill text-3xl text-white right-[5%] top-[5%]' >
        </Link>
        
      {ytvideos ? (  <ReactPlayer
          width="80%" 
    height="80%"
src={`https://www.youtube.com/embed/${ytvideos.key}`}    
controls
    playing
    muted={true}  
  
  />
      ):( 
      <Notfound/>
)}
        
        
      </div>
    );
  };

  export default Trailer;
