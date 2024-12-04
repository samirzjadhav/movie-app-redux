import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MobileNavigation from "./components/MobileNavigation";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBannerData, setImageUrl } from "./store/MovieoSlice";

const App = () => {
  const dispatch = useDispatch();

  const fetchTrendingData = async () => {
    try {
      const response = await axios.get(`/trending/all/week`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
        },
      });
      // Dispatch the action with the response data
      dispatch(setBannerData(response.data.results));
    } catch (error) {
      console.error("API error:", error);
    }
  };

  const fetchConfiguration = async () => {
    try {
      const response = await axios.get("/configuration");
      dispatch(setImageUrl(response.data.images.secure_base_url + "original"));
    } catch (error) {}
  };

  useEffect(() => {
    fetchTrendingData();
    fetchConfiguration();
  }, []);

  return (
    <main className="pb-14 lg:pb-0">
      <Header />
      <div className="pt-16">
        <Outlet />
      </div>
      <Footer />
      <MobileNavigation />
    </main>
  );
};

export default App;
