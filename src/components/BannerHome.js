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
    <div>
      <div>
        {bannerData.map((data, index) => {
          return (
            <div key={index}>
              {/* You can access data properties here, for example: */}
              <img src={imageUrl + data.backdrop_path} alt="" />
              <h3>{data.title}</h3>
              <p>{data.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BannerHome;
