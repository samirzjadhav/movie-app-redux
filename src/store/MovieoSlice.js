import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  bannerData: [],
  imageUrl: "",
};

export const MovieoSlice = createSlice({
  name: "movieo",
  initialState,
  reducers: {
    setBannerData: (state, action) => {
      state.bannerData = action.payload;
    },
    setImageUrl: (state, action) => {
      state.imageUrl = action.payload;
    },
  },
});

export const { setBannerData, setImageUrl } = MovieoSlice.actions;

export default MovieoSlice.reducer;
