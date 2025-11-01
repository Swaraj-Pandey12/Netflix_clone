import React, { useEffect, useState } from 'react'
import Sidenav from '../templates/Sidenav';
import Topnav from '../templates/Topnav';
import axios from '../utils/axios';
import Header from '../templates/Header'
import HorizontalCards from '../templates/HorizontalCards';
import Dropdown from '../templates/Dropdown';
import Loading from '../templates/Loading';
const Home= () => {
    document.title = "VibeStream | HomePage";
 const [wallpaper,setwallpaper]=useState(null);
 const [trending,settrending]=useState(null);
 const [category, setcategory] = useState("all")

 const GetHeaderWallpaper = async()=>{
  try{
    const {data}=await axios.get(`/trending/all/day`);
     let randomdata=data.results[Math.floor(Math.random() * data.results.length)];
     setwallpaper(randomdata);
  }catch(error){
    console.log("Error: ",error);
  }
};

const GetTrending = async()=>{
  try{
    const {data}=await axios.get(`/trending/${category}/day`);
    
     settrending(data.results);
  }catch(error){
    console.log("Error: ",error);
  }
};



useEffect(()=>{
!wallpaper && GetHeaderWallpaper();
 GetTrending();
},[category]);



  return wallpaper && trending ?(
   <>
   <Sidenav/>
     <div className="w-[80%] h-full overflow-auto overflow-x-hidden ">
        <Topnav/>
        <Header data={wallpaper}/>

         <div className='p-5  flex justify-between'>
            <h1 className=' text-3xl font-bold text-zinc-400'>
            Trending
            </h1>
     
        <Dropdown title="Filter" options={["tv", "movie", "all"]} func={(e)=>setcategory(e.target.value)} />

        </div>



             <HorizontalCards data={trending} />
     </div>
  </>
  ):<Loading/>

};

export default Home