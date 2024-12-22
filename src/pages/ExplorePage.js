import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";

const ExplorePage = () => {
  const params = useParams();
  const [pageNo, setPageNo] = useState(1);
  console.log("param", params);
  const fetchData = async () => {
    try {
      const response = await axios.get(`/discover/${params.explore}`, {
        params: { page: pageNo },
      });
      console.log("response", response);
    } catch (error) {}
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Footer />
    </div>
  );
};

export default ExplorePage;
