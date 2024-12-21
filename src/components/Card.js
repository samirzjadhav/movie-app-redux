import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router-dom";

const Card = ({ data, tranding, index, media_type }) => {
  const imageUrl = useSelector((state) => state.MovieoData.imageUrl);
  const mediaType = data.media_type ?? media_type;

  return (
    <Link
      to={"/" + mediaType + "/" + data.id}
      className="w-full min-w-[230px] max-w-[230px] h-90 rounded overflow-hidden block relative hover:scale-105 transition-transform"
    >
      <img src={imageUrl + data?.poster_path} alt="" />
      <div className="absolute top-4">
        {tranding && (
          <div className=" py-1 px-4 backdrop-blur-3xl rounded-r-full bg-black/60 overflow-hidden">
            #{index} tranding
          </div>
        )}
      </div>
      <div className="absolute bottom-0 h-16 backdrop-blur-3xl w-full bg-black/60 p-2">
        <h2 className="text-ellipsis line-clamp-1 text-lg font-bold">
          {data?.title || data?.name}
        </h2>
        <div className="text-sm text-neutral-400 flex justify-between items-center">
          <p>{moment(data?.release_date).format("MMMM Do YYYY")}</p>
          <p className="bg-black rounded-full text-xs px-1 text-white">
            Rating: {Number(data.vote_average).toFixed(1)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
