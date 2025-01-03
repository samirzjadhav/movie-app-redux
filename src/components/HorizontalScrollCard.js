import React, { useRef } from "react";
import Card from "../components/Card";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

const HorizontalScrollCard = ({ data = [], heading, trending, media_type }) => {
  const containerRef = useRef();

  const handleNext = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 300;
    }
  };

  const handlePrev = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 300;
    }
  };

  return (
    <div className="container mx-auto px-3 my-10">
      <h2 className="text-lg font-bold lg:text-3xl mb-3 text-white capitalize">
        {heading}
      </h2>
      <div className="relative">
        <div
          ref={containerRef}
          className="grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 overflow-x-scroll z-10 scroll-smooth transition-all relative overflow-hidden scrollbar-none"
        >
          {Array.isArray(data) && data.length > 0 ? (
            data.map((item, index) => (
              <Card
                key={item.id + "heading" + index}
                data={item}
                index={index + 1}
                tranding={trending}
                media_type={media_type}
              />
            ))
          ) : (
            <p className="text-white">No data available</p>
          )}
        </div>
        <div className="absolute top-0 hidden lg:flex justify-between w-full h-full items-center">
          <button
            onClick={handlePrev}
            className="bg-white p-1 text-black rounded-full -ml-2 z-10"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={handleNext}
            className="bg-white p-1 text-black rounded-full -mr-2 z-10"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HorizontalScrollCard;
