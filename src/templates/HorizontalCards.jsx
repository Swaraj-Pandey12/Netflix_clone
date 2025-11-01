import React from "react";
import { Link } from "react-router-dom";
import noimage from '/noimage.jpg'

function HorizontalCards({ data }) {
  return (
    <div className=" w-[100%] h-[40vh] flex  overflow-y-hidden  p-5 mb-5">
      {data?.length > 0 ? (
        data.map((d, i) => (
          <Link
            to={`/${d.media_type}/details/${d.id}`}
            key={i}
            className="min-w-[15%] h-full bg-zinc-900 mr-5 mb-5"
          >
            <img
              className="w-full h-[55%] object-cover"
              src={   d.backdrop_path || 
                d.poster_path ? `https://image.tmdb.org/t/p/original/${
                d.backdrop_path || d.poster_path
              }`
              :noimage
            }
              alt=""
            />
            <div className="text-white p-3 h-[45%] overflow-y-auto">
              <h1 className="text-xl font-semibold">
                {d.name || d.original_title || d.title || d.original_name}
              </h1>
              <p className="">
                {d.overview.slice(0, 60)}...
                <span className="text-zinc-400">more</span>
              </p>
            </div>
          </Link>
        ))
      ) : (
        <h1 className="text-3xl text-white font-black text-center">
          Nothing to show
        </h1>
      )}
    </div>
  );
}

export default HorizontalCards;
