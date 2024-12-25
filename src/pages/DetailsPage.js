import React from "react";
import { useParams } from "react-router-dom";
import useFetchDetail from "../Hooks/useFetchDetail";
import useFetch from "../Hooks/useFetch";
import { useSelector } from "react-redux";
import moment from "moment";
import Divider from "../components/Divider";
import HorizontalScrollCard from "../components/HorizontalScrollCard";
import VideoPlay from "../components/VideoPlay";
import { useState } from "react";

const DetailsPage = () => {
  const param = useParams();
  const imageUrl = useSelector((state) => state.MovieoData.imageUrl) || "";
  const { data, loading, error } = useFetchDetail(
    `/${param?.explore}/${param?.id}`
  );
  const { data: castData } = useFetchDetail(
    `/${param?.explore}/${param?.id}/credits`
  );

  const { data: similarData } = useFetch(
    `/${param?.explore}/${param?.id}/similar`
  );

  const { data: recommendationData } = useFetch(
    `/${param?.explore}/${param?.id}/recommendations`
  );

  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState("");

  const exchangeRate = 0.013;

  const duration = (Number(data?.runtime) / 60).toFixed(1);
  const writer =
    castData?.crew
      ?.filter((el) => el?.job === "Writer" || el?.job === "Screenwriter") // Adjust based on API response
      ?.map((el) => el?.name)
      .join(", ") || "N/A"; // Fallback if no writers are found
  console.log("crew", castData);

  const handlePlayVideo = (data) => {
    setPlayVideoId(data);
    setPlayVideo(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="">
      <div className="w-full h-[350px] relative hidden lg:block">
        <div className="w-full h-full">
          {data?.backdrop_path ? (
            <img
              className="h-full w-full object-cover"
              src={imageUrl + data.backdrop_path}
              alt={data?.title || "Movie"}
            />
          ) : (
            <div>No Image Available</div>
          )}
          <div className="absolute bg-gradient-to-t top-0 from-neutral-900/90 to-transparent w-full h-full"></div>
        </div>
      </div>
      <div className="mx-auto container px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10">
        <div className=" relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60">
          {data?.poster_path ? (
            <img
              className="h-80 w-60 object-cover rounded"
              src={imageUrl + data.poster_path}
              alt={data?.title || "Movie"}
            />
          ) : (
            <div>No Image Available</div>
          )}
          <button
            onClick={() => handlePlayVideo(data)}
            className="mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg 
             hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all 
             duration-300 ease-in-out z-40"
          >
            Play Now
          </button>
        </div>
        <div className="">
          <h2 className="text-2xl lg:text-4xl font-bold text-white">
            {data?.title || data?.name}
          </h2>
          <p className="text-neutral-400">{data?.tagline}</p>
          <Divider />
          <div className="flex items-center gap-3">
            <p className="">Rating: {Number(data?.vote_average).toFixed(1)}+</p>
            <span>|</span>
            <p> View: {Number(data?.vote_count)}</p>
            <span>|</span>
            <p>
              Duration: {duration[0]}h {duration[2]}m
            </p>
          </div>
          <Divider />
          <div className="">
            <h3 className="text-xl font-bold text-white mb-1">Overview</h3>
            <p>{data?.overview}</p>
            <Divider />
            <div className="flex items-center gap-3 text-center">
              <p>Status: {data?.status}</p>
              <span>|</span>
              <p>
                Released Date :{" "}
                {moment(data?.release_date).format("MMMM Do YYYY")}
              </p>
              <span>|</span>
              <p>
                Revenue: ${(Number(data?.revenue) * exchangeRate).toFixed(2)}
              </p>
            </div>
            <Divider />
          </div>
          <div className="">
            <p>
              {" "}
              <span className="text-white">Director : </span>{" "}
              {castData?.crew[0]?.name}
            </p>
            <Divider />
            <p>
              <span className="text-white">Writer : </span> {writer}
            </p>
            <Divider />
            <h2 className="text-lg lg:text-xl font-bold my-3">Star cast :</h2>
            <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-5 mb-10">
              {castData?.cast
                ?.filter((el) => el?.profile_path)
                .map((cast, index) => {
                  return (
                    <div className="">
                      <div className="">
                        <img
                          className="w-24 h-24 rounded-full object-cover"
                          src={imageUrl + cast?.profile_path}
                          alt=""
                        />
                      </div>
                      <p className="font-bold text-center text-sm">
                        {cast?.name}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <div className="">
        <HorizontalScrollCard
          data={similarData}
          heading={"Similar " + param?.explore}
          media_type={param?.explore}
        />
        <HorizontalScrollCard
          data={recommendationData}
          heading={"Recommendation " + param?.explore}
          media_type={param?.explore}
        />
      </div>
      {playVideo && (
        <VideoPlay
          videoId={playVideoId}
          close={() => setPlayVideo(false)}
          media_type={param?.explore}
        />
      )}
    </div>
  );
};

export default DetailsPage;
