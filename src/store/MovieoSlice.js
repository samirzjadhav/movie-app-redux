import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const MovieoSlice = createSlice({
  name: "movieo",
  initialState,
  reducers: {
    setBannerData: (state, action) => {
      state.bannerData = action.payload;
    },
  },
});

export const { setBannerData } = MovieoSlice.actions;

export default MovieoSlice.reducer;
