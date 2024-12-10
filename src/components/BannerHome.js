import React from "react";
import { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useSelector } from "react-redux";

const BannerHome = () => {
  // Access bannerData from Redux store
  const bannerData = useSelector((state) => state.MovieoData.bannerData);
  const imageUrl = useSelector((state) => state.MovieoData.imageUrl);

  const [currentImage, setCurrentImage] = useState(0);

  // Conditional rendering to handle undefined or empty bannerData
  if (!bannerData || bannerData.length === 0) {
    return <div>Loading banner data...</div>; // Show loading or a fallback message
  }

  const handleNext = () => {
    console.log("Next button clicked");
    if (currentImage < bannerData.length - 1) {
      setCurrentImage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    console.log("Previous button clicked");
    if (currentImage > 0) {
      setCurrentImage((prev) => prev - 1);
    }
  };

  return (
    <section className="w-full h-full">
      <div className="flex min-h-full max-h-[95vh] overflow-hidden">
        {bannerData.map((data, index) => {
          return (
            <div
              key={index}
              className="min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group"
              style={{ transform: `translateX(-${currentImage * 100}%)` }}
            >
              <div className="w-full h-full">
                {/* You can access data properties here, for example: */}
                <img
                  src={imageUrl + data.backdrop_path}
                  alt=""
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute top-0 w-full h-full hidden justify-between items-center px-4 z-10 group-hover:lg:flex">
                <button
                  onClick={handlePrev}
                  className="bg-white p-1 rounded-full text-xl text-black"
                >
                  <FaAngleLeft />
                </button>
                <button
                  onClick={handleNext}
                  className="bg-white p-1 rounded-full text-xl text-black"
                >
                  <FaAngleRight />
                </button>
              </div>

              <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>
              <div className="container mx-auto ">
                <div className="w-full absolute bottom-0 max-w-md px-3">
                  <h2 className="font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl">
                    {data.title}
                  </h2>
                  <p className="text-ellipsis line-clamp-3 my-2">
                    {data.overview}
                  </p>
                  <div className="flex items-center gap-4">
                    <p>Rating: {Number(data.vote_average).toFixed(1)}+ </p>
                    <span>|</span>
                    <p>View: {Number(data.popularity).toFixed(0)}</p>
                  </div>
                  <button className="bg-white px-4 py-2 text-black font-bold rounded mt-4 hover:scale-105 hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all">
                    Play Now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BannerHome;
