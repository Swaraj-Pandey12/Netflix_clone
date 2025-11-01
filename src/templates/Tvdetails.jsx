import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncloadtv, removetv } from "../store/actions/tvActions";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import Loading from "./Loading";
import HorizontalCards from "./HorizontalCards";

function Tvdetails() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { info } = useSelector((state) => state.tv);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncloadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id]);

  return info ? (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.5), rgba(0,0,0,.8)),url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className=" relative w-screen h-[220vh]  px-[10%]  text-white"
    >
      {/* part-1 navigation */}
      <nav className="h-[5vh] w-full  text-zinc-200 flex items-center gap-10 text-2xl">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556CD] ri-arrow-left-line"
        ></Link>
        <a target="_blank" rel="noreferrer" href={info.detail.homepage}>
          <i className="ri-earth-fill"></i>
        </a>
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
          href={`https://www.imdb.com/title/${info.externalid.imdb_id}`}
        >
          imdb
        </a>
      </nav>

      {/* part-2: Poster + Content side-by-side */}
      <div className="w-full flex gap-10 items-start mt-6">
        {/* Poster */}
        <img
          className="shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover rounded-md"
          src={`https://image.tmdb.org/t/p/original${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt="Poster"
        />

        {/* Content */}
        <div className="bg-white/10 p-6 rounded text-white w-full">
          <h1 className="text-4xl font-bold mb-2 ">
            {info.detail.name ||
              info.detail.original_title ||
              info.detail.title ||
              info.detail.original_name}

            <small className="text-2xl font-bold text-zinc-300">
              (
              {info.detail.first_air_date
                ? `(${info.detail.first_air_date.split("-")[0]})`
                : ""}
              )
            </small>
          </h1>

          <div className="mt-3 mb-10 flex text-zinc-100 items-center gap-x-5 ">
            <span className="bg-yellow-600 rounded-full text-xl font-semibold  text-white w-[5vh] h-[5vh] flex justify-center items-center">
              {(info.detail.vote_average * 10).toFixed()}
              <sup>%</sup>
            </span>
            <h1 className="w-[60px] font-semibold text-2xl leading-6">
              User Score
            </h1>
            <h1>{info.detail.first_air_date}</h1>
            <h1>{info.detail.episode_run_time?.[0]} min</h1>
          </div>

          {/* You can add more details below */}
          <p className="text-sm text-zinc-300">{info.detail.tagline}</p>
          <h1 className="text-2xl mb-1 mt-5">Overview</h1>
          <p className="text-base">{info.detail.overview}</p>

          <h1 className="text-2xl mb-1  mt-5">Movie Translated</h1>
          <p className="mt-4 text-base mb-10">{info.translations.join(", ")}</p>

          <Link
            to={`${pathname}/trailer`}
            className="p-5 bg-[#6556CD] rounded-lg "
          >
            <i className="ri-play-fill mr-2"></i>Play Trailer
          </Link>
        </div>
      </div>

      {/* part-3: Available on Platforms */}
      {/* Streaming (Flatrate) Section */}
      <div className="bg-gradient-to-r from-black/70 via-black/30 to-transparent mt-2 p-6 rounded text-white w-full">
        <h2 className="text-white font-semibold mb-2">Available to Stream:</h2>
        {info.watchproviders?.flatrate?.length > 0 ? (
          info.watchproviders.flatrate.map((w) => (
            <img
              key={w.provider_id}
              src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
              alt={w.provider_name}
              title={w.provider_name}
              className="h-12 w-[5vh] rounded-md inline-block mr-4"
            />
          ))
        ) : (
          <p className="text-zinc-300">
            No streaming providers available in India.
          </p>
        )}
      </div>

      {/* Rent Section */}
      <div className="bg-gradient-to-r from-black/70 via-black/30 to-transparent mt-2 p-6 rounded text-white w-full">
        <h2 className="text-white font-semibold mb-2">Available to Rent:</h2>
        {info.watchproviders?.rent?.length > 0 ? (
          info.watchproviders.rent.map((w, i) => (
            <img
              key={i}
              src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
              alt={w.provider_name}
              title={w.provider_name}
              className="h-12 w-[5vh] rounded-md inline-block mr-4"
            />
          ))
        ) : (
          <p className="text-zinc-300">No rent options available in India.</p>
        )}
      </div>

      {/* Buy Section */}
      <div className="bg-gradient-to-r from-black/70 via-black/30 to-transparent mt-2 p-6 rounded text-white w-full">
        <h2 className="text-white font-semibold mb-2">Available to Buy:</h2>
        {info.watchproviders?.buy?.length > 0 ? (
          info.watchproviders.buy.map((w, j) => (
            <img
              key={j}
              src={`https://image.tmdb.org/t/p/original${w.logo_path}`}
              alt={w.provider_name}
              title={w.provider_name}
              className="h-12 w-[5vh] rounded-md inline-block mr-4"
            />
          ))
        ) : (
          <p className="text-zinc-300">
            No purchase options available in India.
          </p>
        )}
      </div>

      {/* part 4 Seasons */}
      <hr className="mt-10 mb-5 border-none h-[1px] bg-zinc-300" />
      <h1 className="mt-10 text-2xl font-semibold text-white">Seasons</h1>
      <div className="w-[100%] h-[35vh] flex gap-4  overflow-y-hidden  p-5 mb-5">
        {info.detail.seasons.length > 0 ? (
          info.detail.seasons.map((s, i) => (
            <div className="w-[80%]">
              <img
                className="m-w-[14vw] h-[30vh] object-contain"
                src={`https://image.tmdb.org/t/p/original/${s.poster_path}`}
                alt=""
              />
              <h1 className="text-xl font-semibold">
                {s.name || s.original_title || s.title || s.original_name}
              </h1>
            </div>
          ))
        ) : (
          <h1 className="text-3xl text-white font-black text-center">
            Nothing to show
          </h1>
        )}
      </div>

      {/* part 5 Recommnedations */}
      <hr className="mt-10 mb-5 border-none h-[1px] bg-zinc-300" />
      <h1 className="mt-10 text-2xl font-semibold text-white">
        Recommendations & Similar Items
      </h1>
      <HorizontalCards
        data={
          info.recommendations.length > 0 ? info.recommendations : info.similar
        }
      />

      {/* Trailer Outlet */}

      <Outlet />
    </div>
  ) : (
    <Loading />
  );
}

export default Tvdetails;
