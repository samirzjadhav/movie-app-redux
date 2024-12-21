import React, { useEffect, useState } from "react";
import BannerHome from "../components/BannerHome";
import { useSelector } from "react-redux";
import Card from "../components/Card";
import HorizontalScrollCard from "../components/HorizontalScrollCard";
import useFetch from "../Hooks/useFetch";

const Home = () => {
  const trandingData = useSelector((state) => state.MovieoData.bannerData);
  const { data: nowPlayingData } = useFetch("/movie/now_playing");
  const { data: TopRatedData } = useFetch("/movie/top_rated");
  const { data: PopularTvShow } = useFetch("/tv/popular");
  const { data: OnTheAirShowData } = useFetch("/tv/on_the_air");

  return (
    <div>
      <BannerHome />
      <HorizontalScrollCard
        data={trandingData}
        heading={"Trending"}
        trending={true}
      />
      <HorizontalScrollCard
        data={nowPlayingData}
        heading={"Now Playing"}
        media_type={"movie"}
      />
      <HorizontalScrollCard
        data={TopRatedData}
        heading={"Top Rated"}
        media_type={"movie"}
      />
      <HorizontalScrollCard
        data={PopularTvShow}
        heading={"Popular TV Show"}
        media_type={"tv"}
      />
      <HorizontalScrollCard
        data={OnTheAirShowData}
        heading={"On The Air"}
        media_type={"tv"}
      />
    </div>
  );
};

export default Home;
