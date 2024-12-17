import React from "react";
import BannerHome from "../components/BannerHome";
import { useSelector } from "react-redux";
import Card from "../components/Card";

const Home = () => {
  const trandingData = useSelector((state) => state.MovieoData.bannerData);
  return (
    <div>
      <BannerHome />
      <div className="container mx-auto px-3 my-10">
        <h2 className="text-lg font-bold lg:text-3xl mb-3 text-white ">
          Tranding Data
        </h2>
        <div className="overflow-hidden">
          <div className="grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 overflow-x-scroll">
            {trandingData.map((data, index) => {
              return (
                <Card
                  key={data.id}
                  data={data}
                  index={index + 1}
                  tranding={true}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
