import React from "react";
import { useSelector } from "react-redux";

const Card = ({ data, tranding, index }) => {
  const imageUrl = useSelector((state) => state.MovieoData.imageUrl);

  return (
    <div className="w-full max-w-[230px] h-80 rounded overflow-hidden relative">
      <img src={imageUrl + data?.poster_path} alt="" />
      <div className="absolute top-4">
        {tranding && (
          <div className=" py-1 px-4 backdrop-blur-3xl rounded-r-full bg-black/60 overflow-hidden">
            #{index} tranding
          </div>
        )}
      </div>
      <div className="absolute bottom-0 h-14 backdrop-blur-3xl w-full bg-black/60 p-2">
        <h2 className="text-ellipsis line-clamp-1 text-lg font-bold">
          {data?.title || data?.name}
        </h2>
      </div>
    </div>
  );
};

export default Card;
