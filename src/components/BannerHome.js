import React from "react";
import { useSelector } from "react-redux";

const BannerHome = () => {
  const bannerData = useSelector((state) => state);
  console.log(" banner Home", bannerData);
  return <div>Bannerdata</div>;
};

export default BannerHome;
