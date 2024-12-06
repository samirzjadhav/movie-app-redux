import React from "react";
import { useSelector } from "react-redux";

const BannerHome = () => {
  // Access bannerData from Redux store
  const bannerData = useSelector((state) => state.MovieoData.bannerData);
  const imageUrl = useSelector((state) => state.MovieoData.imageUrl);

  // Conditional rendering to handle undefined or empty bannerData
  if (!bannerData || bannerData.length === 0) {
    return <div>Loading banner data...</div>; // Show loading or a fallback message
  }

  return (
    <section className="w-full h-full">
      <div className="flex min-h-full max-h-[95vh]">
        {bannerData.map((data, index) => {
          return (
            <div
              key={index}
              className="min-w-full min-h-[450px] lg:min-h-full overflow-hidden"
            >
              <div className="w-full h-full">
                {/* You can access data properties here, for example: */}
                <img
                  src={imageUrl + data.backdrop_path}
                  alt=""
                  className="h-full w-full object-cover"
                />
                <h3>{data.title}</h3>
                <p>{data.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BannerHome;
