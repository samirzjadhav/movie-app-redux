import React from "react";
import { useParams } from "react-router-dom";
import useFetchDetail from "../Hooks/useFetchDetail";
import { useSelector } from "react-redux";
import moment from "moment";
import Divider from "../components/Divider";

const DetailsPage = () => {
  const param = useParams();
  const imageUrl = useSelector((state) => state.MovieoData.imageUrl) || "";
  const { data, loading, error } = useFetchDetail(
    `/${param?.explore}/${param?.id}`
  );
  const { data: castData } = useFetchDetail(
    `/${param?.explore}/${param?.id}/credits`
  );

  const duration = (Number(data?.runtime) / 60).toFixed(1);
  const writer =
    castData?.crew
      ?.filter((el) => el?.job === "Writer" || el?.job === "Screenwriter") // Adjust based on API response
      ?.map((el) => el?.name)
      .join(", ") || "N/A"; // Fallback if no writers are found

  console.log("Writer:", writer);

  console.log("writer", writer);
  console.log("crew", castData);

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
        <div className=" relative mx-auto lg:-mt-28 lg:mx-0 w-fit">
          {data?.poster_path ? (
            <img
              className="h-80 w-60 object-cover rounded"
              src={imageUrl + data.poster_path}
              alt={data?.title || "Movie"}
            />
          ) : (
            <div>No Image Available</div>
          )}
        </div>
        <div className="">
          <h2 className="text-2xl font-bold text-white">
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
              <p>Revenue: {Number(data?.revenue)}</p>
            </div>
            <Divider />
          </div>
          <div className="">
            <p>
              {" "}
              <span className="text-white">Director : </span>{" "}
              {castData?.crew[0]?.name}
            </p>
            <p>
              <span className="text-white">Writer : </span> {writer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
