import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadperson, removeperson } from "../store/actions/personActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./HorizontalCards";
import Dropdown from "./Dropdown"
function Persondetails() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.person);
  const dispatch = useDispatch();
  const [category, setcategory] = useState("movie")

  useEffect(() => {
    dispatch(asyncloadperson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id]);

  return info ? (
    <div className="px-[10%] w-screen bg-[#1F1E24] h-[150vh] ">
      {/* part-1 navigation */}
      <nav className="h-[10vh]  w-full  text-zinc-200 flex items-center gap-10 text-2xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
      </nav>

      <div className="w-full flex  ">
        {/* part-2 left poster and details */}
        <div className="w-[20%]">
          <img
            className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[30vh] object-cover rounded-md"
            src={`https://image.tmdb.org/t/p/original${info.detail.profile_path}`}
            alt="Poster"
          />
          <hr className="mt-10 mb-5 border-none h-[1px] bg-zinc-300" />{" "}
          {/* Social Media links */}
          <div className="text-xl text-white flex gap-x-5">
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}
            >
              <i className="ri-external-link-line"></i>
            </a>

            <a
              target="_blank"
              rel="noreferrer"
              href={`https://www.facebook.com/${info.externalid.facebook_id}`}
            >
              <i class="ri-facebook-circle-fill"></i>
            </a>

            <a
              target="_blank"
              rel="noreferrer"
              href={`https://www.instagram.com/${info.externalid.instagram_id}`}
            >
              <i class="ri-instagram-fill"></i>
            </a>

            <a
              target="_blank"
              href={`https://x.com/${info.externalid.twitter_id}?lang=cs`}
            >
              <i class="ri-twitter-x-fill"></i>
            </a>
          </div>
          {/* personal Information */}
          <h1 className="text-lg text-zinc-400 font-semibold my-5">
            Personal Info
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold ">Known For</h1>
          <h1 className="text-zinc-300">{info.detail.known_for_department}</h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3 ">Gender</h1>
          <h1 className="text-zinc-300">
            {info.detail.gender === 2 ? "Male" : "Female"}
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3 ">
            Birthday
          </h1>
          <h1 className="text-zinc-300">{info.detail.birthday}</h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3 ">
            Deathday
          </h1>
          <h1 className="text-zinc-300">
            {info.detail.deathday ? info.detail.deathday : "Still Alive"}
          </h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3 ">
            Place Of Birth
          </h1>
          <h1 className="text-zinc-300">{info.detail.place_of_birth}</h1>
          <h1 className="text-lg text-zinc-400 font-semibold mt-3 ">
            Also Known as
          </h1>
          <h1 className="text-zinc-300">{info.detail.also_known_as.join()}</h1>
        </div>

        {/* part-3 Details and information */}
        <div className="w-[80%]  ml-[5%]">
          <h1 className="text-6xl text-zinc-400 font-semibold my-5">
            {info.detail.name}
          </h1>

          <h1 className="text-xl text-zinc-400 font-semibold ">Biography</h1>
          <p className="text-zinc-400 mt-3">{info.detail.biography}</p>

          <h1 className="mt-5 text-lg text-zinc-400 font-semibold ">
            Known for
          </h1>
          <HorizontalCards data={info.combinedcredits.cast} />
          <div className="w-full flex justify-between ">
            <h1 className="mt-5 text-xl text-zinc-400 font-semibold ">
              Acting
            </h1>
            <Dropdown title="Category" options={["tv","movie"]} func={(e) =>setcategory(e.target.value)}/>
          </div>
          <div className="w-full text-zinc-400 h-[50vh] overflow-x-hidden overflow-y-auto shadow-xl shadow-[rgba(255,255,255,.3)] border-2 border-zinc-800 p-5  ">
            {info[category + "credits"]?.cast?.map((c, i) => (
  <li key={i} className="hover:text-white p-5 duration-300 cursor-pointer">
    <Link to={`/${category}/details/${c.id}`}>
      <span className="">
        {" "}
        {c.name || c.original_title || c.title || c.original_name}
      </span>
      <span className=" text-zinc-400 block ml-5 ">
        {c.character && `character name:${c.character}` }
       </span>
    </Link>
  </li>
))}

            
          
          </div>
           
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
}
export default Persondetails;
