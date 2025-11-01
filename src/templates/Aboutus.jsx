
import Topnav from "./Topnav";
import { useNavigate } from 'react-router-dom';

function Aboutus() {
     document.title="VibeStream | Aboutus" 
const navigate=useNavigate();

   return (
    <div className='w-screen h-screen '>
    <div className='px-[5%] w-full  flex   items-center justify-between  '>
        
  <h1 className=' text-2xl text-zinc-400 font-semibold '>
    <i onClick={()=>navigate(-1)} className='hover:text-[#6556CD] ri-arrow-left-line'></i>
    {" "}
    About VibeStream
  </h1>
   <div className='flex items-center w-[80%] '>
    <Topnav />
    </div>
    <h1>
      About Us
    </h1>
     </div>
 </div>
) 
};


export default Aboutus